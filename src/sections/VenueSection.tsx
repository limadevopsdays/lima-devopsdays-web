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
      <div className="hero__visual hero__visual--map" aria-label={mapLabel}>
        <iframe
          title={mapLabel}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Av.%20De%20la%20Arqueolog%C3%ADa%20206%2C%20San%20Borja%2C%20Lima%2C%20Per%C3%BA&output=embed"
          allowFullScreen
        />
      </div>
    </Section>
  )
}
