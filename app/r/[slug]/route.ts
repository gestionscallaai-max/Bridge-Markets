import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
        throw new Error('Supabase environments missing');
    }
    return createClient(url, key);
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
    const referer = request.headers.get('referer') || '';
    const userAgent = request.headers.get('user-agent') || '';

    const supabaseAdmin = getSupabaseAdmin();

    // Lookup the referral link by slug
    const { data: link } = await supabaseAdmin
        .from('referral_links')
        .select('id, partner_id, url')
        .eq('slug', slug)
        .single();

    if (!link) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Record the click asynchronously (don't block the redirect)
    supabaseAdmin.from('clicks').insert({
        link_id: link.id,
        partner_id: link.partner_id,
        ip_address: request.headers.get('x-forwarded-for') || '',
        user_agent: userAgent,
        referer,
    }).then(() => {});

    // Redirect to the main registration/landing page (or the URL defined on the link)
    const destinationBase = process.env.NEXT_PUBLIC_REGISTER_URL || '/register';
    const destinationUrl = new URL(destinationBase, request.url);
    
    // Add attribution params
    destinationUrl.searchParams.set('partner_id', link.partner_id);
    destinationUrl.searchParams.set('slug', slug);
    
    return NextResponse.redirect(destinationUrl);
}
