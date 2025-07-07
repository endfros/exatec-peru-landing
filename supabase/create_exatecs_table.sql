-- Tabla exatecs para directorio EXATEC Perú (sin campo is_public)
create table if not exists exatecs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  graduation text,
  position text,
  company text,
  location text,
  sector text,
  linkedin text,
  bio text,
  terms_accepted boolean not null default false,
  created_at timestamptz not null default now()
);

-- Índices útiles
create index if not exists exatecs_email_idx on exatecs(email);
create index if not exists exatecs_location_idx on exatecs(location);
create index if not exists exatecs_sector_idx on exatecs(sector);

-- RLS: Solo lectura pública, solo inserción autenticados
alter table exatecs enable row level security;

-- Permitir SELECT a todos (directorio público)
create policy "Public read access" on exatecs
  for select using (true);

-- Permitir INSERT solo a usuarios autenticados
create policy "Authenticated insert" on exatecs
  for insert with check (auth.role() = 'authenticated');

-- Opcional: Solo el usuario puede actualizar/borrar su registro (si se implementa ownership)
-- create policy "User can update own" on exatecs
--   for update using (auth.uid() = user_id);
-- create policy "User can delete own" on exatecs
--   for delete using (auth.uid() = user_id);
