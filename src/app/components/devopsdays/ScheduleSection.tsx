import { useState } from 'react'
import { Coffee, Mic, BookOpen, Users, Zap, Clock } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { scheduleDay1, scheduleDay2, type ScheduleSession, type SessionType } from '../../data/mockContent'

// ─── Config per session type ──────────────────────────────────────────────────
type TypeConfig = {
  label: string
  color: string
  bg: string
  Icon: React.ElementType
}

const typeConfig: Record<SessionType, TypeConfig> = {
  keynote: { label: 'Keynote',    color: '#f97316', bg: '#f9731618', Icon: Mic },
  talk:    { label: 'Charla',     color: '#00d4ff', bg: '#00d4ff12', Icon: Mic },
  workshop:{ label: 'Workshop',   color: '#10b981', bg: '#10b98112', Icon: BookOpen },
  openspace:{ label: 'Open Space',color: '#7c3aed', bg: '#7c3aed12', Icon: Users },
  ignite:  { label: 'Ignite',     color: '#f59e0b', bg: '#f59e0b12', Icon: Zap },
  break:   { label: 'Pausa',      color: '#475569', bg: '#47556918', Icon: Coffee },
}

// ─── Track pill ────────────────────────────────────────────────────────────────
const trackColors: Record<string, string> = {
  'Track A': '#00d4ff',
  'Track B': '#7c3aed',
  'Workshop': '#10b981',
}

// ─── Session Row ──────────────────────────────────────────────────────────────
function SessionRow({ session }: { session: ScheduleSession }) {
  const cfg = typeConfig[session.type]
  const { Icon } = cfg
  const isBreak = session.type === 'break'
  const trackColor = session.track ? (trackColors[session.track] || '#94a3b8') : null

  return (
    <div
      className={`flex gap-4 px-4 py-3.5 rounded-xl transition-all duration-150 ${
        isBreak ? 'opacity-55' : 'hover:bg-white/[0.03] cursor-default'
      }`}
    >
      {/* Time column */}
      <div className="w-14 flex-shrink-0 text-right pt-0.5">
        <span className="text-slate-500 text-sm" style={{ fontFamily: 'monospace' }}>
          {session.time}
        </span>
      </div>

      {/* Dot + line */}
      <div className="flex flex-col items-center gap-0 flex-shrink-0">
        <div
          className="w-3 h-3 rounded-full mt-1 flex-shrink-0 ring-4"
          style={{ background: cfg.color, ringColor: `${cfg.color}25` }}
        />
        <div className="w-px flex-1 min-h-4" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>

      {/* Content */}
      <div className="flex-1 pb-2 min-w-0">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span
            className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-black"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}22` }}
          >
            <Icon className="w-3 h-3" />
            {cfg.label}
          </span>
          {session.track && trackColor && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${trackColor}12`, color: trackColor, border: `1px solid ${trackColor}22` }}
            >
              {session.track}
            </span>
          )}
          {session.duration && !isBreak && (
            <span className="text-slate-600 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {session.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <p
          className={isBreak ? 'text-slate-500' : 'text-slate-200'}
          style={{ fontWeight: isBreak ? 400 : 600, fontSize: '0.92rem', lineHeight: 1.4 }}
        >
          {session.title}
        </p>

        {/* Speaker + room */}
        <div className="flex flex-wrap gap-x-4 mt-0.5">
          {session.speaker && (
            <span className="text-slate-500 text-xs">{session.speaker}</span>
          )}
          {session.room && (
            <span className="text-slate-600 text-xs">📍 {session.room}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
// MEJORA PRINCIPAL: el sitio actual solo muestra un cuadro de texto "coming soon"
// Esta versión muestra el programa completo con timeline visual y sesiones por tipo

export function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<'day-1' | 'day-2'>('day-1')
  const sessions = activeDay === 'day-1' ? scheduleDay1 : scheduleDay2

  const days = [
    { key: 'day-1' as const, label: 'Día 1', date: '20 Ago' },
    { key: 'day-2' as const, label: 'Día 2', date: '21 Ago' },
  ]

  return (
    <section id="schedule" style={{ background: '#0f1324', padding: '6rem 0' }}>
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          eyebrow="Programa"
          eyebrowColor="#f97316"
          title=""
          lead="Dos días de charlas técnicas, workshops, open spaces e ignite talks. La agenda definitiva se publica el 1 de julio."
        />

        {/* Day tabs */}
        <div className="flex gap-2 justify-center mb-10">
          {days.map(({ key, label, date }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeDay === key}
              onClick={() => setActiveDay(key)}
              className="flex items-center gap-3 px-6 py-3 rounded-xl font-black text-sm tracking-wide transition-all duration-200"
              style={
                activeDay === key
                  ? { background: 'linear-gradient(135deg,#f97316,#f59e0b)', color: '#0b0f1e' }
                  : { background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)' }
              }
            >
              {label}
              <span
                className="px-2 py-0.5 rounded-lg text-xs"
                style={
                  activeDay === key
                    ? { background: 'rgba(0,0,0,0.2)', color: 'rgba(0,0,0,0.7)' }
                    : { background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }
                }
              >
                {date}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div
          className="rounded-2xl overflow-hidden divide-y"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            divideColor: 'rgba(255,255,255,0.04)',
          }}
        >
          {sessions.map((session, i) => (
            <SessionRow key={i} session={session} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-5 mt-8">
          {Object.entries(typeConfig).map(([key, { label, color, Icon }]) => (
            <div key={key} className="flex items-center gap-1.5 text-slate-500 text-xs">
              <Icon className="w-3 h-3" style={{ color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}