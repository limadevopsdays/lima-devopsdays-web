import { CheckCircle2, Globe, Users, Zap } from 'lucide-react'
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

// Opciones de texto
const textOptions = [
  {
    id: 1,
    name: 'OPCIÓN 1: Ultra Concisa',
    badge: '⭐ RECOMENDADA',
    lead: 'Impulsamos la evolución tecnológica conectando profesionales y fomentando el intercambio de conocimientos DevOps basado en experiencias reales.',
    desc: 'DevOpsDays es una conferencia global sobre cultura, herramientas y prácticas DevOps. Sin vendedores, sin marketing: solo comunidad y conocimiento.',
  },
  {
    id: 2,
    name: 'OPCIÓN 2: Mínima',
    badge: '50% MÁS CORTA',
    lead: 'Un evento que conecta profesionales, fomenta el intercambio de conocimientos DevOps y refuerza una cultura de innovación continua.',
    desc: 'Conferencia global sobre DevOps que reúne a profesionales para compartir experiencias. Solo comunidad y conocimiento real.',
  },
  {
    id: 3,
    name: 'OPCIÓN 3: Solo Esencia',
    badge: '65% MÁS CORTA',
    lead: 'Conectamos profesionales DevOps para impulsar la innovación continua basada en experiencias reales.',
    desc: 'Conferencia global sobre cultura y prácticas DevOps. Sin vendedores: solo comunidad y conocimiento.',
  },
  {
    id: 4,
    name: 'OPCIÓN 4: Dos Frases Directas',
    badge: '45% MÁS CORTA',
    lead: 'Impulsamos la evolución tecnológica DevOps. Conectamos profesionales y fomentamos el intercambio de experiencias reales.',
    desc: 'Conferencia global sobre cultura, herramientas y prácticas DevOps. Solo comunidad, sin marketing.',
  },
  {
    id: 5,
    name: 'OPCIÓN 5: Sin Misión',
    badge: 'ENFOQUE DEFINICIÓN',
    lead: 'Conferencia técnica organizada por la comunidad para compartir experiencias reales sobre DevOps, cultura y herramientas.',
    desc: 'Parte del movimiento global DevOpsDays. Reunimos a profesionales para intercambiar conocimientos. Sin vendedores: solo comunidad.',
  },
  {
    id: 6,
    name: 'OPCIÓN 6: Enfoque en Acción',
    badge: '70% MÁS CORTA',
    lead: 'Conecta, aprende e impulsa la innovación DevOps con profesionales que comparten experiencias reales.',
    desc: 'Conferencia global sobre cultura y prácticas DevOps. Comunidad antes que marketing.',
  },
]

function MockupSection({ option }: { option: typeof textOptions[0] }) {
  return (
    <div className="mb-16 pb-16" style={{ borderBottom: '2px solid #e2e8f0' }}>
      {/* Header de la opción */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl" style={{ fontWeight: 900, color: '#0f172a' }}>
          {option.name}
        </h2>
        <span
          className="px-4 py-1.5 rounded-full text-xs"
          style={{
            background: option.id === 1 ? '#7c3aed' : '#f8fafc',
            color: option.id === 1 ? '#ffffff' : '#64748b',
            fontWeight: 700,
            border: option.id === 1 ? 'none' : '1px solid #e2e8f0',
          }}
        >
          {option.badge}
        </span>
      </div>

      {/* Section Header */}
      <SectionHeader
        eyebrow="¡Regresamos este 2026!"
        eyebrowColor="#7c3aed"
        title="¿Qué es DevOpsDays Lima?"
        lead={option.lead}
      />

      {/* Stats bar */}
      <div
        className="grid grid-cols-3 gap-px mb-14 rounded-2xl overflow-hidden"
        style={{ border: '1.5px solid #e2e8f0' }}
      >
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

      {/* Two-col: image + content */}
      <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
        {/* Image card */}
        <div className="relative rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e2e8f0' }}>
          <img src={communityImg} alt="Comunidad DevOpsDays Lima" className="w-full h-80 object-cover" loading="lazy" />
          {/* Edition badge */}
          <div
            className="absolute bottom-5 left-5 px-4 py-2 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
          >
            <span className="text-sm font-black" style={{ color: '#0f172a' }}>
              2da Edición · Lima
            </span>
          </div>
        </div>

        {/* Content card */}
        <div className="rounded-2xl p-8" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
          <h3 className="mb-3" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#0f172a' }}>
            ¿Qué esperar del evento?
          </h3>
          <p className="mb-6" style={{ color: '#475569', lineHeight: 1.75 }}>
            {option.desc}
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

export function AboutSectionMockups() {
  return (
    <div style={{ background: '#ffffff', padding: '4rem 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Título principal */}
        <div className="mb-16 text-center">
          <div
            className="inline-flex px-4 py-1.5 rounded-full mb-4"
            style={{ background: '#7c3aed', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}
          >
            MOCKUPS DE OPCIONES DE TEXTO
          </div>
          <h1 className="text-4xl mb-4" style={{ fontWeight: 900, color: '#0f172a' }}>
            Comparación de Versiones
          </h1>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#64748b' }}>
            Revisa cada opción con las estadísticas actualizadas (+800 profesionales tech, 2 días de contenido, 2da edición)
          </p>
        </div>

        {/* Todas las opciones */}
        {textOptions.map((option) => (
          <MockupSection key={option.id} option={option} />
        ))}

        {/* Botón de decisión */}
        <div className="text-center mt-16 p-8 rounded-2xl" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
          <p className="text-xl mb-4" style={{ fontWeight: 800, color: '#0f172a' }}>
            ¿Cuál opción prefieres?
          </p>
          <p style={{ color: '#64748b' }}>
            Dime el número de la opción que más te guste y la aplicaré inmediatamente 🚀
          </p>
        </div>
      </div>
    </div>
  )
}