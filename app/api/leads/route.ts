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
        const { name, email, whatsapp, phone, landingSlug, partnerId, clickId, countryCode, source, message } = body;

        if (!name || !email) {
            return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
        }

        let supabaseClient = getSupabaseAdmin();
        const isAdmin = !!supabaseClient;
        
        if (!supabaseClient) {
            console.warn('Supabase Admin client not initialized (Service Role Key missing). Falling back to standard client.');
            supabaseClient = supabase;
        }

        // Detectar país desde headers si no viene en el body
        const detectedCountry = countryCode || 
                               request.headers.get('x-vercel-ip-country') || 
                               request.headers.get('cf-ipcountry') || 
                               null;

        // 1. Guardar el Lead en Supabase
        const leadData: any = {
            name,
            email,
            whatsapp: whatsapp || phone,
            landing_slug: landingSlug,
            partner_id: partnerId,
            country: detectedCountry,
            source: source || 'direct',
            message: message || null
        };

        // NOTA: click_id es opcional. Si la columna no existe en la DB (error PGRST204),
        // el insert fallará si se incluye. Solo lo activamos si estamos seguros de que existe.
        // if (clickId) leadData.click_id = clickId; 

        const { error } = await supabaseClient
            .from('leads')
            .insert(leadData);

        if (error) {
            console.error('Error insertando lead en Supabase:', error);
            return NextResponse.json({ 
                success: false, 
                error: error.message,
                details: error.details,
                hint: error.hint
            }, { status: 500 });
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
    } catch (e: any) {
        console.error('Error al capturar lead:', e);
        return NextResponse.json({ 
            success: false, 
            error: e.message || 'Internal server error' 
        }, { status: 500 });
    }
}
