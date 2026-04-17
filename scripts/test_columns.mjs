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
const SLUGS = ['asd-d265f', 'pro_trading_v1-es-1776186705953'];

async function testColumns() {
    console.log('--- TEST COLUMNS ---');
    
    // Test landing_slug vs slug
    const { error: err1 } = await supabase.from('leads').insert([{ 
        partner_id: TARGET_PARTNER, 
        name: 'ColTest', 
        email: 'col@test.com', 
        landing_slug: SLUGS[0] 
    }]);
    if (err1) console.log('landing_slug failed:', err1.message);
    else console.log('landing_slug WORKS!');

    const { error: err2 } = await supabase.from('leads').insert([{ 
        partner_id: TARGET_PARTNER, 
        name: 'ColTest2', 
        email: 'col2@test.com', 
        slug: SLUGS[0] 
    }]);
    if (err2) console.log('slug failed:', err2.message);
    else console.log('slug WORKS!');

    // Test country
    const { error: err3 } = await supabase.from('leads').insert([{ 
        partner_id: TARGET_PARTNER, 
        name: 'ColTest3', 
        email: 'col3@test.com', 
        country: 'MX' 
    }]);
    if (err3) console.log('country failed:', err3.message);
    else console.log('country WORKS!');
}

testColumns();
