'use client';

import { useState, useEffect } from 'react';

// Definición del tipo Event
type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  image?: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Error al cargar eventos');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError('No se pudieron cargar los eventos');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents =
    filter === 'all'
      ? events
      : events.filter((event: Event) => event.category === filter);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-white pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0053c7] mb-6">
              Calendario de Eventos
            </h1>
            <p className="text-xl text-[#0053c7]/90 max-w-3xl mx-auto">
              Cargando eventos...
            </p>
          </div>
        </div>
      </div>
    );
  }

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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event: Event) => (
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
