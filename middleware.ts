import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // 1. Manejo de Sesión de Supabase (Actualiza cookies y protege /dashboard)
    const supabaseResponse = await updateSession(req);
    
    // Si updateSession devolvió una redirección (ej. de /dashboard a /login), la ejecutamos de inmediato.
    if (supabaseResponse.headers.get('location')) {
        return supabaseResponse;
    }

    // 2. Manejo de Subdominios (Mantenemos la lógica original de afiliados)
    // Get hostname of request (e.g. demo.bridgemarkets.com, foo.localhost:3000)
    const hostname = req.headers.get('host') || 'bridgemarkets.com';

    // We are extracting the subdomain as the affiliate ID
    // e.g. for "BM_10940382.bridgemarkets.com" the subdomain is "BM_10940382"
    const isLocalhost = hostname.includes('localhost');
    const domainParts = hostname.replace(/:\d+$/, '').split('.');

    // Logic to identify if there is a subdomain
    let affiliateId = null;
    if (!isLocalhost && domainParts.length >= 3) {
        affiliateId = domainParts[0];
    } else if (isLocalhost && domainParts.length >= 2) {
        affiliateId = domainParts[0];
    }

    // If there's an affiliate subdomain AND the user isn't on the root portal (Dashboard),
    // we rewrite the request to the dynamic affiliate viewer page.
    if (affiliateId && affiliateId !== 'www' && !url.pathname.startsWith('/dashboard') && !url.pathname.startsWith('/login') && !url.pathname.startsWith('/register')) {
        return NextResponse.rewrite(new URL(`/${affiliateId}${url.pathname}`, req.url));
    }

    // Si no hubo redirección de auth ni de subdominio, devolvemos la respuesta de supabase con las cookies fresquitas
    return supabaseResponse;
}
