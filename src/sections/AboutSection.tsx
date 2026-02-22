import { Section } from '../components/Section'
import { useI18n } from '../i18n/useI18n'

const sliderImages = [
  { src: '/assets/hero/community-lima.jpeg', alt: 'DevOpsDays Lima community photo 1' },
  { src: '/assets/hero/community.png', alt: 'DevOpsDays Lima community photo 2' },
]

export function AboutSection() {
  const { t } = useI18n()

  return (
    <Section
      id="about"
      eyebrow={t('about.eyebrow')}
      title={t('about.title')}
      lead={t('about.lead')}
    >
      <div className="grid grid--2">
        <div className="about__slider" role="region" aria-label={t('about.sliderLabel')}>
          <div className="slider">
            <div className="slider__track">
              {sliderImages.map((img) => (
                <div key={img.src} className="slider__slide">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="slider__img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card about__content">
          <h3 style={{ margin: 0, fontSize: 18, letterSpacing: '-0.01em' }}>
            {t('about.expect.title')}
          </h3>
          <div className="about__copy muted">
            <p>{t('about.expect.p1')}</p>
            <p>{t('about.who.p1')}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
