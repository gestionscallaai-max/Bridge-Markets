import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
    
    const { data, error } = await supabase
        .from('landings')
        .select('html, status')
        .eq('slug', slug)
        .single();
    
    if (error) {
        console.error('Database error fetching landing:', error);
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }

    if (!data) {
        console.warn(`Landing not found for slug: ${slug}`);
        return new NextResponse('Landing Not Found', { status: 404 });
    }

    // ─── Click Tracking Logic ───
    try {
        const { searchParams } = new URL(request.url);
        const ref = searchParams.get('ref');
        
        if (ref) {
            let targetUserId = ref;
            // Si es un partner_id (BM_XXX), buscar el UUID
            if (ref.startsWith('BM_')) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('partner_id', ref)
                    .single();
                if (profile) targetUserId = profile.id;
            }

            const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
            const ua = request.headers.get('user-agent') || 'unknown';
            const referer = request.headers.get('referer') || '';
            const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || null;

            // Guardar el clic de forma asíncrona para no retrasar la carga de la página
            supabase.from('clicks').insert({
                partner_id: targetUserId,
                landing_slug: slug,
                ip_address: ip,
                user_agent: ua,
                referer: referer,
                source: searchParams.get('source') || 'direct',
                country: country
            }).then(({ error }) => {
                if (error) console.error('Error tracking click in /l/[slug]:', error);
            });
        }
    } catch (e) {
        console.error('Error in click tracking:', e);
    }
    // ───────────────────────────

    const isValidStatus = data.status === 'approved' || data.status === 'active';
    
    if (!isValidStatus) {
        return new NextResponse(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Página en Revisión | Bridge Markets</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
                <style>body { font-family: 'Inter', sans-serif; }</style>
            </head>
            <body class="bg-[#f8fafc] min-h-screen flex items-center justify-center p-6 text-slate-800">
                <div class="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl shadow-indigo-500/10 border border-slate-100 text-center">
                    <div class="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                        <svg class="w-10 h-10 text-[#865BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h1 class="text-2xl font-black mb-4">Página en Revisión</h1>
                    <p class="text-slate-500 text-sm leading-relaxed mb-8">
                        Esta landing page está siendo verificada por nuestro equipo de seguridad para garantizar que cumple con los estándares de la red. Estará disponible en breve.
                    </p>
                    <div class="h-1 w-24 bg-indigo-100 mx-auto rounded-full mb-8">
                        <div class="h-full bg-[#865BFF] rounded-full w-1/3 animate-[spin_3s_linear_infinite]"></div>
                    </div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-[#865BFF]/60 cursor-default">
                        Bridge Markets Security
                    </p>
                </div>
            </body>
            </html>
        `, { 
            status: 403,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }
    
    return new NextResponse(data.html, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    });
}
