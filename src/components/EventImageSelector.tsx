'use client';

import { useState } from 'react';
import Image from 'next/image';

// Imágenes predefinidas para eventos
const PREDEFINED_IMAGES = [
  '/placeholder.jpg',
  'https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg',
  'https://img.freepik.com/free-photo/medium-shot-people-coworking_23-2149323550.jpg',
  'https://media.licdn.com/dms/image/v2/D4E22AQFx72W5izXmwQ/feedshare-shrink_800/B4EZfISgR2GcAw-/0/1751411984825?e=1754524800&v=beta&t=nP4ptLHxXcZCK48Ltx5-4w8FNq-J3jGHWzFDuEvz2X4', // Ejemplo de LinkedIn
  'https://img.freepik.com/free-photo/colleagues-giving-fist-bump_53876-64617.jpg',
];

type EventImageSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function EventImageSelector({
  value,
  onChange,
}: EventImageSelectorProps) {
  const [useCustomUrl, setUseCustomUrl] = useState(
    !PREDEFINED_IMAGES.includes(value)
  );
  const [customUrl, setCustomUrl] = useState(useCustomUrl ? value : 'https://');

  const handleImageSelect = (imagePath: string) => {
    onChange(imagePath);
    setUseCustomUrl(false);
  };

  const handleCustomUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setCustomUrl(url);
    if (useCustomUrl) {
      onChange(url);
    }
  };

  const handleUseCustomUrl = () => {
    setUseCustomUrl(true);
    onChange(customUrl);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {PREDEFINED_IMAGES.map((img) => (
          <div
            key={img}
            className={`relative cursor-pointer border-2 rounded-md overflow-hidden ${
              !useCustomUrl && value === img
                ? 'border-[#0053c7] ring-2 ring-[#0053c7]/50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleImageSelect(img)}
          >
            <div className="aspect-video relative">
              <Image
                src={img}
                alt="Imagen predefinida para evento"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
            {!useCustomUrl && value === img && (
              <div className="absolute top-2 right-2 bg-[#0053c7] text-white p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
        <div
          className={`border-2 rounded-md overflow-hidden cursor-pointer flex items-center justify-center aspect-video ${
            useCustomUrl
              ? 'border-[#0053c7] ring-2 ring-[#0053c7]/50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={handleUseCustomUrl}
        >
          <div className="text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-auto mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
            <span className="text-sm font-medium">URL personalizada</span>
          </div>
        </div>
      </div>

      {useCustomUrl && (
        <div className="mt-4">
          <label
            htmlFor="customUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            URL de la imagen
          </label>
          <input
            type="url"
            id="customUrl"
            value={customUrl}
            onChange={handleCustomUrlChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053c7] focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ingresa la URL completa de una imagen ya publicada en internet
          </p>

          {customUrl && (
            <div className="mt-4 border rounded-md p-2">
              <p className="text-sm font-medium mb-2">Vista previa:</p>
              <div className="aspect-video relative rounded overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={customUrl}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                    // Mostrar un mensaje de error
                    const container = e.currentTarget.parentElement;
                    if (container) {
                      const errorMsg = document.createElement('div');
                      errorMsg.className =
                        'absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white p-3 text-center text-sm';
                      errorMsg.textContent =
                        'No se pudo cargar esta imagen. Puede que la URL haya expirado o no permita acceso externo.';
                      container.appendChild(errorMsg);
                    }
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Nota:</strong> Si usas imágenes de redes sociales (como
                LinkedIn), las URLs pueden expirar con el tiempo y la imagen
                dejará de mostrarse.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
