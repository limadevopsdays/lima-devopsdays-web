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

const CARD =
  'bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] border border-white/[0.09] rounded-[12px] p-[18px] relative overflow-hidden [:root[data-theme=light]_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))] [:root[data-theme=light]_&]:border-black/[0.1]'

const SPONSOR_ITEM =
  "w-full min-w-[175px] min-h-[175px] flex items-center justify-center rounded-[14px] p-[10px] border border-site-border-subtle bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] relative overflow-hidden transition-[background] duration-[160ms] ease hover:bg-[var(--site-hover-sheen)] [:root[data-theme=light]_&]:border-site-border [:root[data-theme=light]_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))] after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(800px_200px_at_30%_0%,rgba(var(--site-accent-rgb),0.25),transparent_55%),radial-gradient(800px_220px_at_80%_100%,rgba(var(--site-accent-2-rgb),0.25),transparent_55%)] after:opacity-[0.82] after:pointer-events-none after:z-[0] after:[transform:translate3d(0,0,0)] [:root[data-theme=light]_&]:after:bg-[radial-gradient(800px_200px_at_30%_0%,rgba(var(--site-accent-rgb),0.2),transparent_55%),radial-gradient(800px_220px_at_80%_100%,rgba(var(--site-accent-2-rgb),0.2),transparent_55%)] [:root[data-theme=light]_&]:after:opacity-[0.38]"

const PILL =
  'inline-flex items-center gap-2 py-2 px-3 rounded-full border border-white/[0.1] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.03))] [:root[data-theme=light]_&]:border-black/[0.08] [:root[data-theme=light]_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.62))]'

// Inline btn styles for sponsor context (overrides)
const SPONSOR_BTN =
  'h-10 px-3 rounded-full border border-site-border bg-transparent text-site-icon font-normal shadow-none opacity-80 transition-[opacity,border-color,color] duration-[160ms] ease hover:opacity-[0.95] hover:border-[rgba(var(--site-accent-rgb),0.6)] inline-flex items-center justify-center gap-[10px] no-underline tracking-[-0.01em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-focus)]'

export function SponsorsSection() {
  const { t } = useI18n();

  return (
    <Section
      id="sponsors"
      eyebrow={t("sponsors.eyebrow")}
      title={t("sponsors.title")}
      lead={t("sponsors.lead")}
    >
      {/* Sponsor box card - no glow, no hover transform */}
      <div className={`${CARD} grid gap-[18px] transition-none hover:border-white/[0.09] hover:shadow-none hover:translate-none [:root[data-theme=light]_&]:hover:border-black/[0.1]`}>
        <div
          className="grid"
          role="list"
          aria-label={t("sponsors.tiersLabel")}
        >
          {sponsors.map((tier) => {
            const tierName = t(tier.tierKey);
            const headingId = `sponsors-tier-${tier.tier}`;

            return (
              <div
                key={tier.tierKey}
                className="py-[14px] border-t border-t-dashed border-t-site-border-subtle first:pt-0 first:border-t-0 last:pb-0 [:root[data-theme=light]_&]:border-t-site-border"
                role="listitem"
                aria-labelledby={headingId}
              >
                <h3
                  id={headingId}
                  className="font-extrabold tracking-[0.12em] uppercase text-site-text text-[15px] [:root[data-theme=light]_&]:text-[rgba(0,0,0,0.82)]"
                >
                  {tierName}
                </h3>
                {tier.items.length > 0 ? (
                  <div
                    className="mt-[10px] grid [grid-template-columns:repeat(4,minmax(175px,1fr))] gap-[10px] items-center max-[860px]:[grid-template-columns:repeat(3,minmax(175px,1fr))] max-[620px]:[grid-template-columns:repeat(2,minmax(175px,1fr))] max-[420px]:grid-cols-1"
                    role="list"
                    aria-label={t("sponsors.logosLabel", { tier: tierName })}
                  >
                    {tier.items.map((sponsor) =>
                      sponsor.logoSrcDark || sponsor.logoSrcLight ? (
                        <div
                          key={sponsor.name}
                          className={SPONSOR_ITEM}
                          role="listitem"
                        >
                          {sponsor.href ? (
                            <a
                              className="w-full h-full flex items-center justify-center no-underline text-inherit rounded-[14px] relative z-[1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-focus)]"
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
                                  className="block [:root[data-theme=light]_&]:hidden w-[min(176px,100%)] h-[72px] max-w-[176px] max-h-[72px] object-contain scale-100 motion-safe:transition-transform motion-safe:duration-[160ms] motion-safe:ease motion-safe:hover:scale-[1.04]"
                                />
                              ) : null}
                              {sponsor.logoSrcLight ? (
                                <img
                                  src={sponsor.logoSrcLight}
                                  alt={sponsor.logoSrcDark ? "" : sponsor.name}
                                  aria-hidden={Boolean(sponsor.logoSrcDark)}
                                  loading="lazy"
                                  decoding="async"
                                  className="hidden [:root[data-theme=light]_&]:block w-[min(176px,100%)] h-[72px] max-w-[176px] max-h-[72px] object-contain scale-100 motion-safe:transition-transform motion-safe:duration-[160ms] motion-safe:ease motion-safe:hover:scale-[1.04]"
                                />
                              ) : null}
                            </a>
                          ) : (
                            <div className="relative z-[1]">
                              {sponsor.logoSrcDark ? (
                                <img
                                  src={sponsor.logoSrcDark}
                                  alt={sponsor.name}
                                  loading="lazy"
                                  decoding="async"
                                  className="block [:root[data-theme=light]_&]:hidden w-[min(176px,100%)] h-[72px] max-w-[176px] max-h-[72px] object-contain"
                                />
                              ) : null}
                              {sponsor.logoSrcLight ? (
                                <img
                                  src={sponsor.logoSrcLight}
                                  alt={sponsor.logoSrcDark ? "" : sponsor.name}
                                  aria-hidden={Boolean(sponsor.logoSrcDark)}
                                  loading="lazy"
                                  decoding="async"
                                  className="hidden [:root[data-theme=light]_&]:block w-[min(176px,100%)] h-[72px] max-w-[176px] max-h-[72px] object-contain"
                                />
                              ) : null}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          key={sponsor.name}
                          className={SPONSOR_ITEM}
                          role="listitem"
                        >
                          {sponsor.href ? (
                            <a
                              className="w-full h-full flex items-center justify-center no-underline text-inherit rounded-[14px] relative z-[1]"
                              href={sponsor.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label={`${sponsor.name} (${t("common.opensNewTab")})`}
                              title={`${sponsor.name} (${t("common.opensNewTab")})`}
                            >
                              <span className={PILL}>{sponsor.name}</span>
                            </a>
                          ) : (
                            <span className={PILL}>{sponsor.name}</span>
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

      {/* Sponsor CTA card */}
      <div className={`${CARD} mt-4 flex flex-col gap-3 transition-none hover:border-white/[0.09] hover:shadow-none hover:translate-none [:root[data-theme=light]_&]:hover:border-black/[0.08]`}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 650, letterSpacing: "-0.01em" }}>
          {t("sponsors.wantTitle")}
        </h3>
        <p className="m-0 text-site-text-muted">{t("sponsors.wantBody")}</p>
        <div className="w-full flex items-center justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap gap-[10px]" aria-label={t("sponsors.brochureLabel")}>
            <a
              className={SPONSOR_BTN}
              href="/assets/pdf/sponsors-es-devopsdayslima-2026.pdf"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${t("sponsors.brochure.es")} (${t("common.opensNewTab")})`}
              title={`${t("sponsors.brochure.es")} (${t("common.opensNewTab")})`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM8 12h8v2H8v-2Zm0 4h8v2H8v-2Z" />
              </svg>
              {t("sponsors.brochure.es")}
            </a>
            <a
              className={SPONSOR_BTN}
              href="/assets/pdf/sponsors-en-devopsdayslima-2026.pdf"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${t("sponsors.brochure.en")} (${t("common.opensNewTab")})`}
              title={`${t("sponsors.brochure.en")} (${t("common.opensNewTab")})`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM8 12h8v2H8v-2Zm0 4h8v2H8v-2Z" />
              </svg>
              {t("sponsors.brochure.en")}
            </a>
          </div>
          <div className="ml-auto">
            <Button
              as="a"
              href="mailto:sponsors@devopsdays.pe"
              variant="primary"
              ariaLabel={t("sponsors.contact")}
              title={t("sponsors.contact")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M20 4H4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-1.25 2L12 10.73L5.25 6h13.5ZM4 18a1 1 0 0 1-1-1V7.87l8.43 5.9a1 1 0 0 0 1.14 0L21 7.87V17a1 1 0 0 1-1 1H4Z" />
              </svg>
              {t("sponsors.contact")}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
