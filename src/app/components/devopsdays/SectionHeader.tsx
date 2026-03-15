import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  eyebrow?: string
  eyebrowColor?: string
  title?: string
  lead?: string
  showDot?: boolean
}

export function SectionHeader({
  eyebrow,
  eyebrowColor = '#7c3aed',
  title,
  lead,
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
          } as React.CSSProperties}
        >
          {showDot && <span className={styles.pulseDot}></span>}
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className={styles.title}>
          {title}
        </h2>
      )}
      {lead && (
        <p className={styles.lead}>
          {lead}
        </p>
      )}
    </div>
  )
}