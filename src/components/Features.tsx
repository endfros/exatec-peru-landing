import Link from 'next/link';

export default function Features() {
  const features = [
    {
      title: 'Comunidad de Excelencia',
      description:
        'Forma parte de una red de profesionales destacados en diversos ámbitos.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      link: '/quienes-somos',
    },
    {
      title: 'Eventos Exclusivos',
      description:
        'Participa en eventos de networking, webinars y actividades sociales.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      link: '/eventos',
    },
    {
      title: 'Directorio Empresarial',
      description:
        'Conecta con otros miembros de EXATEC y descubre oportunidades profesionales.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L10 13.197l-4.419 2.617A1 1 0 014 15V4zm2-1a1 1 0 00-1 1v10l3.81-2.254L10 13.197l1.19-0.703L15 14V4a1 1 0 00-1-1H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      link: '/directorio',
    },
  ];

  return (
    <section className="py-20 bg-[#0053c7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Por qué unirte a la comunidad EXATEC Perú?
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Descubre los beneficios de formar parte de nuestra comunidad de
            exalumnos del Tecnológico de Monterrey en Perú
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg p-8 text-center transition-shadow duration-300 border-4 border-white/40 bg-[#0053c7] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.25)]"
            >
              <div className="text-white mb-4 inline-flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-white/90 mb-5">{feature.description}</p>
              <Link
                href={feature.link}
                className="px-5 py-2 bg-white text-[#0053c7] font-semibold rounded-md shadow hover:bg-gray-100 transition duration-300 text-base border-2 border-white inline-flex items-center justify-center"
              >
                Saber más
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="#0053c7"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
