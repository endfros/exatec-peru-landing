'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Tipo para los eventos
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

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Obtener los eventos
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Error al cargar eventos');
        }
        const data = await response.json();

        // Filtrar eventos futuros (fecha mayor o igual a hoy)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = data
          .filter((event: Event) => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
          })
          .sort((a: Event, b: Event) => {
            // Ordenar por fecha (más cercanos primero)
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          })
          .slice(0, 5); // Limitar a 5 eventos

        setEvents(upcomingEvents);
      } catch (err) {
        setError('No se pudieron cargar los eventos');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Auto-rotación del carrusel
  useEffect(() => {
    if (events.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [events.length]);

  // Ir a evento anterior
  const prevEvent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  // Ir a evento siguiente
  const nextEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Verificar si un evento ya pasó
  const hasEventPassed = (dateString: string) => {
    const eventDate = new Date(dateString);
    eventDate.setHours(23, 59, 59, 999); // Fin del día del evento
    const today = new Date();
    return eventDate < today;
  };

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0053c7] mb-4">
              Próximos Eventos
            </h2>
            <p className="text-xl text-[#0053c7]/80 max-w-3xl mx-auto">
              Cargando eventos...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error || events.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0053c7] mb-4">
              Próximos Eventos
            </h2>
            <p className="text-xl text-[#0053c7]/80 max-w-3xl mx-auto">
              {error ||
                'No hay eventos programados próximamente. ¡Vuelve pronto!'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0053c7] mb-4">
            Próximos Eventos
          </h2>
          <p className="text-xl text-[#0053c7]/80 max-w-3xl mx-auto">
            Descubre las actividades que estamos preparando para la comunidad
            EXATEC
          </p>
        </div>

        <div className="relative overflow-hidden bg-[#0053c7]/10 rounded-xl shadow-lg">
          {/* Carrusel de eventos */}
          <div className="relative min-h-[500px]">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`absolute inset-0 w-full transition-opacity duration-500 ${
                  index === currentIndex
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Imagen del evento */}
                  <div className="relative h-64 md:h-full bg-[#0053c7]/20 flex items-center justify-center">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0053c7]/20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-20 w-20 text-[#0053c7]/50"
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
                      </div>
                    )}
                  </div>

                  {/* Detalles del evento */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-white text-sm font-medium text-[#0053c7] border border-[#0053c7]">
                        {event.category.charAt(0).toUpperCase() +
                          event.category.slice(1)}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-[#0053c7] mb-4">
                      {event.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-[#0053c7]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
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

                      <div className="flex items-center text-[#0053c7]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
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
                          className="h-5 w-5 mr-2"
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

                    <p className="text-[#0053c7]/80 mb-8 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="flex flex-col md:flex-row gap-3">
                      <Link
                        href={`/eventos/${event.id}`}
                        className="inline-block px-6 py-3 bg-[#0053c7] text-white font-semibold rounded-md hover:bg-[#003a8c] transition duration-300 text-center"
                      >
                        Ver detalles
                      </Link>

                      {hasEventPassed(event.date) ? (
                        <span className="inline-block px-6 py-3 bg-gray-200 text-gray-600 font-medium rounded-md cursor-default text-center">
                          Evento finalizado
                        </span>
                      ) : event.registration_url ? (
                        <a
                          href={event.registration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 bg-white border-2 border-[#0053c7] text-[#0053c7] font-semibold rounded-md hover:bg-[#0053c7]/10 transition duration-300 text-center"
                        >
                          Registrarme
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles del carrusel */}
          {events.length > 1 && (
            <>
              <button
                onClick={prevEvent}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-[#0053c7] p-2 rounded-full shadow-md z-10"
                aria-label="Evento anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextEvent}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-[#0053c7] p-2 rounded-full shadow-md z-10"
                aria-label="Evento siguiente"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-[#0053c7]'
                        : 'bg-[#0053c7]/30'
                    }`}
                    aria-label={`Ir al evento ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/eventos"
            className="inline-block px-6 py-3 border-2 border-[#0053c7] text-[#0053c7] font-semibold rounded-md hover:bg-[#0053c7]/10 transition duration-300"
          >
            Ver todos los eventos
          </Link>
        </div>
      </div>
    </section>
  );
}
