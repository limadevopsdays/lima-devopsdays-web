import { useI18n } from "../i18n/useI18n";
import { sponsorTiers, sponsors } from "../content/sponsors";

export function CurrentSponsorsGrid() {
  const { t } = useI18n();

  if (sponsors.length === 0) {
    return (
      <div className="sponsorBox__empty">
        <p className="sponsorBox__emptyText">{t("sponsors.comingSoon")}</p>
      </div>
    );
  }

  return (
    <div
      className="sponsorBox__tiers"
      role="list"
      aria-label={t("sponsors.tiersLabel")}
    >
      {sponsors.map((group) => {
        const tierDef = sponsorTiers.find((tier) => tier.id === group.tier)!;
        const tierName = tierDef.label;
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
            ) : (
              <p className="sponsorTier__empty">{t("sponsors.comingSoon")}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
