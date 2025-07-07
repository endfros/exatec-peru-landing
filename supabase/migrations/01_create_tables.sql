-- Estas son las definiciones SQL para crear las tablas en Supabase
-- Puedes ejecutar estos scripts en el Editor SQL de Supabase

-- Tabla de eventos
CREATE TABLE IF NOT EXISTS public.events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT DEFAULT '/placeholder.jpg',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Función para actualizar automáticamente el campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en cada modificación
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabla de administradores
CREATE TABLE IF NOT EXISTS public.admins (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de seguridad para la tabla de eventos
-- Permitir lectura pública de los eventos
CREATE POLICY "Allow public read access" 
ON public.events
FOR SELECT 
USING (true);

-- Permitir CRUD solo a usuarios autenticados (ajustar según tu estrategia de autenticación)
CREATE POLICY "Allow authenticated CRUD" 
ON public.events
FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Configurar políticas de seguridad para la tabla de admins
-- Sólo permitir acceso a usuarios autenticados con rol específico (ajustar según tu estrategia)
CREATE POLICY "Only admin access"
ON public.admins
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Ejemplo de inserción de un administrador inicial (reemplazar con datos reales)
-- La contraseña debe estar hasheada antes de insertarse
INSERT INTO public.admins (username, email, password, name)
VALUES ('admin', 'admin@example.com', '$2a$10$YourHashedPasswordHere', 'Admin')
ON CONFLICT (username) DO NOTHING;
