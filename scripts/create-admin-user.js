/**
 * Script para crear un usuario administrador en Supabase
 *
 * Uso:
 * - Configura tu archivo .env con las credenciales de Supabase
 * - Ejecuta: npm run create-admin-user "email" "password"
 */

import { createClient } from '@supabase/supabase-js';

// Variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Error: Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
  process.exit(1);
}

// Credenciales del usuario a crear
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Error: Debes proporcionar un email y contraseña.');
  console.error(
    'Uso: npm run create-admin-user "email@ejemplo.com" "contraseña"'
  );
  process.exit(1);
}

// Verificar que la contraseña tenga al menos 6 caracteres
if (password.length < 6) {
  console.error('Error: La contraseña debe tener al menos 6 caracteres.');
  process.exit(1);
}

async function createAdminUser() {
  try {
    // Crear cliente de Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log(`Creando usuario: ${email}`);

    // Crear usuario con email y contraseña
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error al crear usuario:', error.message);
      process.exit(1);
    }

    if (data?.user) {
      console.log('✅ Usuario creado exitosamente!');
      console.log('ID:', data.user.id);
      console.log('Email:', data.user.email);
      console.log('Creado:', new Date(data.user.created_at).toLocaleString());
      console.log(
        '\nEl usuario debe confirmar su email antes de poder iniciar sesión.'
      );
    } else {
      console.log('⚠️ Usuario creado, pero no se recibieron datos.');
    }
  } catch (error) {
    console.error('Error inesperado:', error);
    process.exit(1);
  }
}

createAdminUser();
