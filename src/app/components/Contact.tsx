import { useState } from "react";
import { Mail, Send, Twitter, Linkedin, Youtube, MapPin, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="contact" className="bg-[#0d1120] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-[#00d4ff] text-xs tracking-widest uppercase font-black mb-4 px-4 py-1.5 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full">
              Mantente Informado
            </span>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, lineHeight: 1.1 }}
            >
              No te pierdas ninguna novedad
            </h2>
            <p className="text-slate-400 mb-8" style={{ lineHeight: 1.7 }}>
              Suscríbete para recibir actualizaciones sobre el programa, nuevos speakers, early bird
              tickets y mucho más.
            </p>

            {/* Email form */}
            {submitted ? (
              <div className="flex items-center gap-3 bg-[#10b981]/10 border border-[#10b981]/30 rounded-xl px-5 py-4 text-[#10b981]">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">¡Perfecto! Te avisaremos cuando haya novedades.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 bg-white/5 border border-white/10 focus-within:border-[#00d4ff]/50 rounded-xl px-4 py-3 transition-colors">
                  <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="bg-transparent text-white placeholder-slate-600 text-sm outline-none w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#00d4ff] hover:bg-[#00b8d9] text-[#0a0e1a] px-5 py-3 rounded-xl font-black text-sm tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-[#00d4ff]/25 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                  Suscribir
                </button>
              </form>
            )}

            {/* Social */}
            <div className="mt-8">
              <p className="text-slate-600 text-xs uppercase tracking-widest mb-4">
                Síguenos en redes
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Twitter, label: "@devopsdaysperu", color: "#1da1f2" },
                  { icon: Linkedin, label: "devopsdays-peru", color: "#0077b5" },
                  { icon: Youtube, label: "DevOpsDays Peru", color: "#ff0000" },
                ].map(({ icon: Icon, label, color }) => (
                  <a
                    key={label}
                    href="#"
                    className="group flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: `${color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="hidden sm:block">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: map / venue */}
          <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
            {/* Map placeholder */}
            <div
              className="h-52 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0a0e1a, #1a1f35)",
              }}
            >
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center shadow-lg shadow-[#f97316]/40 mb-2">
                  <MapPin className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-white text-sm font-black">Centro de Convenciones</span>
                <span className="text-slate-400 text-xs">Miraflores, Lima</span>
              </div>
              {/* Rings */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f97316]/20"
                  style={{ width: `${i * 80}px`, height: `${i * 80}px` }}
                />
              ))}
            </div>

            {/* Venue info */}
            <div className="p-6">
              <h4 className="text-white mb-1" style={{ fontWeight: 700, fontSize: "1rem" }}>
                Centro de Convenciones de Lima
              </h4>
              <p className="text-slate-400 text-sm mb-4">
                Av. Javier Prado Este 2465, San Borja, Lima 15036
              </p>
              <div className="flex flex-wrap gap-2">
                {["Metro cercano", "Estacionamiento", "Accesible", "Zona de comida"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-400 bg-white/5 border border-white/8 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
