const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').map(line => line.split('=')).filter(parts => parts.length === 2));

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPartners() {
  const { data, error } = await supabase
    .from('partners')
    .select('id, name, email, role')
    .ilike('name', '%SCALLAAI%');

  if (error) {
    console.error('Error fetching partners:', error);
    return;
  }

  console.log('Partners matching SCALLAAI:', data);
}

checkPartners();
