'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AboutCarousel() {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 5;

  const goToImage = (imageNumber: number) => setCurrentImage(imageNumber);
  const nextImage = () =>
    setCurrentImage((prev) => (prev === totalImages ? 1 : prev + 1));
  const prevImage = () =>
    setCurrentImage((prev) => (prev === 1 ? totalImages : prev - 1));

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0053c7]/10 rounded-lg h-[32rem] w-full flex items-center justify-center relative overflow-hidden">
      <button
        onClick={prevImage}
        className="absolute left-2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all text-[#0053c7]"
        aria-label="Imagen anterior"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
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
      <button
        onClick={nextImage}
        className="absolute right-2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all text-[#0053c7]"
        aria-label="Siguiente imagen"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
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
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index + 1)}
            className={`w-3 h-3 rounded-full ${
              currentImage === index + 1 ? 'bg-white' : 'bg-white/50'
            } transition-all`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
