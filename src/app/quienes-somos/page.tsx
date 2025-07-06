import Image from 'next/image';

export const metadata = {
  title: 'Quienes Somos | EXATEC Perú',
  description:
    'Conoce más sobre la comunidad de exalumnos del Tecnológico de Monterrey en Perú, nuestra misión y visión.',
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0053c7] mb-6">
            Quiénes Somos
          </h1>
          <p className="text-xl text-[#0053c7]/90 max-w-3xl mx-auto">
            Conoce más sobre la comunidad de exalumnos del Tecnológico de
            Monterrey en Perú
          </p>
        </div>
      </div>

      {/* About Us Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-[#0053c7] mb-6">
              Sobre EXATEC Perú
            </h2>
            <p className="text-lg text-[#0053c7] mb-4">
              EXATEC Perú es la asociación oficial de exalumnos del Tecnológico
              de Monterrey en el Perú. Somos una comunidad vibrante que reúne a
              profesionales peruanos que han tenido la oportunidad de formarse
              en una de las instituciones educativas más prestigiosas de
              Latinoamérica.
            </p>
            <p className="text-lg text-[#0053c7] mb-4">
              Fundada con el objetivo de mantener vivo el espíritu del Tec en
              nuestro país, nuestra asociación trabaja para crear espacios de
              networking, desarrollo profesional y contribución social.
            </p>
            <p className="text-lg text-[#0053c7]">
              A través de diferentes eventos y actividades, buscamos fortalecer
              los lazos entre exalumnos, promover oportunidades de crecimiento y
              representar los valores del Tecnológico de Monterrey en Perú.
            </p>
          </div>
          <div className="bg-[#0053c7]/10 rounded-lg h-80 flex items-center justify-center">
            {/* Placeholder for image - Replace with actual image */}
            <p className="text-[#0053c7] text-lg font-semibold">
              Imagen de la comunidad EXATEC Perú
            </p>
            {/* 
            <Image 
              src="/images/about-exatec.jpg" 
              alt="Comunidad EXATEC Perú" 
              fill 
              className="object-cover rounded-lg" 
            /> 
            */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-lg p-8 shadow-lg border-4 border-[#0053c7]/30">
            <div className="bg-[#0053c7]/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#0053c7]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0053c7] mb-4">
              Nuestra Misión
            </h3>
            <p className="text-lg text-[#0053c7]">
              Conectar, desarrollar y potenciar a la comunidad de exalumnos del
              Tecnológico de Monterrey en Perú, fomentando la colaboración
              profesional, el aprendizaje continuo y el impacto positivo en
              nuestra sociedad.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-lg p-8 shadow-lg border-4 border-[#0053c7]/30">
            <div className="bg-[#0053c7]/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#0053c7]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0053c7] mb-4">
              Nuestra Visión
            </h3>
            <p className="text-lg text-[#0053c7]">
              Ser reconocidos como una comunidad líder de profesionales que
              representa la excelencia y los valores del Tecnológico de
              Monterrey en Perú, generando un impacto significativo en el
              desarrollo del país a través de la innovación, el liderazgo y la
              responsabilidad social.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#0053c7] mb-8 text-center">
            Nuestros Valores
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Innovación', 'Integridad', 'Colaboración', 'Excelencia'].map(
              (value, index) => (
                <div
                  key={index}
                  className="bg-[#0053c7]/10 p-6 rounded-lg text-center hover:shadow-md transition-shadow border-2 border-[#0053c7]/20"
                >
                  <h4 className="text-xl font-semibold text-[#0053c7] mb-2">
                    {value}
                  </h4>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
