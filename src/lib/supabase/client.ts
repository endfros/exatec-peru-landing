'use client';

import { createClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from './browser';

// Definición de tipos para nuestras tablas de Supabase
export type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  image?: string;
  created_at: string;
  updated_at: string;
};

export type Admin = {
  id: number;
  username: string;
  email: string;
  password: string;
  name?: string;
};

export type Database = {
  public: {
    Tables: {
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>;
      };
      admins: {
        Row: Admin;
        Insert: Omit<Admin, 'id'>;
        Update: Partial<Omit<Admin, 'id'>>;
      };
    };
  };
};

// Estas variables deben ser actualizadas con tus credenciales de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Crea un cliente de Supabase con tipos
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Funciones de utilidad para el almacenamiento
export const uploadImage = async (
  file: File,
  bucket = 'events'
): Promise<string | null> => {
  try {
    // Usamos el cliente singleton de Supabase para asegurar que tenemos la sesión
    const supabaseClient = createBrowserSupabaseClient();

    // Verificamos si hay sesión activa
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();
    if (!session) {
      console.error('Error: No hay sesión activa para subir imágenes');
      throw new Error('No hay sesión activa');
    }

    // Debug: Mostrar usuario autenticado
    console.log('Subiendo imagen como usuario:', session.user.id);

    // Crea un nombre único para la imagen basado en la marca de tiempo y nombre original
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

    // Sube el archivo al bucket especificado usando el cliente singleton
    const { error } = await supabaseClient.storage
      .from(bucket)
      .upload(`images/${fileName}`, file);

    if (error) {
      console.error('Error al subir la imagen:', error);
      console.error('Código de error:', error.code, 'Mensaje:', error.message);
      return null;
    }

    // Obtiene la URL pública de la imagen
    const { data: publicUrlData } = supabaseClient.storage
      .from(bucket)
      .getPublicUrl(`images/${fileName}`);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error en el proceso de carga:', error);
    return null;
  }
};

// Función para eliminar una imagen
export const deleteImage = async (
  imageUrl: string,
  bucket = 'events'
): Promise<boolean> => {
  try {
    // Usamos el cliente singleton de Supabase
    const supabaseClient = createBrowserSupabaseClient();

    // Verificamos si hay sesión activa
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();
    if (!session) {
      console.error('Error: No hay sesión activa para eliminar imágenes');
      throw new Error('No hay sesión activa');
    }

    // Debug: Mostrar usuario autenticado
    console.log('Eliminando imagen como usuario:', session.user.id);

    // Extrae el nombre del archivo de la URL
    const urlParts = imageUrl.split('/');
    const filePath =
      urlParts[urlParts.length - 2] + '/' + urlParts[urlParts.length - 1];

    const { error } = await supabaseClient.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Error al eliminar la imagen:', error);
      console.error('Código de error:', error.code, 'Mensaje:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error en el proceso de eliminación:', error);
    return false;
  }
};
