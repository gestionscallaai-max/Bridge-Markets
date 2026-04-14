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
