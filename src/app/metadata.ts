import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EXATEC Perú - Comunidad de Exalumnos del Tecnológico de Monterrey',
  description:
    'La comunidad de exalumnos del Tecnológico de Monterrey en Perú que conecta talento y oportunidades.',
  icons: {
    icon: [
      { url: '/tec_logo.png', sizes: '32x32' },
      { url: '/tec_logo.png', sizes: '16x16' },
    ],
    apple: [{ url: '/tec_logo.png' }],
    shortcut: ['/tec_logo.png'],
  },
  manifest: '/manifest.json',
};
