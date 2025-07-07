'use client';

import { SessionProvider } from 'next-auth/react';

// Este componente DEBE ser marcado como 'use client' para que la sesión
// sea manejada por el cliente y evitar errores de hidratación
export default function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
