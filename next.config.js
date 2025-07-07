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
};

module.exports = nextConfig;
