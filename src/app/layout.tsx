import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ClientAuthProvider from '../components/ClientAuthProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Los metadatos se importan desde metadata.ts

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ClientAuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientAuthProvider>
      </body>
    </html>
  );
}
