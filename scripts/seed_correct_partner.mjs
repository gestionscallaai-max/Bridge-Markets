import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

// ID extracted from user's screenshot
const TARGET_PARTNER = 'b4a6cb3c-54f1-4f6b-bfa2-2aa6aa8db466';

function getRandomDateWithinLastDays(days) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * days));
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    return date.toISOString();
}

async function seedHistory() {
    console.log('--- SEEDING HISTORY FOR CORRECT PARTNER ---');
    
    // 1. Seed Clicks (~350)
    const clicks = [];
    for (let i = 0; i < 350; i++) {
        clicks.push({ 
            partner_id: TARGET_PARTNER, 
            created_at: getRandomDateWithinLastDays(7) 
        });
    }
    const { error: cErr } = await supabase.from('clicks').insert(clicks);
    if (cErr) console.error('Click Error:', cErr.message);
    else console.log('350 Clicks inserted!');

    // 2. Seed Leads (~65)
    const leads = [];
    const names = ['Juan', 'Maria', 'Carlos', 'Ana', 'Luis', 'Sofia', 'Dilan'];
    for (let i = 0; i < 65; i++) {
        leads.push({ 
            partner_id: TARGET_PARTNER, 
            name: names[i % names.length], 
            email: `demo${i}-${Date.now()}@test.com`,
            status: 'registered',
            created_at: getRandomDateWithinLastDays(7) 
        });
    }
    const { error: lErr } = await supabase.from('leads').insert(leads);
    if (lErr) console.error('Lead Error:', lErr.message);
    else console.log('65 Leads inserted!');

    console.log('--- SEEDING COMPLETED ---');
}

seedHistory();
