-- Script para crear la tabla exatecs en Supabase
-- Ejecutar este script en la consola SQL de Supabase

-- Crear tabla de exatecs (exalumnos del Tecnológico de Monterrey)
CREATE TABLE IF NOT EXISTS public.exatecs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  career VARCHAR(255) NOT NULL,
  graduation_year VARCHAR(4) NOT NULL,
  sector VARCHAR(100),
  linkedin_url VARCHAR(255),
  terms_accepted BOOLEAN DEFAULT false NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pendiente', -- pendiente, aprobado, rechazado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS (Row Level Security) para la tabla exatecs
ALTER TABLE public.exatecs ENABLE ROW LEVEL SECURITY;

-- Política de lectura: solo los usuarios autenticados pueden ver los registros
CREATE POLICY "Permitir acceso de lectura a admins" ON public.exatecs
  FOR SELECT USING (auth.role() = 'authenticated');

-- Política de inserción: todos pueden crear registros (para el formulario público)
CREATE POLICY "Permitir inserción para todos" ON public.exatecs
  FOR INSERT WITH CHECK (true);

-- Políticas de actualización/eliminación: solo administradores
CREATE POLICY "Permitir actualización para admins" ON public.exatecs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir eliminación para admins" ON public.exatecs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger para la tabla exatecs
DROP TRIGGER IF EXISTS update_exatecs_updated_at ON public.exatecs;
CREATE TRIGGER update_exatecs_updated_at
  BEFORE UPDATE ON public.exatecs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
