import { useEffect, useState, useRef } from 'react'
import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router'
import styles from './index.module.css'
import { SmartCropImage } from '../../SmartCropImage'
import { useI18n } from '../../../i18n'
import { heroSectionI18n } from './i18n'
// Imágenes para Grid 2x2 - DevOpsDays Lima REALES
const galleryImages = [
  { src: '/images/hero/hero%201.webp', overlayClass: styles.overlayPurple },
  { src: '/images/hero/hero%202.webp', overlayClass: styles.overlayCyan },
  { src: '/images/hero/hero%203.webp', overlayClass: styles.overlayGreen },
  { src: '/images/hero/hero%204.webp', overlayClass: styles.overlayOrange },
]

function splitPromptSegment(text: string, targetSegment: string) {
  const trimmedText = text.trim()
  const segmentIndex = trimmedText.lastIndexOf(targetSegment)
  if (segmentIndex === -1) {
    return { leadingText: trimmedText, promptText: '', promptEnd: '' }
  }
  const leadingText = trimmedText.slice(0, segmentIndex).trimEnd()
  const trailingText = trimmedText.slice(segmentIndex + targetSegment.length)
  const promptEnd = trailingText.match(/^[.,;:!?]+/)?.[0] ?? ''
  return { leadingText, promptText: targetSegment, promptEnd }
}

// ── Outer panel: carousel automático (Banner promo / Grid 2×2) ─────────────

const AUTO_SLIDE_MS = 5000

function OuterPanel({ localizedGalleryImages, openLightbox }: {
  localizedGalleryImages: (typeof galleryImages[number] & { openAriaLabel: string; alt: string })[]
  openLightbox: (idx: number) => void
}) {
  const [slide, setSlide] = useState<0 | 1>(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Resetea y arranca el timer de auto-avance
  const scheduleNext = (current: 0 | 1) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setSlide((current === 0 ? 1 : 0) as 0 | 1)
    }, AUTO_SLIDE_MS)
  }

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }
    scheduleNext(slide)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [slide, isPaused])

  const goTo = (i: 0 | 1) => { setSlide(i) }

  return (
    <div className={styles.rightPanel}>
      <div className={styles.slideViewport}>
        <AnimatePresence>
          {slide === 0 ? (
            <motion.div
              key="banner"
              className={`${styles.slideFull} ${styles.slidePromo}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <a
                href="https://entradas.devopsdays.pe"
                target="_blank"
                rel="noreferrer"
                className={styles.promoBannerSlide}
                aria-label="Comprar entradas DevOpsDays Lima 2026"
                data-track-name="click_promo_banner_hero"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img
                  src="/images/hero/hero%205.webp"
                  alt="DevOpsDays Lima 2026 - Promoción especial"
                  className={styles.promoBannerImage}
                />
              </a>
            </motion.div>
          ) : (
            <div key="grid" className={styles.slideFull}>
              <div className={styles.gallery}>
                {localizedGalleryImages.map((image, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.05 + idx * 0.06 }}
                    className={styles.galleryItem}
                  >
                    <button
                      type="button"
                      className={styles.galleryButton}
                      onClick={() => openLightbox(idx)}
                      aria-label={image.openAriaLabel}
                      data-track-name="abrir_imagen_hero_home"
                    >
                      <SmartCropImage
                        src={image.src}
                        alt={image.alt}
                        className={styles.galleryImage}
                        loading="lazy"
                        cropWidth={800}
                        cropHeight={600}
                      />
                      <div className={`${styles.galleryOverlay} ${image.overlayClass}`} />
                      <div className={styles.galleryHint}>
                        <ArrowRight className={styles.galleryHintIcon} />
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Dots indicadores — sin texto */}
      <div className={styles.carouselDots}>
        {([0, 1] as const).map((i) => (
          <button
            key={i}
            type="button"
            className={`${styles.carouselDot} ${i === slide ? styles.carouselDotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


// ── Main HeroSection ─────────────────────────────────────────────────────────

export function HeroSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const t = useI18n(heroSectionI18n)

  // Page-Load Startup states
  const [isLogoAnimating, setIsLogoAnimating] = useState(true)
  const [shouldLoadMascot, setShouldLoadMascot] = useState(false)

  useEffect(() => {
    const logoTimer = setTimeout(() => setIsLogoAnimating(false), 2000)
    const mascotTimer = setTimeout(() => setShouldLoadMascot(true), 2200)
    return () => { clearTimeout(logoTimer); clearTimeout(mascotTimer) }
  }, [])

  // Title proximity mouse-tracking effect
  const titleRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const titleElement = titleRef.current
    if (!titleElement) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = titleElement.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 450
      const proximity = Math.max(0, 1 - distance / maxDistance)
      const intensity = Math.pow(proximity, 1.8)
      titleElement.style.setProperty('--proximity-intensity', intensity.toFixed(3))
    }

    titleElement.style.setProperty('--proximity-intensity', '0')
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Typewriter states
  const [displayedPrompt, setDisplayedPrompt] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isColorReset, setIsColorReset] = useState(false)
  const [cursorOpacity, setCursorOpacity] = useState(1)

  const localizedGalleryImages = galleryImages.map((image, index) => ({
    ...image,
    ...t.galleryImages[index],
  }))
  const { leadingText, promptText, promptEnd } = splitPromptSegment(t.description, t.promptTarget)
  const remainingPrompt = promptText ? (promptText + promptEnd).slice(displayedPrompt.length) : ''

  useEffect(() => {
    if (!promptText) return
    setDisplayedPrompt('')
    setIsTypingComplete(false)
    setIsColorReset(false)
    setCursorOpacity(1)

    const fullPhrase = promptText + promptEnd
    let currentIdx = 0
    let typingTimer: ReturnType<typeof setTimeout>

    const typeNextChar = () => {
      if (currentIdx < fullPhrase.length) {
        setDisplayedPrompt(fullPhrase.slice(0, currentIdx + 1))
        currentIdx++
        typingTimer = setTimeout(typeNextChar, 60)
      } else {
        setIsTypingComplete(true)
      }
    }

    const startDelay = setTimeout(typeNextChar, 800)
    return () => { clearTimeout(startDelay); clearTimeout(typingTimer) }
  }, [promptText, promptEnd])

  useEffect(() => {
    if (!isTypingComplete) return
    const cursorFadeTimer = setTimeout(() => setCursorOpacity(0), 1500)
    const colorResetTimer = setTimeout(() => setIsColorReset(true), 2500)
    return () => { clearTimeout(cursorFadeTimer); clearTimeout(colorResetTimer) }
  }, [isTypingComplete])

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      else if (event.key === 'ArrowLeft') setLightboxIndex((p) => (p > 0 ? p - 1 : galleryImages.length - 1))
      else if (event.key === 'ArrowRight') setLightboxIndex((p) => (p < galleryImages.length - 1 ? p + 1 : 0))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  const openLightbox = (index: number) => { setLightboxIndex(index); setLightboxOpen(true) }
  const nextImage = () => setLightboxIndex((p) => (p < galleryImages.length - 1 ? p + 1 : 0))
  const prevImage = () => setLightboxIndex((p) => (p > 0 ? p - 1 : galleryImages.length - 1))

  return (
    <section id="hero" className={styles.hero} aria-label={t.sectionAriaLabel}>
      <div className={styles.mainGrid}>
        {/* ── Left: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className={styles.content}
        >
          <h1 ref={titleRef} className={styles.title}>
            <span className={styles.titleText}>
              <span className={styles.titleMainLine}>
                <span className={`${styles.titleDevOps} ${isLogoAnimating ? styles.logoStartupDevOps : ''}`}>
                  DevOps
                </span>{' '}
                <span className={`${styles.titleDays} ${isLogoAnimating ? styles.logoStartupDays : ''}`}>
                  Days
                </span>
              </span>
              <span className={`${styles.titleSubline} ${isLogoAnimating ? styles.logoStartupSubline : ''}`}>
                Lima 2026
              </span>
            </span>
          </h1>

          <div className={`${styles.mascotBetween} ${styles.mascotContainer} ${shouldLoadMascot ? styles.mascotLoaded : ''}`}>
            {shouldLoadMascot && (
              <video
                src="/videos/hero/mascota.mp4"
                className={styles.mascotDescription}
                autoPlay loop muted playsInline aria-hidden="true"
              />
            )}
          </div>

          <p className={styles.description}>
            {leadingText}{' '}
            {promptText ? (
              <span className={`${styles.promptHighlight} ${isColorReset ? styles.colorReset : ''}`}>
                {displayedPrompt}
                <span
                  className={`${styles.promptCursor} ${isTypingComplete && cursorOpacity > 0 ? styles.promptCursorBlink : ''}`}
                  style={{ opacity: cursorOpacity, transition: 'opacity 0.6s ease-out' }}
                >
                  █
                </span>
                <span className={styles.promptHiddenPlaceholder}>{remainingPrompt}</span>
              </span>
            ) : null}
          </p>

          <div className={styles.metaInfo}>
            <div className={styles.metaBadge}>
              <Calendar className={styles.iconPurple} />
              {t.date}
            </div>
            <div className={styles.metaBadge}>
              <MapPin className={styles.iconOrange} />
              {t.location}
            </div>
          </div>

          <div className={styles.ctaButtons}>
            <Link
              to="/tickets"
              className={`${styles.ctaButton} ${styles.ctaPrimary}`}
              data-track-name="comprar_tickets_hero_home"
            >
              {t.primaryCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* ── Right: Outer panel with two slides ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <OuterPanel
            localizedGalleryImages={localizedGalleryImages}
            openLightbox={openLightbox}
          />
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.lightbox}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className={styles.closeButton}
              aria-label={t.closeImageAriaLabel}
              data-track-name="cerrar_lightbox_hero_home"
            >
              <X className={styles.closeIcon} />
            </button>

            <div className={styles.counter}>
              <p className={styles.counterText}>{lightboxIndex + 1} / {galleryImages.length}</p>
            </div>

            {localizedGalleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className={`${styles.navButton} ${styles.prevButton}`}
                  aria-label={t.previousImageAriaLabel}
                  data-track-name="anterior_lightbox_hero_home"
                >
                  <ChevronLeft className={styles.chevronIcon} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className={`${styles.navButton} ${styles.nextButton}`}
                  aria-label={t.nextImageAriaLabel}
                  data-track-name="siguiente_lightbox_hero_home"
                >
                  <ChevronRight className={styles.chevronIcon} />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={styles.lightboxImageContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={localizedGalleryImages[lightboxIndex].src}
                alt={localizedGalleryImages[lightboxIndex].alt}
                className={styles.lightboxImage}
              />
              <div className={styles.caption}>
                <p className={styles.captionText}>{localizedGalleryImages[lightboxIndex].alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
