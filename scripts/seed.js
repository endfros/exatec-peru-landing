const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seed() {
  // Verificar si ya existe un administrador
  const adminCount = await prisma.admin.count();
  if (adminCount > 0) {
    console.log('Ya existe al menos un administrador. Saltando creación.');
    return;
  }

  // Crear un administrador por defecto
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      email: 'admin@exatecperu.org',
      password: hashedPassword,
      name: 'Administrador',
    },
  });

  console.log(`Administrador creado: ${admin.email}`);

  // Importar eventos iniciales desde el archivo actual
  const initialEvents = [
    {
      title: 'Networking: Innovación en Tiempos de Crisis',
      date: new Date('2025-07-15'),
      time: '19:00 - 21:00',
      location: 'Hotel Westin Lima',
      category: 'networking',
      description:
        'Una oportunidad para conectar con otros EXATEC mientras discutimos estrategias de innovación en entornos desafiantes. Con la participación de destacados emprendedores de nuestra comunidad.',
      image: '/placeholder.jpg',
    },
    {
      title: 'Webinar: Oportunidades de Negocio Perú-México',
      date: new Date('2025-08-05'),
      time: '17:30 - 18:30',
      location: 'Virtual (Zoom)',
      category: 'webinar',
      description:
        'Análisis de las oportunidades comerciales entre Perú y México en el marco del tratado de libre comercio. Contaremos con la participación de especialistas en comercio internacional.',
      image: '/placeholder.jpg',
    },
  ];

  // Verificar si ya existen eventos
  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    // Crear eventos iniciales
    await prisma.event.createMany({
      data: initialEvents,
    });
    console.log(`${initialEvents.length} eventos iniciales creados.`);
  } else {
    console.log(
      'Ya existen eventos en la base de datos. Saltando creación de eventos iniciales.'
    );
  }
}

// Ejecutar el seed
seed()
  .then(() => {
    console.log('Base de datos inicializada correctamente');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error al inicializar la base de datos:', error);
    prisma.$disconnect();
    process.exit(1);
  });
