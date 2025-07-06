import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0053c7] mb-6">
              ¿Listo para formar parte de nuestra comunidad?
            </h2>
            <p className="text-xl text-[#0053c7]/90 mb-8 max-w-lg">
              Únete a EXATEC Perú y conecta con egresados del Tecnológico de
              Monterrey en el país. Amplía tu red profesional y participa en
              eventos exclusivos.
            </p>
          </div>

          <div className="text-center md:text-right">
            <Link
              href="/unete"
              className="inline-block px-8 py-4 bg-[#0053c7] text-white font-bold text-lg rounded-md shadow-lg border-2 border-[#0053c7] hover:bg-[#003a8c] hover:scale-105 transition duration-300 transform"
            >
              Únete a EXATEC Perú
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
