"use client";

import Link from 'next/link';
import { Mail, MapPin, Phone, Twitter, Linkedin, Github, Heart, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#1EBDD1]/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF]">
              Visión DevOpsDay Lima
            </h3>
            <p className="text-gray-400">
            Ser el hub de la transformación tecnológica en Perú, brindando a los participantes inspiración, conocimiento y herramientas para liderar el cambio.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF]">
              Enlaces
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                  Conócenos
                </Link>
              </li>
              <li>
                <Link href="/#speakers" className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/#agenda" className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="/#papers" className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                  Call for Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF]">
              Contacto
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin size={16} className="text-[#00A86B]" />
                <span>Lima, Peru</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} className="text-[#00A86B]" />
                <span>contact@devopsday.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} className="text-[#00A86B]" />
                <span>+51 123 456 789</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF]">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/devops-days-lima/" target='_blank'
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-[#1EBDD1] hover:bg-gray-800 transition-all duration-300"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/devops-days-lima/" target='_blank'
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-[#1EBDD1] hover:bg-gray-800 transition-all duration-300"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://github.com/limadevopsdays/" target='_blank'
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-[#1EBDD1] hover:bg-gray-800 transition-all duration-300"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/devopsdayslima/" target='_blank'
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-[#1EBDD1] hover:bg-gray-800 transition-all duration-300"
              >
                <Instagram size={20} />
              </Link>
            </div>
            {/* <div className="pt-4">
              <button className="w-full bg-[#00A86B] text-white px-6 py-2 rounded-full hover:bg-[#00A86B]/80 transition-colors">
                Registrate
              </button>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm flex items-center">
              © 2024 DevOpsDay. Made with <Heart size={16} className="mx-1 text-[#8C51BF]" /> in Peru
            </p>
            <div className="flex space-x-4 text-sm">
              <Link href="#" className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#1EBDD1] transition-colors">
                Code of Conduct
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}