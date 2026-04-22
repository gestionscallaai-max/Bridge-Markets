
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
    console.error('Missing URL or Key');
    process.exit(1);
}

const supabase = createClient(url, key);

async function check() {
    const slug = 'institutional_mother-es-1776833329816';
    const { data, error } = await supabase
        .from('landings')
        .select('id, slug, status, created_at, updated_at')
        .eq('slug', slug);
    
    console.log('Results for slug:', slug);
    console.log(JSON.stringify(data, null, 2));
    if (error) console.error('Error:', error);
}

check();
