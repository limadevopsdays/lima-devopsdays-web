import { Heart, ExternalLink } from "lucide-react";

interface Sponsor {
  name: string;
  tier: "platinum" | "gold" | "silver" | "community";
  logo?: string;
  url?: string;
}

const sponsors: Sponsor[] = [
  { name: "AWS", tier: "platinum" },
  { name: "Google Cloud", tier: "platinum" },
  { name: "Microsoft Azure", tier: "gold" },
  { name: "Datadog", tier: "gold" },
  { name: "HashiCorp", tier: "gold" },
  { name: "GitLab", tier: "silver" },
  { name: "New Relic", tier: "silver" },
  { name: "Grafana Labs", tier: "silver" },
  { name: "JetBrains", tier: "silver" },
  { name: "Pulumi", tier: "community" },
  { name: "Snyk", tier: "community" },
  { name: "CNCF", tier: "community" },
];

const tierConfig = {
  platinum: {
    label: "Platinum",
    color: "#e2e8f0",
    glow: "#e2e8f020",
    size: "h-16",
    textSize: "text-xl",
    badge: "bg-gradient-to-r from-slate-300 to-slate-100 text-slate-900",
  },
  gold: {
    label: "Gold",
    color: "#f59e0b",
    glow: "#f59e0b15",
    size: "h-12",
    textSize: "text-lg",
    badge: "bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-900",
  },
  silver: {
    label: "Silver",
    color: "#94a3b8",
    glow: "#94a3b815",
    size: "h-10",
    textSize: "text-base",
    badge: "bg-gradient-to-r from-slate-400 to-slate-300 text-slate-800",
  },
  community: {
    label: "Community",
    color: "#6B51EF",
    glow: "#6B51EF15",
    size: "h-8",
    textSize: "text-sm",
    badge: "bg-gradient-to-r from-violet-600 to-purple-500 text-white",
  },
};

function SponsorGrid({ tier, items }: { tier: keyof typeof tierConfig; items: Sponsor[] }) {
  const config = tierConfig[tier];
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px flex-1 bg-white/5" />
        <span
          className={`text-xs px-3 py-1 rounded-full font-black tracking-widest uppercase ${config.badge}`}
        >
          {config.label}
        </span>
        <div className="h-px flex-1 bg-white/5" />
      </div>
      <div className={`flex flex-wrap items-center justify-center gap-6`}>
        {items.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url || "#"}
            className="group flex items-center justify-center px-8 py-5 rounded-2xl bg-white/3 border border-white/8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{
              minWidth: tier === "platinum" ? "180px" : tier === "gold" ? "150px" : "130px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 15px 40px ${config.glow}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <span
              className={`font-black tracking-tight ${config.textSize}`}
              style={{ color: config.color }}
            >
              {sponsor.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function Sponsors() {
  const grouped = {
    platinum: sponsors.filter((s) => s.tier === "platinum"),
    gold: sponsors.filter((s) => s.tier === "gold"),
    silver: sponsors.filter((s) => s.tier === "silver"),
    community: sponsors.filter((s) => s.tier === "community"),
  };

  return (
    <section id="sponsors" className="bg-[#0a0e1a] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#f59e0b] text-xs tracking-widest uppercase font-black mb-3 px-4 py-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-full">
            Sponsors
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.1 }}
          >
            Empresas que hacen posible este evento
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            El apoyo de estas organizaciones nos permite mantener el evento accesible y de alta calidad
            para toda la comunidad.
          </p>
        </div>

        {/* Sponsor grids by tier */}
        <SponsorGrid tier="platinum" items={grouped.platinum} />
        <SponsorGrid tier="gold" items={grouped.gold} />
        <SponsorGrid tier="silver" items={grouped.silver} />
        <SponsorGrid tier="community" items={grouped.community} />

        {/* Become a sponsor CTA */}
        <div className="mt-10 text-center">
          <div className="inline-block bg-white/3 border border-white/8 rounded-2xl px-10 py-8 max-w-lg w-full">
            <Heart className="w-8 h-8 text-[#f97316] mx-auto mb-3" />
            <h4 className="text-white mb-2" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
              ¿Tu empresa quiere ser parte?
            </h4>
            <p className="text-slate-400 text-sm mb-5" style={{ lineHeight: 1.6 }}>
              Llega a cientos de ingenieros y líderes técnicos de todo Perú y Latinoamérica.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-[#0a0e1a] px-6 py-3 rounded-full font-black text-sm tracking-wide hover:shadow-lg hover:shadow-[#f59e0b]/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              Ver Propuesta de Sponsorship
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
