import { Calendar, MapPin, ArrowRight, ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import { siteContent } from '../../data/mockContent'
import communityImage from 'figma:asset/419f5e856b55cf8d65e52824944c378f4b2bf9f7.png'

// Imágenes para Bento Grid Asimétrico
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1762968286778-60e65336d5ca?w=1200&h=1200&fit=crop&q=85',
    alt: 'Networking en conferencia'
  },
  {
    src: 'https://images.unsplash.com/photo-1582192493926-93f4847e1323?w=800&h=600&fit=crop&q=85',
    alt: 'Speaker presentando'
  },
  {
    src: 'https://images.unsplash.com/photo-1643926197226-6a7a1f320322?w=800&h=600&fit=crop&q=85',
    alt: 'Grupo en discusión'
  },
  {
    src: communityImage,
    alt: 'Comunidad DevOpsDays Lima'
  }
]

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroSectionHexagons() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#f8fafc' }}
      aria-label="Hero DevOpsDays Lima 2026"
    >
      {/* Background decoration - HEXÁGONOS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Patrón hexagonal */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="80" height="69.28" patternUnits="userSpaceOnUse">
              {/* Hexágono principal - Morado */}
              <path 
                d="M 20 0 L 60 0 L 80 34.64 L 60 69.28 L 20 69.28 L 0 34.64 Z" 
                stroke="#6B51EF" 
                strokeWidth="1.5" 
                fill="none"
              />
            </pattern>
            <pattern id="hexagons-turquoise" x="40" y="34.64" width="80" height="69.28" patternUnits="userSpaceOnUse">
              {/* Hexágono secundario - Turquesa */}
              <path 
                d="M 20 0 L 60 0 L 80 34.64 L 60 69.28 L 20 69.28 L 0 34.64 Z" 
                stroke="#06b6d4" 
                strokeWidth="1" 
                fill="none"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
          <rect width="100%" height="100%" fill="url(#hexagons-turquoise)" />
        </svg>
        
        {/* Soft glow blobs */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.18]"
          style={{ background: 'radial-gradient(circle, #bae6fd 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #ddd6fe 0%, transparent 65%)' }}
        />
      </div>

      {/* Main Grid */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 min-h-screen grid lg:grid-cols-2 gap-12 items-center py-24">
        
        {/* Left: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center lg:pr-8"
        >
          <div
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full w-fit"
            style={{ background: '#f3e8ff', border: '1px solid #e9d5ff' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6B51EF' }} />
            <span className="text-xs tracking-widest uppercase font-black" style={{ color: '#6B51EF' }}>
              Lima, Perú · 20–21 ago 2026
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 1.5rem' }}>
            <span style={{ color: '#0f172a' }}>DevOpsDays</span>
            <br />
            <span style={{ color: '#6B51EF' }}>Lima 2026</span>
          </h1>

          <p className="text-xl mb-8 max-w-xl" style={{ color: '#475569' }}>
            La conferencia DevOps más importante de Perú. Conecta con expertos internacionales, aprende las últimas tendencias y transforma tu carrera.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#334155' }}>
              <Calendar className="w-4 h-4" style={{ color: '#6B51EF' }} />
              20 – 21 de agosto, 2026
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#334155' }}>
              <MapPin className="w-4 h-4" style={{ color: '#f97316' }} />
              Centro de Convenciones · Lima
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={siteContent.ticketsUrl}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-black tracking-wide transition-all duration-200 hover:-translate-y-0.5 text-white"
              style={{ background: '#6B51EF' }}
            >
              Comprar Entradas
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#speakers"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-black tracking-wide transition-all duration-200 hover:-translate-y-0.5 text-white"
              style={{ background: '#06b6d4' }}
            >
              Ver Speakers
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* Right: BENTO GRID ASIMÉTRICO */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-3 grid-rows-3 gap-3 h-[600px]"
        >
          {/* Imagen GRANDE (2x2) - Top Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl"
            style={{ border: '2px solid #e2e8f0' }}
          >
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to top, rgba(124, 58, 237, 0.7), transparent)' }}
            />
          </motion.div>

          {/* Imagen PEQUEÑA - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group overflow-hidden rounded-2xl"
            style={{ border: '2px solid #e2e8f0' }}
          >
            <img
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to top, rgba(6, 182, 212, 0.7), transparent)' }}
            />
          </motion.div>

          {/* Imagen PEQUEÑA - Middle Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative group overflow-hidden rounded-2xl"
            style={{ border: '2px solid #e2e8f0' }}
          >
            <img
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to top, rgba(16, 185, 129, 0.7), transparent)' }}
            />
          </motion.div>

          {/* Imagen ANCHA (3x1) - Bottom Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="col-span-3 relative group overflow-hidden rounded-2xl"
            style={{ border: '2px solid #e2e8f0' }}
          >
            <img
              src={galleryImages[3].src}
              alt={galleryImages[3].alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to top, rgba(249, 115, 22, 0.7), transparent)' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ color: '#94a3b8' }}>
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}
