-- Script para actualizar la tabla exatecs en Supabase añadiendo nuevos campos
-- Ejecutar este script en la consola SQL de Supabase

-- Añadir campos sector, linkedin_url y terms_accepted
ALTER TABLE public.exatecs 
ADD COLUMN IF NOT EXISTS sector VARCHAR(100),
ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255),
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false NOT NULL;

-- Actualizar comentario para referencia
COMMENT ON TABLE public.exatecs IS 'Tabla de exalumnos del Tecnológico de Monterrey con campos adicionales para sector económico, LinkedIn y aceptación de términos';

-- Nota: No es necesario modificar las políticas RLS existentes ya que se mantiene la misma estructura de permisos
