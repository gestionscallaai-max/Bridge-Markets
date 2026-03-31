import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
    try {
        const { slug, html, data } = await request.json();
        
        // Save to Supabase
        const { error } = await supabase
            .from('landings')
            .upsert({
                slug,
                html,
                data
            });

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
