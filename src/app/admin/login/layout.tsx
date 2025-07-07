'use client';

import SessionChecker from '@/components/SessionChecker';

// Archivo especial para la página de login para evitar circulares con el layout
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white p-6">
      {children}
      <SessionChecker />
    </div>
  );
}
