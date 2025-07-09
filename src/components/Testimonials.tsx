'use client';
import Image from 'next/image';
import { useState } from 'react';

// Tipo para los testimonios
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  company?: string;
}

export default function Testimonials() {
  // Datos de ejemplo para los testimonios
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Carlos',
      role: 'Egresado de Ingeniería',
      content:
        'Formar parte de EXATEC Perú me ha permitido mantenerme conectado con la comunidad del Tec y seguir ampliando mi red profesional en mi país. Los eventos y actividades son excelentes.',
      avatar: '/images/carlos_foto.jpeg',
      company: 'Microsoft',
    },
    {
      id: 2,
      name: 'Lorena',
      role: 'Egresada de Marketing',
      content:
        'Después de volver a Perú, EXATEC fue clave para mi reinserción profesional. He podido conectar con personas increíbles que comparten los valores del Tec.',
      avatar: '/images/lorena_foto.jpeg',
      company: 'Google',
    },
    {
      id: 3,
      name: 'Luis',
      role: 'Egresado de Finanzas',
      content:
        'La red de contactos que he construido gracias a EXATEC ha sido fundamental para mi desarrollo profesional. Las oportunidades de networking son invaluables.',
      avatar: '/images/luis_foto.jpeg',
      company: 'JP Morgan',
    },
    {
      id: 4,
      name: 'Rodrigo',
      role: 'Egresado de Ingeniería',
      content:
        'EXATEC Perú es más que una asociación de exalumnos, es una verdadera comunidad donde encontré apoyo tanto profesional como personal al regresar a Lima.',
      avatar: '/images/rodrigo_foto.jpeg',
      company: 'Amazon',
    },
    {
      id: 5,
      name: 'July',
      role: 'Egresada de Administración',
      content:
        'Los eventos organizados por EXATEC me han permitido estar al día con las tendencias de mi industria y conocer a profesionales destacados de mi área.',
      avatar: '/images/july_foto.png',
      company: 'Uber',
    },
  ];

  // Estado para el testimonio actual
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Ir al testimonio anterior
  const prevTestimonial = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Ir al testimonio siguiente
  const nextTestimonial = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#f8faff] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#f8faff] to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0053c7]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0053c7]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="bg-[#0053c7]/10 text-[#0053c7] text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">
            TESTIMONIOS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0053c7] mb-6">
            Lo que dicen nuestros EXATECs
          </h2>
          <p className="text-xl text-[#0053c7]/70 max-w-3xl mx-auto">
            Descubre cómo nuestra comunidad ha impactado positivamente en la
            vida profesional de nuestros miembros
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white to-[#f0f7ff] shadow-lg rounded-2xl p-8 md:p-12 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 text-[#0053c7]/5">
              <svg viewBox="0 0 512 512" fill="currentColor">
                <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
              </svg>
            </div>

            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-700 ${
                    index === currentIndex
                      ? 'opacity-100 translate-x-0'
                      : direction === 'right'
                      ? 'opacity-0 translate-x-full absolute top-0 left-0 right-0'
                      : 'opacity-0 -translate-x-full absolute top-0 left-0 right-0'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-8 text-center relative">
                      <p className="text-lg md:text-xl text-gray-700 italic mb-8 leading-relaxed">
                        "{testimonial.content}"
                      </p>

                      <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="text-xl font-bold text-[#0053c7]">
                        {testimonial.name}
                      </h4>
                      <p className="text-[#0053c7]/80">{testimonial.role}</p>
                      {testimonial.company && (
                        <p className="text-[#0053c7]/60 text-sm">
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center mt-10 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-md text-[#0053c7] hover:bg-[#0053c7] hover:text-white transition-all duration-300"
                aria-label="Testimonio anterior"
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

              {/* Indicators */}
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index < currentIndex ? 'left' : 'right');
                      setCurrentIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-[#0053c7] scale-125'
                        : 'bg-[#0053c7]/30'
                    }`}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-md text-[#0053c7] hover:bg-[#0053c7] hover:text-white transition-all duration-300"
                aria-label="Testimonio siguiente"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
