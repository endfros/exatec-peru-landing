-- Script para solucionar problemas inmediatos con Supabase Storage y Events
-- Ejecutar este script directamente en la consola SQL de Supabase

-- 1. Solucionar problemas de almacenamiento manteniendo seguridad
-- Asegurar que RLS está habilitado (esto es lo que hace segura a tu aplicación)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Limpiar las políticas existentes para evitar conflictos
DROP POLICY IF EXISTS "Lectura pública de imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Inserción de imágenes por usuarios autenticados" ON storage.objects;
DROP POLICY IF EXISTS "Actualización de imágenes por propietarios" ON storage.objects;
DROP POLICY IF EXISTS "Eliminación de imágenes por propietarios" ON storage.objects;

-- Crear política de LECTURA segura que permita a todos ver las imágenes (esto es necesario)
CREATE POLICY "Lectura pública de imágenes" ON storage.objects
  FOR SELECT 
  USING (bucket_id = 'events');

-- Crear política de INSERCIÓN segura que solo permite a usuarios autenticados
-- Esta es la política clave que resolverá el error 403
CREATE POLICY "Inserción de imágenes por usuarios autenticados" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'events' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = 'images'
  );

-- 2. Solucionar problemas con la tabla de eventos manteniendo seguridad
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Limpiar políticas de events
DROP POLICY IF EXISTS "Permitir edición para usuarios autenticados" ON public.events;
DROP POLICY IF EXISTS "Permitir acceso de lectura a eventos" ON public.events;

-- Permitir lectura pública (esto es seguro ya que solo permite SELECT)
CREATE POLICY "Permitir acceso de lectura a eventos" ON public.events
  FOR SELECT USING (true);

-- Políticas específicas para cada operación de escritura
-- Esto es más seguro que una política genérica "FOR ALL"
CREATE POLICY "Permitir inserción para usuarios autenticados" ON public.events
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir actualización para creadores" ON public.events
  FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND 
    (user_id IS NULL OR auth.uid() = user_id)
  );

CREATE POLICY "Permitir eliminación para creadores" ON public.events
  FOR DELETE
  USING (
    auth.role() = 'authenticated' AND 
    (user_id IS NULL OR auth.uid() = user_id)
  );

-- 3. Verificar la estructura de la tabla events
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Asegurarse de que los eventos existentes sigan siendo accesibles
-- Actualizar eventos existentes que no tengan user_id 
-- con un usuario admin para mantener consistencia
-- Reemplaza 'ID_DEL_USUARIO_ADMIN' con el ID real de tu usuario admin
-- UPDATE public.events SET user_id = 'ID_DEL_USUARIO_ADMIN' WHERE user_id IS NULL;

-- 4. Políticas adicionales para Storage
-- Política para actualizar objetos (importante para reemplazar imágenes)
CREATE POLICY "Actualización de imágenes por usuarios autenticados" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'events' AND
    auth.role() = 'authenticated'
  );

-- Política para eliminar objetos
CREATE POLICY "Eliminación de imágenes por usuarios autenticados" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'events' AND
    auth.role() = 'authenticated'
  );

-- 5. Comandos para depuración (NO EJECUTAR a menos que sea absolutamente necesario)
-- Estos comandos NO son recomendados porque reducen la seguridad
-- Solo están aquí como último recurso

-- Verificar conflictos RLS (solo informativo, no modifica nada)
SELECT policy, tablename, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'storage' AND tablename = 'objects';

-- ADVERTENCIA: Esto desactiva temporalmente RLS solo para Storage
-- Solo usar durante depuración y volver a activar inmediatamente
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
