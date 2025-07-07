'use client';

import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';
import Image from 'next/image';

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    graduationYear: '',
    career: '',
    sector: '',
    linkedinUrl: '',
    message: '',
    termsAccepted: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();

      // Verificar que los términos han sido aceptados
      if (!formData.termsAccepted) {
        setError('Debes aceptar los términos y condiciones para continuar.');
        return;
      }

      // Guardar los datos en la tabla exatecs
      const { data, error: supabaseError } = await supabase
        .from('exatecs')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            career: formData.career,
            graduation_year: formData.graduationYear,
            sector: formData.sector || null,
            linkedin_url: formData.linkedinUrl || null,
            message: formData.message || null,
            terms_accepted: formData.termsAccepted,
          },
        ]);

      if (supabaseError) {
        console.error('Error guardando datos:', supabaseError);

        // Manejar errores comunes
        if (supabaseError.code === '23505') {
          // Violación de unique constraint
          setError(
            'Ya existe un registro con este correo electrónico. Si ya enviaste tu solicitud anteriormente, por favor espera nuestra respuesta.'
          );
        } else {
          setError(`Error al enviar el formulario: ${supabaseError.message}`);
        }
        return;
      }

      console.log('Registro guardado correctamente:', data);

      // Mostrar mensaje de éxito
      setIsSubmitted(true);

      // Resetear el formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        graduationYear: '',
        career: '',
        sector: '',
        linkedinUrl: '',
        message: '',
        termsAccepted: false,
      });
    } catch (error: any) {
      console.error('Error en el envío:', error);
      setError(
        'Ocurrió un error inesperado. Por favor, intenta nuevamente más tarde.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate graduation years options
  const currentYear = new Date().getFullYear();
  const graduationYears = [];
  for (let year = currentYear; year >= currentYear - 50; year--) {
    graduationYears.push(year.toString());
  }

  // Career options are now handled as free text input
  // The careers list was removed since we use free text input now

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0053c7] mb-6">
            Únete a EXATEC Perú
          </h1>
          <p className="text-xl text-[#0053c7]/90 max-w-3xl mx-auto">
            Forma parte de la comunidad de exalumnos del Tecnológico de
            Monterrey en Perú
          </p>
        </div>
      </div>

      {/* Join Us Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits Section */}
          <div>
            <h2 className="text-3xl font-bold text-[#0053c7] mb-6">
              ¿Por qué ser parte de EXATEC Perú?
            </h2>

            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#0053c7]/10 text-[#0053c7]">
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-[#0053c7] mb-2">
                    Networking de Calidad
                  </h3>
                  <p className="text-[#0053c7]/90">
                    Conecta con una red exclusiva de profesionales EXATEC
                    establecidos en Perú, expandiendo tus contactos
                    profesionales.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Eventos Exclusivos
                  </h3>
                  <p className="text-gray-700">
                    Accede a eventos, charlas y actividades exclusivas para
                    miembros, tanto presenciales como virtuales.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Oportunidades Profesionales
                  </h3>
                  <p className="text-gray-700">
                    Accede a oportunidades laborales y de negocio compartidas
                    exclusivamente dentro de la comunidad.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Directorio Exclusivo
                  </h3>
                  <p className="text-gray-700">
                    Forma parte de nuestro directorio empresarial donde otros
                    miembros podrán conocer tu perfil profesional.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
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
                        d="M12 8v13m0-13V6a4 4 0 00-4-4H8.8a4 4 0 00-2.6.9l-.7.7a3.73 3.73 0 00-1.1 2.45c0 1.57.75 3.07 1.84 3.85L13 15l2.4-2.1c1.1-.78 1.84-2.27 1.84-3.85a3.73 3.73 0 00-1.1-2.45l-.7-.7a4 4 0 00-2.6-.9H12a4 4 0 00-4 4v2h2a2 2 0 110 4h-2v6h8a2 2 0 110 4H8"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Beneficios y Descuentos
                  </h3>
                  <p className="text-gray-700">
                    Accede a promociones exclusivas en empresas aliadas y en
                    servicios seleccionados para nuestra comunidad.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {isSubmitted ? (
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¡Gracias por tu interés!
                </h3>
                <p className="text-lg text-gray-700 mb-8">
                  Hemos recibido tu solicitud y nos pondremos en contacto
                  contigo próximamente.
                </p>
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-[#0053c7] mb-2">
                    Únete a nuestro grupo de WhatsApp
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Puedes unirte al grupo EXATEC Perú en WhatsApp usando el
                    siguiente enlace o escaneando el código QR:
                  </p>
                  <img
                    src="/images/qr_whatsapp.png"
                    alt="QR para grupo WhatsApp EXATEC Perú"
                    className="mx-auto mb-4 w-48 h-48 object-contain rounded-md"
                  />
                  <a
                    href="https://chat.whatsapp.com/JByJfbnGfxu3QDNR8JAe84"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-[#25D366] text-white font-bold rounded-md hover:bg-[#128C7E] transition mb-2"
                  >
                    Unirme al grupo de WhatsApp
                  </a>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-[#0053c7] text-white font-semibold rounded-md hover:bg-[#003a8c] transition"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Completa tus datos
                </h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="career"
                      className="block text-[#0053c7] font-medium mb-2"
                    >
                      ¿Qué estudiaste en el Tec? *
                    </label>
                    <input
                      type="text"
                      id="career"
                      name="career"
                      value={formData.career}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border-2 border-[#0053c7] focus:outline-none focus:ring-2 focus:ring-[#0053c7] text-black"
                      placeholder="Ejemplo: Ingeniería Industrial, Maestría en Finanzas, etc."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="graduationYear"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Año de graduación *
                    </label>
                    <select
                      id="graduationYear"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Selecciona el año</option>
                      {graduationYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="sector"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Sector económico *
                    </label>
                    <select
                      id="sector"
                      name="sector"
                      required
                      value={formData.sector}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Selecciona un sector</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Finanzas">Finanzas</option>
                      <option value="Salud">Salud</option>
                      <option value="Educación">Educación</option>
                      <option value="Manufactura">Manufactura</option>
                      <option value="Comercio">Comercio</option>
                      <option value="Servicios">Servicios</option>
                      <option value="Consultoría">Consultoría</option>
                      <option value="Minería">Minería</option>
                      <option value="Agricultura">Agricultura</option>
                      <option value="Construcción">Construcción</option>
                      <option value="Energía">Energía</option>
                      <option value="Turismo">Turismo</option>
                      <option value="Gobierno">Gobierno</option>
                      <option value="ONG">ONG</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="linkedinUrl"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      URL de LinkedIn *
                    </label>
                    <input
                      type="url"
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://linkedin.com/in/tu-perfil"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Cuéntanos más sobre ti y tus expectativas al unirte a EXATEC Perú..."
                    />
                  </div>

                  <div className="pt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="termsAccepted"
                          name="termsAccepted"
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          required
                          className="h-4 w-4 text-[#0053c7] border-gray-300 rounded focus:ring-[#0053c7]"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="termsAccepted"
                          className="text-gray-700"
                        >
                          Acepto los{' '}
                          <a
                            href="https://docs.google.com/document/d/1lAAe31YctgfzqdbaqSDGfOL6h-3Bnpz1gxlH-V5huc0/edit?usp=sharing"
                            className="text-[#0053c7] font-medium hover:underline"
                            target="_blank"
                          >
                            términos y condiciones
                          </a>{' '}
                          de participación en EXATEC Perú y autorizo el
                          tratamiento de mis datos personales de acuerdo a la{' '}
                          <a
                            href="#"
                            className="text-[#0053c7] font-medium hover:underline"
                          >
                            política de privacidad
                          </a>
                          . *
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-[#0053c7] text-white font-bold text-lg rounded-md hover:bg-[#003a8c] transition disabled:bg-[#0053c7]/50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          Enviando...
                        </span>
                      ) : (
                        'Enviar solicitud'
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 text-center">
                    * Campos obligatorios
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Lo que dicen nuestros miembros
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Ser parte de EXATEC Perú me ha permitido mantener la conexión con el Tec y conocer profesionales destacados.',
                author: 'Ana García, Generación 2015',
              },
              {
                quote:
                  'Los eventos de networking han sido clave para expandir mis contactos profesionales y encontrar nuevas oportunidades.',
                author: 'Carlos Mendoza, Generación 2012',
              },
              {
                quote:
                  'La comunidad EXATEC me ayudó a integrarme cuando regresé a Perú. Es como tener un pedazo del Tec aquí.',
                author: 'Laura Fuentes, Generación 2018',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="text-primary mb-4">
                  <svg width="45" height="36" className="fill-current">
                    <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                <p className="text-gray-900 font-medium">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Preguntas frecuentes
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                question: '¿Quién puede unirse a EXATEC Perú?',
                answer:
                  'Cualquier persona que haya estudiado en el Tecnológico de Monterrey (ya sea licenciatura, maestría o doctorado) y que actualmente resida en Perú o tenga intereses profesionales en el país.',
              },
              {
                question: '¿Tiene algún costo formar parte de la comunidad?',
                answer:
                  'No, la membresía es completamente gratuita para todos los exalumnos del Tec que deseen unirse a EXATEC Perú.',
              },
              {
                question: '¿Con qué frecuencia realizan eventos?',
                answer:
                  'Organizamos aproximadamente un evento mensual, alternando entre eventos profesionales, sociales y de networking. Además, tenemos webinars y talleres virtuales periódicamente.',
              },
              {
                question: '¿Cómo puedo participar activamente en la comunidad?',
                answer:
                  'Puedes formar parte de nuestras comisiones de trabajo, proponer actividades, compartir oportunidades laborales o de negocio, o incluso postularte para ser parte de la mesa directiva en las elecciones que se realizan cada dos años.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border-2 border-[#0053c7]"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
