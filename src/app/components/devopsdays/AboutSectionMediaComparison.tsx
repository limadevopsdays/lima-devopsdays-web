import { CheckCircle2, Globe, Users, Zap, Play } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const communityImg =
  'https://images.unsplash.com/photo-1737575291989-0882b03f97b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600&fit=crop'

const stats = [
  { value: '+800', label: 'Profesionales Tech' },
  { value: '2', label: 'Días de Contenido' },
  { value: '2da', label: 'Edición' },
]

const features = [
  { icon: Globe, label: 'Movimiento global', desc: 'Parte de la red mundial con +100 ciudades.', color: '#0ea5e9' },
  { icon: Users, label: 'Open Spaces', desc: 'La agenda la construyen los asistentes en vivo.', color: '#7c3aed' },
  { icon: Zap, label: 'Ignite Talks', desc: '5 minutos, 20 slides, ideas que cambian perspectivas.', color: '#f97316' },
]

const expectList = [
  'Charlas técnicas de alto nivel',
  'Open Spaces participativos',
  'Lightning talks de 5 minutos',
  'Networking real',
  'Expo de herramientas DevOps',
  'Comunidad activa post-evento',
]

// Opción de texto seleccionada (puedes cambiar esto después)
const selectedText = {
  lead: 'Impulsamos la evolución tecnológica conectando profesionales y fomentando el intercambio de conocimientos DevOps basado en experiencias reales.',
  desc: 'DevOpsDays es una conferencia global sobre cultura, herramientas y prácticas DevOps. Sin vendedores, sin marketing: solo comunidad y conocimiento.',
}

function MediaSection({ type, title, badge }: { type: 'image' | 'video'; title: string; badge: string }) {
  return (
    <div className="mb-20 pb-20" style={{ borderBottom: '2px solid #e2e8f0' }}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl" style={{ fontWeight: 900, color: '#0f172a' }}>
          {title}
        </h2>
        <span
          className="px-4 py-1.5 rounded-full text-xs"
          style={{
            background: type === 'video' ? '#7c3aed' : '#f8fafc',
            color: type === 'video' ? '#ffffff' : '#64748b',
            fontWeight: 700,
            border: type === 'video' ? 'none' : '1px solid #e2e8f0',
          }}
        >
          {badge}
        </span>
      </div>

      {/* Section Header */}
      <SectionHeader
        eyebrow="¡Regresamos este 2026!"
        eyebrowColor="#7c3aed"
        title="¿Qué es DevOpsDays Lima?"
        lead={selectedText.lead}
      />

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-px mb-14 rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e2e8f0' }}>
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

      {/* Two-col: media + content */}
      <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
        {/* Media card */}
        <div className="relative rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e2e8f0' }}>
          {type === 'image' ? (
            <>
              <img src={communityImg} alt="Comunidad DevOpsDays Lima" className="w-full h-80 object-cover" loading="lazy" />
              <div
                className="absolute bottom-5 left-5 px-4 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
              >
                <span className="text-sm font-black" style={{ color: '#0f172a' }}>
                  2da Edición · Lima
                </span>
              </div>
            </>
          ) : (
            <div className="relative" style={{ paddingBottom: '56.25%', background: '#0f172a' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/OOYWupGVhqA"
                title="DevOpsDays Lima"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
              <div
                className="absolute bottom-5 left-5 px-4 py-2 rounded-xl pointer-events-none"
                style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
              >
                <span className="text-sm font-black" style={{ color: '#0f172a' }}>
                  2da Edición · Lima
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content card */}
        <div className="rounded-2xl p-8" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
          <h3 className="mb-3" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#0f172a' }}>
            ¿Qué esperar del evento?
          </h3>
          <p className="mb-6" style={{ color: '#475569', lineHeight: 1.75 }}>
            {selectedText.desc}
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
      </div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-3 gap-5">
        {features.map(({ icon: Icon, label, desc, color }) => (
          <div
            key={label}
            className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${color}14`, border: `1px solid ${color}28` }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <p className="mb-1.5" style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
              {label}
            </p>
            <p className="text-sm" style={{ color: '#64748b', lineHeight: 1.6 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AboutSectionMediaComparison() {
  return (
    <div style={{ background: '#ffffff', padding: '4rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Título principal */}
        <div className="mb-16 text-center">
          <div
            className="inline-flex px-4 py-1.5 rounded-full mb-4"
            style={{ background: '#7c3aed', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}
          >
            COMPARACIÓN: IMAGEN vs VIDEO
          </div>
          <h1 className="text-4xl mb-4" style={{ fontWeight: 900, color: '#0f172a' }}>
            ¿Imagen o Video de YouTube?
          </h1>
          <p className="text-lg max-w-3xl mx-auto mb-8" style={{ color: '#64748b' }}>
            Compara ambas opciones con el video oficial de DevOpsDays Lima
          </p>

          {/* Pros/Cons Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {/* Imagen */}
            <div className="rounded-2xl p-6 text-left" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: '#0ea5e914', border: '1px solid #0ea5e928' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>IMAGEN ESTÁTICA</h3>
              </div>
              <div className="space-y-2 text-sm" style={{ color: '#475569' }}>
                <p>✅ Carga más rápido</p>
                <p>✅ Menos peso en la página</p>
                <p>✅ Diseño más limpio</p>
                <p>✅ SEO mejorado con alt text</p>
                <p>❌ Menos engagement visual</p>
                <p>❌ No muestra el evento en acción</p>
              </div>
            </div>

            {/* Video */}
            <div className="rounded-2xl p-6 text-left" style={{ background: '#7c3aed14', border: '1.5px solid #7c3aed' }}>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: '#7c3aed', border: '1px solid #7c3aed' }}
                >
                  <Play className="w-5 h-5" style={{ color: '#ffffff' }} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>VIDEO DE YOUTUBE</h3>
              </div>
              <div className="space-y-2 text-sm" style={{ color: '#475569' }}>
                <p>✅ Mayor engagement (contenido dinámico)</p>
                <p>✅ Muestra ambiente real del evento</p>
                <p>✅ Genera confianza y credibilidad</p>
                <p>✅ Los usuarios pasan más tiempo</p>
                <p>❌ Carga más lenta (embed de YouTube)</p>
                <p>❌ Puede distraer del contenido</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup con Imagen */}
        <MediaSection type="image" title="OPCIÓN A: Con Imagen Estática" badge="🖼️ TRADICIONAL" />

        {/* Mockup con Video */}
        <MediaSection type="video" title="OPCIÓN B: Con Video de YouTube" badge="🎬 DINÁMICO" />

        {/* Alternativas adicionales */}
        <div className="mb-20 pb-20" style={{ borderBottom: '2px solid #e2e8f0' }}>
          <h2 className="text-2xl mb-8" style={{ fontWeight: 900, color: '#0f172a' }}>
            OPCIÓN C: Híbrida (Imagen + Play Button)
          </h2>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ border: '1.5px solid #e2e8f0' }}>
              <img src={communityImg} alt="Comunidad DevOpsDays Lima" className="w-full h-80 object-cover" loading="lazy" />
              {/* Dark overlay on hover */}
              <div
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                {/* Play button */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: '#7c3aed', boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)' }}
                >
                  <Play className="w-8 h-8 ml-1" style={{ color: '#ffffff' }} />
                </div>
              </div>
              {/* Badge */}
              <div
                className="absolute bottom-5 left-5 px-4 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
              >
                <span className="text-sm font-black" style={{ color: '#0f172a' }}>
                  ▶ Ver video · 2da Edición
                </span>
              </div>
            </div>

            <div className="rounded-2xl p-8" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <h3 className="mb-3" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#0f172a' }}>
                🎯 Lo mejor de ambos mundos
              </h3>
              <p className="mb-6" style={{ color: '#475569', lineHeight: 1.75 }}>
                Imagen de fondo con botón de play que abre un modal con el video de YouTube. Carga rápida inicial, video
                disponible bajo demanda.
              </p>
              <div className="space-y-2 text-sm" style={{ color: '#475569' }}>
                <p>✅ Carga inicial rápida (solo imagen)</p>
                <p>✅ Video disponible al hacer clic</p>
                <p>✅ No distrae automáticamente</p>
                <p>✅ Usuario decide si quiere ver el video</p>
                <p>✅ Mejor UX y rendimiento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decisión final */}
        <div className="text-center p-8 rounded-2xl" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
          <p className="text-xl mb-4" style={{ fontWeight: 800, color: '#0f172a' }}>
            ¿Qué opción prefieres?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: '#64748b' }}>
            <span className="px-4 py-2 rounded-lg" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
              🖼️ Opción A: Imagen estática
            </span>
            <span className="px-4 py-2 rounded-lg" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
              🎬 Opción B: Video embebido
            </span>
            <span className="px-4 py-2 rounded-lg" style={{ background: '#7c3aed', color: '#ffffff', fontWeight: 700 }}>
              🎯 Opción C: Imagen + Play (Recomendada)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
