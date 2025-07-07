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
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message || 'Credenciales inválidas');
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        // Redireccionar al panel de administración
        router.push('/admin/eventos');
        router.refresh();
      } else {
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
      const { error: signUpError } = await supabase.auth.signUp({
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              required
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0053c7] text-white py-2 px-4 rounded-md hover:bg-[#003a8c] transition focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:ring-opacity-50 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
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
