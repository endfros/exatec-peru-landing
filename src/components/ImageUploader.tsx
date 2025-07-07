'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/lib/supabase/client';

type ImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  defaultImageUrl?: string;
};

export default function ImageUploader({
  value,
  onChange,
  defaultImageUrl = '/placeholder.jpg',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    value || defaultImageUrl
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar que el archivo es una imagen
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor, selecciona un archivo de imagen válido.');
      return;
    }

    // Validar el tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('La imagen es demasiado grande. El tamaño máximo es 5MB.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Crear una URL local para previsualizar
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      console.log('Iniciando subida de imagen a Supabase...');

      // Subir a Supabase
      const imageUrl = await uploadImage(file);

      if (imageUrl) {
        console.log('Imagen subida exitosamente:', imageUrl);
        onChange(imageUrl);
        // Limpiamos la URL local una vez que tenemos la URL de Supabase
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(imageUrl);
      } else {
        setUploadError(
          'Error al subir la imagen. Verifica que estás autenticado e inténtalo de nuevo.'
        );
        setPreviewUrl(value || defaultImageUrl);
      }
    } catch (error: any) {
      console.error('Error detallado al subir imagen:', error);

      // Mensaje más descriptivo según el tipo de error
      let errorMessage = 'Error al subir la imagen. ';

      if (error.message === 'No hay sesión activa') {
        errorMessage +=
          'No has iniciado sesión o tu sesión ha expirado. Inicia sesión nuevamente.';
      } else if (error.code === 'PGRST301') {
        errorMessage +=
          'No tienes permisos para subir imágenes. Verifica tu rol de usuario.';
      } else if (error.message?.includes('network')) {
        errorMessage +=
          'Problema de conexión. Verifica tu conexión a internet.';
      } else {
        errorMessage += 'Inténtalo de nuevo o contacta al administrador.';
      }

      setUploadError(errorMessage);
      setPreviewUrl(value || defaultImageUrl);
    } finally {
      setIsUploading(false);
      // Limpiar el input de archivo para permitir seleccionar el mismo archivo de nuevo
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handlePasteUrl = () => {
    const url = prompt('Introduce la URL de la imagen:');
    if (url && url.trim()) {
      setPreviewUrl(url);
      onChange(url);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleClick}
        >
          <div className="flex flex-col items-center">
            {isUploading ? (
              <div className="p-4 text-center">
                <div className="w-8 h-8 border-4 border-t-[#0053c7] border-r-[#0053c7] border-b-[#0053c7]/30 border-l-[#0053c7]/30 rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Subiendo imagen...</p>
              </div>
            ) : (
              <>
                <div className="aspect-video w-full relative rounded-md overflow-hidden mb-4">
                  <Image
                    src={previewUrl}
                    alt="Vista previa"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    onError={() => {
                      console.error('Error cargando imagen:', previewUrl);
                      setPreviewUrl(defaultImageUrl);
                      setUploadError(
                        'Error al cargar la imagen. Verifica que la URL es válida o que el dominio está configurado en next.config.js'
                      );
                    }}
                  />
                </div>
                <div className="flex items-center justify-center p-3 bg-[#0053c7] rounded-md text-white hover:bg-[#003a8c] transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Subir Imagen
                </div>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePasteUrl}
            className="text-sm text-[#0053c7] hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 11-5.656 5.656l-1.1-1.1"
              />
            </svg>
            Usar URL externa
          </button>
          {value && value !== defaultImageUrl && (
            <span className="text-xs text-gray-500 truncate max-w-[200px]">
              {value.split('/').pop()}
            </span>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="text-red-500 text-sm mt-1">{uploadError}</div>
      )}
    </div>
  );
}
