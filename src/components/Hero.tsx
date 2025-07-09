import Link from 'next/link';
// Image import removed as it's not being used
// import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative bg-white">
      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-[#0053c7]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              EXATEC Perú
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#0053c7]/90 max-w-lg">
              Conectamos a los exalumnos del Tecnológico de Monterrey en Perú,
              creando una red de profesionales destacados.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/unete"
                className="px-6 py-3 bg-[#0053c7] text-white font-semibold rounded-md shadow-lg hover:bg-[#003a8c] transition duration-300 text-lg border-2 border-[#0053c7]"
              >
                Únete a Nosotros
              </Link>
              <Link
                href="/quienes-somos"
                className="px-6 py-3 bg-white border-2 border-[#0053c7] text-[#0053c7] font-semibold rounded-md hover:bg-[#f0f6ff] transition duration-300 text-lg"
              >
                Conoce más
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative h-96">
            {/* Placeholder for hero image - you'll need to add your own image */}
            <div className="absolute inset-0 bg-[#0053c7]/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <p className="text-2xl text-[#0053c7] font-bold">EXATEC PERÚ</p>
              {/* You can replace this with an actual image later:
              <Image 
                src="/images/hero-image.jpg"
                alt="EXATEC Peru community"
                fill
                className="object-cover rounded-lg"
              /> 
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
