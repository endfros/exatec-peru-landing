'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 5;

  // Function to handle manual navigation
  const goToImage = (imageNum: number) => {
    setCurrentImage(imageNum);
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
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-white to-[#f0f7ff]">
      {/* Background decor */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0053c7]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#0053c7]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero content */}
      <div className="relative max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-[#0053c7] relative z-10">
            <div className="inline-block px-4 py-1 bg-[#0053c7]/10 rounded-full mb-4">
              <span className="text-sm font-semibold text-[#0053c7]">
                Red de Exalumnos del Tec de Monterrey
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-[#0053c7] to-[#0099ff] inline-block text-transparent bg-clip-text">
              EXATEC Perú
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#0053c7]/80 max-w-lg font-light leading-relaxed">
              Conectamos a los exalumnos del Tecnológico de Monterrey en Perú,
              creando una red de profesionales destacados.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/unete"
                className="px-8 py-4 bg-gradient-to-r from-[#0053c7] to-[#0076e3] text-white font-bold rounded-xl shadow-lg hover:shadow-[#0053c7]/30 hover:translate-y-[-2px] transition-all duration-300 text-lg border-0"
              >
                Únete a Nosotros
              </Link>
              <Link
                href="/quienes-somos"
                className="px-8 py-4 bg-white border-0 ring-2 ring-[#0053c7]/30 text-[#0053c7] font-bold rounded-xl hover:bg-[#f0f6ff] hover:shadow-md transition-all duration-300 text-lg"
              >
                Conoce más
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative h-[36rem] w-full">
            {/* Carousel for hero images */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0053c7]/20 to-transparent rounded-2xl backdrop-blur-sm flex items-center justify-center overflow-hidden w-full shadow-xl">
              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 z-10 p-2 bg-white/70 hover:bg-white text-[#0053c7] rounded-full shadow-md transition-all duration-300"
                aria-label="Imagen anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 z-10 p-2 bg-white/70 hover:bg-white text-[#0053c7] rounded-full shadow-md transition-all duration-300"
                aria-label="Imagen siguiente"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Images */}
              {[1, 2, 3, 4, 5].map((imgNum) => (
                <div
                  key={imgNum}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    currentImage === imgNum
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <Image
                    src={`/images/photo_${imgNum}.jpg`}
                    alt={`EXATEC Peru community ${imgNum}`}
                    fill
                    className="object-cover rounded-2xl"
                    priority={imgNum === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0053c7]/30 to-transparent rounded-2xl"></div>
                </div>
              ))}

              {/* Indicators */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
                {[1, 2, 3, 4, 5].map((imgNum) => (
                  <button
                    key={imgNum}
                    onClick={() => goToImage(imgNum)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentImage === imgNum
                        ? 'bg-white scale-125'
                        : 'bg-white/50 scale-100'
                    }`}
                    aria-label={`Ir a imagen ${imgNum}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
