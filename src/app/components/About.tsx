import { CheckCircle2, Globe, Users, Zap } from "lucide-react";

const limaImg = "https://images.unsplash.com/photo-1714876906025-77b148689e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMaW1hJTIwUGVydSUyMGNpdHklMjBza3lsaW5lJTIwbW9kZXJufGVufDF8fHx8MTc3MzAwNjU3OHww&ixlib=rb-4.1.0&q=80&w=1080";

const features = [
  {
    icon: Globe,
    title: "Movimiento Global",
    desc: "Parte de la red mundial de DevOpsDays con más de 100 ciudades participando cada año.",
    color: "#00d4ff",
  },
  {
    icon: Users,
    title: "Open Spaces",
    desc: "Formato participativo donde la agenda la construyen los asistentes en tiempo real.",
    color: "#7c3aed",
  },
  {
    icon: Zap,
    title: "Ignite Talks",
    desc: "Presentaciones de 5 minutos con diapositivas automáticas. Rápidas, intensas y reveladoras.",
    color: "#f97316",
  },
];

const highlights = [
  "Charlas técnicas de alto nivel",
  "Open Spaces participativos",
  "Workshops y talleres prácticos",
  "Networking con profesionales",
  "Expo de herramientas DevOps",
  "Comunidad activa post-evento",
];

export function About() {
  return (
    <section id="about" className="bg-[#0d1120] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#00d4ff] text-xs tracking-widest uppercase font-black mb-3 px-4 py-1.5 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full">
            Sobre el Evento
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.1 }}
          >
            ¿Qué es DevOpsDays?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
            DevOpsDays es una conferencia técnica que cubre temas de desarrollo de software,
            operaciones de IT y la intersección entre ellos. Organizada por la comunidad, para la
            comunidad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              <img
                src={limaImg}
                alt="Lima, Perú"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 to-[#7c3aed]/10" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-2xl p-4 shadow-xl text-white text-center">
              <div style={{ fontSize: "1.8rem", fontWeight: 900, lineHeight: 1 }}>5ta</div>
              <div className="text-xs opacity-90 mt-0.5">Edición</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3
              className="text-white mb-4"
              style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1.2 }}
            >
              El encuentro más importante de la cultura DevOps en Latinoamérica
            </h3>
            <p className="text-slate-400 mb-6" style={{ lineHeight: 1.8 }}>
              Reunimos a desarrolladores, ingenieros de plataforma, SREs, líderes técnicos y
              entusiastas de la automatización para compartir experiencias reales, no solo teoría.
            </p>
            <ul className="grid grid-cols-2 gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="group bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h4 className="text-white mb-2" style={{ fontWeight: 700, fontSize: "1rem" }}>
                {title}
              </h4>
              <p className="text-slate-400 text-sm" style={{ lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
