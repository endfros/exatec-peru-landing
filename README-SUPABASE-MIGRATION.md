# Migración a Supabase - EXATEC Perú

## Solución del error 400/403 en la subida de imágenes

Se ha resuelto el error que ocurría al intentar subir imágenes a Supabase Storage, caracterizado por errores 400 (Bad Request) o 403 (Unauthorized) y mensajes de "violates row-level security policy".

### Cambios realizados

1. **Actualización del cliente Supabase para imágenes**

   - Se modificó `uploadImage` y `deleteImage` en `src/lib/supabase/client.ts` para usar el cliente singleton `createBrowserSupabaseClient()`
   - Se agregó verificación de sesión antes de subir/eliminar imágenes
   - Se agregaron logs de depuración

2. **Configuración de políticas RLS para Storage**

   - Se creó el script `supabase/storage_setup.sql` con las políticas correctas
   - Se definieron permisos para lectura pública y escritura autenticada
   - Se agregó validación de `owner` en las políticas

3. **Implementación de user_id en eventos**

   - Se modificó la tabla `events` para incluir un campo `user_id` que referencia a `auth.users(id)`
   - Se actualizaron las APIs para usar correctamente la sesión de Supabase y el user_id

4. **Mejora del manejo de errores**
   - Se agregó información de depuración más descriptiva
   - Se mejoró el manejo de errores en el componente `ImageUploader`

## Cómo aplicar la solución

1. Ejecuta el script SQL para configurar las políticas RLS:

   ```bash
   # En la consola SQL de Supabase
   # Copiar y ejecutar el contenido de supabase/storage_setup.sql
   ```

2. Verifica la configuración del bucket:
   - El bucket "events" debe estar marcado como público
   - Las políticas RLS deben permitir subida solo a usuarios autenticados

## Explicación técnica del problema

El error ocurría por tres razones principales:

1. **Inconsistencia en la sesión de autenticación**: El cliente de Supabase usado no mantenía la sesión correctamente entre diferentes partes de la aplicación.

2. **Políticas RLS mal configuradas**: Las políticas de Row Level Security no estaban correctamente definidas para el bucket de Storage.

3. **Falta de user_id en operaciones de Storage**: Al subir archivos, no se estaba estableciendo correctamente el "propietario" (owner) del archivo.

La solución implementa el patrón recomendado por Supabase:

```sql
-- Permitir operaciones solo cuando el usuario autenticado es propietario
USING (auth.uid() = owner)
```

## Comprobación de la solución

Para verificar que la solución funciona:

1. Inicia sesión como administrador
2. Ve a la sección de gestión de eventos
3. Intenta crear un evento con imagen
4. Verifica que la imagen se sube correctamente

Si encuentras algún problema, revisa la consola del navegador para ver mensajes detallados y consulta el archivo `SUPABASE_STORAGE_FIX.md` para más información.

## Actualización del formulario "Únete" con nuevos campos

Se ha actualizado el formulario de la página "Únete" para incluir nuevos campos y mejorar el registro de exalumnos.

### Cambios realizados:

1. **Nuevos campos añadidos al formulario**:

   - **Sector económico**: Desplegable para seleccionar el sector en el que trabaja el exalumno
   - **URL de LinkedIn**: Campo para ingresar el perfil profesional
   - **Aceptación de términos**: Checkbox obligatorio para aceptar los términos y condiciones

2. **Actualización de la tabla `exatecs` en Supabase**:
   - Se creó el script `supabase/update_exatecs_table.sql` para añadir los nuevos campos
   - Se actualizó el script original `supabase/exatecs_table.sql` para incluir estos campos en nuevas instalaciones

### Cómo aplicar los cambios:

1. Ejecuta el script SQL para actualizar la tabla existente:

   ```bash
   # En la consola SQL de Supabase
   # Copiar y ejecutar el contenido de supabase/update_exatecs_table.sql
   ```

2. Verifica el funcionamiento del formulario:
   - Accede a la página "Únete"
   - Completa el formulario con todos los campos
   - Verifica que los datos se guarden correctamente en la tabla `exatecs`

Para más detalles, consulta el archivo `EXATECS_TABLE_UPDATE_GUIDE.md`.
