"use client";

import { Mail, MapPin, Share2, Twitter,Linkedin,Github,Instagram,Users } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';





export default function Contact() {

  const personas = [
    { id: 1, nombre: "Lenard Vega", foto: "/img/lenard.jpg", url: "https://www.linkedin.com/in/lenardvega/" },
    { id: 2, nombre: "Danilo Briceño", foto: "/img/danilo.jpg", url: "https://www.linkedin.com/in/danbreu/" },
    { id: 3, nombre: "Gino Leon", foto: "/img/gino.jpg", url: "https://www.linkedin.com/in/gino-leon-0217a23b/" },
    { id: 4, nombre: "Mario Inga", foto: "/img/mario.jpg", url: "https://www.linkedin.com/in/mario21ic/" },
    { id: 5, nombre: "Edgard Pimentel", foto: "/img/edgard.jpg", url: "https://www.linkedin.com/in/edgard-pimentel-rojas-79453130/" },
    { id: 6, nombre: "Doris Manrique", foto: "/img/doris.jpg", url: "https://www.linkedin.com/in/dorismanrique/" }
  ];
  
  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Contáctanos
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form and Info */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
              <div className="space-y-8">
                <div className="space-y-6">

                  <div className="flex items-start space-x-4">
                    <Mail className="text-cyan-400 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Escríbenos</h3>
                      <p className="text-gray-400">contacto@devopsdays.pe</p>
                    </div>
                    
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-cyan-400 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Lugar del Evento</h3>
                      <p className="text-gray-400">ESAN Convention & Sport Center<br />Alonso de Molina 1652, Monterrico, Surco<br />Lima, Peru</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Share2 className="text-cyan-400 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Síguenos</h3>
                      <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/devops-days-lima/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-[#1EBDD1] hover:bg-gray-800 transition-all duration-300"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/devops-days-lima/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-[#1EBDD1] hover:bg-gray-800 transition-all duration-300"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://github.com/limadevopsdays/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-[#1EBDD1] hover:bg-gray-800 transition-all duration-300"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/devopsdayslima/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-[#1EBDD1] hover:bg-gray-800 transition-all duration-300"
              >
                <Instagram size={20} />
              </Link>
            </div>                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Users className="text-cyan-400 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Organizadores</h3>
                      <div className="w-full p-2 rounded shadow-sm">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {personas.map((persona) => (
      <div key={persona.id} className="flex items-center py-2 space-x-3">
        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10">
          <Image
            src={persona.foto}
            alt={`Foto de ${persona.nombre}`}
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
        </div>
        <div className="min-w-0 flex-1">
          <Link 
            href={persona.url}
            target="_blank"
            className="text-sm font-medium text-gray-400 hover:text-cyan-400 truncate"
          >
            {persona.nombre}
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* Location Image and Map */}
            <div className="space-y-6">
              {/* Venue Image */}
              <div className="relative h-64 rounded-xl overflow-hidden border border-gray-800">
                <Image
                  src="/img/esan.jpg"
                  alt="Tech Convention Center"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white font-bold text-2xl mb-2">ESAN Convention & Sport Center</h3>
                    <p className="text-gray-200 text-lg">Auditorio Central</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1033576775512!2d-76.96564381593701!3d-12.105076312382026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7686994faa1%3A0x267fc6c15b492e7!2sESAN%20Centro%20de%20Convenciones!5e0!3m2!1sen!2sca!4v1741846833077!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}