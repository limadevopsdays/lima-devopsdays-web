import { Send, ArrowRight, Sparkles, Calendar, Users, Zap, CheckCircle2 } from 'lucide-react'

// Este componente muestra las 6 opciones en mockups lado a lado
export function SpeakersMockups() {
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
            🎨 Call for Speakers - Mockups Visuales
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#64748b' }}>
            6 opciones de diseño para elegir · Haz scroll para ver todas
          </p>
        </div>

        {/* Grid de mockups */}
        <div className="space-y-12">
          {/* OPCIÓN A */}
          <MockupContainer
            title="OPCIÓN A: Grid 2×2 Glassmorphism (Actual)"
            badge="IMPLEMENTADA"
            badgeColor="#10b981"
          >
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem' }}>
              <div
                className="rounded-2xl p-10 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
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
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black"
                      style={{ background: '#ffffff', color: '#7c3aed' }}
                    >
                      <Send className="w-5 h-5" />
                      Enviar propuesta
                    </button>
                    <button className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#ffffff' }}>
                      Ver guía completa del CFP →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </MockupContainer>

          {/* OPCIÓN B */}
          <MockupContainer title="OPCIÓN B: Timeline Horizontal Minimalista" badge="RECOMENDADA" badgeColor="#7c3aed">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem' }}>
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#7c3aed' }} />
                  <span className="text-xs tracking-widest uppercase font-black" style={{ color: '#7c3aed' }}>
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

              <div className="relative mb-10">
                <div
                  className="absolute top-6 left-0 right-0 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, #7c3aed 0%, #06b6d4 50%, #14b8a6 75%, #f97316 100%)',
                  }}
                />
                <div className="grid grid-cols-4 gap-4 relative">
                  {tracks.map((track, idx) => {
                    const colors = ['#7c3aed', '#06b6d4', '#14b8a6', '#f97316']
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

              <div className="text-center">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black"
                  style={{ background: '#7c3aed', color: '#ffffff' }}
                >
                  <Send className="w-5 h-5" />
                  Enviar tu propuesta
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </MockupContainer>

          {/* OPCIÓN C */}
          <MockupContainer title="OPCIÓN C: Bento Grid Asimétrico" badge="⭐ FAVORITA" badgeColor="#f97316">
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem' }}>
              <div className="grid lg:grid-cols-3 gap-4">
                <div
                  className="lg:col-span-2 rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                    color: '#ffffff',
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#ffffff' }} />
                      <span className="text-xs tracking-widest uppercase font-black">CFP ABIERTO</span>
                    </div>
                    <h2 className="text-3xl font-black mb-3">Call for Proposals Abierto</h2>
                    <p className="text-lg mb-6 opacity-95">
                      Enviá tu propuesta hasta el <strong>30 de Mayo 2026</strong>
                    </p>
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
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black"
                      style={{ background: '#ffffff', color: '#7c3aed' }}
                    >
                      <Send className="w-4 h-4" />
                      Enviar propuesta
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl p-6" style={{ background: '#faf5ff', border: '1.5px solid #ddd6fe' }}>
                    <Sparkles className="w-8 h-8 mb-3" style={{ color: '#7c3aed' }} />
                    <h3 className="font-black mb-2" style={{ color: '#0f172a' }}>
                      Experiencias reales
                    </h3>
                    <p className="text-sm" style={{ color: '#64748b' }}>
                      Buscamos casos de producción, no teoría vacía
                    </p>
                  </div>
                  <div className="rounded-2xl p-6" style={{ background: '#ecfeff', border: '1.5px solid #a5f3fc' }}>
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
            </div>
          </MockupContainer>

          {/* OPCIÓN D */}
          <MockupContainer title="OPCIÓN D: Split Card con Stat" badge="PROFESIONAL" badgeColor="#06b6d4">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem' }}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#7c3aed' }} />
                      <span className="text-xs tracking-widest uppercase font-black" style={{ color: '#7c3aed' }}>
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
                              background: '#faf5ff',
                              color: '#7c3aed',
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
                    <div className="flex gap-3">
                      <button
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black"
                        style={{ background: '#7c3aed', color: '#ffffff' }}
                      >
                        <Send className="w-4 h-4" />
                        Enviar propuesta
                      </button>
                      <button
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black"
                        style={{
                          color: '#7c3aed',
                          border: '1.5px solid #ddd6fe',
                          background: '#faf5ff',
                        }}
                      >
                        Ver guía completa
                      </button>
                    </div>
                  </div>

                  <div
                    className="p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                      color: '#ffffff',
                    }}
                  >
                    <div className="relative z-10">
                      <Users className="w-16 h-16 mx-auto mb-4 opacity-90" />
                      <div className="text-6xl font-black mb-2">4</div>
                      <p className="text-lg font-bold mb-1">Ejes Temáticos</p>
                      <p className="text-sm opacity-80">Múltiples formatos disponibles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MockupContainer>

          {/* OPCIÓN E */}
          <MockupContainer title="OPCIÓN E: Horizontal Scroll Pills" badge="MOBILE-FIRST" badgeColor="#14b8a6">
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem' }}>
              <div
                className="rounded-2xl p-8 md:p-10"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                  color: '#ffffff',
                }}
              >
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

                <div className="overflow-x-auto pb-4 mb-8 -mx-2 px-2">
                  <div className="flex gap-3 min-w-max">
                    {[
                      { icon: Zap, text: 'Platform Engineering & DevOps' },
                      { icon: Sparkles, text: 'Seguridad y Transformación' },
                      { icon: Users, text: 'Liderazgo Moderno' },
                      { icon: Send, text: 'IA y Estrategia de Datos' },
                    ].map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 px-6 py-4 rounded-xl"
                          style={{
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            minWidth: '280px',
                          }}
                        >
                          <Icon className="w-6 h-6 flex-shrink-0" />
                          <span className="font-bold text-sm">{item.text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="flex gap-4 items-center justify-center">
                  <button
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black"
                    style={{ background: '#ffffff', color: '#7c3aed' }}
                  >
                    <Send className="w-5 h-5" />
                    Enviar propuesta
                  </button>
                  <button className="inline-flex items-center gap-2 text-sm font-bold">Ver guía completa del CFP →</button>
                </div>
              </div>
            </div>
          </MockupContainer>

          {/* OPCIÓN F */}
          <MockupContainer title="OPCIÓN F: Compact Banner Dark" badge="COMPACTO" badgeColor="#64748b">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem' }}>
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: '#0f172a', color: '#ffffff' }}
              >
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#7c3aed' }}
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

                  <div className="flex gap-3">
                    <button
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black whitespace-nowrap"
                      style={{ background: '#7c3aed', color: '#ffffff' }}
                    >
                      <Send className="w-4 h-4" />
                      Enviar propuesta
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black whitespace-nowrap"
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
              <div className="text-center mt-3">
                <button className="text-xs font-bold" style={{ color: '#7c3aed' }}>
                  Ver los 4 ejes temáticos completos ↓
                </button>
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
            ¿Cuál prefieres?
          </h3>
          <p className="text-lg mb-4" style={{ color: '#64748b' }}>
            Todas están listas para implementar. Solo dime el número de opción (A, B, C, D, E o F)
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <span
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: '#faf5ff', color: '#7c3aed', border: '1.5px solid #ddd6fe' }}
            >
              ⭐ Recomendada: Opción C (Bento Grid)
            </span>
            <span
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: '#ecfeff', color: '#06b6d4', border: '1.5px solid #a5f3fc' }}
            >
              🏆 Más minimalista: Opción B (Timeline)
            </span>
            <span
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: '#fff7ed', color: '#f97316', border: '1.5px solid #fed7aa' }}
            >
              📱 Mejor mobile: Opción E (Scroll)
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
