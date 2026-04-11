import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role or fallback to the publishable key
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
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
            console.error('Supabase Upsert Error:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
            throw error;
        }

        return NextResponse.json({ success: true, url: `/l/${slug}` });
    } catch (e: any) {
        console.error('Critical API Error:', e.message || e);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to deploy landing page',
            details: e.message || 'Unknown error'
        }, { status: 500 });
    }
}
