import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET para obtener un evento específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de evento inválido' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error al obtener evento:', error);
    return NextResponse.json(
      { error: 'Error al obtener evento' },
      { status: 500 }
    );
  }
}

// PUT para actualizar un evento
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de evento inválido' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Verificar que el evento existe
    const eventExists = await prisma.event.findUnique({
      where: { id },
    });

    if (!eventExists) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar evento
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title: data.title,
        date: data.date ? new Date(data.date) : undefined,
        time: data.time,
        location: data.location,
        category: data.category,
        description: data.description,
        image: data.image,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    return NextResponse.json(
      { error: 'Error al actualizar evento' },
      { status: 500 }
    );
  }
}

// DELETE para eliminar un evento
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de evento inválido' },
        { status: 400 }
      );
    }

    // Verificar que el evento existe
    const eventExists = await prisma.event.findUnique({
      where: { id },
    });

    if (!eventExists) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar evento
    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Evento eliminado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    return NextResponse.json(
      { error: 'Error al eliminar evento' },
      { status: 500 }
    );
  }
}
