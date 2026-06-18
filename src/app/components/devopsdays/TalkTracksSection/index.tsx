import { useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './index.module.css'
import { SectionHeader } from '../SectionHeader'
import { useI18n } from '../../../i18n'
import { talkTracksI18n } from './i18n'

// Configuration for colors
const TRACK_CONFIG = [
  { color: '#2563eb' }, // Blue (Platform Engineering)
  { color: '#f97316' }, // Orange (Security & Tech Transformation)
  { color: '#14b8a6' }, // Teal (Modern Leadership & Culture)
  { color: '#a78bfa' }, // Purple (AI & Data Strategy)
] as const

export function TalkTracksSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const t = useI18n(talkTracksI18n)

  return (
    <div className={styles.tracksWrapper}>
      <SectionHeader
        className={styles.header}
        title={
          <>
            <span className={styles.titleAccent}>{t.titlePart2}</span>
          </>
        }
        lead={t.lead}
      />

      <div className={styles.accordionContainer} role="tablist" aria-label="DevOpsDays Lima Talk Tracks">
        {t.tracks.map((track, idx) => {
          const config = TRACK_CONFIG[idx]
          const isOpen = activeIdx === idx

          return (
            <div
              key={idx}
              className={`${styles.accordionItem} ${isOpen ? styles.accordionItemActive : ''}`}
              style={{ '--track-color': config.color } as CSSProperties}
            >
              <button
                type="button"
                className={styles.accordionHeader}
                onClick={() => setActiveIdx(idx)}
                aria-expanded={isOpen}
                aria-controls={`track-content-${idx}`}
                id={`track-tab-${idx}`}
                role="tab"
                aria-selected={isOpen}
              >
                <div className={styles.accordionHeaderTitleGroup}>
                  <span className={styles.accordionTitle}>{track.title}</span>
                </div>
                <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
              </button>

              <div
                id={`track-content-${idx}`}
                className={`${styles.accordionBodyWrapper} ${isOpen ? styles.accordionBodyOpen : ''}`}
                role="tabpanel"
                aria-labelledby={`track-tab-${idx}`}
                aria-hidden={!isOpen}
              >
                <div className={styles.accordionBody}>
                  <p className={styles.description}>{track.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
