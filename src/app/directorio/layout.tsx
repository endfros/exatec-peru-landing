import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Directorio Empresarial | EXATEC Perú',
  description:
    'Conecta con profesionales EXATEC en diversos sectores y regiones de Perú.',
};

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
