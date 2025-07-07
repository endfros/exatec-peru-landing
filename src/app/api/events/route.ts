import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// GET para obtener todos los eventos
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      throw error;
    }

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
    const supabase = createServerSupabaseClient();

    // Verificar autenticación
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      console.error('No hay sesión de usuario en la solicitud POST de eventos');
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await request.json();

    // Validar datos
    if (!data.title || !data.date || !data.category) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Obtener el ID del usuario de la sesión
    const userId = session.user.id;
    console.log('Creando evento para usuario:', userId);

    // Crear evento con Supabase
    const { data: event, error } = await supabase
      .from('events')
      .insert({
        title: data.title,
        date: data.date, // Supabase maneja el formato de fecha ISO
        time: data.time || '',
        location: data.location || '',
        category: data.category,
        description: data.description || '',
        image: data.image || '/placeholder.jpg',
        registration_url: data.registration_url || '',
        user_id: userId, // Asociar el evento con el usuario que lo crea
      })
      .select()
      .single();

    if (error) {
      console.error('Error Supabase al crear evento:', error);
      throw error;
    }

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error al crear evento:', error);
    return NextResponse.json(
      { error: 'Error al crear evento' },
      { status: 500 }
    );
  }
}
