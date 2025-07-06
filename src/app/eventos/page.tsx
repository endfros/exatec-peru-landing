'use client';

import { useState } from 'react';
// Metadata importada solo cuando se necesite

// Sample events data
const events = [
  {
    id: 1,
    title: 'Networking: Innovación en Tiempos de Crisis',
    date: '2025-07-15',
    time: '19:00 - 21:00',
    location: 'Hotel Westin Lima',
    category: 'networking',
    description:
      'Una oportunidad para conectar con otros EXATEC mientras discutimos estrategias de innovación en entornos desafiantes. Con la participación de destacados emprendedores de nuestra comunidad.',
    image: '/placeholder.jpg',
  },
  {
    id: 2,
    title: 'Webinar: Oportunidades de Negocio Perú-México',
    date: '2025-08-05',
    time: '17:30 - 18:30',
    location: 'Virtual (Zoom)',
    category: 'webinar',
    description:
      'Análisis de las oportunidades comerciales entre Perú y México en el marco del tratado de libre comercio. Contaremos con la participación de especialistas en comercio internacional.',
    image: '/placeholder.jpg',
  },
  {
    id: 3,
    title: 'Voluntariado: Construyendo Futuro',
    date: '2025-08-22',
    time: '09:00 - 13:00',
    location: 'Colegio Fe y Alegría, Villa El Salvador',
    category: 'social',
    description:
      'Jornada de voluntariado donde compartiremos con estudiantes de secundaria nuestras experiencias profesionales y los orientaremos sobre carreras universitarias.',
    image: '/placeholder.jpg',
  },
  {
    id: 4,
    title: 'Taller de Liderazgo e Innovación',
    date: '2025-09-10',
    time: '18:00 - 20:30',
    location: 'WeWork Real 2, San Isidro',
    category: 'workshop',
    description:
      'Taller práctico donde desarrollaremos habilidades de liderazgo e innovación con metodologías ágiles utilizadas en el Tec de Monterrey.',
    image: '/placeholder.jpg',
  },
  {
    id: 5,
    title: 'Asamblea Anual EXATEC Perú',
    date: '2025-10-15',
    time: '19:00 - 21:00',
    location: 'Hotel Hilton Lima',
    category: 'institutional',
    description:
      'Reunión anual de la comunidad EXATEC donde revisaremos los logros del año y definiremos los próximos objetivos. Incluye cóctel de networking.',
    image: '/placeholder.jpg',
  },
  {
    id: 6,
    title: 'Cena de Fin de Año EXATEC',
    date: '2025-12-04',
    time: '20:00 - 00:00',
    location: 'Restaurante Astrid & Gastón',
    category: 'social',
    description:
      'Celebración anual de nuestra comunidad para compartir logros y fortalecer lazos. Cena de gala con sorteos y música en vivo.',
    image: '/placeholder.jpg',
  },
];

export default function EventsPage() {
  const [filter, setFilter] = useState('all');

  const filteredEvents =
    filter === 'all'
      ? events
      : events.filter((event) => event.category === filter);

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'networking', name: 'Networking' },
    { id: 'webinar', name: 'Webinars' },
    { id: 'workshop', name: 'Talleres' },
    { id: 'social', name: 'Social' },
    { id: 'institutional', name: 'Institucional' },
  ];

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0053c7] mb-6">
            Calendario de Eventos
          </h1>
          <p className="text-xl text-[#0053c7]/90 max-w-3xl mx-auto">
            Mantente al día con las actividades y eventos de nuestra comunidad
          </p>
        </div>
      </div>

      {/* Events Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Filter buttons */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#0053c7] mb-4">
            Filtrar por categoría:
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full border-2 transition font-semibold ${
                  filter === category.id
                    ? 'bg-[#0053c7] text-white border-[#0053c7]'
                    : 'bg-white text-[#0053c7] border-[#0053c7] hover:bg-[#0053c7]/10'
                }`}
                onClick={() => setFilter(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-md border-4 border-[#0053c7]/30 hover:shadow-lg transition"
            >
              <div className="bg-[#0053c7]/10 h-48 flex items-center justify-center">
                {/* Placeholder for event image - Replace with actual image */}
                <p className="text-[#0053c7] font-semibold">
                  Imagen del evento
                </p>
                {/* 
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  width={400}
                  height={200}
                  className="object-cover w-full h-full" 
                /> 
                */}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#0053c7] flex-grow">
                    {event.title}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-2 border-[#0053c7] bg-white text-[#0053c7]`}
                  >
                    {event.category.charAt(0).toUpperCase() +
                      event.category.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-[#0053c7] mb-2">
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
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-[#0053c7] mb-2">
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
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-[#0053c7]">
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
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-[#0053c7]/90 mb-4 line-clamp-3">
                  {event.description}
                </p>

                <button className="w-full px-4 py-2 bg-[#0053c7] text-white font-medium rounded border-2 border-[#0053c7] hover:bg-[#003a8c] transition">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay eventos en esta categoría
            </h3>
            <p className="text-gray-600">
              Por favor, selecciona otra categoría o vuelve más tarde.
            </p>
          </div>
        )}

        {/* Subscribe to events */}
        <div className="mt-16 bg-[#0053c7]/10 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#0053c7] mb-4">
              ¿No quieres perderte ningún evento?
            </h3>
            <p className="text-lg text-[#0053c7]/90 mb-6">
              Suscríbete a nuestro calendario de eventos y recibe notificaciones
              cuando tengamos nuevas actividades.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="px-4 py-3 rounded-md border-2 border-[#0053c7] focus:outline-none focus:ring-2 focus:ring-[#0053c7] flex-grow max-w-md bg-white text-[#0053c7] placeholder-[#0053c7]/60"
              />
              <button className="px-6 py-3 bg-[#0053c7] text-white font-semibold rounded-md border-2 border-[#0053c7] hover:bg-[#003a8c] transition whitespace-nowrap">
                Suscribirme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
