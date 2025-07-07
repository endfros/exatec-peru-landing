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
      (_event, _session) => {
        setSession(_session);
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

  // Si no está autenticado, mostrar un mensaje y link de redirección
  if (!session) {
    if (pathname !== '/admin/login') {
      // Si no estamos en la página de login, redirigir
      window.location.href = '/admin/login';
      return null;
    }
    // Si estamos en login, mostrar el contenido normalmente
    return <>{children}</>;
  }

  // Links de navegación para el panel de administrador
  const navLinks = [
    { name: 'Eventos', href: '/admin/eventos' },
    { name: 'Directorio', href: '/admin/directorio' },
    { name: 'Configuración', href: '/admin/configuracion' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-[#0053c7] text-white w-64 fixed h-full">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">EXATEC Perú Admin</h2>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block p-3 rounded-md ${
                    pathname === link.href
                      ? 'bg-white/20 font-semibold'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/70 mb-2 px-3">
              Sesión: {session?.user?.email}
            </p>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/admin/login';
              }}
              className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-md"
            >
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full">
        <header className="bg-white shadow-md">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#0053c7]">
              Panel de Administración
            </h1>
          </div>
        </header>

        <main className="p-6">{children}</main>

        {/* Herramienta de depuración - remover en producción */}
        <SessionChecker />
      </div>
    </div>
  );
}
