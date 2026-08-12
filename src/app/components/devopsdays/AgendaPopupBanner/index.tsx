import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import styles from '../PopupBanner/index.module.css'

const AUTO_CLOSE_MS = 5000

export function AgendaPopupBanner() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const firedRef = useRef(false)

  const close = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setVisible(false)
  }

  const handleAgendaClick = (e: React.MouseEvent) => {
    e.preventDefault()
    close()
    
    // Smooth scroll a la sección #schedule
    const scheduleElement = document.getElementById('schedule')
    if (scheduleElement) {
      scheduleElement.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#schedule'
    }
  }

  // Retardo inicial para renderizar en la página
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 600)
    return () => clearTimeout(showTimer)
  }, [])

  // Auto-cierre con barra de progreso
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
          onClick={(e) => close(e)}
          role="dialog"
          aria-modal="true"
          aria-label="Promoción Agenda DevOpsDays Lima 2026"
        >
          <motion.div
            className={styles.banner}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={(e) => close(e)}
              aria-label="Cerrar banner de agenda"
              data-track-name="cerrar_popup_banner_agenda"
            >
              <X size={20} />
            </button>

            {/* Click en la imagen o banner conduce a la sección agenda */}
            <a
              href="#schedule"
              onClick={handleAgendaClick}
              aria-label="Ver Agenda Completa DevOpsDays Lima 2026"
              className={styles.imageLink}
              data-track-name="click_popup_banner_agenda"
            >
              <div className={styles.imageWrapper}>
                <img
                  src="/images/hero/hero%206.png"
                  alt="Agenda DevOpsDays Lima 2026"
                  className={styles.heroImage}
                />
                <div className={styles.imageOverlay} />
              </div>
            </a>

            {/* Barra de progreso */}
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
