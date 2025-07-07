-- Script de verificación y reparación de la tabla events
-- Ejecutar este script directamente en la consola SQL de Supabase

-- 1. Verificar la estructura actual de la tabla events
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'events';

-- 2. Verificar las políticas RLS existentes
SELECT policy, tablename, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'events';

-- 3. Crear la columna user_id si no existe
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS user_id UUID;

-- 4. Verificar restricciones existentes
SELECT
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_schema AS foreign_table_schema,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM
    information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    LEFT JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE
    tc.table_schema = 'public'
    AND tc.table_name = 'events'
    AND tc.constraint_type = 'FOREIGN KEY';

-- 5. Eliminar restricción de clave externa si existe y causa problemas
-- ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_user_id_fkey;

-- 6. Crear restricción de clave externa que permita NULL
-- ALTER TABLE public.events 
-- ADD CONSTRAINT events_user_id_fkey 
-- FOREIGN KEY (user_id) REFERENCES auth.users(id) NOT VALID;

-- 7. Crear políticas RLS para la tabla events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública
DROP POLICY IF EXISTS "Permitir acceso de lectura a eventos" ON public.events;
CREATE POLICY "Permitir acceso de lectura a eventos" ON public.events
  FOR SELECT USING (true);

-- Permitir inserción para usuarios autenticados
DROP POLICY IF EXISTS "Permitir inserción para usuarios autenticados" ON public.events;
CREATE POLICY "Permitir inserción para usuarios autenticados" ON public.events
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Permitir actualización para usuarios autenticados
DROP POLICY IF EXISTS "Permitir actualización para usuarios autenticados" ON public.events;
CREATE POLICY "Permitir actualización para usuarios autenticados" ON public.events
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Permitir eliminación para usuarios autenticados
DROP POLICY IF EXISTS "Permitir eliminación para usuarios autenticados" ON public.events;
CREATE POLICY "Permitir eliminación para usuarios autenticados" ON public.events
  FOR DELETE
  USING (auth.role() = 'authenticated');
