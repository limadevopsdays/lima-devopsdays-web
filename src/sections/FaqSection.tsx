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
      <div
        className="block rounded-[12px] overflow-hidden border border-white/[0.09] [:root[data-theme=light]_&]:border-black/[0.1]"
        role="list"
        aria-label={t('faq.listLabel')}
      >
        {faq.map((item) => {
          const idBase = item.qKey.replace(/[^a-z0-9]+/gi, '-').toLowerCase()
          const summaryId = `${idBase}-summary`
          const panelId = `${idBase}-panel`

          return (
            <details
              key={item.qKey}
              role="listitem"
              className="group/faq bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] border-0 border-b border-b-white/[0.09] last:border-b-0 px-[18px] py-4 relative overflow-hidden transition-[border-color,background] duration-[180ms] ease hover:bg-[var(--site-hover-sheen)] hover:border-b-[rgba(var(--site-accent-rgb),0.65)] open:bg-[var(--site-hover-sheen)] open:border-b-[rgba(var(--site-accent-rgb),0.65)] [:root[data-theme=light]_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))] [:root[data-theme=light]_&]:border-b-black/[0.1] [:root[data-theme=light]_&]:hover:bg-[var(--site-hover-sheen)] [:root[data-theme=light]_&]:hover:border-b-[rgba(var(--site-accent-rgb),0.55)] [:root[data-theme=light]_&]:open:bg-[var(--site-hover-sheen)] [:root[data-theme=light]_&]:open:border-b-[rgba(var(--site-accent-rgb),0.55)] after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(700px_200px_at_15%_0%,rgba(var(--site-accent-rgb),0.12),transparent_55%),radial-gradient(700px_240px_at_85%_100%,rgba(var(--site-accent-2-rgb),0.12),transparent_55%)] after:opacity-[0.4] after:pointer-events-none after:z-[0] [:root[data-theme=light]_&]:after:opacity-[0.18]"
            >
              <summary
                id={summaryId}
                aria-controls={panelId}
                className="group/summary cursor-pointer font-[550] flex items-center justify-between gap-3 py-[6px] px-4 list-none relative z-[1] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--site-focus)]"
              >
                <span>{t(item.qKey)}</span>
                <svg
                  className="flex-none w-5 h-5 opacity-70 motion-safe:transition-[transform,opacity] motion-safe:duration-[160ms] motion-safe:ease group-open/faq:rotate-180 group-open/faq:opacity-100 group-hover/summary:opacity-100"
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
              <div id={panelId} className="relative z-[1]" role="region" aria-labelledby={summaryId}>
                <p className="m-0 py-[6px] px-4 text-site-text-muted">{renderAnswer(item.aKey)}</p>
              </div>
            </details>
          )
        })}
      </div>
    </Section>
  )
}
