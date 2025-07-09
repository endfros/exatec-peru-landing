// Este middleware está temporalmente desactivado mientras solucionamos problemas de hidratación
// Implementaremos protección de rutas directamente en los componentes admin por ahora

// Exportamos una función middleware vacía para satisfacer el requisito de Next.js
export function middleware() {
  // No hacer nada, la protección se implementa a nivel de componente
  return;
}

// Configuramos el matcher para que no afecte ninguna ruta por ahora
export const config = {
  matcher: [],
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
