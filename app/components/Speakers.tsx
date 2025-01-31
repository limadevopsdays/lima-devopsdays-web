"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

const speakers = [
  {
    name: 'Ana Martinez',
    role: 'DevOps Engineer',
    company: 'AWS',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Expert in cloud infrastructure',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Carlos Rodriguez',
    role: 'SRE Lead',
    company: 'Google',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Site reliability expert',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Maria Santos',
    role: 'Platform Engineer',
    company: 'Microsoft',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Platform engineering lead',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Juan Perez',
    role: 'DevSecOps',
    company: 'Red Hat',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Security automation expert',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Sofia Ramirez',
    role: 'Cloud Architect',
    company: 'Oracle',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    bio: 'Cloud solutions architect',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Diego Torres',
    role: 'DevOps Lead',
    company: 'IBM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Automation specialist',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Laura Vargas',
    role: 'SRE Manager',
    company: 'VMware',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    bio: 'Reliability expert',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Ricardo Silva',
    role: 'Cloud Engineer',
    company: 'Datadog',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    bio: 'Monitoring specialist',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Carmen Ruiz',
    role: 'DevOps Architect',
    company: 'GitLab',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    bio: 'CI/CD expert',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Pablo Mendoza',
    role: 'Platform Lead',
    company: 'Docker',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    bio: 'Container specialist',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Elena Castro',
    role: 'SRE Engineer',
    company: 'HashiCorp',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    bio: 'Infrastructure expert',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Miguel Angel',
    role: 'DevOps Engineer',
    company: 'Elastic',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop',
    bio: 'Observability specialist',
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
                    <h3 className="text-base font-bold text-white">{speaker.name}</h3>
                    <p className="text-sm text-[#1EBDD1]">{speaker.role}</p>
                    <p className="text-sm text-[#00A86B]">{speaker.company}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{speaker.bio}</p>
                <div className="flex space-x-3">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}