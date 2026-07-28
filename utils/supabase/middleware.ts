import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')

  // refresca la sesion si expiro
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;

    // Si intenta ingresar a dashboard, verificar que el perfil partner exista en DB
    if (user && isDashboardRoute) {
      const { data: partner } = await supabase
        .from('partners')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
      
      if (!partner) {
        user = null;
      }
    }
  } catch (err) {
    // Si falla la verificación de sesión (e.g., token inválido, red),
    // tratamos al usuario como no autenticado y dejamos que el route handler lo maneje.
    console.warn('[Middleware] supabase.auth.getUser() failed:', err);
  }

  // Protection logic

  if (isDashboardRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
