'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Credenciales inválidas');
        setIsLoading(false);
        return;
      }

      // Redireccionar al panel de administración
      router.push('/admin/eventos');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión');
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
      </div>
    </div>
  );
}
