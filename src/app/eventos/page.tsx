'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  registration_url?: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState('all');
  const [hidePastEvents, setHidePastEvents] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estilos para la transición del loader de imagen
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .image-loading {
        transition: opacity 0.3s ease-in-out;
      }
      .image-loading.opacity-0 {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  // Función para verificar si un evento ya pasó
  const hasEventPassed = (dateString: string) => {
    const eventDate = new Date(dateString);
    eventDate.setHours(23, 59, 59, 999); // Fin del día del evento
    const today = new Date();
    return eventDate < today;
  };

  // Filtramos eventos por categoría y por fecha (pasados/futuros)
  const filteredEvents = events
    .filter((event: Event) => {
      // Filtro de categoría
      if (filter !== 'all' && event.category !== filter) {
        return false;
      }

      // Filtro de eventos pasados
      if (hidePastEvents && hasEventPassed(event.date)) {
        return false;
      }

      return true;
    })
    .sort((a: Event, b: Event) => {
      // Ordenamos por fecha (más cercanos primero)
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

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
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-[#0053c7]">
              Filtrar por categoría:
            </h2>
            <button
              className={`px-4 py-2 rounded-full border-2 transition font-semibold ${
                hidePastEvents
                  ? 'bg-white text-[#0053c7] border-[#0053c7] hover:bg-[#0053c7]/10'
                  : 'bg-[#0053c7] text-white border-[#0053c7]'
              }`}
              onClick={() => setHidePastEvents(!hidePastEvents)}
            >
              {hidePastEvents
                ? 'Mostrar todos los eventos'
                : 'Ocultar eventos pasados'}
            </button>
          </div>
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
              <div className="bg-[#0053c7]/10 h-48 flex items-center justify-center relative overflow-hidden">
                {event.image ? (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0053c7]/10 z-10 image-loading">
                      <svg
                        className="animate-spin h-10 w-10 text-[#0053c7]/50"
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
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                    </div>
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      onLoad={(e) => {
                        // Ocultar el spinner cuando la imagen carga
                        const target = e.target as HTMLImageElement;
                        target.style.opacity = '1';
                        target.previousElementSibling?.classList.add(
                          'opacity-0'
                        );
                      }}
                      style={{
                        opacity: 0,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-[#0053c7]/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="ml-2 text-[#0053c7] font-medium">
                      Sin imagen
                    </span>
                  </div>
                )}
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

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/eventos/${event.id}`}
                    className="block w-full text-center px-4 py-2 bg-[#0053c7] text-white font-medium rounded border-2 border-[#0053c7] hover:bg-[#003a8c] transition"
                  >
                    Ver detalles
                  </Link>

                  {new Date(event.date) < new Date() ? (
                    <div className="block w-full text-center px-4 py-2 bg-gray-200 text-gray-600 font-medium rounded border-2 border-gray-300">
                      Evento finalizado
                    </div>
                  ) : event.registration_url ? (
                    <a
                      href={event.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2 bg-white text-[#0053c7] font-medium rounded border-2 border-[#0053c7] hover:bg-[#0053c7]/10 transition"
                    >
                      Registrarme
                    </a>
                  ) : null}
                </div>
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
        {/* <div className="mt-16 bg-[#0053c7]/10 rounded-lg p-8">
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
        </div> */}
      </div>
    </div>
  );
}
