'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Event } from '@/lib/supabase/client';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

// Utilizamos el tipo Event importado desde el cliente de Supabase

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Usando Supabase para obtener eventos
        const { data: events, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (error) {
          throw error;
        }

        setEvents(events || []);
      } catch (err) {
        setError('Error al cargar eventos');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      return;
    }

    try {
      // Primero, obtenemos el evento para ver si tiene una imagen que eliminar
      const { data: event } = await supabase
        .from('events')
        .select('image')
        .eq('id', id)
        .single();

      // Si hay imagen y no es la imagen por defecto, eliminarla del storage
      if (event?.image && !event.image.includes('placeholder.jpg')) {
        // Extraer la última parte de la URL (el nombre del archivo)
        const parts = event.image.split('/');
        const fileName = parts[parts.length - 1];

        // Eliminar la imagen del bucket "events"
        await supabase.storage.from('events').remove([`images/${fileName}`]);
      }

      // Eliminar el evento
      const { error } = await supabase.from('events').delete().eq('id', id);

      if (error) {
        throw error;
      }

      // Actualizar la lista de eventos después de eliminar
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Error al eliminar el evento');
    }
  };

  // Función para formatear fechas
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
      <div className="flex justify-center items-center h-64">
        <div className="text-[#0053c7] text-lg">Cargando eventos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#0053c7]">
          Gestión de Eventos
        </h2>
        <Link
          href="/admin/eventos/nuevo"
          className="px-4 py-2 bg-[#0053c7] text-white rounded-md hover:bg-[#003a8c] transition"
        >
          + Nuevo Evento
        </Link>
      </div>

      {/* Tabla de eventos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#0053c7]/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No hay eventos disponibles
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(event.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#0053c7]/10 text-[#0053c7]">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/eventos/${event.id}`}
                        className="text-[#0053c7] hover:text-[#003a8c]"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
