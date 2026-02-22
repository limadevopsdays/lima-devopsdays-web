import { Section } from '../components/Section'
import { useI18n } from '../i18n/useI18n'

const stats = [
  { key: 'attendees', value: '300+' },
  { key: 'speakers', value: '20+' },
  { key: 'sessions', value: '15+' },
  { key: 'sponsors', value: '10+' },
] as const

const galleryImages = [
  { src: '/assets/hero/community-lima.jpeg', alt: 'DevOpsDays Lima 2025 photo 1' },
  { src: '/assets/hero/community.png', alt: 'DevOpsDays Lima 2025 photo 2' },
]

export function PastEventsSection() {
  const { t } = useI18n()

  return (
    <Section
      id="past-events"
      eyebrow={t('pastEvents.eyebrow')}
      title={t('pastEvents.title')}
      lead={t('pastEvents.lead')}
    >
      <div className="pastEvents__stats" role="list" aria-label={t('pastEvents.statsLabel')}>
        {stats.map(({ key, value }) => (
          <div key={key} className="card pastEvents__stat" role="listitem">
            <div className="pastEvents__statValue">{value}</div>
            <div className="pastEvents__statLabel muted">{t(`pastEvents.stat.${key}`)}</div>
          </div>
        ))}
      </div>

      <div className="pastEvents__gallery" role="region" aria-label={t('pastEvents.galleryLabel')}>
        <div className="slider">
          <div className="slider__track">
            {galleryImages.map((img) => (
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

      <div className="pastEvents__video">
        <h3 className="pastEvents__videoTitle">{t('pastEvents.videoTitle')}</h3>
        <div className="pastEvents__videos">
          <div className="pastEvents__embed">
            <iframe
              src="https://www.youtube.com/embed/OOYWupGVhqA?start=5"
              title={t('pastEvents.videoTitle')}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="pastEvents__embed">
            <iframe
              src="https://www.youtube.com/embed/5k0J_PuuObE"
              title={t('pastEvents.videoTitle')}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
