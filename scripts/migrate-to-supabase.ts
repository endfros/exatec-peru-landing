/**
 * Script para migrar datos de Prisma SQLite a Supabase PostgreSQL
 *
 * Este script leerá los datos de la base de datos SQLite de Prisma
 * y los insertará en Supabase. Útil para la migración inicial.
 */

import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

// Inicializar Prisma para leer datos de SQLite
const prisma = new PrismaClient();

// Inicializar Supabase para escribir datos
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Variables de entorno de Supabase no configuradas.');
  console.error(
    'Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_KEY en tu archivo .env'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateData() {
  console.log('Iniciando migración de datos a Supabase...');

  // Migrar eventos
  try {
    console.log('Migrando eventos...');
    const events = await prisma.event.findMany();

    // Transformar fechas al formato ISO para Supabase
    const transformedEvents = events.map((event) => ({
      ...event,
      date: event.date.toISOString().split('T')[0], // Convertir a formato YYYY-MM-DD
      created_at: event.createdAt.toISOString(),
      updated_at: event.updatedAt.toISOString(),
      // Eliminar propiedades no necesarias en Supabase
      createdAt: undefined,
      updatedAt: undefined,
    }));

    // Insertar eventos en Supabase
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .upsert(transformedEvents, { onConflict: 'id' });

    if (eventsError) {
      throw eventsError;
    }

    console.log(`✓ ${events.length} eventos migrados correctamente.`);
  } catch (error) {
    console.error('Error al migrar eventos:', error);
  }

  // Migrar administradores
  try {
    console.log('Migrando administradores...');
    const admins = await prisma.admin.findMany();

    // Insertar admins en Supabase
    const { data: adminsData, error: adminsError } = await supabase
      .from('admins')
      .upsert(admins, { onConflict: 'email' });

    if (adminsError) {
      throw adminsError;
    }

    console.log(`✓ ${admins.length} administradores migrados correctamente.`);
  } catch (error) {
    console.error('Error al migrar administradores:', error);
  }

  console.log('¡Migración completada!');
}

// Ejecutar la migración
migrateData()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
