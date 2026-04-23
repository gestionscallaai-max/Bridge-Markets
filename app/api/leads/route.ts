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
        
        if (partnerId && typeof partnerId === 'string' && partnerId.startsWith('BM_')) {
            try {
                // Try to find the partner in the 'partners' or 'profiles' table
                // Based on init_production.sql, we might need to search by a derived ID or a mapping
                // For now, we try a direct query on partners if they have a partner_id column, 
                // or we use the 'profiles' table if it exists.
                const { data: partnerData, error: pError } = await supabaseClient
                    .from('partners')
                    .select('id')
                    .or(`id.eq.${partnerId.replace('BM_', '')},name.ilike.%${partnerId}%`) // Extreme fallback
                    .single();

                if (partnerData) {
                    resolvedPartnerId = partnerData.id;
                } else {
                    // Try profiles table (from 001_create_tables.sql)
                    const { data: profileData } = await supabaseClient
                        .from('profiles')
                        .select('id')
                        .eq('partner_id', partnerId)
                        .single();
                    if (profileData) resolvedPartnerId = profileData.id;
                }
            } catch (pErr) {
                console.error('Error resolving partner ID:', pErr);
            }
        }

        // --- 2. Detect Country ---
        const detectedCountry = countryCode || 
                               request.headers.get('x-vercel-ip-country') || 
                               request.headers.get('cf-ipcountry') || 
                               null;

        // --- 3. Prepare Lead Data (Compatible with both schemas) ---
        const leadData: any = {
            name,
            email,
            landing_slug: landingSlug,
            partner_id: resolvedPartnerId,
            country: detectedCountry,
            source: source || 'direct',
            status: 'new'
        };

        // Handle phone/whatsapp field mapping
        const phoneValue = whatsapp || phone;
        if (phoneValue) {
            // We'll set both to be safe if the DB has one or the other
            // Supabase ignore columns that don't exist in some cases, but usually it errors.
            // So we try to be precise based on what we saw in the files.
            leadData.whatsapp = phoneValue;
            leadData.phone = phoneValue;
        }

        // Handle message/notes mapping
        const msgValue = message || notes;
        if (msgValue) {
            leadData.message = msgValue;
            leadData.notes = msgValue;
        }

        // --- 4. Insert with Fallback logic ---
        // We try a clean insert. If it fails because of a missing column, we'll prune and retry.
        let { error } = await supabaseClient.from('leads').insert(leadData);

        if (error && error.code === 'PGRST204') { // Column not found
            console.warn('Column mismatch detected, pruning leadData and retrying...');
            // Prune known problematic columns and retry
            const prunedData = { ...leadData };
            if (error.message.includes('whatsapp')) delete prunedData.whatsapp;
            if (error.message.includes('phone')) delete prunedData.phone;
            if (error.message.includes('message')) delete prunedData.message;
            if (error.message.includes('notes')) delete prunedData.notes;
            
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

