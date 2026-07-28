import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const cookieStore = cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        try {
                            cookieStore.set({ name, value, ...options });
                        } catch (error) {}
                    },
                    remove(name: string, options: CookieOptions) {
                        try {
                            cookieStore.set({ name, value: '', ...options });
                        } catch (error) {}
                    },
                },
            }
        );

        // 1. Verificar autenticación del usuario solicitante
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        // 2. Verificar que el usuario sea Admin en public.partners
        const { data: adminPartner, error: partnerErr } = await supabase
            .from('partners')
            .select('role')
            .eq('id', user.id)
            .single();

        if (partnerErr || !adminPartner || adminPartner.role !== 'admin') {
            return NextResponse.json({ error: 'Acceso denegado. Permisos de administrador requeridos.' }, { status: 403 });
        }

        // 3. Extraer partnerId a eliminar
        const body = await request.json();
        const { partnerId } = body;

        if (!partnerId) {
            return NextResponse.json({ error: 'partnerId es requerido' }, { status: 400 });
        }

        // Evitar que el admin se elimine a sí mismo mediante la API sin confirmación previa
        if (partnerId === user.id) {
            return NextResponse.json({ error: 'No puedes eliminar tu propia cuenta de administrador.' }, { status: 400 });
        }

        // 4. Instanciar cliente con Service Role para eliminar de auth.users y partners
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!serviceRoleKey) {
            return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY no está configurado en el servidor.' }, { status: 500 });
        }

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceRoleKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false,
                },
            }
        );

        // Borrar el perfil en public.partners por si acaso
        await supabaseAdmin.from('partners').delete().eq('id', partnerId);

        // Borrar la cuenta en auth.users de Supabase Auth
        const { error: deleteAuthErr } = await supabaseAdmin.auth.admin.deleteUser(partnerId);

        if (deleteAuthErr) {
            console.error('[API Delete Partner] Error al eliminar usuario en auth.users:', deleteAuthErr);
            return NextResponse.json({ error: deleteAuthErr.message || 'Error al eliminar usuario de la autenticación.' }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Partner eliminado exitosamente de la base de datos y autenticación.' 
        });

    } catch (err: any) {
        console.error('[API Delete Partner Exception]:', err);
        return NextResponse.json({ error: err?.message || 'Error interno del servidor.' }, { status: 500 });
    }
}
