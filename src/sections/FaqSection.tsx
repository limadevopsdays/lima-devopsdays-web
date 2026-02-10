import { Section } from '../components/Section'
import { faq } from '../content/faq'
import { useI18n } from '../i18n/useI18n'

export function FaqSection() {
  const { t } = useI18n()

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
                <svg
                  className="faq__icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M12 15.5a1 1 0 0 1-.7-.3l-6-6a1 1 0 1 1 1.4-1.4l5.3 5.3 5.3-5.3a1 1 0 1 1 1.4 1.4l-6 6a1 1 0 0 1-.7.3Z"
                  />
                </svg>
              </summary>
              <div id={panelId} className="faq__panel" role="region" aria-labelledby={summaryId}>
                <p>{t(item.aKey)}</p>
              </div>
            </details>
          )
        })}
      </div>
    </Section>
  )
}
