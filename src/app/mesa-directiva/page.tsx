import Image from 'next/image';
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
    image: '/images/lorena_foto.jpeg',
    linkedin: 'https://www.linkedin.com/in/locepedaaliaga/',
  },
  {
    name: 'Francisco Coros de la Piedra',
    position: 'Vicepresidente',
    graduation: 'MA’10',
    bio: 'Vicepresidente de EXATEC Perú. Apoya la gestión institucional y promueve la integración de la red de egresados.',
    image: '/images/pancho_foto.png',
    linkedin: 'https://www.linkedin.com/in/franciscocoros/',
  },
  {
    name: 'Percy Coll Santillán',
    position: 'Tesorero',
    graduation: 'MA’05',
    bio: 'Responsable de la gestión financiera y la transparencia de los recursos de la asociación.',
    image: '/images/percy_foto.jpeg',
    linkedin: 'https://www.linkedin.com/in/dr-c-percy-coll-mba-mgn-5994a214/',
  },
  {
    name: 'Luis Ibazeta Cárdenas',
    position: 'Secretario',
    graduation: 'MA’09',
    bio: 'Encargado de la documentación, actas y procesos administrativos de la mesa directiva.',
    image: '/images/luis_foto.jpeg',
    linkedin: 'https://www.linkedin.com/in/luis-ibazeta-cardenas-pmp-mba/',
  },
  {
    name: 'Rodrigo Montoya Villanueva',
    position: 'Relaciones Públicas y Comunicación',
    graduation: 'IMT’22',
    bio: 'Responsable de la comunicación institucional y las relaciones públicas de EXATEC Perú.',
    image: '/images/rodrigo_foto.jpeg',
    linkedin: 'https://www.linkedin.com/in/rodrigomontvill/',
  },
  {
    name: 'July Chávez Arévalo',
    position: 'Filantropía y Generosidad',
    graduation: 'MBA’13',
    bio: 'Promueve iniciativas de impacto social y la cultura de generosidad entre los egresados.',
    image: '/images/july_foto.png',
    linkedin: 'https://www.linkedin.com/in/july-chavez-arevalo/',
  },
  {
    name: 'Carlos Vértiz Alocén',
    position: 'Consejero',
    graduation: 'MBA’13',
    bio: 'Consejero de la mesa directiva, aporta experiencia y visión estratégica.',
    image: '/images/carlos_foto.jpeg',
    linkedin: 'https://www.linkedin.com/in/carlosjaviervertiza/',
  },
  {
    name: 'Viktor Pérez Vargas',
    position: 'Consejero',
    graduation: 'MBA’16',
    bio: 'Consejero de la mesa directiva, apoya en la toma de decisiones clave para la asociación.',
    image: '/images/viktor_foto.jpeg',
    linkedin: 'https://www.linkedin.com/in/viktordave-talent-hr/',
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
              className="bg-white rounded-lg overflow-hidden shadow-lg border-4 border-[#0053c7]/30 hover:shadow-[0_8px_32px_0_rgba(0,83,199,0.10)] transition-shadow w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch min-h-[220px]"
            >
              <div className="flex-shrink-0 bg-[#0053c7]/10 flex items-center justify-center w-full sm:w-48 h-64 sm:h-auto sm:min-h-[220px]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="object-cover rounded-full border-4 border-[#0053c7]/30 shadow-md w-40 h-40"
                  />
                ) : (
                  <p className="text-[#0053c7] font-semibold">
                    Foto de {member.name}
                  </p>
                )}
              </div>
              <div className="p-6 flex-1 text-center sm:text-left flex flex-col justify-center">
                <h3 className="text-xl font-bold text-[#0053c7] mb-1 flex items-center justify-center sm:justify-start gap-2">
                  {member.name}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${member.name}`}
                      className="inline-block align-middle hover:opacity-80"
                    >
                      <svg
                        fill="#0053c7"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        data-name="Layer 1"
                      >
                        <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" />
                      </svg>
                    </a>
                  )}
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
