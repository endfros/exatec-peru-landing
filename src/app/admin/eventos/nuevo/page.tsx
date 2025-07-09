'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
    image: '/placeholder.jpg',
  });

  const categoryOptions = [
    { value: 'networking', label: 'Networking' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'workshop', label: 'Taller' },
    { value: 'social', label: 'Social' },
    { value: 'institutional', label: 'Institucional' },
  ];

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
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al crear el evento');
      }

      // Redireccionar a la página de eventos
      router.push('/admin/eventos');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      console.error('Error creating event:', error);
      setError(error.message || 'Error al crear el evento');
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
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL de Imagen
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Deja vacío para usar la imagen por defecto
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
