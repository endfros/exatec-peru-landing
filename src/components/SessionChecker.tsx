'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

export default function SessionChecker() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        Verificando sesión...
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-xs z-50">
      <h3 className="font-bold mb-2">Estado de Sesión</h3>
      {session ? (
        <div>
          <p className="text-green-400">✓ Sesión Activa</p>
          <p className="text-sm truncate">Usuario: {session.user?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <p className="text-red-400">✗ Sin Sesión</p>
      )}
    </div>
  );
}
