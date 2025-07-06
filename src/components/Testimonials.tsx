'use client';
import { useState } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'Ser parte de EXATEC Perú me ha permitido mantener el vínculo con el Tec y conocer a otros profesionales destacados en el país.',
      author: 'Ana García',
      role: 'Generación 2015, Ingeniería Industrial',
    },
    {
      quote:
        'Los eventos de networking han sido clave para expandir mis contactos profesionales y encontrar oportunidades de negocio en Perú.',
      author: 'Carlos Mendoza',
      role: 'Generación 2012, Administración de Empresas',
    },
    {
      quote:
        'La comunidad EXATEC me ayudó a integrarme cuando regresé a Perú después de estudiar en México. Es como seguir teniendo un pedazo del Tec aquí.',
      author: 'Laura Fuentes',
      role: 'Generación 2018, Relaciones Internacionales',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lo que dicen nuestros miembros
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="relative">
          {/* Quote icon */}
          <div className="absolute -top-6 left-0 text-primary opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
          </div>

          {/* Testimonial carousel */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mt-8">
            <div className="relative min-h-[220px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute transition-opacity duration-500 flex flex-col justify-center items-center h-full w-full text-center ${
                    index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <p className="text-xl md:text-2xl text-gray-700 italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {testimonial.author}
                    </p>
                    <p className="text-lg md:text-xl text-gray-600 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
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

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
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
