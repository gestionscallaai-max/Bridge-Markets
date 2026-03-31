import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, whatsapp, landingSlug, partnerId } = body;

        if (!name || !email) {
            return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
        }

        // 1. Guardar el Lead en Supabase
        const { error } = await supabase
            .from('leads')
            .insert({
                name,
                email,
                whatsapp,
                landing_slug: landingSlug,
                partner_id: partnerId
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
