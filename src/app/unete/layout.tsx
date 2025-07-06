import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Únete a EXATEC Perú | EXATEC Perú',
  description:
    'Forma parte de la comunidad de exalumnos del Tecnológico de Monterrey en Perú.',
};

export default function JoinUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
