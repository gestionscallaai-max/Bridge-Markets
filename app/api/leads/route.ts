import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization of the admin client
let _supabaseAdmin: any = null;
const getSupabaseAdmin = () => {
    if (_supabaseAdmin) return _supabaseAdmin;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!url || !key) return null;
    _supabaseAdmin = createClient(url, key);
    return _supabaseAdmin;
};

export async function GET() {
    const admin = getSupabaseAdmin();
    return NextResponse.json({ 
        status: 'online', 
        service_role_configured: !!admin,
        timestamp: new Date().toISOString(),
        env_keys: Object.keys(process.env).filter(k => k.includes('SUPABASE'))
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, whatsapp, phone, landingSlug, partnerId, clickId, countryCode, source, message, notes } = body;

        if (!name || !email) {
            return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
        }

        let supabaseClient = getSupabaseAdmin();
        if (!supabaseClient) {
            console.warn('Supabase Admin client not initialized (Service Role Key missing). Falling back to standard client.');
            supabaseClient = supabase;
        }

        // --- 1. Resolve Partner ID (BM_... to UUID) ---
        let resolvedPartnerId = partnerId;
        let originalPartnerId = partnerId;
        
        // Strategy A: Direct resolution from 'partners' table
        if (partnerId && typeof partnerId === 'string' && partnerId.startsWith('BM_')) {
            try {
                const { data: partnerData, error: pErr } = await supabaseClient
                    .from('partners')
                    .select('id')
                    .eq('partner_id', partnerId)
                    .single();
                
                if (partnerData) {
                    resolvedPartnerId = partnerData.id;
                } else {
                    console.warn(`Could not resolve partner_id ${partnerId} directly from partners table.`);
                }
            } catch (err) {
                console.error('Error in Strategy A resolution:', err);
            }
        }

        // Strategy B: Fallback resolution from 'landings' table (if we have landingSlug)
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedPartnerId);
        if (!isUUID && landingSlug) {
            try {
                console.log(`Attempting Strategy B resolution for slug: ${landingSlug}`);
                const { data: landingData } = await supabaseClient
                    .from('landings')
                    .select('partner_id')
                    .eq('slug', landingSlug)
                    .single();
                
                if (landingData?.partner_id) {
                    resolvedPartnerId = landingData.partner_id;
                    console.log(`Resolved Partner ID via landing slug: ${resolvedPartnerId}`);
                }
            } catch (err) {
                console.error('Error in Strategy B resolution:', err);
            }
        }

        // Final check: if resolvedPartnerId is STILL not a UUID, we null it to prevent DB errors
        const finalIsUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedPartnerId);
        if (!finalIsUUID) {
            console.warn('Resolved Partner ID is still not a valid UUID after all strategies:', resolvedPartnerId);
            resolvedPartnerId = null;
        }

        // --- 2. Detect Country ---
        const detectedCountry = countryCode || 
                               request.headers.get('x-vercel-ip-country') || 
                               request.headers.get('cf-ipcountry') || 
                               null;

        // --- 3. Prepare Lead Data (Compatible with both schemas) ---
        // We collect all fields into notes as a backup so no data is lost
        const extraFields: Record<string, any> = {};
        const standardFields = ['name', 'email', 'whatsapp', 'phone', 'landingSlug', 'partnerId', 'source', 'status', 'notes', 'message'];
        
        Object.keys(body).forEach(key => {
            if (!standardFields.includes(key)) {
                extraFields[key] = body[key];
            }
        });

        const phoneValue = whatsapp || phone || body.whatsapp || body.phone;
        const msgValue = message || notes || body.message || body.notes;
        const finalLandingSlug = landingSlug || body.landingSlug || body.landing_slug;

        const leadData: any = {
            name,
            email,
            landing_slug: finalLandingSlug,
            partner_id: resolvedPartnerId,
            whatsapp: phoneValue,
            source: source || 'direct',
            status: 'registered', // Match DB default in init_production.sql
            notes: `Original Partner ID: ${originalPartnerId} | ${msgValue || ''}${Object.keys(extraFields).length > 0 ? ' | Extras: ' + JSON.stringify(extraFields) : ''}`
        };

        // --- 4. Insert with Fallback logic ---
        console.log('Inserting lead into Supabase:', { email, slug: finalLandingSlug, partner: resolvedPartnerId });
        let { error, data: insertedData } = await supabaseClient.from('leads').insert(leadData).select();

        if (error) {
            console.error('Supabase Insert Error:', error);
            
            // Fallback for column mismatch
            if (error.code === '42703' || error.message?.includes('column')) {
                const prunedData = { ...leadData };
                delete prunedData.phone;
                delete prunedData.message;
                delete prunedData.country;
                
                const { error: retryError, data: retryData } = await supabaseClient.from('leads').insert(prunedData).select();
                error = retryError;
                insertedData = retryData;
            }
        }

        if (error) {
            return NextResponse.json({ 
                success: false, 
                error: 'Database insertion failed',
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint,
                attempted_data: { email, partner_id: resolvedPartnerId, slug: finalLandingSlug },
                diagnostics: {
                    has_admin: !!getSupabaseAdmin(),
                    has_url: !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL),
                    has_key: !!(process.env.SUPABASE_SERVICE_ROLE_KEY)
                }
            }, { status: 500 });
        }

        // --- 5. Webhook Trigger ---
        const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || process.env.WEBHOOK_URL;
        if (webhookUrl) {
            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: 'new_lead',
                    lead: insertedData?.[0] || leadData
                })
            }).catch(err => console.error('Error enviando webhook:', err));
        }
        
        return NextResponse.json({ 
            success: true, 
            message: 'Lead captured successfully',
            lead_id: insertedData?.[0]?.id 
        });
    } catch (e: any) {
        console.error('Critical Catch in /api/leads:', e);
        return NextResponse.json({ 
            success: false, 
            error: 'Internal server error',
            message: e.message || 'Unknown error'
        }, { status: 500 });
    }
}

