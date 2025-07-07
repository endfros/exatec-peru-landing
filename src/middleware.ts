import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Rutas protegidas de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      // Verificar si ya hay una sesión activa
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Si ya hay una sesión, redirigir al dashboard
      if (session) {
        const redirectUrl = new URL('/admin/eventos', request.url);
        return NextResponse.redirect(redirectUrl);
      }

      // Si no hay sesión, permitir acceso a la página de login
      return response;
    }

    // Para otras rutas de admin, verificar la sesión
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Si no hay sesión, redirigir a login
    if (!session) {
      console.log('No hay sesión activa, redirigiendo a login');
      const redirectUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Debug info: tenemos sesión válida
    console.log('Sesión válida detectada para:', session.user?.email);
  }

  return response;
}

export const config = {
  matcher: ['/admin/((?!login).*)'],
};

/* 
// Implementación original que será restaurada cuando solucionemos los problemas de hidratación
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/admin/((?!login).*)'],
};
*/
