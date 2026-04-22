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
        const { name, email, whatsapp, phone, landingSlug, partnerId, clickId, countryCode, source } = body;

        if (!name || !email) {
            return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
        }

        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) {
            console.error('Supabase Admin client not initialized');
            return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
        }

        // Detectar país desde headers si no viene en el body
        const detectedCountry = countryCode || 
                               request.headers.get('x-vercel-ip-country') || 
                               request.headers.get('cf-ipcountry') || 
                               null;

        // 1. Guardar el Lead en Supabase usando Admin para bypass RLS
        const { error } = await supabaseAdmin
            .from('leads')
            .insert({
                name,
                email,
                whatsapp: whatsapp || phone,
                landing_slug: landingSlug,
                partner_id: partnerId,
                click_id: clickId || null,
                country: detectedCountry,
                source: source || 'direct'
            });

        if (error) {
            console.error('Error insertando lead en Supabase:', error);
            throw error;
        }

        // 2. Disparo de Webhook (si está configurado)
        const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || process.env.WEBHOOK_URL;
        if (webhookUrl) {
            try {
                // Hacemos el fetch sin hacer await para no bloquear la respuesta al cliente
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: 'new_lead',
                        lead: { name, email, whatsapp, landingSlug, partnerId }
                    })
                }).catch(err => console.error('Error enviando webhook:', err));
            } catch (err) {
                console.error('Error interno disparando webhook:', err);
            }
        }
        
        return NextResponse.json({ success: true, message: 'Lead captured successfully' });
    } catch (e) {
        console.error('Error al capturar lead:', e);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
