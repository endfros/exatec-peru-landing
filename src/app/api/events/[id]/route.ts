import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { deleteImage } from '@/lib/supabase/client';

// GET para obtener un evento específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const supabase = createServerSupabaseClient();

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de evento inválido' },
        { status: 400 }
      );
    }

    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !event) {
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
    const supabase = createServerSupabaseClient();

    // Verificar autenticación
    const {
      data: { session },
    } = await supabase.auth.getSession();

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
    const { data: eventExists, error: existsError } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (existsError || !eventExists) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar evento
    const { data: updatedEvent, error: updateError } = await supabase
      .from('events')
      .update({
        title: data.title,
        date: data.date,
        time: data.time,
        location: data.location,
        category: data.category,
        description: data.description,
        image: data.image,
        registration_url: data.registration_url,
        // user_id eliminado porque no existe en la tabla
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json(updatedEvent);
  } catch (error: any) {
    console.error('Error al actualizar evento:', error);
    return NextResponse.json(
      {
        error:
          error?.message || error?.toString() || 'Error al actualizar evento',
      },
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
    const supabase = createServerSupabaseClient();

    // Verificar autenticación
    const {
      data: { session },
    } = await supabase.auth.getSession();

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

    // Verificar que el evento existe y obtener su imagen (si la tiene)
    const { data: eventExists, error: existsError } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (existsError || !eventExists) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    // Si el evento tiene una imagen personalizada, eliminarla del storage
    if (eventExists.image && !eventExists.image.includes('placeholder.jpg')) {
      // Intentar eliminar la imagen de Supabase Storage
      await deleteImage(eventExists.image);
    }

    // Eliminar evento
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

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
