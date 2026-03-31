import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestAccount() {
  const email = 'dilan@bridgemarkets.com';
  const password = 'Partner2026!';
  
  console.log('Intentando crear usuario en Supabase...');
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: 'Dilan Partner',
      }
    }
  });

  if (error) {
    console.error('Error creando cuenta:', error.message);
  } else {
    console.log('¡Cuenta creada exitosamente!');
    console.log('Email:', email);
    console.log('Password:', password);
  }
}

createTestAccount();
