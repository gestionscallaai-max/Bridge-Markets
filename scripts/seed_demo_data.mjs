import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Manually parse .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

const TARGET_PARTNER = 'd265f2e1-999f-4007-ae65-ff328e45d649';
const SLUGS = [
    'asd-d265f', 
    'asdasdasdd-d265f', 
    'pro_trading_v1-es-1776186705953', 
    'pro_trading_v1-es-1776186742640'
];

const COUNTRIES = ['MX', 'ES', 'CO', 'AR', 'CL', 'BR', 'PE'];

function getRandomDateWithinLastDays(days) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * days));
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    return date.toISOString();
}

async function seedData() {
    console.log('--- STARTING DEMO SEEDING ---');
    
    // Discover columns
    const { data: leadSample } = await supabase.from('leads').select('*').limit(1);
    const { data: clickSample } = await supabase.from('clicks').select('*').limit(1);
    
    const leadCols = leadSample && leadSample[0] ? Object.keys(leadSample[0]) : ['partner_id', 'name', 'email', 'created_at', 'landing_slug', 'country'];
    const clickCols = clickSample && clickSample[0] ? Object.keys(clickSample[0]) : ['partner_id', 'created_at', 'landing_slug', 'country'];

    const hasLeadCountry = leadCols.includes('country');
    const hasClickCountry = clickCols.includes('country');
    const hasLeadSlug = leadCols.includes('landing_slug') || leadCols.includes('slug');
    const slugKeyLead = leadCols.includes('landing_slug') ? 'landing_slug' : 'slug';
    
    const hasClickSlug = clickCols.includes('landing_slug') || clickCols.includes('slug');
    const slugKeyClick = clickCols.includes('landing_slug') ? 'landing_slug' : 'slug';

    console.log(`Schema Detection: LeadCountry=${hasLeadCountry}, ClickCountry=${hasClickCountry}, LeadSlug=${hasLeadSlug}`);

    // 1. Seed Clicks (~350)
    console.log('Seeding clicks...');
    const clicks = [];
    for (let i = 0; i < 350; i++) {
        const c = {
            partner_id: TARGET_PARTNER,
            created_at: getRandomDateWithinLastDays(7)
        };
        if (hasClickSlug) c[slugKeyClick] = SLUGS[Math.floor(Math.random() * SLUGS.length)];
        if (hasClickCountry) c.country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
        clicks.push(c);
    }
    const { error: cErr } = await supabase.from('clicks').insert(clicks);
    if (cErr) console.error('Click error:', cErr.message);

    // 2. Seed Leads (~65)
    console.log('Seeding leads...');
    const leads = [];
    const names = ['Juan Perez', 'Maria Garcia', 'Carlos Rodriguez', 'Ana Martinez', 'Luis Hernandez', 'Sofia Lopez', 'Diego Ferrero'];
    for (let i = 0; i < 65; i++) {
        const l = {
            partner_id: TARGET_PARTNER,
            name: names[Math.floor(Math.random() * names.length)],
            email: `demo${i}@${Date.now()}.com`,
            status: 'new',
            created_at: getRandomDateWithinLastDays(7)
        };
        if (hasLeadSlug) l[slugKeyLead] = SLUGS[Math.floor(Math.random() * SLUGS.length)];
        if (hasLeadCountry) l.country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
        leads.push(l);
    }
    const { error: lErr } = await supabase.from('leads').insert(leads);
    if (lErr) console.error('Lead error:', lErr.message);

    console.log('--- SEEDING COMPLETED ---');
    console.log(`Report: Inserted 350 clicks and 65 leads for partner ${TARGET_PARTNER}`);
    if (!hasLeadCountry) console.log('WARNING: Column "country" NOT FOUND in leads table. Heatmap will be empty.');
}

seedData();
