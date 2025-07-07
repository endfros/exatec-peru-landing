'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';
import SessionChecker from '@/components/SessionChecker';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Content>{children}</Content>;
}

function Content({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      } finally {
        setLoading(false);
      }
    }

    checkSession();

    // Escuchar cambios en la sesión
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Cambio en estado de autenticación:', event);
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Si está cargando, mostrar un estado de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-[#0053c7] text-lg">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado y no está en la página de login, mostrar mensaje
  if (!session && pathname !== '/admin/login') {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-600 text-lg mb-4">
          Acceso denegado - Sesión no válida
        </div>
        <Link
          href="/admin/login"
          className="px-4 py-2 bg-[#0053c7] text-white rounded-md hover:bg-[#003a8c] transition"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  // Si está autenticado o está en la página de login, mostrar contenido normal
  return (
    <div className="flex h-screen">
      {session && pathname !== '/admin/login' && (
        <aside className="w-64 bg-[#0053c7] text-white p-5">
          <div className="mb-8">
            <h1 className="text-xl font-bold">EXATEC Perú</h1>
            <h2 className="text-sm opacity-75">Panel de administración</h2>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/eventos"
                  className={`block p-2 rounded hover:bg-white/10 ${
                    pathname === '/admin/eventos'
                      ? 'bg-white/20 font-medium'
                      : ''
                  }`}
                >
                  Eventos
                </Link>
              </li>
              <li>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = '/admin/login';
                  }}
                  className="block w-full text-left p-2 rounded hover:bg-white/10 text-red-200"
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      )}
      <main
        className={`${
          session && pathname !== '/admin/login' ? 'flex-1' : 'w-full'
        } bg-gray-50 overflow-auto`}
      >
        {session && pathname !== '/admin/login' && (
          <div className="p-6 bg-white shadow-md border-b">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                Panel de Administración
              </h1>
              <div className="text-sm text-gray-600">{session.user?.email}</div>
            </div>
          </div>
        )}
        <div className="p-6">{children}</div>
      </main>

      {/* Herramienta de depuración - remover en producción */}
      <SessionChecker />
    </div>
  );
}
