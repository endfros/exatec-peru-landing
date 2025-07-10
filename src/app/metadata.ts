import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EXATEC Perú',
  description:
    'La comunidad de exalumnos del Tecnológico de Monterrey en Perú que conecta talento y oportunidades.',
  icons: {
    icon: '/favicon.ico',
    apple: '/app-icon.png',
    shortcut: '/app-icon.png'
  },
  manifest: '/manifest.json',
  
  // Metadatos para redes sociales (Open Graph)
  openGraph: {
    type: 'website',
    title: 'EXATEC Perú',
    description: 'Comunidad de Exalumnos del Tecnológico de Monterrey en Perú',
    siteName: 'EXATEC Perú',
    url: 'https://exatec-peru.org',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EXATEC Perú Logo'
      }
    ]
  },
  
  // Metadatos para Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'EXATEC Perú',
    description: 'Comunidad de Exalumnos del Tecnológico de Monterrey en Perú',
    images: ['/images/og-image.jpg']
  },
  
  // Colores para el tema
  themeColor: '#0053c7'
};
