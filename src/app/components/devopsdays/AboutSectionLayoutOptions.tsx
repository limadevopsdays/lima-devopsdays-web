import { CheckCircle2, Play, X } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { useState } from 'react'

// YouTube video thumbnail (preview image)
const videoThumbnail = 'https://img.youtube.com/vi/OOYWupGVhqA/maxresdefault.jpg'
const videoId = 'OOYWupGVhqA'

const stats = [
  { value: '+800', label: 'Profesionales Tech' },
  { value: '2', label: 'Días de Contenido' },
  { value: '2da', label: 'Edición' },
]

const expectList = [
  'Charlas técnicas de alto nivel',
  'Open Spaces participativos',
  'Lightning talks de 5 minutos',
  'Networking real',
  'Expo de herramientas DevOps',
  'Comunidad activa post-evento',
]

// Nuevo contenido
const missionText =
  'Nuestra misión en DevOpsDays Lima es impulsar la evolución tecnológica con un evento que conecta a profesionales, fomenta el intercambio de conocimientos DevOps y refuerza una cultura de innovación continua basada en experiencias reales.'

const eventDescription =
  'DevOpsDays es una conferencia global sobre prácticas, herramientas y cultura DevOps. Reúne a profesionales para compartir conocimientos y experiencias.'

// OPCIÓN 1: Stats abajo en grid horizontal
function Option1() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ padding: '5rem 0', background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header sin lead text */}
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#7c3aed" title="¿Qué es DevOpsDays Lima?" />

        {/* Two-col: video + content */}
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-10">
          {/* Video thumbnail */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ border: '1.5px solid #e2e8f0' }}
            onClick={() => setIsVideoOpen(true)}
          >
            <img
              src={videoThumbnail}
              alt="DevOpsDays Lima - Video del evento"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black transition-opacity duration-300" style={{ opacity: 0.3 }} />
            <div
              className="absolute inset-0 bg-black transition-opacity duration-300 group-hover:opacity-40"
              style={{ opacity: 0 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: '#7c3aed', boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)' }}
              >
                <Play className="w-8 h-8 ml-1" style={{ color: '#ffffff' }} fill="#ffffff" />
              </div>
            </div>
            <div
              className="absolute bottom-5 left-5 px-4 py-2 rounded-xl pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
            >
              <span className="text-sm font-black flex items-center gap-2" style={{ color: '#0f172a' }}>
                <Play className="w-3.5 h-3.5" style={{ color: '#7c3aed' }} />
                Ver video · 2da Edición
              </span>
            </div>
          </div>

          {/* Content card */}
          <div className="rounded-2xl p-8" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
            <h3 className="mb-4" style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#0f172a' }}>
              Nuestra Misión
            </h3>
            <p className="mb-6" style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>
              {missionText}
            </p>

            <div className="pt-5 mb-6" style={{ borderTop: '1px solid #e2e8f0' }}>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>
                ¿Qué esperar del evento?
              </h4>
              <p className="mb-4 text-sm" style={{ color: '#64748b', lineHeight: 1.7 }}>
                {eventDescription}
              </p>
              <ul className="grid grid-cols-2 gap-2.5">
                {expectList.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs" style={{ color: '#334155' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#0ea5e9' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats bar below (horizontal) */}
        <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e2e8f0' }}>
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-7"
              style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}
            >
              <span
                style={{
                  fontSize: 'clamp(1.8rem,3vw,2.5rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#0f172a',
                }}
              >
                {value}
              </span>
              <span className="text-xs mt-1.5 tracking-wide uppercase text-center px-2" style={{ color: '#94a3b8' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Video modal */}
        {isVideoOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300"
            style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 9999 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '16/9', background: '#000000' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                onClick={() => setIsVideoOpen(false)}
                style={{ color: '#ffffff', zIndex: 10 }}
              >
                <span className="text-sm font-medium">Cerrar</span>
                <X className="w-5 h-5" />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="DevOpsDays Lima - Video oficial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// OPCIÓN 2: Stats integrados dentro del content card
function Option2() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ padding: '5rem 0', background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#7c3aed" title="¿Qué es DevOpsDays Lima?" />

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Video thumbnail */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ border: '1.5px solid #e2e8f0' }}
            onClick={() => setIsVideoOpen(true)}
          >
            <img
              src={videoThumbnail}
              alt="DevOpsDays Lima - Video del evento"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black transition-opacity duration-300" style={{ opacity: 0.3 }} />
            <div
              className="absolute inset-0 bg-black transition-opacity duration-300 group-hover:opacity-40"
              style={{ opacity: 0 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: '#7c3aed', boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)' }}
              >
                <Play className="w-8 h-8 ml-1" style={{ color: '#ffffff' }} fill="#ffffff" />
              </div>
            </div>
            <div
              className="absolute bottom-5 left-5 px-4 py-2 rounded-xl pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
            >
              <span className="text-sm font-black flex items-center gap-2" style={{ color: '#0f172a' }}>
                <Play className="w-3.5 h-3.5" style={{ color: '#7c3aed' }} />
                Ver video · 2da Edición
              </span>
            </div>
          </div>

          {/* Content card with stats inside */}
          <div className="space-y-6">
            {/* Mission */}
            <div className="rounded-2xl p-8" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <h3
                className="mb-4"
                style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#0f172a' }}
              >
                Nuestra Misión
              </h3>
              <p className="mb-0" style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>
                {missionText}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e2e8f0' }}>
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center py-6"
                  style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}
                >
                  <span style={{ fontSize: '1.75rem', fontWeight: 900, lineHeight: 1, color: '#0f172a' }}>{value}</span>
                  <span className="text-xs mt-1.5 tracking-wide uppercase text-center px-2" style={{ color: '#94a3b8' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Event info */}
            <div className="rounded-2xl p-8" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>
                ¿Qué esperar del evento?
              </h4>
              <p className="mb-4 text-sm" style={{ color: '#64748b', lineHeight: 1.7 }}>
                {eventDescription}
              </p>
              <ul className="grid grid-cols-2 gap-2.5">
                {expectList.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs" style={{ color: '#334155' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#0ea5e9' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Video modal */}
        {isVideoOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300"
            style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 9999 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '16/9', background: '#000000' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                onClick={() => setIsVideoOpen(false)}
                style={{ color: '#ffffff', zIndex: 10 }}
              >
                <span className="text-sm font-medium">Cerrar</span>
                <X className="w-5 h-5" />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="DevOpsDays Lima - Video oficial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// OPCIÓN 3: Stats como cards pequeñas
function Option3() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ padding: '5rem 0', background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#7c3aed" title="¿Qué es DevOpsDays Lima?" />

        <div className="grid lg:grid-cols-2 gap-10 items-start mb-8">
          {/* Video thumbnail */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ border: '1.5px solid #e2e8f0' }}
            onClick={() => setIsVideoOpen(true)}
          >
            <img
              src={videoThumbnail}
              alt="DevOpsDays Lima - Video del evento"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black transition-opacity duration-300" style={{ opacity: 0.3 }} />
            <div
              className="absolute inset-0 bg-black transition-opacity duration-300 group-hover:opacity-40"
              style={{ opacity: 0 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: '#7c3aed', boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)' }}
              >
                <Play className="w-8 h-8 ml-1" style={{ color: '#ffffff' }} fill="#ffffff" />
              </div>
            </div>
            <div
              className="absolute bottom-5 left-5 px-4 py-2 rounded-xl pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
            >
              <span className="text-sm font-black flex items-center gap-2" style={{ color: '#0f172a' }}>
                <Play className="w-3.5 h-3.5" style={{ color: '#7c3aed' }} />
                Ver video · 2da Edición
              </span>
            </div>
          </div>

          {/* Content card */}
          <div className="rounded-2xl p-8" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
            <h3 className="mb-4" style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#0f172a' }}>
              Nuestra Misión
            </h3>
            <p className="mb-6" style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>
              {missionText}
            </p>

            <div className="pt-5 mb-0" style={{ borderTop: '1px solid #e2e8f0' }}>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>
                ¿Qué esperar del evento?
              </h4>
              <p className="mb-4 text-sm" style={{ color: '#64748b', lineHeight: 1.7 }}>
                {eventDescription}
              </p>
              <ul className="grid grid-cols-2 gap-2.5">
                {expectList.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs" style={{ color: '#334155' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#0ea5e9' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats as small cards */}
        <div className="grid grid-cols-3 gap-5">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="rounded-2xl p-6 text-center"
              style={{
                background: i === 1 ? '#7c3aed' : '#ffffff',
                border: i === 1 ? 'none' : '1.5px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  fontSize: '2.25rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: i === 1 ? '#ffffff' : '#0f172a',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                {value}
              </span>
              <span
                className="text-xs tracking-wide uppercase"
                style={{ color: i === 1 ? 'rgba(255,255,255,0.85)' : '#94a3b8' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Video modal */}
        {isVideoOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300"
            style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 9999 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '16/9', background: '#000000' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                onClick={() => setIsVideoOpen(false)}
                style={{ color: '#ffffff', zIndex: 10 }}
              >
                <span className="text-sm font-medium">Cerrar</span>
                <X className="w-5 h-5" />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="DevOpsDays Lima - Video oficial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// OPCIÓN 4: Layout vertical más compacto
function Option4() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ padding: '5rem 0', background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#7c3aed" title="¿Qué es DevOpsDays Lima?" />

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left column: Video */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ border: '1.5px solid #e2e8f0' }}
            onClick={() => setIsVideoOpen(true)}
          >
            <img
              src={videoThumbnail}
              alt="DevOpsDays Lima - Video del evento"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black transition-opacity duration-300" style={{ opacity: 0.3 }} />
            <div
              className="absolute inset-0 bg-black transition-opacity duration-300 group-hover:opacity-40"
              style={{ opacity: 0 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: '#7c3aed', boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)' }}
              >
                <Play className="w-8 h-8 ml-1" style={{ color: '#ffffff' }} fill="#ffffff" />
              </div>
            </div>
            <div
              className="absolute bottom-5 left-5 px-4 py-2 rounded-xl pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
            >
              <span className="text-sm font-black flex items-center gap-2" style={{ color: '#0f172a' }}>
                <Play className="w-3.5 h-3.5" style={{ color: '#7c3aed' }} />
                Ver video · 2da Edición
              </span>
            </div>
          </div>

          {/* Right column: Mission + Event info */}
          <div className="space-y-6">
            <div className="rounded-2xl p-7" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <h3 className="mb-3 text-lg" style={{ fontWeight: 800, letterSpacing: '-0.01em', color: '#0f172a' }}>
                Nuestra Misión
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>{missionText}</p>
            </div>

            <div className="rounded-2xl p-7" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>
                ¿Qué esperar del evento?
              </h4>
              <p className="mb-4 text-sm" style={{ color: '#64748b', lineHeight: 1.7 }}>
                {eventDescription}
              </p>
              <ul className="grid grid-cols-2 gap-2.5">
                {expectList.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs" style={{ color: '#334155' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#0ea5e9' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats below in full width */}
        <div className="mt-10 grid grid-cols-3 gap-5">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
            >
              <span
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#7c3aed',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                {value}
              </span>
              <span className="text-sm tracking-wide uppercase" style={{ color: '#64748b', fontWeight: 700 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Video modal */}
        {isVideoOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300"
            style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 9999 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '16/9', background: '#000000' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                onClick={() => setIsVideoOpen(false)}
                style={{ color: '#ffffff', zIndex: 10 }}
              >
                <span className="text-sm font-medium">Cerrar</span>
                <X className="w-5 h-5" />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="DevOpsDays Lima - Video oficial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function AboutSectionLayoutOptions() {
  return (
    <div style={{ background: '#ffffff' }}>
      {/* Header */}
      <div className="py-16 text-center" style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="inline-flex px-4 py-1.5 rounded-full mb-5"
            style={{
              background: '#7c3aed',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            4 OPCIONES DE LAYOUT
          </div>
          <h1 className="text-4xl mb-5" style={{ fontWeight: 900, color: '#0f172a' }}>
            AboutSection: Opciones de Diseño
          </h1>
          <p className="text-lg mb-8" style={{ color: '#64748b', lineHeight: 1.7 }}>
            ✅ Sin lead text debajo del eyebrow
            <br />
            ✅ Nuevo contenido de misión y descripción
            <br />
            ✅ Stats reubicadas (diferentes posiciones)
            <br />
            ✅ Sin feature cards (Movimiento global, Open Spaces, Ignite talks)
            <br />✅ Video híbrido con thumbnail de YouTube
          </p>

          {/* Quick comparison */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            <div className="p-5 rounded-xl text-left" style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#7c3aed', color: '#ffffff', fontWeight: 900 }}
              >
                1
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Stats Abajo Horizontal
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Stats en barra horizontal debajo del video + info
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#0ea5e9', color: '#ffffff', fontWeight: 900 }}
              >
                2
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Stats Integradas
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Stats dentro de la columna derecha entre misión e info
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#f97316', color: '#ffffff', fontWeight: 900 }}
              >
                3
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Stats como Cards
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Stats como 3 cards pequeñas con card central morada
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#10b981', color: '#ffffff', fontWeight: 900 }}
              >
                4
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Stats Full Width
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                2 cards en columnas, stats abajo en ancho completo moradas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Option 1 */}
      <div className="py-16" style={{ background: '#ffffff', borderBottom: '2px solid #e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl" style={{ fontWeight: 900, color: '#0f172a' }}>
              OPCIÓN 1: Stats Abajo Horizontal
            </h2>
            <span
              className="px-4 py-1.5 rounded-full text-xs"
              style={{ background: '#7c3aed', color: '#ffffff', fontWeight: 700 }}
            >
              LIMPIA Y DIRECTA
            </span>
          </div>
          <p className="mb-10 text-sm" style={{ color: '#64748b' }}>
            Stats en barra horizontal debajo de las 2 columnas. Layout clásico y balanceado.
          </p>
        </div>
        <Option1 />
      </div>

      {/* Option 2 */}
      <div className="py-16" style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl" style={{ fontWeight: 900, color: '#0f172a' }}>
              OPCIÓN 2: Stats Integradas
            </h2>
            <span
              className="px-4 py-1.5 rounded-full text-xs"
              style={{ background: '#0ea5e9', color: '#ffffff', fontWeight: 700 }}
            >
              COMPACTA
            </span>
          </div>
          <p className="mb-10 text-sm" style={{ color: '#64748b' }}>
            Stats integradas en la columna derecha. Todo en 2 columnas, sin espacio extra abajo.
          </p>
        </div>
        <Option2 />
      </div>

      {/* Option 3 */}
      <div className="py-16" style={{ background: '#ffffff', borderBottom: '2px solid #e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl" style={{ fontWeight: 900, color: '#0f172a' }}>
              OPCIÓN 3: Stats como Cards
            </h2>
            <span
              className="px-4 py-1.5 rounded-full text-xs"
              style={{ background: '#f97316', color: '#ffffff', fontWeight: 700 }}
            >
              DESTACADA
            </span>
          </div>
          <p className="mb-10 text-sm" style={{ color: '#64748b' }}>
            Stats como 3 cards independientes. Card central morada para crear jerarquía visual.
          </p>
        </div>
        <Option3 />
      </div>

      {/* Option 4 */}
      <div className="py-16" style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl" style={{ fontWeight: 900, color: '#0f172a' }}>
              OPCIÓN 4: Stats Full Width Moradas
            </h2>
            <span
              className="px-4 py-1.5 rounded-full text-xs"
              style={{ background: '#10b981', color: '#ffffff', fontWeight: 700 }}
            >
              IMPACTANTE
            </span>
          </div>
          <p className="mb-10 text-sm" style={{ color: '#64748b' }}>
            Stats en ancho completo con números morados y efecto hover. 2 cards verticales arriba.
          </p>
        </div>
        <Option4 />
      </div>

      {/* Summary */}
      <div className="py-16 text-center" style={{ background: '#ffffff' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl mb-6" style={{ fontWeight: 900, color: '#0f172a' }}>
            ¿Cuál opción prefieres?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '1', label: 'Stats Abajo', color: '#7c3aed' },
              { num: '2', label: 'Stats Integradas', color: '#0ea5e9' },
              { num: '3', label: 'Stats Cards', color: '#f97316' },
              { num: '4', label: 'Stats Full Width', color: '#10b981' },
            ].map(({ num, label, color }) => (
              <div
                key={num}
                className="p-6 rounded-xl transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: color, color: '#ffffff', fontSize: '1.5rem', fontWeight: 900 }}
                >
                  {num}
                </div>
                <p className="font-bold" style={{ color: '#0f172a', fontSize: '0.95rem' }}>
                  Opción {num}
                </p>
                <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
