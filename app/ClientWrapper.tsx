'use client';

import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import React from 'react';

const Navbar = dynamic(() => import('./components/Navbar'), {
  ssr: false
});

const Footer = dynamic(() => import('./components/Footer'), {
  ssr: false
});

const inter = Inter({ subsets: ['latin'] });

export default function ClientWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/devopsbird.svg" as="image" type="image/svg+xml" />
      </head>
      <div className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}