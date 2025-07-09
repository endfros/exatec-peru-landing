'use client';

import { useState } from 'react';

// Sample directory data
const directoryData = [
  {
    id: 1,
    name: 'Laura Fuentes Méndez',
    graduation: 'Relaciones Internacionales, 2018',
    company: 'Global Trading Peru S.A.C.',
    position: 'Gerente de Comercio Exterior',
    sector: 'comercio',
    location: 'Lima',
    email: 'laura.fuentes@example.com',
    linkedin: 'https://linkedin.com/in/laurafuentes',
    bio: 'Especialista en negociaciones internacionales con experiencia en mercados asiáticos y norteamericanos.',
    image: '/placeholder.jpg',
  },
  {
    id: 2,
    name: 'Carlos Mendoza Ruiz',
    graduation: 'Administración de Empresas, 2012',
    company: 'Finanzas Inteligentes',
    position: 'Fundador & CEO',
    sector: 'finanzas',
    location: 'Lima',
    email: 'carlos.mendoza@example.com',
    linkedin: 'https://linkedin.com/in/carlosmendoza',
    bio: 'Emprendedor en serie con foco en innovación financiera y fintech.',
    image: '/placeholder.jpg',
  },
  {
    id: 3,
    name: 'Ana García Velásquez',
    graduation: 'Ingeniería Industrial, 2015',
    company: 'Manufacturas del Perú',
    position: 'Directora de Operaciones',
    sector: 'manufactura',
    location: 'Arequipa',
    email: 'ana.garcia@example.com',
    linkedin: 'https://linkedin.com/in/anagarcia',
    bio: 'Ingeniera con enfoque en optimización de procesos y gestión de la calidad.',
    image: '/placeholder.jpg',
  },
  {
    id: 4,
    name: 'Roberto Palacios Torres',
    graduation: 'Marketing, 2015',
    company: 'EventosPro',
    position: 'Fundador & Director Creativo',
    sector: 'marketing',
    location: 'Lima',
    email: 'roberto.palacios@example.com',
    linkedin: 'https://linkedin.com/in/robertopalacios',
    bio: 'Creativo especializado en marketing de experiencias y organización de eventos corporativos.',
    image: '/placeholder.jpg',
  },
  {
    id: 5,
    name: 'Patricia Luna Vega',
    graduation: 'Contabilidad y Finanzas, 2009',
    company: 'Luna & Asociados',
    position: 'Socia Principal',
    sector: 'finanzas',
    location: 'Lima',
    email: 'patricia.luna@example.com',
    linkedin: 'https://linkedin.com/in/patricialuna',
    bio: 'Experta en consultoría contable y financiera para empresas de mediano tamaño.',
    image: '/placeholder.jpg',
  },
  {
    id: 6,
    name: 'Diego Flores Herrera',
    graduation: 'Ingeniería en Sistemas, 2016',
    company: 'TechPeru Innovations',
    position: 'CTO',
    sector: 'tecnologia',
    location: 'Lima',
    email: 'diego.flores@example.com',
    linkedin: 'https://linkedin.com/in/diegoflores',
    bio: 'Desarrollador de software y especialista en inteligencia artificial aplicada a negocios.',
    image: '/placeholder.jpg',
  },
  {
    id: 7,
    name: 'Gabriela Ramos Morales',
    graduation: 'Arquitectura, 2011',
    company: 'Diseño Urbano Sostenible',
    position: 'Arquitecta Principal',
    sector: 'construccion',
    location: 'Cusco',
    email: 'gabriela.ramos@example.com',
    linkedin: 'https://linkedin.com/in/gabrielaramos',
    bio: 'Arquitecta enfocada en diseño sostenible y preservación del patrimonio arquitectónico.',
    image: '/placeholder.jpg',
  },
  {
    id: 8,
    name: 'Miguel Soto Álvarez',
    graduation: 'Comunicación, 2014',
    company: 'PeruMedia Group',
    position: 'Director de Contenidos',
    sector: 'comunicacion',
    location: 'Lima',
    email: 'miguel.soto@example.com',
    linkedin: 'https://linkedin.com/in/miguelsoto',
    bio: 'Creador de contenido digital y estratega de comunicación para marcas líderes.',
    image: '/placeholder.jpg',
  },
];

// Define sectors for filtering
const sectors = [
  { id: 'all', name: 'Todos los sectores' },
  { id: 'finanzas', name: 'Finanzas y Banca' },
  { id: 'tecnologia', name: 'Tecnología' },
  { id: 'marketing', name: 'Marketing y Publicidad' },
  { id: 'comercio', name: 'Comercio Internacional' },
  { id: 'manufactura', name: 'Manufactura' },
  { id: 'construccion', name: 'Arquitectura y Construcción' },
  { id: 'comunicacion', name: 'Comunicación y Medios' },
  { id: 'otros', name: 'Otros Sectores' },
];

// Define locations for filtering
const locations = [
  { id: 'all', name: 'Todas las ubicaciones' },
  { id: 'Lima', name: 'Lima' },
  { id: 'Arequipa', name: 'Arequipa' },
  { id: 'Cusco', name: 'Cusco' },
  { id: 'Trujillo', name: 'Trujillo' },
  { id: 'otras', name: 'Otras ciudades' },
];

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Apply filters
  const filteredDirectory = directoryData.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector =
      sectorFilter === 'all' || member.sector === sectorFilter;
    const matchesLocation =
      locationFilter === 'all' || member.location === locationFilter;

    return matchesSearch && matchesSector && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0053c7] mb-3">
            Directorio Empresarial
          </h1>
          <p className="text-xl text-[#0053c7]/90 max-w-3xl mx-auto">
            Conecta con profesionales EXATEC en diversos sectores y regiones de
            Perú
          </p>
        </div>
      </div>

      {/* Directory Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and filters */}
        <div className="mb-12 bg-white p-6 rounded-lg shadow-md border-4 border-[#0053c7]">
          <div className="mb-6">
            <label
              htmlFor="search"
              className="block text-lg font-medium text-[#0053c7] mb-2"
            >
              Buscar por nombre, empresa o cargo
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-4 py-3 rounded-md border-2 border-[#0053c7] focus:outline-none focus:ring-2 focus:ring-[#0053c7] bg-white text-[#0053c7] placeholder-[#0053c7]/60"
              placeholder="Ej: María López, Banco de Crédito, Gerente de Marketing..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="sector"
                className="block text-lg font-medium text-[#0053c7] mb-2"
              >
                Filtrar por sector
              </label>
              <select
                id="sector"
                className="w-full px-4 py-3 rounded-md border-2 border-[#0053c7] focus:outline-none focus:ring-2 focus:ring-[#0053c7] bg-white text-[#0053c7] pr-10"
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                style={{ backgroundPosition: 'right 1.25rem center' }}
              >
                {sectors.map((sector) => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-lg font-medium text-[#0053c7] mb-2"
              >
                Filtrar por ubicación
              </label>
              <select
                id="location"
                className="w-full px-4 py-3 rounded-md border-2 border-[#0053c7] focus:outline-none focus:ring-2 focus:ring-[#0053c7] bg-white text-[#0053c7] pr-10"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                style={{ backgroundPosition: 'right 1.25rem center' }}
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0053c7]">
            {filteredDirectory.length === 1
              ? '1 resultado encontrado'
              : `${filteredDirectory.length} resultados encontrados`}
          </h2>
        </div>

        {/* Directory grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDirectory.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-md border-4 border-[#0053c7]/30 hover:shadow-xl transition"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#0053c7]/10 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                    {/* Placeholder for profile image - Replace with actual image */}
                    <p className="text-[#0053c7] font-bold text-xl">
                      {member.name.charAt(0)}
                    </p>
                    {/* 
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={64}
                      height={64}
                      className="rounded-full object-cover" 
                    /> 
                    */}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0053c7] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#0053c7]/80">
                      {member.graduation}
                    </p>
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b border-[#0053c7]/10">
                  <p className="font-semibold text-[#0053c7]">
                    {member.position}
                  </p>
                  <p className="text-[#0053c7]/80">{member.company}</p>
                </div>

                <div className="mb-4 text-sm text-[#0053c7]/90">
                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-[#0053c7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{member.location}</span>
                  </div>

                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-[#0053c7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:underline"
                    >
                      {member.email}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-[#0053c7]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Perfil de LinkedIn
                    </a>
                  </div>
                </div>

                <p className="text-[#0053c7]/90 mb-4 line-clamp-2">
                  {member.bio}
                </p>

                <button className="w-full px-4 py-2 border-2 border-[#0053c7] text-[#0053c7] font-medium rounded hover:bg-[#0053c7] hover:text-white transition bg-white">
                  Ver perfil completo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredDirectory.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[#0053c7]/30 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-[#0053c7] mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-[#0053c7]/80">
              Intenta con otros criterios de búsqueda o filtros.
            </p>
          </div>
        )}

        {/* Join directory CTA */}
        <div className="mt-16 bg-[#0053c7]/10 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#0053c7] mb-4">
              ¿Quieres aparecer en nuestro directorio?
            </h3>
            <p className="text-lg text-[#0053c7]/90 mb-6">
              Si eres EXATEC, puedes formar parte de nuestro directorio
              empresarial y conectar con otros profesionales.
            </p>
            <button className="px-8 py-4 bg-[#0053c7] text-white font-semibold rounded-md border-2 border-[#0053c7] hover:bg-[#003a8c] transition text-lg">
              Únete al directorio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
