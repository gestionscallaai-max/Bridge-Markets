import { createClient } from '@supabase/supabase-js';

async function checkLandings() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!url || !key) {
        console.error('Missing config');
        return;
    }

    const supabase = createClient(url, key);

    const { data, error } = await supabase
        .from('landings')
        .select('id, slug, partner_id, status')
        .eq('status', 'pending');

    if (error) {
        console.error('Fetch error:', error);
        return;
    }

    console.log('--- PENDING LANDINGS INSPECTION ---');
    data.forEach(l => {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(l.partner_id || '');
        console.log(`Slug: ${l.slug} | PartnerID: ${l.partner_id} | Valid UUID: ${isUuid}`);
    });
}

checkLandings();
