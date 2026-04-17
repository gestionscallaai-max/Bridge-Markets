import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

const TARGET_PARTNER = 'd265f2e1-999f-4007-ae65-ff328e45d649';

async function seedMinimal() {
    console.log('--- MINIMAL SEEDING ---');
    
    // Clicks: partner_id, created_at
    const { error: cErr } = await supabase.from('clicks').insert([
        { partner_id: TARGET_PARTNER, created_at: new Date().toISOString() }
    ]);
    if (cErr) console.error('Click Error:', cErr.message);
    else console.log('Click inserted!');

    // Leads: partner_id, name, email, created_at
    const { error: lErr } = await supabase.from('leads').insert([
        { 
            partner_id: TARGET_PARTNER, 
            name: 'Test User', 
            email: `test-${Date.now()}@example.com`,
            created_at: new Date().toISOString() 
        }
    ]);
    if (lErr) console.error('Lead Error:', lErr.message);
    else console.log('Lead inserted!');
}

seedMinimal();
