const networkingImg = "https://images.unsplash.com/photo-1560439514-4e9645039924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMG5ldHdvcmtpbmclMjBwZW9wbGUlMjBldmVudHxlbnwxfHx8fDE3NzMwMDY1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const devImg = "https://images.unsplash.com/photo-1759884248009-92c5e957708e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjBsYXB0b3AlMjBtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzczMDA2NTc5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const testimonials = [
  {
    quote:
      "DevOpsDays Lima fue un antes y un después en mi carrera. Salí con conexiones y conocimiento que cambió cómo trabajamos en mi empresa.",
    author: "Roberto Silva",
    role: "SRE Lead · Intercorp",
    avatar: "RS",
    color: "#00d4ff",
  },
  {
    quote:
      "Los Open Spaces son lo mejor del evento. Las conversaciones espontáneas entre asistentes son más valiosas que cualquier charla preparada.",
    author: "Patricia Quispe",
    role: "DevOps Engineer · BCP",
    avatar: "PQ",
    color: "#7c3aed",
  },
  {
    quote:
      "Vine por primera vez el año pasado y ya me registré para esta edición. La calidad de los speakers y la comunidad no tiene comparación.",
    author: "Fernando Huanca",
    role: "Platform Engineer · Rimac",
    avatar: "FH",
    color: "#f97316",
  },
];

export function Community() {
  return (
    <section className="bg-[#0a0e1a] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#10b981] text-xs tracking-widest uppercase font-black mb-3 px-4 py-1.5 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full">
            Comunidad
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.1 }}
          >
            Lo que dicen nuestros asistentes
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all duration-300"
            >
              <div
                className="text-3xl mb-4 opacity-60"
                style={{ color: t.color, fontFamily: "serif" }}
              >
                "
              </div>
              <p className="text-slate-300 text-sm mb-6" style={{ lineHeight: 1.8 }}>
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm" style={{ fontWeight: 600 }}>
                    {t.author}
                  </div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photo gallery */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden border border-white/8 h-64">
            <img
              src={networkingImg}
              alt="Networking DevOpsDays"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/8 h-64">
            <img
              src={devImg}
              alt="DevOpsDays Workshop"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
