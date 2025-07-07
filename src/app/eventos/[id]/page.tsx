'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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

export default function EventDetailPage({ params }: any) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const eventId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
        if (!eventId) throw new Error('ID de evento inválido');
        const response = await fetch(`/api/events/${eventId}`);

        if (!response.ok) {
          if (response.status === 404) {
            notFound(); // Usa la página 404 de Next.js
          } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
        }

        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError('No se pudo cargar la información del evento');
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    }

    if (params?.id) {
      fetchEvent();
    }
  }, [params]);

  // Formatear fecha
  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0053c7] mb-6">
              Cargando evento...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0053c7] mb-6">
              Error al cargar el evento
            </h1>
            <p className="text-xl text-[#0053c7]/80 mb-8">
              {error || 'No se encontró el evento solicitado.'}
            </p>
            <Link
              href="/eventos"
              className="inline-block px-6 py-3 bg-[#0053c7] text-white font-semibold rounded-md hover:bg-[#003a8c] transition duration-300"
            >
              Ver todos los eventos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#0053c7]/10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white rounded-full border border-[#0053c7] text-[#0053c7] font-medium">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0053c7] mb-4">
            {event.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 mt-6 text-[#0053c7]">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
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
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
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
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
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
              <span className="font-medium">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative aspect-[13/16] rounded-lg overflow-hidden mb-8 bg-[#0053c7]/10 flex items-center justify-center">
              {event.image ? (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0053c7]/10 z-10">
                      <svg
                        className="animate-spin h-12 w-12 text-[#0053c7]/50"
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
                  )}
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    priority
                    onLoadingComplete={() => setImageLoaded(true)}
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-[#0053c7]/30"
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

            {/* Event Description */}
            <div>
              <h2 className="text-2xl font-bold text-[#0053c7] mb-6">
                Acerca del evento
              </h2>

              <div className="prose prose-lg max-w-none text-[#0053c7]/90">
                <p className="whitespace-pre-line">{event.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-[#0053c7]/10 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-[#0053c7] mb-4">
                Detalles del evento
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#0053c7]">Fecha</h4>
                  <p>{formatDate(event.date)}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#0053c7]">Hora</h4>
                  <p>{event.time}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#0053c7]">Ubicación</h4>
                  <p>{event.location}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#0053c7]">Categoría</h4>
                  <p>
                    {event.category.charAt(0).toUpperCase() +
                      event.category.slice(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0053c7]/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#0053c7] mb-4">
                ¿Quieres asistir?
              </h3>

              {new Date(event.date) < new Date() ? (
                <div className="mb-4">
                  <div className="p-4 bg-gray-200 rounded-md mb-4">
                    <p className="text-gray-600 font-medium text-center">
                      Este evento ya ha finalizado
                    </p>
                  </div>
                  <p className="text-[#0053c7]/80">
                    Síguenos para estar al tanto de nuestros próximos eventos.
                    Si quieres ser parte de nuestra comunidad, puedes unirte a
                    EXATEC Perú.
                    <Link
                      href="/unete"
                      className="block mt-4 w-full text-center px-6 py-3 bg-[#0053c7] text-white font-semibold rounded-md hover:bg-[#003a8c] transition duration-300"
                    >
                      Únete a EXATEC
                    </Link>
                  </p>
                </div>
              ) : event.registration_url ? (
                <>
                  <p className="mb-4 text-[#0053c7]/80">
                    Regístrate para reservar tu lugar en este evento exclusivo
                    para miembros de EXATEC Perú.
                  </p>
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-[#0053c7] text-white font-semibold rounded-md hover:bg-[#003a8c] transition duration-300"
                  >
                    Registrarme al evento
                  </a>
                </>
              ) : (
                <p className="mb-4 text-[#0053c7]/80">
                  Pronto abriremos las inscripciones para este evento. Si
                  quieres ser parte de nuestra comunidad, puedes unirte a EXATEC
                  Perú.
                  <Link
                    href="/unete"
                    className="block mt-4 w-full text-center px-6 py-3 bg-[#0053c7] text-white font-semibold rounded-md hover:bg-[#003a8c] transition duration-300"
                  >
                    Únete a EXATEC
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/eventos"
            className="inline-flex items-center text-[#0053c7] font-medium hover:text-[#003a8c]"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver a todos los eventos
          </Link>
        </div>
      </div>
    </div>
  );
}
