import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;

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
    if (affiliateId && affiliateId !== 'www') {
        return NextResponse.rewrite(new URL(`/${affiliateId}${url.pathname}`, req.url));
    }

    return NextResponse.next();
}
