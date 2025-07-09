/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'img.freepik.com',
      'media.licdn.com',
      'i.imgur.com',
      'images.unsplash.com',
      'vdugazjjowmzppsqadqu.supabase.co', // Dominio de Supabase Storage
      // Agrega aquí otros dominios que necesites
    ],
  },
  // Desactivar ESLint durante la compilación para eliminar advertencias y errores
  eslint: {
    // No verificar ESLint en la compilación
    ignoreDuringBuilds: true,
  },
  // Desactivar comprobación de tipos de TypeScript durante la compilación
  typescript: {
    // No verificar TypeScript en la compilación
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
