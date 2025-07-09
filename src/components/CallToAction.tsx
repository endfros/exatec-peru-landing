import Link from 'next/link';
import Image from 'next/image';

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-b from-[#f8faff] to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0053c7]/5 rounded-full translate-x-[30%] translate-y-[-50%] blur-2xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0053c7]/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="bg-gradient-to-br from-[#0053c7] to-[#0076e3] rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="p-10 md:p-14">
              <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full mb-6 backdrop-blur-sm text-sm font-semibold text-white">
                ÚNETE A NUESTRA COMUNIDAD
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                ¿Listo para formar parte de nuestra red profesional?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-lg font-light leading-relaxed">
                Únete a EXATEC Perú y conecta con egresados del Tecnológico de
                Monterrey en el país. Amplía tu red profesional y participa en
                eventos exclusivos.
              </p>

              <Link
                href="/unete"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0053c7] font-bold text-lg rounded-xl shadow-lg hover:shadow-white/20 hover:translate-y-[-2px] transition-all duration-300 transform"
              >
                Únete a EXATEC Perú
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="hidden md:block relative h-full min-h-[360px] bg-gradient-to-r from-[#0053c7]/20 to-transparent overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <div className="relative h-[420px] w-[420px] flex items-center justify-center">
                  <Image
                    src="/images/exatec_logo.svg"
                    alt="EXATEC Logo"
                    width={300}
                    height={400}
                    className="object-contain opacity-90 drop-shadow-lg filter invert"
                    priority
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/10 z-10"></div>
              <div className="absolute bottom-10 right-20 w-16 h-16 rounded-full bg-white/10 z-10"></div>
              <div className="absolute top-1/2 right-1/3 w-12 h-12 rounded-full bg-white/10 z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
