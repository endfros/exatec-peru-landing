export const metadata = {
  title: 'Mesa Directiva | EXATEC Perú',
  description: 'Conoce a los miembros de la mesa directiva de EXATEC Perú.',
};

const boardMembers = [
  {
    name: 'Lorena Cépeda Aliaga',
    position: 'Presidenta',
    graduation: 'MA’10',
    bio: 'Presidenta de EXATEC Perú. Lidera la comunidad con visión estratégica y compromiso con el desarrollo profesional y humano de los egresados.',
    image: '/placeholder.jpg',
  },
  {
    name: 'Francisco Coros de la Piedra',
    position: 'Vicepresidente',
    graduation: 'MA’10',
    bio: 'Vicepresidente de EXATEC Perú. Apoya la gestión institucional y promueve la integración de la red de egresados.',
    image: '/placeholder.jpg',
  },
  {
    name: 'Percy Coll Santillán',
    position: 'Tesorero',
    graduation: 'MA’05',
    bio: 'Responsable de la gestión financiera y la transparencia de los recursos de la asociación.',
    image: '/placeholder.jpg',
  },
  {
    name: 'Luis Ibazeta Cárdenas',
    position: 'Secretario',
    graduation: 'MA’09',
    bio: 'Encargado de la documentación, actas y procesos administrativos de la mesa directiva.',
    image: '/placeholder.jpg',
  },
  {
    name: 'Rodrigo Montoya Villanueva',
    position: 'Relaciones Públicas y Comunicación',
    graduation: 'IMT’22',
    bio: 'Responsable de la comunicación institucional y las relaciones públicas de EXATEC Perú.',
    image: '/placeholder.jpg',
  },
  {
    name: 'July Chávez Arévalo',
    position: 'Filantropía y Generosidad',
    graduation: 'MBA’13',
    bio: 'Promueve iniciativas de impacto social y la cultura de generosidad entre los egresados.',
    image: '/placeholder.jpg',
  },
  {
    name: 'Carlos Vértiz Alocén',
    position: 'Consejero',
    graduation: 'MBA’13',
    bio: 'Consejero de la mesa directiva, aporta experiencia y visión estratégica.',
    image: '/placeholder.jpg',
  },
  {
    name: 'Viktor Pérez Vargas',
    position: 'Consejero',
    graduation: 'MBA’16',
    bio: 'Consejero de la mesa directiva, apoya en la toma de decisiones clave para la asociación.',
    image: '/placeholder.jpg',
  },
];

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0053c7] mb-3">
            Mesa Directiva
          </h1>
        </div>
      </div>

      {/* Board Members Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="text-lg text-[#0053c7] max-w-4xl mx-auto">
            Nuestra Mesa Directiva está conformada por EXATEC comprometidos con
            el crecimiento y desarrollo de la comunidad en Perú.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center pb-12">
          {boardMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg border-4 border-[#0053c7]/30 hover:shadow-[0_8px_32px_0_rgba(0,83,199,0.10)] transition-shadow w-full max-w-md mx-auto"
            >
              <div className="bg-[#0053c7]/10 h-64 flex items-center justify-center">
                {/* Placeholder for image - Replace with actual image */}
                <p className="text-[#0053c7] font-semibold">
                  Foto de {member.name}
                </p>
                {/* 
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  width={300}
                  height={300}
                  className="object-cover w-full h-full" 
                /> 
                */}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0053c7] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#0053c7] font-semibold mb-2">
                  {member.position}
                </p>
                <p className="text-sm text-[#0053c7]/80 mb-4">
                  {member.graduation}
                </p>
                {member.bio && (
                  <p className="text-[#0053c7]/80">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
