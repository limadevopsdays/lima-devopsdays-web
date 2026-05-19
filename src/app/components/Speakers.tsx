import { Twitter, Linkedin, Globe } from "lucide-react";

const speakers = [
  {
    id: 1,
    name: "Ana García",
    role: "Principal SRE",
    company: "Google Cloud",
    country: "🇲🇽 México",
    topic: "Observabilidad a escala: OpenTelemetry en producción",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&crop=face",
    tags: ["SRE", "Observabilidad"],
    color: "#00d4ff",
  },
  {
    id: 2,
    name: "Carlos Mendez",
    role: "DevOps Lead",
    company: "Mercado Libre",
    country: "🇦🇷 Argentina",
    topic: "Platform Engineering: construyendo el futuro de la IDP",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    tags: ["Platform Eng.", "Kubernetes"],
    color: "#6B51EF",
  },
  {
    id: 3,
    name: "Lucía Flores",
    role: "Security Engineer",
    company: "Nubank",
    country: "🇧🇷 Brasil",
    topic: "DevSecOps: seguridad en el pipeline sin frenar el delivery",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    tags: ["DevSecOps", "CI/CD"],
    color: "#f97316",
  },
  {
    id: 4,
    name: "Diego Ramírez",
    role: "Staff Engineer",
    company: "Falabella Tech",
    country: "🇵🇪 Perú",
    topic: "FinOps: optimizando costos cloud sin perder velocidad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    tags: ["FinOps", "AWS"],
    color: "#10b981",
  },
  {
    id: 5,
    name: "Valentina Cruz",
    role: "Head of Engineering",
    company: "Rappi",
    country: "🇨🇴 Colombia",
    topic: "Cultura de ingeniería: del caos al orden sin matar la innovación",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    tags: ["Cultura", "Liderazgo"],
    color: "#f59e0b",
  },
  {
    id: 6,
    name: "Miguel Torres",
    role: "Cloud Architect",
    company: "AWS",
    country: "🇵🇪 Perú",
    topic: "Infraestructura como código con CDK y Terraform en el mundo real",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    tags: ["IaC", "Terraform"],
    color: "#ec4899",
  },
];

export function Speakers() {
  return (
    <section id="speakers" className="bg-[#0a0e1a] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#6B51EF] text-xs tracking-widest uppercase font-black mb-3 px-4 py-1.5 bg-[#6B51EF]/10 border border-[#6B51EF]/20 rounded-full">
            Speakers Confirmados
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.1 }}
          >
            Aprende de los mejores
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            Expertos de empresas líderes de Latinoamérica y el mundo compartirán sus experiencias
            reales con herramientas, procesos y cultura DevOps.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="group relative bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ boxShadow: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 25px 50px ${speaker.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${speaker.color}, transparent)` }}
              />

              <div className="p-6">
                {/* Avatar + info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={speaker.avatar}
                      alt={speaker.name}
                      className="w-16 h-16 rounded-xl object-cover border-2"
                      style={{ borderColor: `${speaker.color}40` }}
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#0a0e1a] flex items-center justify-center text-xs"
                      style={{ background: speaker.color, fontSize: "8px" }}
                    >
                      ✓
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4
                      className="text-white truncate"
                      style={{ fontWeight: 700, fontSize: "0.95rem" }}
                    >
                      {speaker.name}
                    </h4>
                    <p className="text-slate-400 text-xs">{speaker.role}</p>
                    <p className="text-xs mt-0.5" style={{ color: speaker.color }}>
                      {speaker.company}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">{speaker.country}</p>
                  </div>
                </div>

                {/* Topic */}
                <p className="text-slate-300 text-sm mb-4" style={{ lineHeight: 1.6 }}>
                  "{speaker.topic}"
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {speaker.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: `${speaker.color}15`,
                        color: speaker.color,
                        border: `1px solid ${speaker.color}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="text-slate-500 hover:text-[#1da1f2] transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="text-slate-500 hover:text-[#0077b5] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <Globe className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-500 mb-4 text-sm">¿Tienes algo valioso para compartir?</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-[#6B51EF]/50 text-[#6B51EF] hover:bg-[#6B51EF]/10 px-6 py-3 rounded-full text-sm font-black tracking-wide transition-all duration-200"
          >
            Proponer una Charla (CFP)
          </a>
        </div>
      </div>
    </section>
  );
}
