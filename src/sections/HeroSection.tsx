import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { ticketsUrl } from '../content/site'
import { useI18n } from '../i18n/useI18n'

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="hero pb-7 min-[860px]:pb-11" aria-label={t('hero.ariaLabel')}>
      <div className="relative">
        {/* Cover image — ::before overlay from CSS via .hero__cover */}
        <div
          className="relative bg-[#2f2e2e] w-full overflow-hidden aspect-video min-h-[380px] max-h-[600px] z-0 before:content-[''] before:absolute before:inset-0 before:opacity-[0.48] before:bg-[url('/assets/hero/community.png')] before:bg-cover before:bg-center before:pointer-events-none"
          role="img"
          aria-label={t('hero.visualAlt')}
        />

        {/* Overlay content */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <Container>
            <div className="grid gap-5 grid-cols-1 items-center">
              {/* Hero header */}
              <div className="grid justify-items-center text-center">
                <div className="font-mono text-site-text font-[650] tracking-[0.08em] uppercase text-[13px]">
                  {t('hero.kicker')}
                </div>
                <h1 className="mt-[10px] mb-0 text-[clamp(36px,4.6vw,64px)] leading-[0.98] tracking-[-0.05em] text-site-text">
                  <span className="hero__name">{/* gradient text via @supports */}DevOpsDays Lima</span>{' '}
                  <span className="hero__year">2026</span>
                </h1>
              </div>

              {/* Hero info box */}
              <div className="w-full mt-4 flex flex-col min-[860px]:flex-row min-[860px]:items-center min-[860px]:justify-center min-[860px]:text-left min-[860px]:gap-0 items-center gap-3 py-[14px] px-4 rounded-[16px] bg-black/[0.32] border border-white/[0.14] backdrop-blur-sm">
                <div
                  className="flex flex-wrap justify-center min-[860px]:justify-start gap-[10px] text-site-text min-[860px]:pr-[18px] min-[860px]:border-r min-[860px]:border-r-white/[0.28]"
                  aria-label={t('hero.metaLabel')}
                >
                  <dl className="flex flex-col items-start gap-[6px] text-left m-0 p-0">
                    <dt className="text-[12px] tracking-[0.08em] uppercase text-site-text-muted font-[650]">
                      {t('hero.meta.datesLabel')}
                    </dt>
                    <dd className="font-extrabold text-[18px] whitespace-pre-line leading-[1.2] text-site-text relative pl-[14px] m-0 before:content-[''] before:absolute before:left-0 before:top-[2px] before:bottom-[2px] before:w-[3px] before:rounded-full before:bg-[rgba(var(--site-accent-rgb),0.7)]">
                      {t('hero.meta.dates')}
                    </dd>
                  </dl>
                </div>
                <div className="flex flex-col gap-[6px] min-[860px]:pl-[18px] text-site-text m-0">
                  <div className="text-[12px] tracking-[0.08em] uppercase text-site-text-muted font-[650]">
                    {t('hero.meta.locationLabel')}
                  </div>
                  <div className="font-extrabold text-[18px] leading-[1.2] text-site-text relative pl-[14px] before:content-[''] before:absolute before:left-0 before:top-[2px] before:bottom-[2px] before:w-[3px] before:rounded-full before:bg-[rgba(var(--site-accent-rgb),0.7)]">
                    {t('hero.subtitle')}
                  </div>
                </div>
              </div>

              {ticketsUrl ? (
                <div className="mt-[18px] flex justify-center">
                  <Button as="a" href={ticketsUrl} variant="primary" context="hero">
                    {t('hero.cta.buyTickets')}
                  </Button>
                </div>
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
