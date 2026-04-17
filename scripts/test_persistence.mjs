import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

const TARGET_PARTNER = 'b4a6cb3c-54f1-4f6b-bfa2-2aa6aa8db466';

async function testPersistence() {
    console.log('--- PERSISTENCE TEST ---');
    
    const email = `test-${Date.now()}@example.com`;
    const { data: insData, error: insErr } = await supabase.from('leads').insert([
        { partner_id: TARGET_PARTNER, name: 'Persistence Test', email }
    ]).select();

    if (insErr) {
        console.error('INSERT ERROR:', insErr.message);
        return;
    }
    console.log('Inserted row:', JSON.stringify(insData, null, 2));

    // Wait 1 second
    await new Promise(r => setTimeout(r, 1000));

    // Try to select it
    const { data: selData, error: selErr } = await supabase.from('leads').select('*').eq('email', email);
    if (selErr) console.error('SELECT ERROR:', selErr.message);
    else console.log('Selected row count:', selData.length);
}

testPersistence();
