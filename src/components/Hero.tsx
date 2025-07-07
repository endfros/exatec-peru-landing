'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 5;

  // Function to handle manual navigation
  const goToImage = (imageNumber: number) => {
    setCurrentImage(imageNumber);
  };

  // Function to go to next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev === totalImages ? 1 : prev + 1));
  };

  // Function to go to previous image
  const prevImage = () => {
    setCurrentImage((prev) => (prev === 1 ? totalImages : prev - 1));
  };

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 3000); // 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-white">
      {/* Hero content */}
      <div className="relative max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-[#0053c7]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              EXATEC Perú
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#0053c7]/90 max-w-lg">
              Conectamos a los exalumnos del Tecnológico de Monterrey en Perú,
              creando una red de profesionales destacados.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/unete"
                className="px-6 py-3 bg-[#0053c7] text-white font-semibold rounded-md shadow-lg hover:bg-[#003a8c] transition duration-300 text-lg border-2 border-[#0053c7]"
              >
                Únete a Nosotros
              </Link>
              <Link
                href="/quienes-somos"
                className="px-6 py-3 bg-white border-2 border-[#0053c7] text-[#0053c7] font-semibold rounded-md hover:bg-[#f0f6ff] transition duration-300 text-lg"
              >
                Conoce más
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative h-[32rem] w-full">
            {/* Carousel for hero images */}
            <div className="absolute inset-0 bg-[#0053c7]/10 rounded-lg backdrop-blur-sm flex items-center justify-center overflow-hidden w-full">
              {/* Navigation buttons */}

              {/* Images */}
              {[1, 2, 3, 4, 5].map((imgNum) => (
                <div
                  key={imgNum}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    currentImage === imgNum ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={`/images/photo_${imgNum}.jpg`}
                    alt={`EXATEC Peru community ${imgNum}`}
                    fill
                    className="object-cover rounded-lg"
                    priority={imgNum === 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
