import { CheckCircle2, Play, X } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { useState } from 'react'

const videoThumbnail = 'https://img.youtube.com/vi/OOYWupGVhqA/maxresdefault.jpg'
const videoId = 'OOYWupGVhqA'

const stats = [
  { value: '+800', label: 'Profesionales Tech' },
  { value: '2', label: 'Días de Contenido' },
  { value: '1ra', label: 'Edición' },
]

const expectList = [
  'Charlas técnicas de alto nivel',
  'Open Spaces participativos',
  '2 días de alto impacto',
  'Networking real',
  'Expo de herramientas DevOps',
  'Comunidad activa post-evento',
]

const missionText =
  'Nuestra misión en DevOpsDays Lima es impulsar la evolución tecnológica con un evento que conecta a profesionales, fomenta el intercambio de conocimientos DevOps y refuerza una cultura de innovación continua basada en experiencias reales.'

const eventDescription =
  'DevOpsDays es una conferencia global sobre prácticas, herramientas y cultura DevOps. Reúne a profesionales para compartir conocimientos y experiencias.'

// OPCIÓN 1: Centrado + Spacing Normal (actual)
function Option1() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ background: '#ffffff', padding: '6rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#6B51EF" title="¿Qué es DevOpsDays Lima?" />

        {/* Mission: Centrado + mb-14 (3.5rem / 56px) */}
        <div className="max-w-4xl mx-auto mb-14">
          <p
            className="text-center"
            style={{
              color: '#475569',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            }}
          >
            {missionText}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <VideoCard onClick={() => setIsVideoOpen(true)} />
          <ContentCard />
        </div>

        <StatsBar />
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
      </div>
    </section>
  )
}

// OPCIÓN 2: Centrado + Spacing Compacto
function Option2() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ background: '#ffffff', padding: '6rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#6B51EF" title="¿Qué es DevOpsDays Lima?" />

        {/* Mission: Centrado + mb-10 (2.5rem / 40px) */}
        <div className="max-w-4xl mx-auto mb-10">
          <p
            className="text-center"
            style={{
              color: '#475569',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            }}
          >
            {missionText}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <VideoCard onClick={() => setIsVideoOpen(true)} />
          <ContentCard />
        </div>

        <StatsBar />
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
      </div>
    </section>
  )
}

// OPCIÓN 3: Centrado + Spacing Amplio
function Option3() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ background: '#ffffff', padding: '6rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#6B51EF" title="¿Qué es DevOpsDays Lima?" />

        {/* Mission: Centrado + mb-20 (5rem / 80px) */}
        <div className="max-w-4xl mx-auto mb-20">
          <p
            className="text-center"
            style={{
              color: '#475569',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            }}
          >
            {missionText}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <VideoCard onClick={() => setIsVideoOpen(true)} />
          <ContentCard />
        </div>

        <StatsBar />
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
      </div>
    </section>
  )
}

// OPCIÓN 4: Left Align + Spacing Normal
function Option4() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ background: '#ffffff', padding: '6rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#6B51EF" title="¿Qué es DevOpsDays Lima?" />

        {/* Mission: LEFT align + mb-14 */}
        <div className="max-w-4xl mb-14">
          <p
            className="text-left"
            style={{
              color: '#475569',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            }}
          >
            {missionText}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <VideoCard onClick={() => setIsVideoOpen(true)} />
          <ContentCard />
        </div>

        <StatsBar />
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
      </div>
    </section>
  )
}

// OPCIÓN 5: Justify (justificado) + Spacing Normal
function Option5() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ background: '#ffffff', padding: '6rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#6B51EF" title="¿Qué es DevOpsDays Lima?" />

        {/* Mission: JUSTIFY + mb-14 */}
        <div className="max-w-4xl mx-auto mb-14">
          <p
            className="text-justify"
            style={{
              color: '#475569',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            }}
          >
            {missionText}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <VideoCard onClick={() => setIsVideoOpen(true)} />
          <ContentCard />
        </div>

        <StatsBar />
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
      </div>
    </section>
  )
}

// OPCIÓN 6: Centrado + Card con fondo
function Option6() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ background: '#ffffff', padding: '6rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#6B51EF" title="¿Qué es DevOpsDays Lima?" />

        {/* Mission: Centrado + CARD con fondo + mb-14 */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="rounded-2xl p-8" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
            <p
              className="text-center"
              style={{
                color: '#475569',
                lineHeight: 1.8,
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              }}
            >
              {missionText}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <VideoCard onClick={() => setIsVideoOpen(true)} />
          <ContentCard />
        </div>

        <StatsBar />
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
      </div>
    </section>
  )
}

// OPCIÓN 7: Left align + Borde izquierdo morado
function Option7() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ background: '#ffffff', padding: '6rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#6B51EF" title="¿Qué es DevOpsDays Lima?" />

        {/* Mission: LEFT + Borde morado izquierdo + mb-14 */}
        <div className="max-w-4xl mb-14" style={{ borderLeft: '4px solid #6B51EF', paddingLeft: '2rem' }}>
          <p
            className="text-left"
            style={{
              color: '#475569',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            }}
          >
            {missionText}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <VideoCard onClick={() => setIsVideoOpen(true)} />
          <ContentCard />
        </div>

        <StatsBar />
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
      </div>
    </section>
  )
}

// OPCIÓN 8: Centrado + Spacing Extra Compacto
function Option8() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" style={{ background: '#ffffff', padding: '6rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="¡Regresamos este 2026!" eyebrowColor="#6B51EF" title="¿Qué es DevOpsDays Lima?" />

        {/* Mission: Centrado + mb-8 (2rem / 32px) - MUY COMPACTO */}
        <div className="max-w-4xl mx-auto mb-8">
          <p
            className="text-center"
            style={{
              color: '#475569',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            }}
          >
            {missionText}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <VideoCard onClick={() => setIsVideoOpen(true)} />
          <ContentCard />
        </div>

        <StatsBar />
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
      </div>
    </section>
  )
}

// Shared Components
function VideoCard({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ border: '1.5px solid #e2e8f0' }}
      onClick={onClick}
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
          style={{ background: '#6B51EF', boxShadow: '0 8px 32px rgba(107, 81, 239, 0.4)' }}
        >
          <Play className="w-8 h-8 ml-1" style={{ color: '#ffffff' }} fill="#ffffff" />
        </div>
      </div>
      <div
        className="absolute bottom-5 left-5 px-4 py-2 rounded-xl pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
      >
        <span className="text-sm font-black flex items-center gap-2" style={{ color: '#0f172a' }}>
          <Play className="w-3.5 h-3.5" style={{ color: '#6B51EF' }} />
          Ver video · 1ra Edición
        </span>
      </div>
    </div>
  )
}

function ContentCard() {
  return (
    <div className="rounded-2xl p-8" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
      <h3 className="mb-3" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#0f172a' }}>
        ¿Qué esperar del evento?
      </h3>
      <p className="mb-6" style={{ color: '#475569', lineHeight: 1.75 }}>
        {eventDescription}
      </p>
      <ul className="grid grid-cols-2 gap-3">
        {expectList.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#334155' }}>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#0ea5e9' }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatsBar() {
  return (
    <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e2e8f0' }}>
      {stats.map(({ value, label }, i) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center py-7"
          style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}
        >
          <span style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 900, lineHeight: 1, color: '#0f172a' }}>
            {value}
          </span>
          <span className="text-xs mt-1.5 tracking-wide uppercase text-center px-2" style={{ color: '#94a3b8' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300"
      style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: '16/9', background: '#000000' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-12 right-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10"
          onClick={onClose}
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
  )
}

export function AboutSectionMissionOptions() {
  return (
    <div style={{ background: '#f8fafc' }}>
      {/* Header */}
      <div className="py-16 text-center" style={{ background: '#ffffff', borderBottom: '2px solid #e2e8f0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="inline-flex px-4 py-1.5 rounded-full mb-5"
            style={{
              background: '#6B51EF',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            8 OPCIONES: ALINEACIÓN + ESPACIADO
          </div>
          <h1 className="text-4xl mb-5" style={{ fontWeight: 900, color: '#0f172a' }}>
            Ajustes de Misión: Texto y Espaciado
          </h1>
          <p className="text-lg mb-8" style={{ color: '#64748b', lineHeight: 1.7 }}>
            Diferentes alineaciones de texto y espaciados entre título y misión
          </p>

          {/* Quick comparison */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            <div className="p-5 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#6B51EF', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}
              >
                1
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Centrado + Normal
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                mb-14 (56px) · ACTUAL
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#0ea5e9', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}
              >
                2
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Centrado + Compacto
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                mb-10 (40px)
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#10b981', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}
              >
                3
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Centrado + Amplio
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                mb-20 (80px)
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#f97316', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}
              >
                4
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Left Align
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Sin centrar · mb-14
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#06b6d4', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}
              >
                5
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Justify
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Justificado · mb-14
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#8b5cf6', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}
              >
                6
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Con Card
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Fondo + border
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#ec4899', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}
              >
                7
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Borde Morado
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Left + border-left
              </p>
            </div>

            <div className="p-5 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#14b8a6', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}
              >
                8
              </div>
              <p className="font-bold mb-2" style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                Extra Compacto
              </p>
              <p className="text-xs" style={{ color: '#64748b' }}>
                mb-8 (32px) · Mínimo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="py-12" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl mb-3" style={{ fontWeight: 900, color: '#0f172a' }}>
            OPCIÓN 1: Centrado + Normal (56px)
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            ✅ Actual · Centrado · mb-14 (3.5rem)
          </p>
        </div>
        <Option1 />
      </div>

      <div className="py-12" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl mb-3" style={{ fontWeight: 900, color: '#0f172a' }}>
            OPCIÓN 2: Centrado + Compacto (40px)
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Centrado · mb-10 (2.5rem) · Menos espacio
          </p>
        </div>
        <Option2 />
      </div>

      <div className="py-12" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl mb-3" style={{ fontWeight: 900, color: '#0f172a' }}>
            OPCIÓN 3: Centrado + Amplio (80px)
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Centrado · mb-20 (5rem) · Más respiración
          </p>
        </div>
        <Option3 />
      </div>

      <div className="py-12" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl mb-3" style={{ fontWeight: 900, color: '#0f172a' }}>
            OPCIÓN 4: Left Align
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Alineado a la izquierda · Sin max-w centrado · mb-14
          </p>
        </div>
        <Option4 />
      </div>

      <div className="py-12" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl mb-3" style={{ fontWeight: 900, color: '#0f172a' }}>
            OPCIÓN 5: Justify (Justificado)
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Texto justificado · Centrado · mb-14
          </p>
        </div>
        <Option5 />
      </div>

      <div className="py-12" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl mb-3" style={{ fontWeight: 900, color: '#0f172a' }}>
            OPCIÓN 6: Con Card (Fondo)
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Centrado · Card con fondo #f8fafc · Border · mb-14
          </p>
        </div>
        <Option6 />
      </div>

      <div className="py-12" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl mb-3" style={{ fontWeight: 900, color: '#0f172a' }}>
            OPCIÓN 7: Borde Morado Izquierdo
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Left align · border-left morado 4px · padding-left 2rem · mb-14
          </p>
        </div>
        <Option7 />
      </div>

      <div className="py-12" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl mb-3" style={{ fontWeight: 900, color: '#0f172a' }}>
            OPCIÓN 8: Extra Compacto (32px)
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Centrado · mb-8 (2rem) · Espaciado mínimo
          </p>
        </div>
        <Option8 />
      </div>

      {/* Summary */}
      <div className="py-16 text-center" style={{ background: '#ffffff', borderTop: '2px solid #e2e8f0' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl mb-8" style={{ fontWeight: 900, color: '#0f172a' }}>
            Comparación de Espaciados
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <h3 className="font-bold mb-4" style={{ color: '#0f172a' }}>
                📏 Espaciado (Título → Misión → Video)
              </h3>
              <div className="space-y-2 text-sm" style={{ color: '#64748b' }}>
                <p>
                  <strong>Opción 8:</strong> 32px · Ultra compacto
                </p>
                <p>
                  <strong>Opción 2:</strong> 40px · Compacto
                </p>
                <p>
                  <strong>Opción 1:</strong> 56px · Normal ⭐ Actual
                </p>
                <p>
                  <strong>Opción 3:</strong> 80px · Amplio
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <h3 className="font-bold mb-4" style={{ color: '#0f172a' }}>
                📝 Alineación de Texto
              </h3>
              <div className="space-y-2 text-sm" style={{ color: '#64748b' }}>
                <p>
                  <strong>Centrado:</strong> Opciones 1, 2, 3, 5, 6, 8
                </p>
                <p>
                  <strong>Left align:</strong> Opciones 4, 7
                </p>
                <p>
                  <strong>Justify:</strong> Opción 5
                </p>
                <p>
                  <strong>Con card/border:</strong> Opciones 6, 7
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl" style={{ background: '#6B51EF14', border: '1.5px solid #6B51EF' }}>
            <p className="text-xl mb-4" style={{ fontWeight: 800, color: '#0f172a' }}>
              💡 Recomendación
            </p>
            <p className="text-sm mb-4" style={{ color: '#475569', lineHeight: 1.7 }}>
              <strong>Opción 2 (Centrado + Compacto 40px)</strong> es ideal si quieres mantener el diseño limpio pero con
              menos espacio vertical. <strong>Opción 7 (Borde Morado)</strong> destaca visualmente la misión con el color
              de marca.
            </p>
            <p className="text-xs" style={{ color: '#64748b' }}>
              La <strong>Opción 1 (actual)</strong> sigue siendo una excelente elección balanceada.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
