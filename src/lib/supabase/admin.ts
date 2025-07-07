import { createClient } from '@supabase/supabase-js';

// Este cliente usa la clave de servicio para operaciones privilegiadas del lado del servidor
// Como la creación, actualización y eliminación de datos
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

// Cliente de Supabase con privilegios de administrador para operaciones del lado del servidor
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
