import { Calendar, MapPin, ArrowRight, Play, Users, Mic, Clock } from "lucide-react";

const conferenceSpeakerImg = "https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29uZmVyZW5jZSUyMHNwZWFrZXIlMjBzdGFnZXxlbnwxfHx8fDE3NzMwMDY1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080";

const stats = [
  { icon: Users, value: "500+", label: "Asistentes" },
  { icon: Mic, value: "25+", label: "Speakers" },
  { icon: Clock, value: "2", label: "Días" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0e1a]"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            animation: "pulse 10s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
            animation: "pulse 12s ease-in-out infinite 4s",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            <span className="text-[#00d4ff] text-sm tracking-widest uppercase font-black">
              Lima, Perú · 2025
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white mb-4"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            devops
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              days
            </span>
            <br />
            <span className="text-white">Perú 2025</span>
          </h1>

          <p className="text-slate-400 mb-8 max-w-lg" style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
            El evento más grande de DevOps, SRE y cultura DevSecOps en el Perú. Dos días de
            aprendizaje, networking y colaboración con expertos de la región y del mundo.
          </p>

          {/* Date & Location */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-slate-300 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
              <Calendar className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-sm">15 – 16 de agosto, 2025</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
              <MapPin className="w-4 h-4 text-[#f97316]" />
              <span className="text-sm">Centro de Convenciones, Lima</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14" id="tickets">
            <a
              href="#"
              className="group inline-flex items-center gap-2 bg-[#00d4ff] hover:bg-[#00b8d9] text-[#0a0e1a] px-7 py-3.5 rounded-full font-black tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-[#00d4ff]/30 hover:-translate-y-0.5"
              style={{ fontSize: "0.95rem" }}
            >
              Comprar Entradas
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#speakers"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-7 py-3.5 rounded-full font-black tracking-wide transition-all duration-200 hover:-translate-y-0.5"
              style={{ fontSize: "0.95rem" }}
            >
              <Play className="w-4 h-4 fill-current text-[#00d4ff]" />
              Ver Speakers
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className="w-4 h-4 text-[#00d4ff] mb-1 mx-auto" />
                <div
                  className="text-white"
                  style={{ fontSize: "1.5rem", fontWeight: 900, lineHeight: 1 }}
                >
                  {value}
                </div>
                <div className="text-slate-500 text-xs mt-1 tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image card */}
        <div className="relative hidden lg:block">
          <div
            className="absolute inset-0 rounded-2xl opacity-60"
            style={{
              background: "linear-gradient(135deg, #00d4ff20, #7c3aed20)",
              transform: "rotate(-2deg) scale(1.02)",
            }}
          />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <img
              src={conferenceSpeakerImg}
              alt="DevOpsDays Peru Conference"
              className="w-full h-[440px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 via-transparent to-transparent" />
            {/* Floating card */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#0a0e1a]/80 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white text-xs font-black">
                  500+
                </div>
                <div>
                  <div className="text-white text-sm font-black">Comunidad DevOps Perú</div>
                  <div className="text-slate-400 text-xs">Únete a la comunidad más activa del país</div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative dots */}
          <div
            className="absolute -right-6 -bottom-6 w-32 h-32 opacity-30"
            style={{
              backgroundImage: "radial-gradient(#00d4ff 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.05); opacity: 0.25; }
        }
      `}</style>
    </section>
  );
}
