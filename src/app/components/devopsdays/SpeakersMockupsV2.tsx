import { Send, ArrowRight, Sparkles, Calendar, Users, Zap, CheckCircle2, Layers } from 'lucide-react'

// Este componente muestra las 6 opciones SIN GRADIENTES
export function SpeakersMockupsV2() {
  const tracks = [
    'Platform Engineering & DevOps',
    'Seguridad y Transformación Tecnológica',
    'Liderazgo Moderno y Cultura de Equipos',
    'IA y Estrategia de Datos',
  ]

  return (
    <div style={{ background: '#f8fafc', padding: '4rem 2rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
            🎨 Call for Speakers - Mockups V2 (Sin Gradientes)
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '0.5rem' }}>
            6 opciones con colores sólidos o fondos de imagen
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-4">
            <span
              className="px-3 py-1 rounded-lg text-xs font-bold"
              style={{ background: '#6B51EF', color: '#ffffff' }}
            >
              Morado sólido
            </span>
            <span
              className="px-3 py-1 rounded-lg text-xs font-bold"
              style={{ background: '#06b6d4', color: '#ffffff' }}
            >
              Turquesa sólido
            </span>
            <span
              className="px-3 py-1 rounded-lg text-xs font-bold"
              style={{ background: '#0f172a', color: '#ffffff' }}
            >
              Dark + overlay
            </span>
            <span
              className="px-3 py-1 rounded-lg text-xs font-bold"
              style={{ background: '#ffffff', color: '#0f172a', border: '1.5px solid #e2e8f0' }}
            >
              Blanco con acentos
            </span>
          </div>
        </div>

        {/* Grid de mockups */}
        <div className="space-y-12">
          {/* OPCIÓN A: Color Sólido Morado */}
          <MockupContainer title="OPCIÓN A: Card Morado Sólido + Grid 2×2" badge="LIMPIO" badgeColor="#6B51EF">
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem' }}>
              <div
                className="rounded-2xl p-10 relative overflow-hidden"
                style={{
                  background: '#6B51EF',
                  color: '#ffffff',
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#ffffff' }} />
                    <span className="text-xs tracking-widest uppercase font-black">CFP ABIERTO AHORA</span>
                  </div>
                  <h2 className="text-3xl font-black mb-3">Call for Proposals Abierto</h2>
                  <p className="text-lg mb-8 opacity-95">
                    Enviá tu propuesta hasta el <strong>30 de Mayo 2026</strong>. Los ejes temáticos son:
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
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
                  <div className="flex gap-4">
                    <button
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black transition-all duration-200 hover:-translate-y-1"
                      style={{ background: '#ffffff', color: '#6B51EF' }}
                    >
                      <Send className="w-5 h-5" />
                      Enviar propuesta
                    </button>
                    <button
                      className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80"
                      style={{ color: '#ffffff' }}
                    >
                      Ver guía completa del CFP →
                    </button>
                  </div>
                </div>

                {/* Pattern decorativo sutil */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                     radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                  }}
                />
              </div>
            </div>
          </MockupContainer>

          {/* OPCIÓN B: Blanco Clean con Bordes de Color */}
          <MockupContainer title="OPCIÓN B: Blanco Clean + Bordes de Color" badge="MINIMALISTA" badgeColor="#06b6d4">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem' }}>
              <div
                className="rounded-2xl p-10 relative overflow-hidden"
                style={{ background: '#ffffff', border: '2px solid #e2e8f0' }}
              >
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#6B51EF' }} />
                    <span className="text-xs tracking-widest uppercase font-black" style={{ color: '#6B51EF' }}>
                      CFP ABIERTO
                    </span>
                  </div>
                  <h2 className="text-3xl font-black mb-3" style={{ color: '#0f172a' }}>
                    Call for Proposals 2026
                  </h2>
                  <p className="text-lg" style={{ color: '#64748b' }}>
                    Enviá tu propuesta hasta el <strong style={{ color: '#0f172a' }}>30 de Mayo 2026</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {tracks.map((track, idx) => {
                    const colors = ['#6B51EF', '#06b6d4', '#14b8a6', '#f97316']
                    const bgColors = ['#faf5ff', '#ecfeff', '#f0fdfa', '#fff7ed']
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl transition-all duration-200 hover:-translate-y-1"
                        style={{
                          background: bgColors[idx],
                          border: `2px solid ${colors[idx]}`,
                        }}
                      >
                        <p className="font-bold text-sm" style={{ color: '#0f172a' }}>
                          {track}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <div className="text-center">
                  <button
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black transition-all duration-200 hover:-translate-y-1 mb-3"
                    style={{ background: '#6B51EF', color: '#ffffff' }}
                  >
                    <Send className="w-5 h-5" />
                    Enviar propuesta
                  </button>
                  <p className="text-sm">
                    <a href="#" className="font-bold hover:underline" style={{ color: '#6B51EF' }}>
                      Ver guía completa del CFP →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </MockupContainer>

          {/* OPCIÓN C: Bento Grid con Imagen de Fondo */}
          <MockupContainer
            title="OPCIÓN C: Bento Grid + Imagen de Fondo"
            badge="⭐ VISUAL"
            badgeColor="#f97316"
          >
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem' }}>
              <div className="grid lg:grid-cols-3 gap-4">
                {/* Card principal con imagen de fondo */}
                <div
                  className="lg:col-span-2 rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background: '#0f172a',
                    color: '#ffffff',
                  }}
                >
                  {/* Imagen de fondo con overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>')`,
                      backgroundSize: '20px 20px',
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#10b981' }} />
                      <span className="text-xs tracking-widest uppercase font-black">CFP ABIERTO</span>
                    </div>
                    <h2 className="text-3xl font-black mb-3">Call for Proposals Abierto</h2>
                    <p className="text-lg mb-6 opacity-90">
                      Enviá tu propuesta hasta el <strong>30 de Mayo 2026</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {tracks.map((track, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg text-xs font-bold"
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                        >
                          {track}
                        </div>
                      ))}
                    </div>
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all duration-200 hover:-translate-y-1"
                      style={{ background: '#6B51EF', color: '#ffffff' }}
                    >
                      <Send className="w-4 h-4" />
                      Enviar propuesta
                    </button>
                  </div>
                </div>

                {/* Cards laterales */}
                <div className="space-y-4">
                  <div className="rounded-2xl p-6" style={{ background: '#faf5ff', border: '1.5px solid #ddd6fe' }}>
                    <Sparkles className="w-8 h-8 mb-3" style={{ color: '#6B51EF' }} />
                    <h3 className="font-black mb-2" style={{ color: '#0f172a' }}>
                      Experiencias reales
                    </h3>
                    <p className="text-sm" style={{ color: '#64748b' }}>
                      Casos de producción, no teoría
                    </p>
                  </div>
                  <div className="rounded-2xl p-6" style={{ background: '#ecfeff', border: '1.5px solid #a5f3fc' }}>
                    <Calendar className="w-8 h-8 mb-3" style={{ color: '#06b6d4' }} />
                    <h3 className="font-black mb-2" style={{ color: '#0f172a' }}>
                      30 de Mayo
                    </h3>
                    <p className="text-sm" style={{ color: '#64748b' }}>
                      Fecha límite CFP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </MockupContainer>

          {/* OPCIÓN D: Turquesa Sólido + Lista */}
          <MockupContainer title="OPCIÓN D: Turquesa Sólido + Lista Numerada" badge="PROFESIONAL" badgeColor="#06b6d4">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem' }}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left: Contenido */}
                  <div className="p-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#06b6d4' }} />
                      <span className="text-xs tracking-widest uppercase font-black" style={{ color: '#06b6d4' }}>
                        CFP ABIERTO
                      </span>
                    </div>
                    <h2 className="text-3xl font-black mb-3" style={{ color: '#0f172a' }}>
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
                              background: '#ecfeff',
                              color: '#06b6d4',
                              border: '1.5px solid #a5f3fc',
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
                      <button
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black transition-all duration-200 hover:-translate-y-1"
                        style={{ background: '#06b6d4', color: '#ffffff' }}
                      >
                        <Send className="w-4 h-4" />
                        Enviar propuesta
                      </button>
                      <button
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black transition-colors"
                        style={{
                          color: '#06b6d4',
                          border: '1.5px solid #a5f3fc',
                          background: '#ecfeff',
                        }}
                      >
                        Ver guía completa
                      </button>
                    </div>
                  </div>

                  {/* Right: Color sólido turquesa */}
                  <div
                    className="p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
                    style={{
                      background: '#06b6d4',
                      color: '#ffffff',
                    }}
                  >
                    <div className="relative z-10">
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.3)' }}
                      >
                        <Layers className="w-12 h-12" />
                      </div>
                      <div className="text-6xl font-black mb-2">4</div>
                      <p className="text-lg font-bold mb-1">Ejes Temáticos</p>
                      <p className="text-sm opacity-80">Múltiples formatos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MockupContainer>

          {/* OPCIÓN E: Card con Pattern + Color Morado */}
          <MockupContainer title="OPCIÓN E: Pattern Geométrico + Morado" badge="MODERNO" badgeColor="#14b8a6">
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem' }}>
              <div
                className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
                style={{
                  background: '#6B51EF',
                  color: '#ffffff',
                }}
              >
                {/* Pattern de fondo */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#ffffff' }} />
                      <span className="text-xs tracking-widest uppercase font-black">CFP ABIERTO</span>
                    </div>
                    <h2 className="text-3xl font-black mb-3">Call for Proposals 2026</h2>
                    <p className="text-lg opacity-95">
                      Enviá tu propuesta hasta el <strong>30 de Mayo</strong>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto">
                    {tracks.map((track, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          background: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.25)',
                        }}
                      >
                        <p className="font-bold text-sm">{track}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <button
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black transition-all duration-200 hover:-translate-y-1"
                      style={{ background: '#ffffff', color: '#6B51EF' }}
                    >
                      <Send className="w-5 h-5" />
                      Enviar propuesta
                    </button>
                    <button className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80">
                      Ver guía completa del CFP →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </MockupContainer>

          {/* OPCIÓN F: Banner Dark con Textura */}
          <MockupContainer title="OPCIÓN F: Dark Banner + Textura Sutil" badge="COMPACTO" badgeColor="#64748b">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem' }}>
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: '#0f172a', color: '#ffffff' }}
              >
                {/* Textura de fondo */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                                     radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
                    backgroundSize: '100px 100px',
                  }}
                />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
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

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black whitespace-nowrap transition-all duration-200 hover:-translate-y-1"
                      style={{ background: '#6B51EF', color: '#ffffff' }}
                    >
                      <Send className="w-4 h-4" />
                      Enviar propuesta
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black whitespace-nowrap transition-colors"
                      style={{
                        border: '1.5px solid #334155',
                        background: '#1e293b',
                        color: '#ffffff',
                      }}
                    >
                      Ver ejes temáticos
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </MockupContainer>
        </div>

        {/* Footer de comparación */}
        <div
          className="mt-12 p-8 rounded-2xl text-center"
          style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}
        >
          <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: '#10b981' }} />
          <h3 className="text-2xl font-black mb-3" style={{ color: '#0f172a' }}>
            ¿Cuál prefieres sin gradientes?
          </h3>
          <p className="text-lg mb-4" style={{ color: '#64748b' }}>
            Todas usan colores sólidos, patterns o imágenes de fondo. Dime el número (A, B, C, D, E o F)
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <span
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: '#6B51EF', color: '#ffffff' }}
            >
              A & E: Morado sólido
            </span>
            <span
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: '#06b6d4', color: '#ffffff' }}
            >
              D: Turquesa sólido
            </span>
            <span
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: '#0f172a', color: '#ffffff' }}
            >
              C & F: Dark + textura
            </span>
            <span
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: '#ffffff', color: '#0f172a', border: '1.5px solid #e2e8f0' }}
            >
              B: Blanco clean
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente auxiliar para el contenedor de mockup
function MockupContainer({
  title,
  badge,
  badgeColor,
  children,
}: {
  title: string
  badge?: string
  badgeColor?: string
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#ffffff', border: '2px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
      >
        <h3 className="font-black text-lg" style={{ color: '#0f172a' }}>
          {title}
        </h3>
        {badge && (
          <span
            className="px-3 py-1 rounded-full text-xs font-black tracking-wider"
            style={{ background: badgeColor, color: '#ffffff' }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  )
}
