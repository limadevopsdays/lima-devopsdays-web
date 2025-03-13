"use client";

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Loading from './components/Loading';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Users, Presentation, Store, MapPin } from "lucide-react";

// Dynamically import components with explicit SSR false
const AboutUs = dynamic(() => import('./components/AboutUs'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Speakers = dynamic(() => import('./components/Speakers'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Agenda = dynamic(() => import('./components/Agenda'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const CallForPapers = dynamic(() => import('./components/CallForPapers'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Sponsors = dynamic(() => import('./components/Sponsors'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Contact = dynamic(() => import('./components/Contact'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || loading) return <Loading />;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8C51BF]/20 via-black to-black" />
        <div className="absolute inset-0">
          <div className="grid-background animate-grid-flow" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF] animate-pulse">
              DevOpsDays 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Únete a la conferencia DevOps más innovadora en Perú
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {/* <button className="px-8 py-3 bg-[#00A86B] hover:bg-[#00A86B]/80 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105">
                Regístrate Ahora
              </button> */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-8 py-3 border-2 border-[#1EBDD1] text-[#1EBDD1] hover:bg-[#1EBDD1]/10 rounded-full transition-all duration-300 transform hover:scale-105">
                    Más Información
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-black/95 border border-[#1EBDD1] p-6 rounded-xl backdrop-blur-lg max-w-md">
                  <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF] mb-4">
                    Detalles del Evento
                  </DialogTitle>
                  <div className="space-y-6">
                    {/* Event details content */}
                    <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3 text-[#1EBDD1] mb-2">
                        <Calendar className="w-5 h-5" />
                        <h3 className="text-lg font-semibold">Fecha y Hora</h3>
                      </div>
                      <p className="text-gray-300 ml-8">Jueves 21 de Agosto, 2025</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3 text-[#1EBDD1] mb-2">
                        <MapPin className="w-5 h-5" />
                        <h3 className="text-lg font-semibold">Lugar</h3>
                      </div>
                      <p className="text-gray-300 ml-8">ESAN Convention & Sport Center</p>
                    </div>

                    {/* Additional event details */}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <AboutUs />
      <Speakers />
      <Agenda />
      <CallForPapers />
      <Sponsors />
      <Contact />
    </main>
  );
}