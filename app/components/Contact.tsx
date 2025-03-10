'use client';

import { Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
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
                      <p className="text-gray-400">contact@devopsday.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-purple-400 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Lugar del Evento</h3>
                      <p className="text-gray-400">
                        Tech Convention Center
                        <br />
                        123 Innovation Street
                        <br />
                        Lima, Peru
                      </p>
                    </div>
                  </div>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    />
                    <input
                      type="email"
                      placeholder="Tu correo"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Asunto"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  />
                  <textarea
                    placeholder="Tu mensaje detallado"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-400 text-white resize-none"
                  ></textarea>
                  <button className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Location Image and Map */}
            <div className="space-y-6">
              {/* Venue Image */}
              <div className="relative h-64 rounded-xl overflow-hidden border border-gray-800">
                <Image
                  src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=400&fit=crop"
                  alt="Tech Convention Center"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white font-bold text-2xl mb-2">Tech Convention Center</h3>
                    <p className="text-gray-200 text-lg">Lima Premier Tech Venue</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.980377989357!2d-77.03195518461371!3d-12.046654091460147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c6a5453c81%3A0x3ea0b5d1bb5f2d1b!2sPlaza%20Mayor%20de%20Lima!5m2!1s1en!2spe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
