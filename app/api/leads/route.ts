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
        
        if (partnerId && typeof partnerId === 'string' && partnerId.startsWith('BM_')) {
            try {
                // Use 'partners' table instead of 'profiles'
                const { data: partnerData } = await supabaseClient
                    .from('partners')
                    .select('id')
                    .eq('partner_id', partnerId)
                    .single();
                
                if (partnerData) {
                    resolvedPartnerId = partnerData.id;
                } else {
                    console.warn(`Could not resolve partner_id ${partnerId} to a UUID.`);
                }
            } catch (pErr) {
                console.error('Error resolving partner ID:', pErr);
            }
        }

        // Final check: if resolvedPartnerId is NOT a UUID, we must NOT put it in the partner_id column
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedPartnerId);
        if (!isUUID) {
            console.warn('Resolved Partner ID is not a valid UUID:', resolvedPartnerId);
            resolvedPartnerId = null; // Prevent DB error
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

        const leadData: any = {
            name,
            email,
            landing_slug: landingSlug || body.landingSlug,
            partner_id: resolvedPartnerId,
            whatsapp: phoneValue,
            source: source || 'direct',
            status: 'new',
            notes: `Original Partner ID: ${originalPartnerId} | ${msgValue || ''}${Object.keys(extraFields).length > 0 ? ' | Extras: ' + JSON.stringify(extraFields) : ''}`
        };

        // --- 4. Insert with Fallback logic ---
        // We try a clean insert. If it fails because of a missing column, we'll prune and retry.
        // The correct Postgres error code for "Undefined Column" is '42703'.
        let { error } = await supabaseClient.from('leads').insert(leadData);

        if (error && (error.code === '42703' || error.message?.includes('column'))) {
            console.warn('Column mismatch detected, pruning leadData and retrying...');
            // Prune known problematic columns and retry based on 001_create_tables.sql
            const prunedData = { ...leadData };
            
            // Remove columns that ARE NOT in the migration 001
            delete prunedData.phone;
            delete prunedData.message;
            delete prunedData.country; // Migration 001 doesn't have country in leads table!
            
            const { error: retryError } = await supabaseClient.from('leads').insert(prunedData);
            error = retryError;
        }

        if (error) {
            console.error('Error insertando lead en Supabase:', error);
            return NextResponse.json({ 
                success: false, 
                error: error.message,
                details: error.details,
                hint: error.hint
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
                    lead: { name, email, phone: phoneValue, landingSlug, partnerId: resolvedPartnerId }
                })
            }).catch(err => console.error('Error enviando webhook:', err));
        }
        
        return NextResponse.json({ success: true, message: 'Lead captured successfully' });
    } catch (e: any) {
        console.error('Error al capturar lead:', e);
        return NextResponse.json({ 
            success: false, 
            error: e.message || 'Internal server error' 
        }, { status: 500 });
    }
}

