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

function getRandomDateWithinLastDays(days) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * days));
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    return date.toISOString();
}

async function seedHistory() {
    console.log('--- SEEDING HISTORY (MINIMAL) ---');
    
    const clicks = [];
    for (let i = 0; i < 200; i++) {
        clicks.push({ partner_id: TARGET_PARTNER, created_at: getRandomDateWithinLastDays(7) });
    }
    
    const { error: cErr } = await supabase.from('clicks').insert(clicks);
    if (cErr) console.error('Click Error:', cErr.message);
    else console.log('200 Clicks inserted!');

    const leads = [];
    const names = ['Juan', 'Maria', 'Carlos', 'Ana', 'Luis', 'Sofia'];
    for (let i = 0; i < 40; i++) {
        leads.push({ 
            partner_id: TARGET_PARTNER, 
            name: names[i % names.length] + ' Demo', 
            email: `demo-${i}-${Date.now()}@example.com`,
            created_at: getRandomDateWithinLastDays(7) 
        });
    }
    const { error: lErr } = await supabase.from('leads').insert(leads);
    if (lErr) console.error('Lead Error:', lErr.message);
    else console.log('40 Leads inserted!');
}

seedHistory();
