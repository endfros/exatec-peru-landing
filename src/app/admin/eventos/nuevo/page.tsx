'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
    image: '/placeholder.jpg',
    registration_url: '',
  });

  const categoryOptions = [
    { value: 'networking', label: 'Networking' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'workshop', label: 'Taller' },
    { value: 'social', label: 'Social' },
    { value: 'institutional', label: 'Institucional' },
  ];

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Usando el cliente Supabase directamente
      const supabase = createBrowserSupabaseClient();

      // Verificar la sesión primero
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error(
          'No hay sesión activa. Por favor, inicia sesión nuevamente.'
        );
      }

      setSessionStatus(`Sesión activa: ${session.user.email}`);
      console.log('Creando evento con usuario:', session.user.id);

      // Validar datos
      if (!formData.title || !formData.date || !formData.category) {
        throw new Error(
          'Por favor completa los campos requeridos: título, fecha y categoría'
        );
      }

      // Crear el objeto de datos para insertar, sin el user_id inicialmente
      const eventData = {
        title: formData.title,
        date: formData.date,
        time: formData.time || '',
        location: formData.location || '',
        category: formData.category,
        description: formData.description || '',
        image: formData.image || '/placeholder.jpg',
        registration_url: formData.registration_url || null,
      };

      console.log('Intentando crear evento:', eventData);

      // Insertar directamente con Supabase sin user_id
      const { data, error: insertError } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (insertError) {
        console.error('Error de Supabase:', insertError);

        // Manejo específico para errores comunes
        if (insertError.code === 'PGRST204') {
          setError(
            `Error: No se pudo encontrar una columna en la tabla. Es posible que necesites ejecutar el script SQL para actualizar la estructura de la tabla.`
          );
        } else {
          throw new Error(
            `Error al crear el evento: ${insertError.message} (${insertError.code})`
          );
        }
        return; // Detener la ejecución aquí si hay error
      }

      console.log('Evento creado exitosamente:', data);

      // Redireccionar a la página de eventos
      router.push('/admin/eventos');
    } catch (err) {
      console.error('Error completo:', err);
      let msg = 'Error desconocido al crear el evento';
      if (err instanceof Error) {
        if (err.message.includes('fetch')) {
          msg = 'Error de conexión al servidor. Verifica tu conexión a internet.';
        } else if (err.message.includes('JSON')) {
          msg = 'Error en la respuesta del servidor. Contacta al administrador.';
        } else {
          msg = err.message;
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#0053c7]">Nuevo Evento</h2>
        <button
          onClick={() => router.push('/admin/eventos')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {sessionStatus && (
        <div className="mb-4 p-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md text-sm">
          {sessionStatus}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Título *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Hora
              </label>
              <input
                type="text"
                id="time"
                name="time"
                placeholder="Ej: 19:00 - 21:00"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ubicación
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              >
                <option value="">Seleccionar categoría</option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              ></textarea>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="registration_url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL de registro (opcional)
              </label>
              <input
                type="url"
                id="registration_url"
                name="registration_url"
                placeholder="Ej: https://forms.google.com/registro-evento"
                value={formData.registration_url}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Si proporcionas una URL, se mostrará un botón de registro en la
                página del evento
              </p>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Imagen del Evento
              </label>
              <ImageUploader
                value={formData.image}
                onChange={handleImageChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Sube una imagen o ingresa una URL personalizada
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-[#0053c7] text-white font-medium rounded-md hover:bg-[#003a8c] focus:outline-none focus:ring-2 focus:ring-[#0053c7]/50 disabled:bg-[#0053c7]/50"
            >
              {loading ? 'Guardando...' : 'Guardar Evento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
