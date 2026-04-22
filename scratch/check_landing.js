    
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
const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
    console.error('Missing URL or Key in .env.local');
    process.exit(1);
}

const supabase = createClient(url, key);

async function check() {
    const slug = 'institutional_mother-es-1776869703896';
    const { data, error } = await supabase
        .from('landings')
        .select('id, slug, status, created_at')
        .eq('slug', slug);
    
    console.log('Results for slug:', slug);
    console.log(JSON.stringify(data, null, 2));
    if (error) console.error('Error:', error);
}

check();
