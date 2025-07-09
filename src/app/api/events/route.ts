import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET para obtener todos los eventos
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    return NextResponse.json(
      { error: 'Error al obtener eventos' },
      { status: 500 }
    );
  }
}

// POST para crear un nuevo evento (solo para administradores)
export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await request.json();

    // Validar datos
    if (!data.title || !data.date || !data.category) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Crear evento
    const event = await prisma.event.create({
      data: {
        title: data.title,
        date: new Date(data.date),
        time: data.time || '',
        location: data.location || '',
        category: data.category,
        description: data.description || '',
        image: data.image || '/placeholder.jpg',
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error al crear evento:', error);
    return NextResponse.json(
      { error: 'Error al crear evento' },
      { status: 500 }
    );
  }
}
