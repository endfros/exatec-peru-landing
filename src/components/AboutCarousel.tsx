'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AboutCarouselProps {
  images?: string[];
}

export default function AboutCarousel({ images = [] }: AboutCarouselProps) {
  const defaultImages = [
    '/images/photo_1.jpg',
    '/images/photo_2.jpg',
    '/images/photo_3.jpg',
    '/images/photo_4.jpg',
    '/images/photo_5.jpg',
    '/images/photo_6.jpeg',
  ];

  const carouselImages = images.length > 0 ? images : defaultImages;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`EXATEC Perú - Imagen ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0053c7]/60 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-150' : 'bg-white/50'
            }`}
            aria-label={`Ver imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-2 z-10">
        <Image
          src="/images/exatec_logo.svg"
          alt="EXATEC Logo"
          width={32}
          height={32}
          className="opacity-80"
        />
      </div>
    </div>
  );
}
