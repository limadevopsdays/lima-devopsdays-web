'use client';

import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import React from 'react';

const Navbar = dynamic(() => import('./components/Navbar'), {
  ssr: false,
});

const Footer = dynamic(() => import('./components/Footer'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
