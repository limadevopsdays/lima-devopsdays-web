import { Terminal, Heart } from "lucide-react";

const footerLinks = {
  Evento: ["Sobre DevOpsDays", "Prensa & Media", "Ediciones Anteriores"],
  Comunidad: ["Slack de la Comunidad", "Newsletter", "DevOps Perú Meetup", "Blog técnico"],
  Organización: ["Equipo Organizador", "Voluntarios", "Patrocinios", "Contacto"],
};

export function Footer() {
  return (
    <footer className="bg-[#070a14] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#6B51EF] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-black" style={{ fontSize: "1rem" }}>
                devopsdays<span className="text-[#00d4ff]">.pe</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm mb-5" style={{ lineHeight: 1.7 }}>
              El evento más grande de DevOps, SRE y cultura DevSecOps en el Perú. Organizado por y
              para la comunidad.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-slate-600 bg-white/3 border border-white/8 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              Lima, Perú · agosto 2025
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h5
                className="text-slate-300 mb-4 uppercase tracking-widest"
                style={{ fontSize: "0.7rem", fontWeight: 700 }}
              >
                {category}
              </h5>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © 2025 DevOpsDays Peru. Parte de la familia global{" "}
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
              devopsdays.org
            </a>
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            Hecho con <Heart className="w-3 h-3 text-[#f97316] fill-current" /> por la comunidad
            DevOps Perú
          </p>
          <div className="flex gap-5">
            {["Términos", "Privacidad"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-600 hover:text-slate-400 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
