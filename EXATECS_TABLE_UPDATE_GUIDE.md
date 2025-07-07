# Actualización de Tabla Exatecs en Supabase

Esta guía describe cómo actualizar la tabla `exatecs` en Supabase para incluir los nuevos campos requeridos para el registro de exalumnos.

## Campos nuevos añadidos

1. **sector** (VARCHAR(100)): Sector económico en el que trabaja el exalumno
2. **linkedin_url** (VARCHAR(255)): URL del perfil de LinkedIn del exalumno
3. **terms_accepted** (BOOLEAN): Confirmación de aceptación de términos y condiciones

## Instrucciones para actualizar la base de datos

### 1. Ejecutar el script de actualización

1. Inicia sesión en la [consola de administración de Supabase](https://app.supabase.io)
2. Selecciona tu proyecto
3. Ve a la sección "SQL Editor" (o "SQL")
4. Copia el contenido del archivo `supabase/update_exatecs_table.sql`
5. Pega el script en el editor SQL
6. Ejecuta la consulta haciendo clic en el botón "Run" o "Ejecutar"

```sql
-- Script para actualizar la tabla exatecs en Supabase añadiendo nuevos campos
ALTER TABLE public.exatecs
ADD COLUMN IF NOT EXISTS sector VARCHAR(100),
ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255),
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false NOT NULL;
```

### 2. Verificar que los campos se hayan añadido correctamente

Ejecuta la siguiente consulta SQL para verificar la estructura de la tabla:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'exatecs' AND table_schema = 'public';
```

Deberías ver los nuevos campos en la lista:

- sector (character varying)
- linkedin_url (character varying)
- terms_accepted (boolean)

### 3. (Opcional) Actualizar registros existentes

Si tienes registros existentes en la tabla, puedes establecer valores predeterminados para el campo `terms_accepted`:

```sql
UPDATE public.exatecs
SET terms_accepted = true
WHERE terms_accepted IS NULL;
```

## Políticas de seguridad (RLS)

Las políticas de seguridad existentes ya permiten:

- Inserción pública (para el formulario de registro)
- Lectura, actualización y eliminación solo para usuarios autenticados (administradores)

No se requieren cambios adicionales en las políticas RLS.

## Validación del formulario

El formulario actualizado en la página "Únete" ahora incluye:

- Un desplegable para seleccionar el sector económico
- Un campo para ingresar la URL de LinkedIn
- Un checkbox obligatorio para aceptar los términos y condiciones

Estos campos se envían correctamente a la tabla `exatecs` en Supabase cuando el usuario completa el formulario.
