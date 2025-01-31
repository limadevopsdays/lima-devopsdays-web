"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Logo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      <div className="fixed top-4 left-4 md:left-8 lg:left-12 z-50">
        <Link href="/" className="block">
          <div className={`transition-all duration-500 ${
            scrolled ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
          }`}>
            <Image
              src="/devopsbird.svg"
              alt="DevOps Bird"
              width={200}
              height={200}
              className="hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>
        </Link>
      </div>
    </div>
  );
}