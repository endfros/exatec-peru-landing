'use client';

import { useState, useEffect } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

// Lista de departamentos de Perú
const locations = [
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

// Sectores económicos
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

export default function DirectoryAdminPage() {
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<DirectoryMember | null>(null);
  const [form, setForm] = useState<Partial<DirectoryMember>>({});
  const [showForm, setShowForm] = useState(false);
  const supabase = createBrowserSupabaseClient();


  useEffect(() => {
    // Definir la función dentro del useEffect para evitar la advertencia de dependencia
    async function fetchMembers() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('exatecs_directory')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setMembers(data || []);
      } catch (err) {
        setError('Error al cargar el directorio');
        console.error('Error fetching directory:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, [supabase]);

  async function fetchMembers() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('exatecs_directory')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      setError('Error al cargar el directorio');
      console.error('Error fetching directory:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(member: DirectoryMember) {
    setEditing(member);
    setForm(member);
    setShowForm(true);
  }

  function handleAdd() {
    setEditing(null);
    setForm({});
    setShowForm(true);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Nombre y correo son obligatorios');
      return;
    }
    try {
      if (editing) {
        // Update
        const { error } = await supabase
          .from('exatecs_directory')
          .update({
            name: form.name,
            email: form.email,
            graduation: form.graduation,
            position: form.position,
            company: form.company,
            location: form.location,
            sector: form.sector,
            linkedin: form.linkedin,
            bio: form.bio,
          })
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from('exatecs_directory').insert([
          {
            name: form.name,
            email: form.email,
            graduation: form.graduation,
            position: form.position,
            company: form.company,
            location: form.location,
            sector: form.sector,
            linkedin: form.linkedin,
            bio: form.bio,
            terms_accepted: true,
          },
        ]);
        if (error) throw error;
      }
      setShowForm(false);
      setForm({});
      setEditing(null);
      fetchMembers();
    } catch (err) {
      alert('Error al guardar el registro');
      console.error('Error saving member:', err);
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este registro?'))
      return;
    try {
      const { error } = await supabase
        .from('exatecs_directory')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setMembers(members.filter((m) => m.id !== id));
    } catch (err) {
      alert('Error al eliminar el registro');
      console.error('Error deleting member:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-[#0053c7] text-lg">Cargando directorio...</div>
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
          Gestión del Directorio
        </h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#0053c7] text-white rounded-md hover:bg-[#003a8c] transition"
        >
          + Nuevo Miembro
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-lg shadow-md border border-[#0053c7]/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-[#0053c7] mb-1">
                Nombre*
              </label>
              <input
                id="name"
                name="name"
                value={form.name || ''}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-[#0053c7] mb-1">
                Correo*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email || ''}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="company" className="text-sm text-[#0053c7] mb-1">
                Empresa
              </label>
              <input
                id="company"
                name="company"
                value={form.company || ''}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="position" className="text-sm text-[#0053c7] mb-1">
                Cargo
              </label>
              <input
                id="position"
                name="position"
                value={form.position || ''}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" className="text-sm text-[#0053c7] mb-1">
                Ubicación
              </label>
              <select
                id="location"
                name="location"
                value={form.location || ''}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Selecciona una ubicación</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="sector" className="text-sm text-[#0053c7] mb-1">
                Sector
              </label>
              <select
                id="sector"
                name="sector"
                value={form.sector || ''}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Selecciona un sector</option>
                {sectors.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="graduation"
                className="text-sm text-[#0053c7] mb-1"
              >
                Generación
              </label>
              <input
                id="graduation"
                name="graduation"
                value={form.graduation || ''}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedin" className="text-sm text-[#0053c7] mb-1">
                LinkedIn
              </label>
              <input
                id="linkedin"
                name="linkedin"
                value={form.linkedin || ''}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="https://linkedin.com/in/usuario"
              />
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="bio" className="text-sm text-[#0053c7] mb-1">
              Biografía (opcional)
            </label>
            <textarea
              id="bio"
              name="bio"
              value={form.bio || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows={2}
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0053c7] text-white rounded hover:bg-[#003a8c]"
            >
              {editing ? 'Guardar cambios' : 'Añadir'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setForm({});
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#0053c7]/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Correo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Sector
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#0053c7] uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No hay registros en el directorio
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.sector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-[#0053c7] hover:text-[#003a8c]"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
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
