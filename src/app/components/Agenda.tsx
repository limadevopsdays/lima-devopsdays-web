import { useState } from "react";
import { Coffee, Mic, Users, BookOpen, Clock } from "lucide-react";

type SessionType = "talk" | "workshop" | "openspace" | "break" | "keynote";

interface Session {
  time: string;
  duration: string;
  title: string;
  speaker?: string;
  type: SessionType;
  track?: string;
  room?: string;
}

const day1: Session[] = [
  { time: "08:00", duration: "60 min", title: "Registro y Bienvenida", type: "break" },
  {
    time: "09:00",
    duration: "45 min",
    title: "Keynote: El futuro de la ingeniería de plataformas en LATAM",
    speaker: "Ana García",
    type: "keynote",
    room: "Auditorio Principal",
  },
  {
    time: "09:50",
    duration: "30 min",
    title: "Observabilidad con OpenTelemetry: un caso real",
    speaker: "Carlos Mendez",
    type: "talk",
    track: "Track A",
    room: "Sala A",
  },
  {
    time: "09:50",
    duration: "30 min",
    title: "DevSecOps: integrando seguridad desde el día 1",
    speaker: "Lucía Flores",
    type: "talk",
    track: "Track B",
    room: "Sala B",
  },
  { time: "10:30", duration: "30 min", title: "Café y Networking", type: "break" },
  {
    time: "11:00",
    duration: "30 min",
    title: "Kubernetes en producción sin morir en el intento",
    speaker: "Diego Ramírez",
    type: "talk",
    track: "Track A",
    room: "Sala A",
  },
  {
    time: "11:00",
    duration: "30 min",
    title: "Cultura DevOps: cómo convencer a tu organización",
    speaker: "Valentina Cruz",
    type: "talk",
    track: "Track B",
    room: "Sala B",
  },
  {
    time: "11:40",
    duration: "90 min",
    title: "Open Spaces — Sesión 1",
    type: "openspace",
    room: "Jardín Principal",
  },
  { time: "13:10", duration: "60 min", title: "Almuerzo y Networking", type: "break" },
  {
    time: "14:10",
    duration: "30 min",
    title: "FinOps: optimizando costos en AWS sin perder velocidad",
    speaker: "Miguel Torres",
    type: "talk",
    track: "Track A",
    room: "Sala A",
  },
  {
    time: "14:10",
    duration: "120 min",
    title: "Workshop: Infraestructura como Código con Terraform",
    speaker: "Diego Ramírez",
    type: "workshop",
    track: "Workshop",
    room: "Sala Taller",
  },
  {
    time: "14:50",
    duration: "90 min",
    title: "Open Spaces — Sesión 2",
    type: "openspace",
    room: "Jardín Principal",
  },
  { time: "16:20", duration: "10 min", title: "Ignite Talks", type: "talk", room: "Auditorio Principal" },
  { time: "17:00", duration: "", title: "Cierre del Día 1 + Cóctel", type: "break" },
];

const typeConfig: Record<SessionType, { label: string; color: string; bg: string; icon: typeof Mic }> = {
  keynote: { label: "Keynote", color: "#f97316", bg: "#f9731615", icon: Mic },
  talk: { label: "Charla", color: "#00d4ff", bg: "#00d4ff15", icon: Mic },
  workshop: { label: "Workshop", color: "#10b981", bg: "#10b98115", icon: BookOpen },
  openspace: { label: "Open Space", color: "#7c3aed", bg: "#7c3aed15", icon: Users },
  break: { label: "Pausa", color: "#6b7280", bg: "#6b728015", icon: Coffee },
};

function SessionCard({ session }: { session: Session }) {
  const config = typeConfig[session.type];
  const Icon = config.icon;

  const isBreak = session.type === "break";

  return (
    <div
      className={`flex gap-4 py-3 px-4 rounded-xl transition-all duration-200 ${
        isBreak ? "opacity-70" : "hover:bg-white/4 cursor-pointer group"
      }`}
    >
      {/* Time */}
      <div className="flex-shrink-0 w-16 text-right">
        <span className="text-slate-500 text-sm font-mono">{session.time}</span>
      </div>

      {/* Connector */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div
          className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
          style={{ background: config.color }}
        />
        <div className="w-px flex-1 bg-white/5 min-h-4" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span
            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-black tracking-wide"
            style={{ background: config.bg, color: config.color, border: `1px solid ${config.color}25` }}
          >
            <Icon className="w-3 h-3" />
            {config.label}
          </span>
          {session.track && (
            <span className="text-xs text-slate-600 px-2 py-0.5 bg-white/3 rounded-full border border-white/8">
              {session.track}
            </span>
          )}
          {session.duration && (
            <span className="text-xs text-slate-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {session.duration}
            </span>
          )}
        </div>
        <h4
          className={`mb-0.5 ${isBreak ? "text-slate-500" : "text-slate-200 group-hover:text-white transition-colors"}`}
          style={{ fontWeight: isBreak ? 400 : 600, fontSize: "0.92rem" }}
        >
          {session.title}
        </h4>
        {session.speaker && (
          <p className="text-slate-500 text-xs">{session.speaker}</p>
        )}
        {session.room && (
          <p className="text-slate-600 text-xs">📍 {session.room}</p>
        )}
      </div>
    </div>
  );
}

export function Agenda() {
  const [activeDay, setActiveDay] = useState(0);
  const days = ["Día 1 · 15 Ago", "Día 2 · 16 Ago"];

  return (
    <section id="agenda" className="bg-[#0d1120] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[#f97316] text-xs tracking-widest uppercase font-black mb-3 px-4 py-1.5 bg-[#f97316]/10 border border-[#f97316]/20 rounded-full">
            Programa Oficial
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.1 }}
          >
            Agenda del Evento
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto" style={{ lineHeight: 1.7 }}>
            Dos días repletos de charlas técnicas, talleres prácticos y espacios de co-creación.
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 bg-white/3 border border-white/8 rounded-2xl p-1.5 mb-8 max-w-xs mx-auto">
          {days.map((day, i) => (
            <button
              key={day}
              onClick={() => setActiveDay(i)}
              className="flex-1 py-2 px-4 rounded-xl text-sm font-black tracking-wide transition-all duration-200"
              style={
                activeDay === i
                  ? {
                      background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                      color: "white",
                    }
                  : { color: "#6b7280" }
              }
            >
              {day}
            </button>
          ))}
        </div>

        {/* Sessions */}
        <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
          <div className="divide-y divide-white/5">
            {activeDay === 0 ? (
              day1.map((session, i) => (
                <SessionCard key={i} session={session} />
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="text-slate-600 text-4xl mb-4">🗓</div>
                <p className="text-slate-500 text-sm">
                  Agenda del Día 2 próximamente — ¡suscríbete para ser el primero en saberlo!
                </p>
                <a
                  href="#contact"
                  className="inline-block mt-4 text-[#00d4ff] text-sm hover:underline"
                >
                  Notifícame →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {Object.entries(typeConfig).map(([key, { label, color, bg }]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-slate-500">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
