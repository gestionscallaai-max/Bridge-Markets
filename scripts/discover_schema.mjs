import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

async function discover() {
    console.log('--- TABLE DISCOVERY ---');
    const { data: clicks, error: cErr } = await supabase.from('clicks').select('*').limit(1);
    if (cErr) console.error('Clicks fetch error:', cErr.message);
    else console.log('Clicks first record columns:', Object.keys(clicks[0] || {}));

    const { data: leads, error: lErr } = await supabase.from('leads').select('*').limit(1);
    if (lErr) console.error('Leads fetch error:', lErr.message);
    else console.log('Leads first record columns:', Object.keys(leads[0] || {}));
}

discover();
