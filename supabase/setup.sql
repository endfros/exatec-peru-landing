-- Ejecutar este script en la consola SQL de Supabase

-- Crear la tabla de eventos
CREATE TABLE IF NOT EXISTS public.events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) DEFAULT '/placeholder.jpg',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS (Row Level Security) para eventos
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla de eventos
-- Cualquiera puede ver eventos
CREATE POLICY "Permitir acceso de lectura a eventos" ON public.events
  FOR SELECT USING (true);

-- Solo usuarios autenticados pueden crear/modificar/eliminar eventos
CREATE POLICY "Permitir edición para usuarios autenticados" ON public.events
  FOR ALL USING (auth.role() = 'authenticated');

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar el campo updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Evento de prueba
INSERT INTO public.events (title, date, time, location, category, description)
VALUES 
('Networking EXATEC', '2025-07-20', '18:00', 'Hotel Marriott Lima', 'Networking', 'Evento de networking para la comunidad EXATEC en Perú. Una excelente oportunidad para conocer otros egresados y expandir tu red profesional.')
ON CONFLICT DO NOTHING;
