// src/app/api/events/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { deleteImage } from '@/lib/supabase/client';

// GET: obtener un evento por ID
export async function GET(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params?.id, 10);
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
  } catch (err) {
    console.error('Error al obtener evento:', err);
    return NextResponse.json(
      { error: 'Error al obtener evento' },
      { status: 500 }
    );
  }
}

// PUT: actualizar un evento existente
export async function PUT(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id, 10);
    const supabase = createServerSupabaseClient();

    // 1) Verificar autenticación
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // 2) Validar ID
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de evento inválido' },
        { status: 400 }
      );
    }

    const payload = await request.json();

    // 3) Verificar que el evento exista
    const { data: existing, error: existsError } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    if (existsError || !existing) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    // 4) Ejecutar actualización
    const { data: updatedEvent, error: updateError } = await supabase
      .from('events')
      .update({
        title: payload.title,
        date: payload.date,
        time: payload.time,
        location: payload.location,
        category: payload.category,
        description: payload.description,
        image: payload.image,
        registration_url: payload.registration_url,
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json(updatedEvent);
  } catch (err: any) {
    console.error('Error al actualizar evento:', err);
    return NextResponse.json(
      { error: err.message || 'Error al actualizar evento' },
      { status: 500 }
    );
  }
}

// DELETE: eliminar un evento (y su imagen si aplica)
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id, 10);
    const supabase = createServerSupabaseClient();

    // 1) Verificar autenticación
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // 2) Validar ID
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de evento inválido' },
        { status: 400 }
      );
    }

    // 3) Comprobar existencia y obtener URL de imagen
    const { data: existing, error: existsError } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    if (existsError || !existing) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    // 4) Borrar imagen del storage si no es el placeholder
    if (existing.image && !existing.image.includes('placeholder.jpg')) {
      await deleteImage(existing.image);
    }

    // 5) Eliminar el registro en la base de datos
    await supabase.from('events').delete().eq('id', id);

    return NextResponse.json(
      { message: 'Evento eliminado correctamente' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error al eliminar evento:', err);
    return NextResponse.json(
      { error: 'Error al eliminar evento' },
      { status: 500 }
    );
  }
}
