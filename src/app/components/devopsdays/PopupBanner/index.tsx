import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import styles from './index.module.css'

const AUTO_CLOSE_MS = 3000

export function PopupBanner() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const firedRef = useRef(false)

  // Fire custom event once when the banner closes
  const close = () => {
    setVisible(false)
    if (!firedRef.current) {
      firedRef.current = true
      window.dispatchEvent(new CustomEvent('devopsdays:banner-closed'))
    }
  }

  // Delay appearance slightly so the page can first render
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 600)
    return () => clearTimeout(showTimer)
  }, [])

  // Auto-close + shrinking progress bar
  useEffect(() => {
    if (!visible) return

    const startTime = Date.now()
    let rafId: number

    const tick = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 1 - elapsed / AUTO_CLOSE_MS)
      setProgress(remaining * 100)
      if (elapsed < AUTO_CLOSE_MS) {
        rafId = requestAnimationFrame(tick)
      } else {
        close()
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => close()}
          role="dialog"
          aria-modal="true"
          aria-label="Promoción DevOpsDays Lima 2026"
        >
          <motion.div
            className={styles.banner}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => close()}
              aria-label="Cerrar banner"
              data-track-name="cerrar_popup_banner_hero5"
            >
              <X size={20} />
            </button>

            {/* Hero 5 image — click goes to ticket page */}
            <a
              href="https://entradas.devopsdays.pe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Comprar entradas DevOpsDays Lima 2026"
              className={styles.imageLink}
              data-track-name="click_popup_banner_hero5"
            >
              <div className={styles.imageWrapper}>
                <img
                  src="/images/hero/hero%205.webp"
                  alt="DevOpsDays Lima 2026 - Promoción especial"
                  className={styles.heroImage}
                />
                {/* Gradient overlay for text legibility */}
                <div className={styles.imageOverlay} />
              </div>
            </a>

            {/* Progress bar auto-close indicator */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
