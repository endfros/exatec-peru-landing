-- Script SQL para configurar correctamente las políticas RLS del bucket de Storage

-- Paso 1: Crear bucket si no existe (esto normalmente se hace por la UI pero lo incluimos para referencia)
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('events', 'events', true)
-- ON CONFLICT DO NOTHING;

-- Primero, asegurarnos de que RLS está activado
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes para evitar conflictos
DROP POLICY IF EXISTS "Lectura pública de imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Inserción de imágenes por usuarios autenticados" ON storage.objects;
DROP POLICY IF EXISTS "Actualización de imágenes por propietarios" ON storage.objects;
DROP POLICY IF EXISTS "Eliminación de imágenes por propietarios" ON storage.objects;

-- Paso 2: Crear políticas RLS para el bucket 'events'

-- Política para permitir lectura pública de archivos (SELECT)
CREATE POLICY "Lectura pública de imágenes" ON storage.objects
  FOR SELECT 
  USING (bucket_id = 'events');

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Inserción de imágenes por usuarios autenticados" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'events' AND
    auth.role() = 'authenticated'
  );

-- Política para permitir actualización solo a usuarios autenticados propietarios del archivo
-- (esto es importante si planeas implementar edición de imágenes)
CREATE POLICY "Actualización de imágenes por propietarios" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'events' AND
    auth.uid() = owner
  );

-- Política para permitir eliminación solo a usuarios autenticados propietarios del archivo
CREATE POLICY "Eliminación de imágenes por propietarios" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'events' AND
    auth.uid() = owner
  );

-- Paso 3: Modificar la tabla de eventos para incluir el user_id
-- Esto puede ser necesario si quieres asociar eventos con usuarios específicos
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Asegurarnos de que RLS está activado en la tabla events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Actualizar las políticas de la tabla de eventos para incluir el user_id
DROP POLICY IF EXISTS "Permitir edición para usuarios autenticados" ON public.events;
DROP POLICY IF EXISTS "Permitir acceso de lectura a eventos" ON public.events;

-- Política para permitir lectura pública
CREATE POLICY "Permitir acceso de lectura a eventos" ON public.events
  FOR SELECT USING (true);

-- Política para permitir edición a usuarios autenticados
CREATE POLICY "Permitir edición para usuarios autenticados" ON public.events
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Opcional: Si deseas que los usuarios solo puedan editar sus propios eventos
-- CREATE POLICY "Permitir edición para propietarios" ON public.events
--   FOR ALL 
--   USING (auth.uid() = user_id);
