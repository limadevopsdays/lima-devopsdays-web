import { Section } from "../components/Section";
import { useI18n } from "../i18n/useI18n";

// Base card styles without the glow pseudo-element (that's added by .card CSS class)
const CARD_BASE =
  'bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] border border-white/[0.09] rounded-[12px] p-[18px] relative overflow-hidden [:root[data-theme=light]_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))] [:root[data-theme=light]_&]:border-black/[0.1]'

export function AboutSection() {
  const { t } = useI18n();

  return (
    <Section
      id="about"
      eyebrow={t("about.eyebrow")}
      title={t("about.title")}
      lead={t("about.lead")}
    >
      <div className="grid gap-4 min-[860px]:grid-cols-2">
        {/* Image card: no hover effects, no glow, no card class */}
        <div
          className="rounded-[12px] overflow-hidden flex min-h-[clamp(240px,36vh,360px)] h-full border-0"
          aria-label={t("about.visualLabel")}
        >
          <img
            className="w-full h-full object-cover block"
            src="/assets/hero/community-lima.jpeg"
            alt={t("about.visualAlt")}
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Content card: card styles but no glow, no transform effects */}
        <div className={`${CARD_BASE} grid gap-4 h-full`}>
          <h3 style={{ margin: 0, fontSize: 18, letterSpacing: "-0.01em" }}>
            {t("about.expect.title")}
          </h3>
          <div className="grid gap-[10px] leading-[1.55] text-site-text-muted">
            <p className="m-0">{t("about.expect.p1")}</p>
            <p className="m-0">{t("about.who.p1")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
