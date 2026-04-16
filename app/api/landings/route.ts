import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role or fallback to the publishable key
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const partnerId = searchParams.get('partnerId');

        if (!partnerId) {
            return NextResponse.json({ error: 'Partner ID required' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('landings')
            .select('*')
            .eq('partner_id', partnerId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('Critical API Error:', e.message || e);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to fetch landings',
            details: e.message || 'Unknown error'
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, slug, html, data } = body;

        console.log('API POST - Saving landing:', { slug, userId });

        // Resolve the real partner_id (UUID)
        let realPartnerId = data.partnerId;
        
        // 1. Try to resolve UUID from partners table if we have a userId
        const idToResolve = userId || data.userId;
        if (idToResolve) {
            const { data: partner, error: partnerError } = await supabaseAdmin
                .from('partners')
                .select('id')
                .eq('id', idToResolve)
                .maybeSingle(); // Does not throw if not found
            
            if (partner?.id) {
                realPartnerId = partner.id;
            } else if (partnerError) {
                console.warn('Partner lookup error:', partnerError.message);
            }
        }

        // 2. Validate realPartnerId is a UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!realPartnerId || !uuidRegex.test(realPartnerId)) {
            // If it's not a valid UUID, we fallback to the userId (which should be a UUID)
            // if both fail, we might need a hardcoded fallback or fail gracefully
            if (idToResolve && uuidRegex.test(idToResolve)) {
                realPartnerId = idToResolve;
            } else {
                return NextResponse.json({ 
                    success: false, 
                    error: 'Invalid Partner Identity',
                    details: 'A valid UUID is required for partner_id'
                }, { status: 400 });
            }
        }

        // 3. Prepare Metadata to bypass missing 'data' column
        const metadata = {
            fullName: data.fullName || 'Sin nombre',
            country: data.country || 'Global',
            whatsapp: data.whatsapp || '',
            email: data.email || '',
            communityName: data.communityName || '',
            heroPhrase: data.heroPhrase || '',
            instagram: data.instagram || '',
            telegram: data.telegram || '',
            tiktok: data.tiktok || '',
            ctaLink: data.ctaLink || '',
            modularConfig: data.modularConfig || {}
        };

        const metadataComment = `<!--METADATA:${JSON.stringify(metadata)}-->`;
        const enrichedHtml = metadataComment + html;

        // 4. Upsert into landings (removing the problematic 'data' column)
        const { error: upsertError } = await supabaseAdmin
            .from('landings')
            .upsert({
                slug,
                html: enrichedHtml,
                landing_type: data.landingType || 'Custom',
                language: data.language || 'ES',
                partner_id: realPartnerId,
                status: 'pending',
                // data: metadata, // REMOVED: This column doesn't exist in DB
            }, { onConflict: 'slug' });

        if (upsertError) {
            console.error('Supabase Upsert Error:', upsertError);
            return NextResponse.json({ 
                success: false, 
                error: 'Database error',
                details: upsertError.message
            }, { status: 500 });
        }

        // --- Notificar a los Admins ---
        const { data: admins } = await supabaseAdmin
            .from('partners')
            .select('id')
            .eq('role', 'admin');

        const adminNotifTitle = 'Nueva Landing Pendiente';
        const adminNotifMessage = `El socio ha creado la landing "${slug}". Necesita revisión.`;
        
        if (admins && admins.length > 0) {
            const notifications = admins.map(admin => ({
                user_id: admin.id,
                title: adminNotifTitle,
                message: adminNotifMessage,
                type: 'warning',
                link: '/dashboard/admin/landings'
            }));
            await supabaseAdmin.from('notifications').insert(notifications);
        }

        return NextResponse.json({ success: true, url: `/l/${slug}` });
    } catch (e: any) {
        console.error('Critical API Error:', e);
        return NextResponse.json({ 
            success: false, 
            error: 'Server error during deployment',
            details: e.message || 'Unknown internal error'
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const slug = searchParams.get('slug');

        console.log('API DELETE - Attempting to delete landing:', { id, slug });

        if (!id && !slug) {
            return NextResponse.json({ error: 'Landing ID or Slug required' }, { status: 400 });
        }

        let query = supabaseAdmin.from('landings').delete();
        
        if (id) {
            // Check if it's a valid UUID format
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (uuidRegex.test(id)) {
                query = query.eq('id', id);
            } else {
                console.warn('API DELETE - Provided ID is not a valid UUID, falling back to slug check.');
                query = query.eq('slug', id); 
            }
        } else if (slug) {
            query = query.eq('slug', slug);
        }

        // We use select() to get the row back and verify it was deleted
        const { error, data: deletedData } = await query.select();

        if (error) {
            console.error('Supabase Delete Error:', error);
            return NextResponse.json({ 
                success: false, 
                error: 'Database error', 
                details: error.message 
            }, { status: 500 });
        }

        const count = deletedData?.length || 0;
        console.log('API DELETE - Operation finished. Records deleted:', count);
        
        return NextResponse.json({ 
            success: true, 
            count,
            message: count === 0 ? 'No matching record found' : 'Deleted successfully'
        });
    } catch (e: any) {
        console.error('Critical DELETE Error:', e.message || e);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to delete landing',
            details: e.message || 'Unknown error'
        }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, adminNotes } = body;

        console.log('API PATCH - Updating landing status:', { id, status });

        if (!id || !status) {
            return NextResponse.json({ error: 'Landing ID and Status required' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('landings')
            .update({ 
                status,
                admin_notes: adminNotes,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select();

        if (error) throw error;

        // --- Notificar al socio ---
        if (data && data.length > 0) {
            const landing = data[0];
            const notifTitle = status === 'approved' ? '¡Landing Aprobada!' : 'Landing Rechazada';
            const notifMessage = status === 'approved' 
                ? `Tu landing "${landing.slug}" ha sido aprobada y ya es pública.`
                : `Tu landing "${landing.slug}" requiere cambios. Nota: ${adminNotes || 'Ver detalles'}`;
            
            await supabaseAdmin
                .from('notifications')
                .insert({
                    user_id: landing.partner_id,
                    title: notifTitle,
                    message: notifMessage,
                    type: status === 'approved' ? 'success' : 'error',
                    link: '/dashboard/promo/overview'
                });
        }

        return NextResponse.json({ success: true, data: data[0] });
    } catch (e: any) {
        console.error('Critical PATCH Error:', e.message || e);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to update landing status',
            details: e.message || 'Unknown error'
        }, { status: 500 });
    }
}
