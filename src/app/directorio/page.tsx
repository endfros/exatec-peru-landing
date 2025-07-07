'use client';

import { useState, useEffect } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

// Tipo para miembros del directorio
export type DirectoryMember = {
  id: string;
  name: string;
  email: string;
  graduation?: string;
  position?: string;
  company?: string;
  location?: string;
  sector?: string;
  linkedin?: string;
  bio?: string;
  terms_accepted: boolean;
  created_at: string;
};

// Lista de departamentos de Perú
const locations = [
  { id: 'all', name: 'Todas las ubicaciones' },
  { id: 'Amazonas', name: 'Amazonas' },
  { id: 'Áncash', name: 'Áncash' },
  { id: 'Apurímac', name: 'Apurímac' },
  { id: 'Arequipa', name: 'Arequipa' },
  { id: 'Ayacucho', name: 'Ayacucho' },
  { id: 'Cajamarca', name: 'Cajamarca' },
  { id: 'Callao', name: 'Callao' },
  { id: 'Cusco', name: 'Cusco' },
  { id: 'Huancavelica', name: 'Huancavelica' },
  { id: 'Huánuco', name: 'Huánuco' },
  { id: 'Ica', name: 'Ica' },
  { id: 'Junín', name: 'Junín' },
  { id: 'La Libertad', name: 'La Libertad' },
  { id: 'Lambayeque', name: 'Lambayeque' },
  { id: 'Lima', name: 'Lima' },
  { id: 'Loreto', name: 'Loreto' },
  { id: 'Madre de Dios', name: 'Madre de Dios' },
  { id: 'Moquegua', name: 'Moquegua' },
  { id: 'Pasco', name: 'Pasco' },
  { id: 'Piura', name: 'Piura' },
  { id: 'Puno', name: 'Puno' },
  { id: 'San Martín', name: 'San Martín' },
  { id: 'Tacna', name: 'Tacna' },
  { id: 'Tumbes', name: 'Tumbes' },
  { id: 'Ucayali', name: 'Ucayali' },
  { id: 'otras', name: 'Otras ciudades' },
];

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [directory, setDirectory] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserSupabaseClient();

  // Fetch de miembros del directorio
  useEffect(() => {
    async function fetchDirectory() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('exatecs_directory')
          .select('*')
          .eq('terms_accepted', true);

        if (error) throw error;
        setDirectory(data || []);
      } catch (err) {
        console.error('Error al cargar directorio:', err);
        setError('No se pudo cargar el directorio');
      } finally {
        setLoading(false);
      }
    }

    fetchDirectory();
  }, []);

  // Función para obtener el nombre completo del sector por ID
  const getSectorName = (sectorId: string | undefined) => {
    if (!sectorId) return '';
    const sector = sectors.find((s) => s.id === sectorId);
    return sector ? sector.name : sectorId;
  };

  // Lista de sectores
  const sectors = [
    { id: 'finanzas', name: 'Finanzas y Banca' },
    { id: 'tecnologia', name: 'Tecnología' },
    { id: 'marketing', name: 'Marketing y Publicidad' },
    { id: 'comercio', name: 'Comercio Internacional' },
    { id: 'manufactura', name: 'Manufactura' },
    { id: 'construccion', name: 'Arquitectura y Construcción' },
    { id: 'comunicacion', name: 'Comunicación y Medios' },
    { id: 'otros', name: 'Otros Sectores' },
  ];

  // Filtrado de resultados basado en búsqueda y filtros
  const filteredDirectory = directory.filter((member) => {
    // Filtrar por término de búsqueda (nombre, empresa, cargo)
    const matchesSearchTerm =
      searchTerm === '' ||
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position?.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtrar por sector
    const matchesSector =
      sectorFilter === 'all' || member.sector === sectorFilter;

    // Filtrar por ubicación
    const matchesLocation =
      locationFilter === 'all' || member.location === locationFilter;

    return matchesSearchTerm && matchesSector && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white pb-4">
      {/* Hero Section */}
      <div className="bg-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0053c7] mb-3">
            Directorio Empresarial
          </h1>
          <p className="text-xl text-[#0053c7]/90 max-w-3xl mx-auto">
            Conecta con profesionales EXATEC en diversos sectores y regiones de
            PERÚ
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
                {/* Aquí deberías mapear los sectores reales de tu base de datos */}
                <option value="all">Todos los sectores</option>
                <option value="finanzas">Finanzas y Banca</option>
                <option value="tecnologia">Tecnología</option>
                <option value="marketing">Marketing y Publicidad</option>
                <option value="comercio">Comercio Internacional</option>
                <option value="manufactura">Manufactura</option>
                <option value="construccion">
                  Arquitectura y Construcción
                </option>
                <option value="comunicacion">Comunicación y Medios</option>
                <option value="otros">Otros Sectores</option>
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

        {/* Estado de carga */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-[#0053c7] text-lg flex items-center">
              <svg
                className="animate-spin h-6 w-6 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Cargando directorio...
            </div>
          </div>
        )}

        {/* Estado de error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-md text-center">
            <h3 className="font-bold text-lg mb-2">Ocurrió un error</h3>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#0053c7] text-white rounded-md hover:bg-[#003a8c] transition"
            >
              Intentar nuevamente
            </button>
          </div>
        )}

        {/* Contenido cuando está cargado correctamente */}
        {!loading && !error && (
          <>
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
                        <p className="text-[#0053c7] font-bold text-xl">
                          {member.name?.charAt(0) || '?'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0053c7] mb-1">
                          {member.name}
                        </h3>
                        <p className="text-sm text-[#0053c7]/80">
                          {member.graduation || 'EXATEC'}
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

                    <p className="text-[#0053c7]/90 mb-4 line-clamp-3">
                      {member.bio ||
                        `Profesional EXATEC del sector ${getSectorName(
                          member.sector
                        )}`}
                    </p>

                    <a
                      href={`mailto:${member.email}`}
                      className="w-full px-4 py-2 border-2 border-[#0053c7] text-[#0053c7] font-medium rounded hover:bg-[#0053c7] hover:text-white transition bg-white text-center block"
                    >
                      Contactar
                    </a>
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {filteredDirectory.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-md col-span-3">
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
            </div>
          </>
        )}

        {/* Join directory CTA */}
        <div className="mt-16 bg-[#0053c7]/10 rounded-lg p-8 mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#0053c7] mb-4">
              ¿Quieres aparecer en nuestro directorio?
            </h3>
            <p className="text-lg text-[#0053c7]/90 mb-6">
              Si eres EXATEC, puedes formar parte de nuestro directorio
              empresarial y conectar con otros profesionales.
            </p>
            <a
              href="/unete"
              className="px-8 py-4 bg-[#0053c7] text-white font-semibold rounded-md border-2 border-[#0053c7] hover:bg-[#003a8c] transition text-lg inline-block"
            >
              Únete al directorio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
