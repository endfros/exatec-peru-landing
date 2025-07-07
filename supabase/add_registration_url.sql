-- Añadir campo registration_url a la tabla events
ALTER TABLE events 
ADD COLUMN registration_url TEXT DEFAULT NULL;

-- Comentario para el campo
COMMENT ON COLUMN events.registration_url IS 'URL para registro al evento. Si existe, se mostrará un botón de registro';
