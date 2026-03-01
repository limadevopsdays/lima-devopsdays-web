import { FiChevronDown } from 'react-icons/fi'
import { Section } from '../components/Section'
import { faq } from '../content/faq'
import { useI18n } from '../i18n/useI18n'

export function FaqSection() {
  const { t } = useI18n()

  function renderAnswer(aKey: (typeof faq)[number]['aKey']) {
    if (aKey !== 'faq.a1') return t(aKey)

    const answer = t(aKey)
    const venueName = t('venue.title')
    const index = answer.indexOf(venueName)
    if (index < 0) return answer

    const before = answer.slice(0, index)
    const after = answer.slice(index + venueName.length)

    return (
      <>
        {before}
        <strong>{venueName}</strong>
        {after}
      </>
    )
  }

  return (
    <Section
      id="faq"
      eyebrow={t('faq.eyebrow')}
      title={t('faq.title')}
      lead={t('faq.lead')}
    >
      <div className="faq" role="list" aria-label={t('faq.listLabel')}>
        {faq.map((item) => {
          const idBase = item.qKey.replace(/[^a-z0-9]+/gi, '-').toLowerCase()
          const summaryId = `${idBase}-summary`
          const panelId = `${idBase}-panel`

          return (
            <details key={item.qKey} role="listitem">
              <summary id={summaryId} aria-controls={panelId}>
                <span>{t(item.qKey)}</span>
                <FiChevronDown className="faq__icon" aria-hidden="true" />
              </summary>
              <div id={panelId} className="faq__panel" role="region" aria-labelledby={summaryId}>
                <p>{renderAnswer(item.aKey)}</p>
              </div>
            </details>
          )
        })}
      </div>
    </Section>
  )
}
