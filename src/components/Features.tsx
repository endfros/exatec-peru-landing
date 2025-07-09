import Link from 'next/link';
import Image from 'next/image';

export default function Features() {
  const features = [
    {
      title: 'Comunidad de Excelencia',
      description:
        'Forma parte de una red de profesionales destacados en diversos ámbitos y comparte experiencias con egresados del Tec.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
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
        'Participa en eventos de networking, webinars y actividades sociales diseñadas específicamente para nuestra comunidad.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
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
        'Conecta con otros miembros de EXATEC y descubre oportunidades profesionales en un entorno de confianza y colaboración.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
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
    <section className="py-24 relative bg-gradient-to-b from-[#0053c7] to-[#003a8c] overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-[30%] translate-y-[30%]"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            ¿Por qué unirte a la comunidad
            <br className="hidden md:block" /> EXATEC Perú?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Descubre los beneficios de formar parte de nuestra comunidad de
            exalumnos del Tecnológico de Monterrey en Perú
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 text-center transition-all duration-500 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:translate-y-[-8px] border border-white/10 group"
            >
              <div className="text-white mb-6 inline-flex items-center justify-center bg-white/10 p-4 rounded-xl group-hover:bg-white/20 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-white/80 mb-8 text-lg">
                {feature.description}
              </p>
              <Link
                href={feature.link}
                className="px-6 py-3 bg-white text-[#0053c7] font-bold rounded-xl shadow hover:shadow-lg transition-all duration-300 text-base inline-flex items-center justify-center group-hover:bg-[#0053c7] group-hover:text-white"
              >
                Saber más
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
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
