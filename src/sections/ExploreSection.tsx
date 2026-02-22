import { Section } from '../components/Section'
import { useI18n } from '../i18n/useI18n'

const exploreCards = [
  {
    id: 'organizers',
    titleKey: 'explore.team.title',
    descKey: 'explore.team.desc',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
      </svg>
    ),
  },
  {
    id: 'past-events',
    titleKey: 'explore.pastEvents.title',
    descKey: 'explore.pastEvents.desc',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18Zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12Z" />
      </svg>
    ),
  },
  {
    id: 'code-of-conduct',
    titleKey: 'explore.coc.title',
    descKey: 'explore.coc.desc',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8Z" />
      </svg>
    ),
  },
] as const

export function ExploreSection() {
  const { t } = useI18n()

  return (
    <Section
      id="explore"
      eyebrow={t('explore.eyebrow')}
      title={t('explore.title')}
      lead={t('explore.lead')}
    >
      <div className="grid grid--3">
        {exploreCards.map(({ id, titleKey, descKey, icon }) => (
          <a key={id} href={`#${id}`} className="card exploreCard">
            <div className="exploreCard__icon">{icon}</div>
            <h3 className="exploreCard__title">{t(titleKey)}</h3>
            <p className="exploreCard__desc muted">{t(descKey)}</p>
          </a>
        ))}
      </div>
    </Section>
  )
}
