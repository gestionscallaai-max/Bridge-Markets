import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role to look up the profile server-side
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
        const { slug, html, data } = await request.json();

        // Resolve the real partner_id from the profiles table
        let realPartnerId = data.partnerId;
        if (data.userId) {
            const { data: profile } = await supabaseAdmin
                .from('profiles')
                .select('partner_id')
                .eq('id', data.userId)
                .single();
            if (profile?.partner_id) realPartnerId = profile.partner_id;
        }

        const { error } = await supabaseAdmin
            .from('landings')
            .upsert({
                slug,
                html,
                full_name: data.fullName,
                country: data.country,
                language: data.language,
                whatsapp: data.whatsapp,
                email: data.email,
                landing_type: data.landingType,
                partner_id: realPartnerId,
            }, { onConflict: 'slug' });

        if (error) {
            console.error('Supabase Error:', error);
            throw error;
        }

        return NextResponse.json({ success: true, url: `/l/${slug}` });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Failed to deploy landing page' }, { status: 500 });
    }
}
