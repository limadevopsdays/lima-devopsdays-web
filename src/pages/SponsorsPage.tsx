import { Button } from "../components/Button";
import { Section } from "../components/Section";
import { useI18n } from "../i18n/useI18n";
import { FiMail, FiFileText } from 'react-icons/fi';
import type { TranslationKey } from "../i18n/translations";
import {
  sponsorTiers,
  sponsorBenefits,
  sponsorFootnotes,
  TIERS,
  type TierValue,
  sponsors,
  sponsorStats,
} from "../content/sponsors";
import { sponsorContactEmail, sponsorBrochures } from "../content/site";

function SponsorBecomeCta() {
  const { t } = useI18n();
  return (
    <div className="sponsorHero">
      <div className="sponsorHero__inner">
        <div className="sponsorHero__content">
          <p className="sponsorHero__earlyBird">{t("sponsors.hero.earlyBird")}</p>
          <h3 className="sponsorHero__title">{t("sponsors.become.title")}</h3>
          <p className="sponsorHero__body">{t("sponsors.become.body")}</p>
        </div>
        <div className="sponsorHero__actions">
          <Button
            as="a"
            href={`mailto:${sponsorContactEmail}`}
            variant="primary"
            ariaLabel={t("sponsors.become.cta")}
            title={t("sponsors.become.cta")}
          >
            <FiMail size={18} aria-hidden="true" />
            {t("sponsors.become.cta")}
          </Button>
          <div className="sponsorHero__brochures" aria-label={t("sponsors.brochureLabel")}>
            <Button
              as="a"
              href={sponsorBrochures.es}
              target="_blank"
              rel="noreferrer noopener"
              variant="ghost"
              ariaLabel={`${t("sponsors.brochure.es")} (${t("common.opensNewTab")})`}
              title={`${t("sponsors.brochure.es")} (${t("common.opensNewTab")})`}
            >
              <FiFileText size={18} aria-hidden="true" />
              {t("sponsors.brochure.es")}
            </Button>
            <Button
              as="a"
              href={sponsorBrochures.en}
              target="_blank"
              rel="noreferrer noopener"
              variant="ghost"
              ariaLabel={`${t("sponsors.brochure.en")} (${t("common.opensNewTab")})`}
              title={`${t("sponsors.brochure.en")} (${t("common.opensNewTab")})`}
            >
              <FiFileText size={18} aria-hidden="true" />
              {t("sponsors.brochure.en")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CellValue({ value }: { value: TierValue }) {
  if (value === true)  return <span className="sponsorTable__check" aria-label="Included">✓</span>;
  if (value === false) return <span className="sponsorTable__dash" aria-label="Not included">—</span>;
  return <span className="sponsorTable__text">{value}</span>;
}

export function SponsorsSection() {
  const { t } = useI18n();

  return (
    <Section
      id="sponsors"
      eyebrow={t("sponsors.eyebrow")}
      title={t("sponsors.title")}
      lead={t("sponsors.lead")}
    >
      <div className="sponsorStack">
        {/* Become a sponsor CTA — top */}
        <SponsorBecomeCta />

        {/* Why sponsor */}
        <div className="card sponsorWhy">
          <div className="sponsorWhy__body">
            <div className="sponsorWhy__content">
              <h3 className="sponsorWhy__title">{t("sponsors.why.title")}</h3>
              <p className="sponsorWhy__lead">{t("sponsors.why.p1")}</p>
              <ul
                className="sponsorWhy__list"
                aria-label={t("sponsors.why.benefitsLabel")}
              >
                <li>{t("sponsors.why.benefit1")}</li>
                <li>{t("sponsors.why.benefit2")}</li>
                <li>{t("sponsors.why.benefit3")}</li>
                <li>{t("sponsors.why.benefit4")}</li>
              </ul>
            </div>
            <div className="sponsorWhy__stats" aria-label={t("sponsors.why.statsLabel")}>
              {sponsorStats.map((stat) => (
                <div key={stat.labelKey} className="sponsorStat">
                  <span className="sponsorStat__value">{stat.value}</span>
                  <span className="sponsorStat__label">{t(stat.labelKey as TranslationKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="card sponsorTableWrap">
          <div className="sponsorTableScroll">
            <table className="sponsorTable" aria-label={t("sponsors.table.label")}>
              <thead>
                <tr>
                  <th scope="col" className="sponsorTable__colBenefits">
                    {t("sponsors.table.colBenefits")}
                  </th>
                  {sponsorTiers.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className={`sponsorTable__colTier${tier.featured ? " sponsorTable__colTier--featured" : ""}`}
                    >
                      <span className="sponsorTable__tierName">{t(tier.labelKey as TranslationKey)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sponsorBenefits.map((benefit) => (
                  <tr key={benefit.id}>
                    <td className="sponsorTable__benefitCell">
                      <span className="sponsorTable__benefitTitle">
                        {benefit.title}
                        {benefit.footnote && (
                          <sup className="sponsorTable__footnoteMarker">{benefit.footnote}</sup>
                        )}
                      </span>
                      {benefit.subtitle && (
                        <span className="sponsorTable__benefitSubtitle">{benefit.subtitle}</span>
                      )}
                    </td>
                    {TIERS.map((tierId) => (
                      <td
                        key={tierId}
                        className={`sponsorTable__valueCell${tierId === "platinum" ? " sponsorTable__valueCell--featured" : ""}`}
                      >
                        <CellValue value={benefit[tierId]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sponsorFootnotes.length > 0 && (
            <dl className="sponsorTable__footnotes">
              {sponsorFootnotes.map((fn) => (
                <div key={fn.marker} className="sponsorTable__footnoteRow">
                  <dt className="sponsorTable__footnoteMarker">{fn.marker}</dt>
                  <dd className="sponsorTable__footnoteText">{fn.text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Current sponsors */}
        <div className="card sponsorBox">
          <div
            className="sponsorBox__tiers"
            role="list"
            aria-label={t("sponsors.tiersLabel")}
          >
            {sponsors.map((group) => {
              const tierDef = sponsorTiers.find((tier) => tier.id === group.tier)!;
              const tierName = t(tierDef.labelKey as TranslationKey);
              const headingId = `sponsors-tier-${group.tier}`;

              return (
                <div
                  key={group.tier}
                  className="sponsorBox__tier"
                  role="listitem"
                  aria-labelledby={headingId}
                >
                  <h3 id={headingId} className="sponsorTier__label">
                    {tierName}
                  </h3>
                  {group.items.length > 0 ? (
                    <div
                      className="sponsorTier__names"
                      role="list"
                      aria-label={t("sponsors.logosLabel", { tier: tierName })}
                    >
                      {group.items.map((sponsor) =>
                        sponsor.logoSrcDark || sponsor.logoSrcLight ? (
                          <div key={sponsor.name} className="sponsorItem" role="listitem">
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
                                  <img src={sponsor.logoSrcDark} alt={sponsor.name} loading="lazy" decoding="async" className="sponsorItem__img sponsorItem__img--dark" />
                                ) : null}
                                {sponsor.logoSrcLight ? (
                                  <img src={sponsor.logoSrcLight} alt={sponsor.logoSrcDark ? "" : sponsor.name} aria-hidden={Boolean(sponsor.logoSrcDark)} loading="lazy" decoding="async" className="sponsorItem__img sponsorItem__img--light" />
                                ) : null}
                              </a>
                            ) : (
                              <>
                                {sponsor.logoSrcDark ? (
                                  <img src={sponsor.logoSrcDark} alt={sponsor.name} loading="lazy" decoding="async" className="sponsorItem__img sponsorItem__img--dark" />
                                ) : null}
                                {sponsor.logoSrcLight ? (
                                  <img src={sponsor.logoSrcLight} alt={sponsor.logoSrcDark ? "" : sponsor.name} aria-hidden={Boolean(sponsor.logoSrcDark)} loading="lazy" decoding="async" className="sponsorItem__img sponsorItem__img--light" />
                                ) : null}
                              </>
                            )}
                          </div>
                        ) : (
                          <div key={sponsor.name} className="sponsorItem" role="listitem">
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
      </div>
    </Section>
  );
}
