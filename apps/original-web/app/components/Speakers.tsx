"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

const speakers = [
  {
    name: 'TBD0',
    role: 'DevOps Engineer',
    company: 'Sector E-Commerce',
    image: 'img/photo1.png',
    bio: 'Experto Infraestructura Cloud',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'TBD1',
    role: 'SRE Lead',
    company: 'Sector Bancario',
    image: 'img/photo2.png',
    bio: 'Líder en Site Reliability ',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'TBD2',
    role: 'Platform Engineer',
    company: 'Sector AI',
    image: 'img/photo3.png',
    bio: 'Ingeniero de Plataformas',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'TB3',
    role: 'DevSecOps',
    company: 'Sector Software',
    image: 'img/photo4.png',
    bio: 'Experto en Automatización',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
];

export default function Speakers() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.speaker-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="speakers" className="py-20 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF]">
          Ponentes Destacados
        </h2>
        <h3 className="text-2xl font-bold text-center text-gray-400 mb-8"> ¡Atención! Muy pronto te presentaremos a nuestros speakers.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {speakers.map((speaker, index) => (
            <div
              key={speaker.name}
              className="speaker-card opacity-0 translate-y-10 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-xl border border-[#1EBDD1]/20 hover:border-[#1EBDD1]/40 transition-all duration-300 group">
                <div className="relative mb-3">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      width={400}
                      height={400}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    {/* <h3 className="text-base font-bold text-white">{speaker.name}</h3> */}
                    <p className="text-sm text-[#1EBDD1]">{speaker.role}</p>
                    <p className="text-sm text-[#00A86B]">{speaker.company}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{speaker.bio}</p>
                {/* <div className="flex space-x-3">
                  <a href={speaker.social.twitter} className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                    <Twitter size={16} />
                  </a>
                  <a href={speaker.social.linkedin} className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                    <Linkedin size={16} />
                  </a>
                  <a href={speaker.social.github} className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                    <Github size={16} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                    <Globe size={16} />
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}