'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Primero verifiquemos si ya hay una sesión activa
      const {
        data: { session: existingSession },
      } = await supabase.auth.getSession();

      if (existingSession) {
        console.log('Ya hay una sesión activa:', existingSession.user.email);
        router.push('/admin/eventos');
        router.refresh();
        return;
      }

      // 2. Si no hay sesión, intentar iniciar sesión
      console.log('Intentando iniciar sesión con:', email);

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        console.error('Error de inicio de sesión:', signInError);
        setError(signInError.message || 'Credenciales inválidas');
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        console.log('Sesión iniciada correctamente:', data.session.user.email);

        // Esperar un momento para asegurar que las cookies se guarden
        setTimeout(() => {
          // Redireccionar al panel de administración
          router.push('/admin/eventos');
          router.refresh();
        }, 500);
      } else {
        console.error('No se obtuvo sesión después de iniciar sesión');
        setError('No se pudo iniciar sesión');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión');
      setIsLoading(false);
    }
  };

  // Para crear un usuario en Supabase desde la consola (temporalmente)
  const handleCreateUser = async () => {
    if (!email || !password || password.length < 6) {
      setError(
        'Email válido y contraseña de al menos 6 caracteres son requeridos'
      );
      return;
    }

    setIsLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        alert('Usuario creado. Revisa tu correo para confirmar tu cuenta.');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setError('Error al crear usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full px-6 py-12 bg-white rounded-lg shadow-xl border-2 border-[#0053c7]/20">
        <h1 className="text-3xl font-bold text-[#0053c7] text-center mb-8">
          Acceso Administrador
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-[#0053c7] text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border-2 border-[#0053c7]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              placeholder="correo@exatecperu.org"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-[#0053c7] text-sm font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border-2 border-[#0053c7]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#0053c7] text-white font-medium rounded hover:bg-[#003a8c] focus:outline-none focus:ring-2 focus:ring-[#0053c7]/50 transition duration-200 disabled:bg-[#0053c7]/50"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Solo para desarrollo - botón de crear usuario */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500 mb-4">
            Herramienta de desarrollo
          </p>
          <button
            type="button"
            onClick={handleCreateUser}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:opacity-50"
            disabled={isLoading}
          >
            Crear usuario en Supabase
          </button>
        </div>
      </div>
    </div>
  );
}
