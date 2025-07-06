'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    if (!isAboutDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAboutDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAboutDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isAboutDropdownOpen) setIsAboutDropdownOpen(false);
  };

  // Open dropdown on click or hover
  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen((open) => !open);
  };
  // These functions were not being used and have been commented out
  // const openAboutDropdown = () => setIsAboutDropdownOpen(true);
  // const closeAboutDropdown = () => setIsAboutDropdownOpen(false);

  return (
    <nav className="bg-[#0053c7] shadow-md sticky top-0 z-50 py-2 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between min-h-[96px] md:min-h-[112px] items-center">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/exatec_logo.svg"
                  alt="EXATEC Perú Logo"
                  width={160}
                  height={120}
                  className="invert"
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* El logo ya es el link a inicio, se elimina el botón de Inicio */}

            {/* About dropdown */}
            <div className="relative" ref={aboutDropdownRef}>
              <button
                onClick={toggleAboutDropdown}
                className="text-white hover:bg-primary/80 px-5 py-3 rounded-lg font-bold text-lg flex items-center transition duration-200"
                aria-haspopup="true"
                aria-expanded={isAboutDropdownOpen}
                tabIndex={0}
              >
                Quienes Somos
                <svg
                  className="ml-1 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              {/* Desktop dropdown */}
              <div
                className={`absolute left-0 mt-2 w-64 bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out
                  ${
                    isAboutDropdownOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                style={{ borderRadius: '6px' }}
                aria-hidden={!isAboutDropdownOpen}
              >
                <div className="py-2">
                  <Link
                    href="/quienes-somos"
                    className="block px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    Misión y Visión
                  </Link>
                  <Link
                    href="/mesa-directiva"
                    className="block px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    Mesa Directiva
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/eventos"
              className="text-white hover:bg-primary/80 px-5 py-3 rounded-lg font-bold text-lg transition duration-200"
            >
              Calendario de Eventos
            </Link>

            <Link
              href="/directorio"
              className="text-white hover:bg-primary/80 px-5 py-3 rounded-lg font-bold text-lg transition duration-200"
            >
              Directorio Empresarial
            </Link>

            <Link
              href="/unete"
              className="bg-white text-primary font-bold text-lg px-4 py-2 rounded-lg shadow-lg border-4 border-white ml-2 transition duration-300 hover:border-black hover:text-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ boxShadow: '0 4px 16px 0 rgba(0,83,199,0.10)' }}
            >
              Únete
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
          >
            Inicio
          </Link>

          <button
            onClick={toggleAboutDropdown}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 flex justify-between items-center"
          >
            Quienes Somos
            <svg
              className="ml-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {isAboutDropdownOpen && (
            <div className="pl-4 border-l-2 border-gray-200 ml-3">
              <Link
                href="/quienes-somos"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              >
                Misión y Visión
              </Link>
              <Link
                href="/mesa-directiva"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              >
                Mesa Directiva
              </Link>
            </div>
          )}

          <Link
            href="/eventos"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
          >
            Calendario de Eventos
          </Link>

          <Link
            href="/directorio"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
          >
            Directorio Empresarial
          </Link>

          <Link
            href="/unete"
            className="block rounded-md text-base font-bold bg-primary text-white hover:bg-blue-700 text-center px-4 py-2 mt-2 shadow-lg"
          >
            Únete
          </Link>
        </div>
      </div>
    </nav>
  );
}
