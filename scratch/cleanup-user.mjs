import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Cargar .env.local manualmente
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0]?.trim();
      const val = parts.slice(1).join('=').trim();
      if (key && val) {
        process.env[key] = val;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const targetEmail = process.argv[2] || 'gestion.scallaai@gmail.com';

async function main() {
  console.log(`🔍 Buscando usuario "${targetEmail}" en Supabase Auth y tabla public.partners...`);

  // 1. Buscar en auth.users
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    console.error('❌ Error al consultar auth.users:', listError);
  } else {
    const matching = users.filter(u => u.email?.toLowerCase() === targetEmail.toLowerCase());
    if (matching.length === 0) {
      console.log(`ℹ️ No se encontró ninguna cuenta con el email "${targetEmail}" en Supabase Auth (auth.users).`);
    } else {
      for (const u of matching) {
        console.log(`⚙️ Eliminando de auth.users -> ID: ${u.id}, Email: ${u.email}`);
        const { error: delErr } = await supabase.auth.admin.deleteUser(u.id);
        if (delErr) {
          console.error(`❌ Error al eliminar de auth.users (${u.id}):`, delErr.message);
        } else {
          console.log(`✅ Usuario ${u.email} (ID: ${u.id}) eliminado correctamente de Supabase Auth.`);
        }
      }
    }
  }

  // 2. Buscar/Eliminar en public.partners
  const { data: deletedPartners, error: partnerErr } = await supabase
    .from('partners')
    .delete()
    .eq('email', targetEmail)
    .select();

  if (partnerErr) {
    console.error('❌ Error al eliminar de public.partners:', partnerErr.message);
  } else {
    console.log(`✅ Registros eliminados de public.partners:`, deletedPartners.length);
  }

  console.log('🎉 Limpieza completada. Ahora puedes volver a registrar la cuenta con el mismo correo.');
}

main();
