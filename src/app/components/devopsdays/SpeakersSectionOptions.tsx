import { Send, ArrowRight, Sparkles, Calendar, Users, Zap } from 'lucide-react'

// Tracks/Ejes temáticos
const tracks = [
  'Platform Engineering & DevOps',
  'Seguridad y Transformación Tecnológica',
  'Liderazgo Moderno y Cultura de Equipos',
  'IA y Estrategia de Datos',
]

// ══════════════════════════════════════════════════════════════════════════════
// OPCIÓN A: ACTUAL - Grid 2x2 Glassmorphism (Implementada actualmente)
// ══════════════════════════════════════════════════════════════════════════════

export function SpeakersSectionOptionA() {
  return (
    <section id="speakers" style={{ background: '#ffffff', padding: '4rem 0' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="rounded-2xl p-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #6B51EF 0%, #06b6d4 100%)',
            color: '#ffffff',
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#ffffff' }} />
              <span className="text-xs tracking-widest uppercase font-black">CFP ABIERTO AHORA</span>
            </div>

            <h2 className="text-3xl font-black mb-3" style={{ lineHeight: 1.2 }}>
              Call for Proposals Abierto
            </h2>

            <p className="text-lg mb-8 opacity-95">
              Enviá tu propuesta hasta el <strong>30 de Mayo 2026</strong>. Los ejes temáticos son:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {tracks.map((track, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <p className="font-bold text-sm">{track}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="#call-for-speakers"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black transition-all duration-200 hover:-translate-y-1"
                style={{ background: '#ffffff', color: '#6B51EF' }}
              >
                <Send className="w-5 h-5" />
                Enviar propuesta
              </a>
              <a
                href="#call-for-speakers"
                className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80"
                style={{ color: '#ffffff' }}
              >
                Ver guía completa del CFP →
              </a>
            </div>
          </div>

          <div
            className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// OPCIÓN B: Timeline Horizontal Minimalista
// ══════════════════════════════════════════════════════════════════════════════

export function SpeakersSectionOptionB() {
  return (
    <section id="speakers" style={{ background: '#f8fafc', padding: '4rem 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header compacto */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#6B51EF' }} />
            <span className="text-xs tracking-widest uppercase font-black" style={{ color: '#6B51EF' }}>
              CFP ABIERTO
            </span>
          </div>
          <h2 className="text-3xl font-black mb-3" style={{ color: '#0f172a' }}>
            Call for Proposals 2026
          </h2>
          <p className="text-lg" style={{ color: '#64748b' }}>
            Cierre: <strong style={{ color: '#0f172a' }}>30 de Mayo 2026</strong>
          </p>
        </div>

        {/* Timeline horizontal */}
        <div className="relative mb-10">
          {/* Línea horizontal */}
          <div
            className="absolute top-6 left-0 right-0 h-0.5"
            style={{
              background: 'linear-gradient(90deg, #6B51EF 0%, #06b6d4 50%, #14b8a6 75%, #f97316 100%)',
            }}
          />

          {/* Tracks como timeline */}
          <div className="grid grid-cols-4 gap-4 relative">
            {tracks.map((track, idx) => {
              const colors = ['#6B51EF', '#06b6d4', '#14b8a6', '#f97316']
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white mb-3 z-10"
                    style={{ background: colors[idx] }}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-xs text-center font-bold leading-tight" style={{ color: '#0f172a' }}>
                    {track}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA centrado */}
        <div className="text-center">
          <a
            href="#call-for-speakers"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black transition-all duration-200 hover:-translate-y-1"
            style={{ background: '#6B51EF', color: '#ffffff' }}
          >
            <Send className="w-5 h-5" />
            Enviar tu propuesta
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm mt-4" style={{ color: '#64748b' }}>
            <a href="#call-for-speakers" className="font-bold hover:underline" style={{ color: '#6B51EF' }}>
              Ver guía completa del CFP
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// OPCIÓN C: Bento Grid Asimétrico (Inspirado en HeroSection)
// ══════════════════════════════════════════════════════════════════════════════

export function SpeakersSectionOptionC() {
  return (
    <section id="speakers" style={{ background: '#ffffff', padding: '4rem 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Bento grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Card principal - 2/3 del espacio */}
          <div
            className="lg:col-span-2 rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #6B51EF 0%, #06b6d4 100%)',
              color: '#ffffff',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#ffffff' }} />
                <span className="text-xs tracking-widest uppercase font-black">CFP ABIERTO</span>
              </div>
              <h2 className="text-3xl font-black mb-3" style={{ lineHeight: 1.2 }}>
                Call for Proposals Abierto
              </h2>
              <p className="text-lg mb-6 opacity-95">
                Enviá tu propuesta hasta el <strong>30 de Mayo 2026</strong>
              </p>

              {/* Grid 2x2 mini */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {tracks.map((track, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg text-xs font-bold"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {track}
                  </div>
                ))}
              </div>

              <a
                href="#call-for-speakers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all duration-200 hover:-translate-y-1"
                style={{ background: '#ffffff', color: '#6B51EF' }}
              >
                <Send className="w-4 h-4" />
                Enviar propuesta
              </a>
            </div>
          </div>

          {/* Card secundaria - 1/3 del espacio */}
          <div className="space-y-4">
            <div
              className="rounded-2xl p-6"
              style={{ background: '#faf5ff', border: '1.5px solid #ddd6fe' }}
            >
              <Sparkles className="w-8 h-8 mb-3" style={{ color: '#6B51EF' }} />
              <h3 className="font-black mb-2" style={{ color: '#0f172a' }}>
                Experiencias reales
              </h3>
              <p className="text-sm" style={{ color: '#64748b' }}>
                Buscamos casos de producción, no teoría vacía
              </p>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{ background: '#ecfeff', border: '1.5px solid #a5f3fc' }}
            >
              <Calendar className="w-8 h-8 mb-3" style={{ color: '#06b6d4' }} />
              <h3 className="font-black mb-2" style={{ color: '#0f172a' }}>
                30 de Mayo
              </h3>
              <p className="text-sm" style={{ color: '#64748b' }}>
                Fecha límite para enviar propuestas
              </p>
            </div>
          </div>
        </div>

        {/* Link guía */}
        <div className="text-center mt-6">
          <a
            href="#call-for-speakers"
            className="text-sm font-bold transition-colors hover:underline"
            style={{ color: '#6B51EF' }}
          >
            Ver guía completa del CFP →
          </a>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// OPCIÓN D: Split Card con Stat
// ══════════════════════════════════════════════════════════════════════════════

export function SpeakersSectionOptionD() {
  return (
    <section id="speakers" style={{ background: '#f8fafc', padding: '4rem 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Contenido */}
            <div className="p-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#6B51EF' }} />
                <span className="text-xs tracking-widest uppercase font-black" style={{ color: '#6B51EF' }}>
                  CFP ABIERTO
                </span>
              </div>

              <h2 className="text-3xl font-black mb-3" style={{ color: '#0f172a', lineHeight: 1.2 }}>
                Call for Proposals 2026
              </h2>

              <p className="text-lg mb-6" style={{ color: '#64748b' }}>
                Enviá tu propuesta hasta el <strong style={{ color: '#0f172a' }}>30 de Mayo</strong>. Buscamos
                experiencias reales en:
              </p>

              <ul className="space-y-3 mb-8">
                {tracks.map((track, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-xs"
                      style={{
                        background: '#faf5ff',
                        color: '#6B51EF',
                        border: '1.5px solid #ddd6fe',
                      }}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-sm font-bold" style={{ color: '#0f172a' }}>
                      {track}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#call-for-speakers"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black transition-all duration-200 hover:-translate-y-1"
                  style={{ background: '#6B51EF', color: '#ffffff' }}
                >
                  <Send className="w-4 h-4" />
                  Enviar propuesta
                </a>
                <a
                  href="#call-for-speakers"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black transition-colors"
                  style={{
                    color: '#6B51EF',
                    border: '1.5px solid #ddd6fe',
                    background: '#faf5ff',
                  }}
                >
                  Ver guía completa
                </a>
              </div>
            </div>

            {/* Right: Stat visual */}
            <div
              className="p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #6B51EF 0%, #06b6d4 100%)',
                color: '#ffffff',
              }}
            >
              <div className="relative z-10">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-90" />
                <div className="text-6xl font-black mb-2">4</div>
                <p className="text-lg font-bold mb-1">Ejes Temáticos</p>
                <p className="text-sm opacity-80">Múltiples formatos disponibles</p>
              </div>

              {/* Pattern decorativo */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                   radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// OPCIÓN E: Horizontal Scroll Pills (Mobile-first)
// ══════════════════════════════════════════════════════════════════════════════

export function SpeakersSectionOptionE() {
  return (
    <section id="speakers" style={{ background: '#ffffff', padding: '4rem 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: 'linear-gradient(135deg, #6B51EF 0%, #06b6d4 100%)',
            color: '#ffffff',
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#ffffff' }} />
              <span className="text-xs tracking-widest uppercase font-black">CFP ABIERTO</span>
            </div>
            <h2 className="text-3xl font-black mb-3" style={{ lineHeight: 1.2 }}>
              Call for Proposals 2026
            </h2>
            <p className="text-lg opacity-95">
              Enviá tu propuesta hasta el <strong>30 de Mayo</strong>
            </p>
          </div>

          {/* Scroll horizontal de pills */}
          <div className="overflow-x-auto pb-4 mb-8 -mx-2 px-2">
            <div className="flex gap-3 min-w-max">
              {tracks.map((track, idx) => {
                const icons = [Zap, Sparkles, Users, Send]
                const Icon = icons[idx]
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-6 py-4 rounded-xl transition-transform hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      minWidth: '280px',
                    }}
                  >
                    <Icon className="w-6 h-6 flex-shrink-0" />
                    <span className="font-bold text-sm">{track}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#call-for-speakers"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black transition-all duration-200 hover:-translate-y-1"
              style={{ background: '#ffffff', color: '#6B51EF' }}
            >
              <Send className="w-5 h-5" />
              Enviar propuesta
            </a>
            <a
              href="#call-for-speakers"
              className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80"
            >
              Ver guía completa del CFP →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// OPCIÓN F: Compact Banner + Dropdown Hint
// ══════════════════════════════════════════════════════════════════════════════

export function SpeakersSectionOptionF() {
  return (
    <section id="speakers" style={{ background: '#f8fafc', padding: '3rem 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Banner compacto */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{ background: '#0f172a', color: '#ffffff' }}
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#6B51EF' }}
              >
                <Send className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10b981' }} />
                  <span className="text-xs tracking-wider uppercase font-bold" style={{ color: '#94a3b8' }}>
                    Call for Proposals
                  </span>
                </div>
                <h3 className="text-xl font-black mb-1">¿Tenés algo valioso para compartir?</h3>
                <p className="text-sm" style={{ color: '#cbd5e1' }}>
                  4 ejes temáticos · Cierre: <strong>30 de Mayo 2026</strong>
                </p>
              </div>
            </div>

            {/* Right: CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#call-for-speakers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black transition-all duration-200 hover:-translate-y-1 whitespace-nowrap"
                style={{ background: '#6B51EF', color: '#ffffff' }}
              >
                <Send className="w-4 h-4" />
                Enviar propuesta
              </a>
              <a
                href="#call-for-speakers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black transition-colors whitespace-nowrap"
                style={{
                  border: '1.5px solid #334155',
                  background: '#1e293b',
                  color: '#ffffff',
                }}
              >
                Ver ejes temáticos
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pattern sutil */}
          <div
            className="absolute top-0 right-0 w-64 h-full opacity-5"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #6B51EF 50%, #06b6d4 100%)',
            }}
          />
        </div>

        {/* Hint colapsable (opcional) */}
        <div className="mt-3 text-center">
          <button
            className="text-xs font-bold transition-colors hover:underline"
            style={{ color: '#6B51EF' }}
            onClick={() => {
              document.querySelector('#call-for-speakers')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Ver los 4 ejes temáticos completos ↓
          </button>
        </div>
      </div>
    </section>
  )
}
