import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Lazy initialization of the admin client to avoid build-time errors
let _supabaseAdmin: any = null;
const getSupabaseAdmin = () => {
    if (_supabaseAdmin) return _supabaseAdmin;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    
    if (!url || !key) {
        return null;
    }
    
    _supabaseAdmin = createClient(url, key);
    return _supabaseAdmin;
};

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
    
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
        console.error('Supabase Admin Client could not be initialized (missing keys)');
        return new NextResponse('Server Configuration Error', { status: 500 });
    }

    const { data, error } = await supabaseAdmin
        .from('landings')
        .select('id, html, status, partner_id')
        .eq('slug', slug)
        .single();
    
    if (error) {
        console.error(`Database error fetching landing [${slug}]:`, error.message);
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }

    if (!data) {
        return new NextResponse('Landing Not Found', { status: 404 });
    }

    // ─── Click Tracking Logic ───
    try {
        const { searchParams } = new URL(request.url);
        const ref = searchParams.get('ref');
        
        if (ref) {
            let targetUserId = ref;
            if (ref.startsWith('BM_')) {
                const { data: profile } = await supabaseAdmin
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

            supabaseAdmin.from('clicks').insert({
                partner_id: targetUserId,
                landing_slug: slug,
                ip_address: ip,
                user_agent: ua,
                referer: referer,
                source: searchParams.get('source') || 'direct',
                country: country
            }).then((result: any) => {
                if (result.error) console.error('Error tracking click:', result.error);
            });
        }
    } catch (e: any) {
        console.error('Error in click tracking:', e);
    }

    // ─── Status Control Logic ───
    if (!data || !data.html) {
        return renderBlockPage('Landing no encontrada', 'El enlace que intentas visitar no existe o aún no ha sido procesado por el sistema.', 'rose', slug);
    }

    // Priority: Approved status
    if (data.status === 'approved') {
        return new NextResponse(data.html, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }

    // Block logic for other statuses
    if (data.status === 'pending') {
        return renderBlockPage('Página en Revisión', 'Esta landing page está siendo verificada por nuestro equipo de seguridad para garantizar que cumple con los estándares de Bridge Markets.', 'amber', slug);
    }

    if (data.status === 'rejected') {
        return renderBlockPage('Acción Requerida', 'Esta página requiere correcciones antes de ser publicada. Por favor, revisa tu panel de socio para ver las observaciones.', 'rose', slug);
    }

    return renderBlockPage('Acceso Restringido', `Esta página no está disponible en este momento.`, 'slate', slug);
}

function renderBlockPage(title: string, message: string, color: 'rose' | 'amber' | 'slate' | 'indigo', slug: string) {
    const colors = {
        rose: { bg: 'bg-rose-50', text: 'text-rose-500', border: 'border-rose-100', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-500', border: 'border-amber-100', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>' },
        slate: { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-100', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>' },
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-500', border: 'border-indigo-100', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>' }
    };

    const c = colors[color] || colors.slate;

    return new NextResponse(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} | Bridge Markets</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
            <style>body { font-family: 'Inter', sans-serif; }</style>
        </head>
        <body class="bg-[#f8fafc] min-h-screen flex items-center justify-center p-6 text-slate-800">
            <div class="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl shadow-indigo-500/10 border border-slate-100 text-center">
                <div class="w-20 h-20 ${c.bg} rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <svg class="w-10 h-10 ${c.text}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${c.icon}
                    </svg>
                </div>
                <h1 class="text-2xl font-black mb-4">${title}</h1>
                <p class="text-slate-500 text-sm leading-relaxed mb-8">
                    ${message}
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
        status: color === 'rose' ? 403 : 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
}
