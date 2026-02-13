import { Button } from "../components/Button";
import { Section } from "../components/Section";
import { useI18n } from "../i18n/useI18n";

type Sponsor = {
  name: string;
  logoSrcDark?: string;
  logoSrcLight?: string;
  href?: string;
};

// Theme mapping:
// - Dark theme should use the "dark" asset
// - Light theme should use the "light" asset
const dynatraceLogoSrcForDarkTheme = "/assets/sponsors/dark/Dynatrace.svg";
const dynatraceLogoSrcForLightTheme = "/assets/sponsors/light/Dynatrace.svg";
const sponsors = [
  {
    tier: "platinum",
    tierKey: "sponsors.tier.platinum",
    items: [
      {
        name: "Dynatrace",
        logoSrcDark: dynatraceLogoSrcForDarkTheme,
        logoSrcLight: dynatraceLogoSrcForLightTheme,
        href: "https://www.dynatrace.com/",
      },
    ] satisfies Sponsor[],
  },
  {
    tier: "gold",
    tierKey: "sponsors.tier.gold",
    items: [] satisfies Sponsor[],
  },
  {
    tier: "silver",
    tierKey: "sponsors.tier.silver",
    items: [] satisfies Sponsor[],
  },
  {
    tier: "bronze",
    tierKey: "sponsors.tier.bronze",
    items: [] satisfies Sponsor[],
  },
] as const;

export function SponsorsSection() {
  const { t } = useI18n();

  return (
    <Section
      id="sponsors"
      eyebrow={t("sponsors.eyebrow")}
      title={t("sponsors.title")}
      lead={t("sponsors.lead")}
    >
      <div className="card sponsorBox">
        <div
          className="sponsorBox__tiers"
          role="list"
          aria-label={t("sponsors.tiersLabel")}
        >
          {sponsors.map((tier) => {
            const tierName = t(tier.tierKey);
            const headingId = `sponsors-tier-${tier.tier}`;

            return (
              <div
                key={tier.tierKey}
                className="sponsorBox__tier"
                role="listitem"
                aria-labelledby={headingId}
              >
                <h3 id={headingId} className="sponsorTier__label">
                  {tierName}
                </h3>
                {tier.items.length > 0 ? (
                  <div
                    className="sponsorTier__names"
                    role="list"
                    aria-label={t("sponsors.logosLabel", { tier: tierName })}
                  >
                    {tier.items.map((sponsor) =>
                      sponsor.logoSrcDark || sponsor.logoSrcLight ? (
                        <div
                          key={sponsor.name}
                          className="sponsorItem"
                          role="listitem"
                        >
                          {sponsor.href ? (
                            <a
                              className="sponsorItem__link"
                              href={sponsor.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label={`${sponsor.name} (${t("common.opensNewTab")})`}
                              title={`${sponsor.name} (${t("common.opensNewTab")})`}
                            >
                              {sponsor.logoSrcDark ? (
                                <img
                                  src={sponsor.logoSrcDark}
                                  alt={sponsor.name}
                                  loading="lazy"
                                  decoding="async"
                                  className="sponsorItem__img sponsorItem__img--dark"
                                />
                              ) : null}
                              {sponsor.logoSrcLight ? (
                                <img
                                  src={sponsor.logoSrcLight}
                                  alt={sponsor.logoSrcDark ? "" : sponsor.name}
                                  aria-hidden={Boolean(sponsor.logoSrcDark)}
                                  loading="lazy"
                                  decoding="async"
                                  className="sponsorItem__img sponsorItem__img--light"
                                />
                              ) : null}
                            </a>
                          ) : (
                            <>
                              {sponsor.logoSrcDark ? (
                                <img
                                  src={sponsor.logoSrcDark}
                                  alt={sponsor.name}
                                  loading="lazy"
                                  decoding="async"
                                  className="sponsorItem__img sponsorItem__img--dark"
                                />
                              ) : null}
                              {sponsor.logoSrcLight ? (
                                <img
                                  src={sponsor.logoSrcLight}
                                  alt={sponsor.logoSrcDark ? "" : sponsor.name}
                                  aria-hidden={Boolean(sponsor.logoSrcDark)}
                                  loading="lazy"
                                  decoding="async"
                                  className="sponsorItem__img sponsorItem__img--light"
                                />
                              ) : null}
                            </>
                          )}
                        </div>
                      ) : (
                        <div
                          key={sponsor.name}
                          className="sponsorItem"
                          role="listitem"
                        >
                          {sponsor.href ? (
                            <a
                              className="sponsorItem__link"
                              href={sponsor.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label={`${sponsor.name} (${t("common.opensNewTab")})`}
                              title={`${sponsor.name} (${t("common.opensNewTab")})`}
                            >
                              <span className="pill">{sponsor.name}</span>
                            </a>
                          ) : (
                            <span className="pill">{sponsor.name}</span>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card sponsorCta">
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 650,
            letterSpacing: "-0.01em",
          }}
        >
          {t("sponsors.wantTitle")}
        </h3>
        <p className="muted" style={{ margin: 0 }}>
          {t("sponsors.wantBody")}
        </p>
        <div className="sponsorCta__actions">
          <div
            className="sponsorCta__brochures"
            aria-label={t("sponsors.brochureLabel")}
          >
            <Button
              as="a"
              href="/assets/pdf/sponsors-es-devopsdayslima-2026.pdf"
              target="_blank"
              rel="noreferrer noopener"
              variant="ghost"
              ariaLabel={`${t("sponsors.brochure.es")} (${t("common.opensNewTab")})`}
              title={`${t("sponsors.brochure.es")} (${t("common.opensNewTab")})`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM8 12h8v2H8v-2Zm0 4h8v2H8v-2Z"
                />
              </svg>
              {t("sponsors.brochure.es")}
            </Button>
            <Button
              as="a"
              href="/assets/pdf/sponsors-en-devopsdayslima-2026.pdf"
              target="_blank"
              rel="noreferrer noopener"
              variant="ghost"
              ariaLabel={`${t("sponsors.brochure.en")} (${t("common.opensNewTab")})`}
              title={`${t("sponsors.brochure.en")} (${t("common.opensNewTab")})`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM8 12h8v2H8v-2Zm0 4h8v2H8v-2Z"
                />
              </svg>
              {t("sponsors.brochure.en")}
            </Button>
          </div>
          <div className="sponsorCta__contact">
            <Button
              as="a"
              href="mailto:sponsors@devopsdays.pe"
              variant="primary"
              ariaLabel={t("sponsors.contact")}
              title={t("sponsors.contact")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M20 4H4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-1.25 2L12 10.73L5.25 6h13.5ZM4 18a1 1 0 0 1-1-1V7.87l8.43 5.9a1 1 0 0 0 1.14 0L21 7.87V17a1 1 0 0 1-1 1H4Z"
                />
              </svg>
              {t("sponsors.contact")}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
