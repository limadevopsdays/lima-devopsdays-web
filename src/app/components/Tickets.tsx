import { Check, Zap, Star, Users } from "lucide-react";

const plans = [
  {
    name: "Comunidad",
    price: "S/ 0",
    priceNote: "Limitado",
    desc: "Para quienes más lo necesitan: estudiantes y contribuidores open source.",
    icon: Users,
    color: "#6B51EF",
    gradient: "from-[#6B51EF] to-[#9f67ff]",
    features: [
      "Acceso a los 2 días",
      "Open Spaces",
      "Kit del evento",
      "Almuerzo incluido",
      "Certificado de asistencia",
    ],
    cta: "Aplicar ahora",
    badge: null,
  },
  {
    name: "General",
    price: "S/ 150",
    priceNote: "por persona",
    desc: "Acceso completo al evento. La opción más popular para profesionales.",
    icon: Star,
    color: "#00d4ff",
    gradient: "from-[#00d4ff] to-[#0095b3]",
    features: [
      "Acceso a los 2 días",
      "Todas las charlas y workshops",
      "Open Spaces",
      "Kit premium del evento",
      "Almuerzo y café",
      "Certificado de asistencia",
    ],
    cta: "Comprar entrada",
    badge: "Más popular",
  },
  {
    name: "Enterprise",
    price: "S/ 350",
    priceNote: "por persona",
    desc: "Para equipos y empresas que quieren maximizar su participación.",
    icon: Zap,
    color: "#f97316",
    gradient: "from-[#f97316] to-[#fb923c]",
    features: [
      "Todo lo del plan General",
      "Acceso VIP al networking",
      "Sesión privada con speakers",
      "Mención como sponsor",
      "Factura con RUC",
      "Soporte prioritario",
    ],
    cta: "Contactar equipo",
    badge: null,
  },
];

export function Tickets() {
  return (
    <section id="tickets-section" className="bg-[#0d1120] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#10b981] text-xs tracking-widest uppercase font-black mb-3 px-4 py-1.5 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full">
            Entradas
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.1 }}
          >
            Elige tu entrada
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto" style={{ lineHeight: 1.7 }}>
            Early bird disponible hasta el 30 de Junio. Cupos limitados para todas las categorías.
          </p>
        </div>

        {/* Countdown urgency */}
        <div className="flex justify-center gap-6 mb-12">
          {[
            { value: "28", label: "Días" },
            { value: "14", label: "Horas" },
            { value: "37", label: "Minutos" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
                style={{ fontWeight: 900, fontSize: "1.5rem", fontFamily: "monospace" }}
              >
                {value}
              </div>
              <div className="text-slate-500 text-xs mt-1.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isPopular = plan.badge === "Más popular";
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                  isPopular
                    ? "border-2 shadow-2xl"
                    : "border border-white/8 hover:border-white/20"
                }`}
                style={
                  isPopular
                    ? {
                        borderColor: plan.color,
                        boxShadow: `0 25px 60px ${plan.color}25`,
                      }
                    : {}
                }
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div
                    className="absolute top-0 left-0 right-0 text-center py-2 text-xs font-black tracking-widest uppercase text-[#0a0e1a]"
                    style={{
                      background: `linear-gradient(90deg, ${plan.color}, #00b8d9)`,
                    }}
                  >
                    ⚡ {plan.badge}
                  </div>
                )}

                <div className={`bg-white/3 p-6 h-full ${isPopular ? "pt-10" : ""}`}>
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}30` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: plan.color }} />
                    </div>
                    <h3 className="text-white" style={{ fontWeight: 800, fontSize: "1.05rem" }}>
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span
                      className="text-white"
                      style={{ fontWeight: 900, fontSize: "2.2rem", lineHeight: 1 }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-sm ml-2">{plan.priceNote}</span>
                  </div>

                  <p className="text-slate-400 text-sm mb-6" style={{ lineHeight: 1.6 }}>
                    {plan.desc}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-slate-300 text-sm">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${plan.color}20` }}
                        >
                          <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#"
                    className="block text-center py-3 px-6 rounded-xl font-black text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5"
                    style={
                      isPopular
                        ? {
                            background: `linear-gradient(135deg, ${plan.color}, #00b8d9)`,
                            color: "#0a0e1a",
                            boxShadow: `0 8px 24px ${plan.color}30`,
                          }
                        : {
                            background: `${plan.color}15`,
                            color: plan.color,
                            border: `1px solid ${plan.color}30`,
                          }
                    }
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          * Descuentos grupales disponibles para equipos de +5 personas · Facturación con RUC en planes Enterprise
        </p>
      </div>
    </section>
  );
}
