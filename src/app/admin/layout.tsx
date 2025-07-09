'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Content>{children}</Content>;
}

function Content({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  // Si está cargando, mostrar un estado de carga
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-[#0053c7] text-lg">Cargando...</div>
      </div>
    );
  }
  
  // Si no está autenticado, mostrar un mensaje y link de redirección
  if (status === 'unauthenticated') {
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
              Sesión: {session?.user?.name}
            </p>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
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
      </div>
    </div>
  );
}
