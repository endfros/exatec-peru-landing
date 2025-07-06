import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendario de Eventos | EXATEC Perú',
  description: 'Descubre los próximos eventos de la comunidad EXATEC en Perú.',
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
