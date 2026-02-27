import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { ticketsUrl } from '../content/site'
import { useI18n } from '../i18n/useI18n'

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="hero" aria-label={t('hero.ariaLabel')}>
      <div className="hero__stage">
        <div className="hero__cover" role="img" aria-label={t('hero.visualAlt')} />
        <div className="hero__overlay">
          <Container>
            <div className="hero__wrap hero__wrap--stack">
              <div className="hero__header">
                <div className="hero__kicker">{t('hero.kicker')}</div>
                <h1 className="hero__title">
                  <span className="hero__name">DevOpsDays Lima</span> <span className="hero__year">2026</span>
                </h1>
              </div>

              <div className="hero__info">
                <div className="hero__meta hero__meta--below" aria-label={t('hero.metaLabel')}>
                  <dl className="hero__metaText">
                    <dt className="hero__metaLabel">{t('hero.meta.datesLabel')}</dt>
                    <dd className="hero__metaValue">{t('hero.meta.dates')}</dd>
                  </dl>
                </div>
                <div className="hero__subtitle">
                  <div className="hero__metaLabel">{t('hero.meta.locationLabel')}</div>
                  <div className="hero__locationValue">{t('hero.subtitle')}</div>
                </div>
              </div>

              <div className="hero__tickets">
                <Button as="a" href={ticketsUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                  {t('hero.cta.buyTickets')}
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
