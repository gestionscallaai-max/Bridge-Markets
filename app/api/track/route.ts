import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const partnerId = searchParams.get('ref');
    const slug = searchParams.get('slug') || 'institucional';
    const source = searchParams.get('source') || 'direct';

    if (!partnerId) {
        return NextResponse.redirect(new URL(`/l/${slug}`, req.url));
    }

    try {
        // En un entorno real, extraeríamos IP y User Agent de los headers
        const ip = req.headers.get('x-forwarded-for') || '0.0.0.0';
        const ua = req.headers.get('user-agent') || 'unknown';
        const referer = req.headers.get('referer') || '';

        // Registrar el clic
        // Nota: partnerId aquí debe ser el UUID de Supabase. 
        // Si usamos el formato BM_XXXX, tendríamos que buscar el UUID primero.
        // Pero para simplicidad en este paso, asumiremos que recibimos el UUID o lo manejamos.
        
        let targetUserId = partnerId;
        if (partnerId.startsWith('BM_')) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('id')
                .eq('partner_id', partnerId)
                .single();
            if (profile) targetUserId = profile.id;
        }

        await supabase.from('clicks').insert({
            partner_id: targetUserId,
            landing_slug: slug,
            ip_address: ip,
            user_agent: ua,
            referer: referer,
            source: source
        });

    } catch (err) {
        console.error('Error tracking click:', err);
    }

    // Redirigir a la landing real
    return NextResponse.redirect(new URL(`/l/${slug}`, req.url));
}
