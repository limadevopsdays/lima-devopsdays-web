import { CalendarDays, Sparkles, Zap } from 'lucide-react'
import styles from './index.module.css'
import { useI18n } from '../../../i18n'
import { earlyBirdI18n } from './i18n'

export function EarlyBirdBanner() {
  const t = useI18n(earlyBirdI18n)
  const backgroundImageUrl = '/images/hero/banner/tickets.jpg'

  return (
    <div className={styles.banner}>
      <a
        href="https://entradas.devopsdays.pe"
        className={styles.bannerLink}
        data-track-name="ver_ofertas_early_bird_home"
        aria-label={t.ariaLabel}
        title={t.ariaLabel}
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.container}>
          <div className={styles.contentLeft}>
            <h2 className={styles.title}>
              <span className={styles.titleMain}>
                {t.title} <span className={styles.heartPulse}>{t.titleHighlight}</span>
              </span>
              <span className={styles.titleSubtitle}>
                Hasta <span className={styles.highlightPurple}>30% dcto.</span> {t.subtitle}
              </span>
            </h2>

            <p className={styles.description}>{t.description}</p>

            <span className={styles.ctaLink}>{t.cta}</span>
          </div>

          <div className={styles.contentRight}>
            <div className={styles.rightBg} style={{ backgroundImage: `url(${backgroundImageUrl})` }} />

            <div className={styles.floatingBadge}>
              <Zap className={styles.floatingBadgeIcon} />
              <span className={styles.floatingBadgeText}>{t.badgeUrgency}</span>
            </div>

            <div className={styles.floatingBadgeSecondary}>
              <div className={styles.floatingBadgeSecondaryItem}>
                <CalendarDays className={styles.floatingBadgeSecondaryIcon} />
                <span className={styles.floatingBadgeText}>
                  {t.badgeDateExtended}
                </span>
              </div>

              <div className={styles.floatingBadgeSecondaryItem}>
                <Sparkles className={styles.floatingBadgeSecondaryIcon} />
                <span className={styles.floatingBadgeText}>
                  {t.badgeDateEvent}
                </span>
              </div>
            </div>

            <div className={styles.discountCard}>
              <div className={styles.cardHeader}>
                <svg className={styles.cardHeaderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className={styles.cardHeaderText}>{t.discountHeader}</span>
              </div>

              <div className={styles.cardDiscount}>
                <span className={styles.cardDiscountNumber}>30</span>
                <span className={styles.cardDiscountPercent}>%</span>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.cardFooterText}>{t.discountFooter}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
