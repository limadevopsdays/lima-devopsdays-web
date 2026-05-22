import { CalendarDays, Sparkles, Zap } from 'lucide-react'
import styles from './EarlyBirdBanner.module.css'

export function EarlyBirdBanner() {
  const backgroundImageUrl = '/images/hero/banner/tickets.jpg'

  return (
    <div className={styles.banner}>
      <a
        href="https://entradas.devopsdays.pe"
        className={styles.bannerLink}
        data-track-name="ver_ofertas_early_bird_home"
        aria-label="Ver ofertas Early Bird"
        title="Ver ofertas Early Bird"
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.container}>
          <div className={styles.contentLeft}>
            <h2 className={styles.title}>
              <span className={styles.titleMain}>
                Early Bird <span className={styles.heartPulse}>❤️‍🔥</span>
              </span>
              <span className={styles.titleSubtitle}>
                Hasta <span className={styles.highlightPurple}>30% dcto.</span> en entradas
              </span>
            </h2>

            <p className={styles.description}>
              Aprovecha descuentos en entradas y asegura tu lugar en DevOpsDays Lima 2026. 🚀
            </p>

            <span className={styles.ctaLink}>Ver ofertas →</span>
          </div>

          <div className={styles.contentRight}>
            <div className={styles.rightBg} style={{ backgroundImage: `url(${backgroundImageUrl})` }} />

            <div className={styles.floatingBadge}>
              <Zap className={styles.floatingBadgeIcon} />
              <span className={styles.floatingBadgeText}>¡SOLO POR POCOS DIAS!</span>
            </div>

            <div className={styles.floatingBadgeSecondary}>
              <div className={styles.floatingBadgeSecondaryItem}>
                <CalendarDays className={styles.floatingBadgeSecondaryIcon} />
                <span className={styles.floatingBadgeText}>
                  Se amplia hasta el <span className={styles.floatingBadgeHighlight}>15 de junio</span>
                </span>
              </div>

              <div className={styles.floatingBadgeSecondaryItem}>
                <Sparkles className={styles.floatingBadgeSecondaryIcon} />
                <span className={styles.floatingBadgeText}>
                  Nos vemos este <span className={styles.floatingBadgeHighlight}>27 y 28 de agosto</span>
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
                <span className={styles.cardHeaderText}>Ahorra hasta</span>
              </div>

              <div className={styles.cardDiscount}>
                <span className={styles.cardDiscountNumber}>30</span>
                <span className={styles.cardDiscountPercent}>%</span>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.cardFooterText}>¡Días limitados!</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
