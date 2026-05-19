import { Section } from "../components/Section";
import { useI18n } from "../i18n/useI18n";

export function AboutSection() {
  const { t } = useI18n();

  return (
    <Section
      id="about"
      eyebrow={t("about.eyebrow")}
      title={t("about.title")}
      lead={t("about.lead")}
    >
      <div className="grid grid--2">
        <div className="card about__image" aria-label={t("about.visualLabel")}>
          <img
            src="/assets/hero/community-lima.jpeg"
            alt={t("about.visualAlt")}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="card about__content">
          <h3 style={{ margin: 0, fontSize: 18, letterSpacing: "-0.01em" }}>
            {t("about.expect.title")}
          </h3>
          <div className="about__copy muted">
            <p>{t("about.expect.p1")}</p>
            <p>{t("about.who.p1")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
