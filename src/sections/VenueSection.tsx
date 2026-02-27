import { Section } from '../components/Section'
import { useI18n } from '../i18n/useI18n'

export function VenueSection() {
  const { t } = useI18n()
  const mapLabel = `${t('venue.visualLabel')}: ${t('venue.card.addressLine1')}, ${t('venue.card.addressLine2')}`

  return (
    <Section
      id="venue"
      eyebrow={t('venue.eyebrow')}
      title={t('venue.title')}
      lead={t('venue.lead')}
    >
      <div
        className="rounded-[calc(var(--site-radius)+6px)] border border-site-border bg-[var(--site-hero-visual-bg)] overflow-hidden relative [height:clamp(360px,46vh,460px)] shadow-none before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(var(--site-accent-rgb),0.18),transparent_40%),linear-gradient(315deg,rgba(var(--site-accent-2-rgb),0.16),transparent_45%)] before:pointer-events-none"
        aria-label={mapLabel}
      >
        <iframe
          title={mapLabel}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Av.%20De%20la%20Arqueolog%C3%ADa%20206%2C%20San%20Borja%2C%20Lima%2C%20Per%C3%BA&output=embed"
          className="w-full h-full border-0 block"
          allowFullScreen
        />
      </div>
    </Section>
  )
}
