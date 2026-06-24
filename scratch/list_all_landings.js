const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.join('=').trim();
    }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!url || !key) {
    console.error('Missing URL or Key in .env.local');
    process.exit(1);
}

const supabase = createClient(url, key);

async function listAll() {
    const { data, error } = await supabase
        .from('landings')
        .select('id, slug, status, landing_type, language, partner_id, created_at')
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching landings:', error);
        return;
    }
    
    console.log(`TOTAL LANDINGS IN DATABASE: ${data.length}\n`);
    data.forEach((l, idx) => {
        console.log(`${idx + 1}. SLUG: ${l.slug} | TYPE: ${l.landing_type} | LANG: ${l.language} | STATUS: ${l.status} | PARTNER: ${l.partner_id} | CREATED: ${l.created_at}`);
    });
}

listAll();
