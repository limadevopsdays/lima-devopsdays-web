import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { SectionHeader } from '../SectionHeader'
import styles from './index.module.css'
import { useI18n } from '../../../i18n'
import { faqSectionI18n } from './i18n'
import { faqI18n } from '../../../data/mockContent.i18n'

function renderAnswer(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }

    return <span key={index}>{part}</span>
  })
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const t = useI18n(faqSectionI18n)
  const faq = useI18n(faqI18n)

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          eyebrow={t.eyebrow}
          eyebrowColor="#6B51EF"
          title={t.title}
          lead={t.lead}
        />

        <div className={styles.faqList} role="list" aria-label={t.title}>
          {faq.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={item.q}
                role="listitem"
                className={`${styles.faqItem} ${isOpen ? styles.open : styles.closed}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className={styles.faqButton}
                  aria-expanded={isOpen}
                  data-track-name="toggle_faq_home"
                >
                  <span className={`${styles.faqQuestion} ${isOpen ? styles.open : styles.closed}`}>
                    {item.q}
                  </span>
                  <div className={`${styles.faqIcon} ${isOpen ? styles.open : styles.closed}`}>
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" style={{ color: '#64748b' }} />
                    )}
                  </div>
                </button>

                <div className={`${styles.faqPanel} ${isOpen ? styles.open : styles.closed}`}>
                  <div className={styles.faqPanelContent}>
                    <div className={styles.faqDivider} />
                    <p className={styles.faqAnswer}>{renderAnswer(item.a)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
