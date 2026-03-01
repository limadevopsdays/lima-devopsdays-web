import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Section } from '../components/Section'
import { useI18n } from '../i18n/useI18n'
import { sponsors, sponsorTiers } from '../content/sponsors'
import { sponsorContactEmail } from '../content/site'

export function SponsorsCta() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <Section
      id="sponsors"
      eyebrow={t('sponsors.eyebrow')}
      title={t('sponsors.title')}
      lead={t('sponsors.lead')}
    >
      <div className="sponsorCtaLayout">
        {/* ── Sponsor tiers with marquees ── */}
        {sponsorTiers.map((tier) => {
          const tierSponsors = sponsors
            .find((g) => g.tier === tier.id)
            ?.items.filter((s) => s.logoSrcDark || s.logoSrcLight) || []

          // Repeat until we have at least 8 items per set, then double for seamless loop
          const repeat = tierSponsors.length > 0 ? Math.ceil(8 / tierSponsors.length) : 0
          const set = tierSponsors.length > 0 ? Array.from({ length: repeat }, () => tierSponsors).flat() : []
          const trackItems = tierSponsors.length > 0 ? [...set, ...set] : []

          return (
            <div key={tier.id} className="sponsorCtaTier">
              <h3 className="sponsorCtaTier__label">{tier.label}</h3>
              {tierSponsors.length > 0 ? (
                <div className="sponsorMarquee" aria-hidden="true">
                  <div className="sponsorMarquee__track">
                    {trackItems.map((sponsor, i) => (
                      <div key={`${i}-${sponsor.name}`} className="sponsorMarquee__item">
                        {sponsor.href ? (
                          <a
                            href={sponsor.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            tabIndex={-1}
                            className="sponsorMarquee__link"
                          >
                            {sponsor.logoSrcDark && (
                              <img src={sponsor.logoSrcDark} alt="" className="sponsorMarquee__img sponsorMarquee__img--dark" />
                            )}
                            {sponsor.logoSrcLight && (
                              <img src={sponsor.logoSrcLight} alt="" className="sponsorMarquee__img sponsorMarquee__img--light" />
                            )}
                          </a>
                        ) : (
                          <>
                            {sponsor.logoSrcDark && (
                              <img src={sponsor.logoSrcDark} alt="" className="sponsorMarquee__img sponsorMarquee__img--dark" />
                            )}
                            {sponsor.logoSrcLight && (
                              <img src={sponsor.logoSrcLight} alt="" className="sponsorMarquee__img sponsorMarquee__img--light" />
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="sponsorTier__empty">{t("sponsors.comingSoon")}</p>
              )}
            </div>
          )
        })}

        {/* ── CTA banner ── */}
        <div className="sponsorCtaBanner">
          <p className="sponsorCtaBanner__title">{t('sponsors.become.title')}</p>
          <p className="sponsorCtaBanner__body">{t('sponsors.become.body')}</p>
          <div className="sponsorCtaBanner__actions">
            <a
              href="/sponsors"
              className="btn btn--primary"
              onClick={(e) => { e.preventDefault(); navigate('/sponsors') }}
            >
              {t('sponsors.viewDetails')} →
            </a>
            <Button
              as="a"
              href={`mailto:${sponsorContactEmail}`}
              variant="ghost"
              ariaLabel={t('sponsors.become.cta')}
              title={t('sponsors.become.cta')}
            >
              {t('sponsors.become.cta')}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
