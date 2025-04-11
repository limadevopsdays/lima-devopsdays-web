'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed w-full z-40 top-0 left-0">
      <div className="container mx-auto px-4">
        <nav
          className={`flex items-center transition-all duration-300 rounded-full mt-4 ${
            scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg border border-[#1EBDD1]/20' : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <div
                className={`transition-all duration-500 ${
                  scrolled ? 'opacity-0 -translate-y-full absolute' : 'opacity-100 translate-y-0'
                }`}
              >
                <Image
                  src="devopsbird.svg"
                  alt="DevOps Bird"
                  width={150}
                  height={150}
                  className="hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="flex-grow flex items-center justify-end px-6 py-2">
            {/* Title (visible when scrolled) */}
            <div
              className={`flex-shrink-0 mr-auto transition-all duration-500 flex items-center gap-2 ${
                scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
              }`}
            >
              <h1 className="font-['Montserrat_Alternates'] font-light text-2xl sm:text-3xl bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF] bg-clip-text text-transparent whitespace-nowrap">
                DevOpsDays
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="24"
                viewBox="0 0 36 24"
                fill="none"
                className="inline-block"
              >
                <g clipPath="url(#clip0_0_16)">
                  <rect width="36" height="24" fill="#FF4E4E" />
                  <path d="M36 0H0V24H36V0Z" fill="#D91023" />
                  <path d="M24 0H12V24H24V0Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_0_16">
                    <rect width="36" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#about" className="text-gray-300 hover:text-[#1EBDD1] transition-colors">
                Conócenos
              </Link>
              <Link href="/#speakers" className="text-gray-300 hover:text-[#1EBDD1] transition-colors">
                Ponentes
              </Link>
              <Link href="/#agenda" className="text-gray-300 hover:text-[#1EBDD1] transition-colors">
                Agenda
              </Link>
              <Link href="/#papers" className="text-gray-300 hover:text-[#1EBDD1] transition-colors">
                Convocatoria
              </Link>
              <Link href="/sponsors" className="text-gray-300 hover:text-[#1EBDD1] transition-colors">
                Patrocinadores
              </Link>
              <Link href="/#contact" className="text-gray-300 hover:text-[#1EBDD1] transition-colors">
                Contacto
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2">
              <div className="bg-black/90 backdrop-blur-md border border-[#1EBDD1]/20 rounded-lg px-2 py-3 space-y-1">
                <Link
                  href="/#about"
                  className="block px-3 py-2 text-gray-300 hover:text-[#1EBDD1] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sobre Nosotros
                </Link>
                <Link
                  href="/#speakers"
                  className="block px-3 py-2 text-gray-300 hover:text-[#1EBDD1] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Ponentes
                </Link>
                <Link
                  href="/#agenda"
                  className="block px-3 py-2 text-gray-300 hover:text-[#1EBDD1] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Agenda
                </Link>
                <Link
                  href="/#papers"
                  className="block px-3 py-2 text-gray-300 hover:text-[#1EBDD1] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Convocatoria
                </Link>
                <Link
                  href="/sponsors"
                  className="block px-3 py-2 text-gray-300 hover:text-[#1EBDD1] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Patrocinadores
                </Link>
                <Link
                  href="/#contact"
                  className="block px-3 py-2 text-gray-300 hover:text-[#1EBDD1] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
