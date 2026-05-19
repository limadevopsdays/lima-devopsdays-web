import type { CSSProperties, ReactNode } from 'react'
import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  eyebrow?: string
  eyebrowColor?: string
  title?: ReactNode
  titleColor?: string
  lead?: string
  leadColor?: string
  showDot?: boolean
}

export function SectionHeader({
  eyebrow,
  eyebrowColor = '#6B51EF',
  title,
  titleColor,
  lead,
  leadColor,
  showDot = false,
}: SectionHeaderProps) {
  return (
    <div className={styles.container}>
      {eyebrow && (
        <span
          className={styles.eyebrow}
          style={{
            '--eyebrow-color': eyebrowColor,
            '--eyebrow-bg': `${eyebrowColor}18`,
            '--eyebrow-border': `${eyebrowColor}30`,
          } as CSSProperties}
        >
          {showDot && <span className={styles.pulseDot}></span>}
          {eyebrow}
        </span>
      )}
      {title && (
        <h2
          className={styles.title}
          style={titleColor ? ({ color: titleColor } as CSSProperties) : undefined}
        >
          {title}
        </h2>
      )}
      {lead && (
        <p
          className={styles.lead}
          style={leadColor ? ({ color: leadColor } as CSSProperties) : undefined}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
