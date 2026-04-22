import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                    process.env.SUPABASE_ANON_KEY || 
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!url || !key) return NextResponse.json({ error: 'No config' }, { status: 500 });

        const supabase = createClient(url, key);

        const { data, error } = await supabase
            .from('landings')
            .select('id, slug, partner_id, status');

        if (error) throw error;

        const report = data.map(l => ({
            slug: l.slug,
            partner_id: l.partner_id,
            isUuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(l.partner_id || ''),
            status: l.status
        }));

        return NextResponse.json({ success: true, report });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
