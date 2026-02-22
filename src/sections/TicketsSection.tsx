import { Button } from '../components/Button'
import { Section } from '../components/Section'
import { ticketsUrl } from '../content/site'
import { useI18n } from '../i18n/useI18n'

const ticketTypes = [
  { key: 'earlyBird', highlight: true },
  { key: 'standard', highlight: false },
  { key: 'late', highlight: false },
] as const

const benefitKeys = [
  'tickets.benefit1',
  'tickets.benefit2',
  'tickets.benefit3',
  'tickets.benefit4',
  'tickets.benefit5',
  'tickets.benefit6',
  'tickets.benefit7',
  'tickets.benefit8',
  'tickets.benefit9',
] as const

export function TicketsSection() {
  const { t } = useI18n()
  const ticketsHref = ticketsUrl || '#tickets'

  return (
    <Section
      id="tickets"
      eyebrow={t('tickets.eyebrow')}
      title={t('tickets.title')}
      lead={t('tickets.lead')}
    >
      <div className="tickets__timeline" aria-label={t('tickets.timelineLabel')}>
        <h3 className="tickets__timelineTitle">{t('tickets.timeline')}</h3>
        <div className="timeline">
          {ticketTypes.map(({ key }) => (
            <div key={key} className="timeline__item">
              <div className="timeline__dot" />
              <div className="timeline__content">
                <strong>{t(`tickets.${key}`)}</strong>
                <span className="muted">{t(`tickets.${key}.date`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid--3">
        {ticketTypes.map(({ key, highlight }) => (
          <div key={key} className={`card ticketCard${highlight ? ' ticketCard--highlight' : ''}`}>
            <div className="ticketCard__header">
              <h3 className="ticketCard__name">{t(`tickets.${key}`)}</h3>
              <div className="ticketCard__price">{t(`tickets.${key}.price`)}</div>
            </div>
            <p className="ticketCard__desc muted">{t(`tickets.${key}.desc`)}</p>
            <div className="ticketCard__date">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 16H5V10h14v10Zm0-12H5V6h14v2Z" />
              </svg>
              <span>{t(`tickets.${key}.date`)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card ticketBenefits">
        <h3 className="ticketBenefits__title">{t('tickets.includes')}</h3>
        <ul className="ticketBenefits__list">
          {benefitKeys.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>

      <div className="tickets__cta">
        <Button as="a" href={ticketsHref} variant="primary">
          {t('tickets.cta')}
        </Button>
      </div>
    </Section>
  )
}
