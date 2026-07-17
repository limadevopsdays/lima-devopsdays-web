import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { ImageWithFallback } from '../../figma/ImageWithFallback'
import styles from './index.module.css'
import aboutStyles from '../AboutSection/index.module.css'
import { useI18n } from '../../../i18n'
import { galleryI18n } from './i18n'
import { aboutI18n } from '../AboutSection/i18n'
import gallery1 from '/images/tickets/gallery/gallery-1.jpg'
import gallery2 from '/images/tickets/gallery/gallery-2.jpg'
import gallery3 from '/images/tickets/gallery/gallery-3.jpg'
import gallery4 from '/images/tickets/gallery/gallery-4.jpg'
import gallery5 from '/images/tickets/gallery/gallery-5.jpg'
import gallery6 from '/images/tickets/gallery/gallery-6.jpg'
import gallery7 from '/images/tickets/gallery/gallery-7.jpg'

// Imágenes reales del evento DevOpsDays Lima 2025
const galleryImages = [
  {
    url: gallery1,
    alt: 'Galería DevOpsDays Lima 2025 - imagen 1'
  },
  {
    url: gallery2,
    alt: 'Galería DevOpsDays Lima 2025 - imagen 2'
  },
  {
    url: gallery3,
    alt: 'Galería DevOpsDays Lima 2025 - imagen 3'
  },
  {
    url: gallery4,
    alt: 'Galería DevOpsDays Lima 2025 - imagen 4'
  },
  {
    url: gallery5,
    alt: 'Galería DevOpsDays Lima 2025 - imagen 5'
  },
  {
    url: gallery6,
    alt: 'Galería DevOpsDays Lima 2025 - imagen 6'
  },
  {
    url: gallery7,
    alt: 'Galería DevOpsDays Lima 2025 - imagen 7'
  }
]

// Custom arrow components
function NextArrow({ onClick, ariaLabel }: { onClick?: () => void; ariaLabel: string }) {
  return (
    <button
      className={`${styles.arrow} ${styles.nextArrow}`}
      onClick={onClick}
      aria-label={ariaLabel}
      data-track-name="siguiente_gallery_home"
    >
      <ChevronRight size={32} />
    </button>
  )
}

function PrevArrow({ onClick, ariaLabel }: { onClick?: () => void; ariaLabel: string }) {
  return (
    <button
      className={`${styles.arrow} ${styles.prevArrow}`}
      onClick={onClick}
      aria-label={ariaLabel}
      data-track-name="anterior_gallery_home"
    >
      <ChevronLeft size={32} />
    </button>
  )
}

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [visibleGallerySlides, setVisibleGallerySlides] = useState(3)
  const t = useI18n(galleryI18n)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(max-width: 1024px)')

    const syncVisibleSlides = () => {
      setVisibleGallerySlides(mediaQuery.matches ? 1 : 3)
    }

    syncVisibleSlides()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncVisibleSlides)

      return () => {
        mediaQuery.removeEventListener('change', syncVisibleSlides)
      }
    }

    mediaQuery.addListener(syncVisibleSlides)

    return () => {
      mediaQuery.removeListener(syncVisibleSlides)
    }
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const nextImage = () => {
    setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: visibleGallerySlides,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: visibleGallerySlides > 1,
    nextArrow: <NextArrow ariaLabel={t.ariaNext} />,
    prevArrow: <PrevArrow ariaLabel={t.ariaPrev} />,
  }

  // ── About card state & logic (copiado de AboutSection) ──────────────────
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isPreviewPaused, setIsPreviewPaused] = useState(false)
  const [isPreviewMuted, setIsPreviewMuted] = useState(true)
  const [isAboutIntersecting, setIsAboutIntersecting] = useState(false)
  const [hasLoadedPreview, setHasLoadedPreview] = useState(false)
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const previewIframeRef = useRef<HTMLIFrameElement | null>(null)
  const currentVolumeRef = useRef(0)
  const tAbout = useI18n(aboutI18n)

  const videoId = 'OOYWupGVhqA'
  const bgImageUrl = 'https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvcHMlMjB0ZWFtJTIwd29ya2luZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3MzA4NTE1OHww&ixlib=rb-4.1.0&q=80&w=1080'

  const postPreviewCommand = (func: string, args: unknown[] = []) => {
    previewIframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*',
    )
  }

  useEffect(() => {
    const handleInteraction = () => { setIsPreviewMuted(false); cleanup() }
    const cleanup = () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('mousedown', handleInteraction)
    }
    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('keydown', handleInteraction, { once: true })
    window.addEventListener('touchstart', handleInteraction, { once: true })
    window.addEventListener('mousedown', handleInteraction, { once: true })
    return cleanup
  }, [])

  useEffect(() => {
    if (!hasLoadedPreview) return
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== previewIframeRef.current?.contentWindow) return
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        if (data.event === 'onReady' || data.event === 'initialDelivery') setIsIframeLoaded(true)
      } catch { /* ignore */ }
    }
    window.addEventListener('message', handleMessage)
    const timer = setTimeout(() => setIsIframeLoaded(true), 1500)
    return () => { window.removeEventListener('message', handleMessage); clearTimeout(timer) }
  }, [hasLoadedPreview])

  useEffect(() => {
    const sectionElement = document.getElementById('gallery')
    if (!sectionElement) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAboutIntersecting(entry.isIntersecting)
        if (entry.isIntersecting) setHasLoadedPreview(true)
      },
      { threshold: 0.1, rootMargin: '200px' }
    )
    observer.observe(sectionElement)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isIframeLoaded) return
    const isDucked = isVideoOpen || (isAboutIntersecting && !isPreviewPaused && !isPreviewMuted)
    const targetVolume = (isAboutIntersecting && !isVideoOpen && !isPreviewPaused && !isPreviewMuted) ? 50 : 0
    const interval = setInterval(() => {
      const current = currentVolumeRef.current
      if (current === targetVolume) { clearInterval(interval); return }
      const step = 5
      const nextVolume = current < targetVolume ? Math.min(current + step, targetVolume) : Math.max(current - step, targetVolume)
      currentVolumeRef.current = nextVolume
      postPreviewCommand('setVolume', [nextVolume])
      if (nextVolume > 0 && current === 0) postPreviewCommand('unMute')
      if (nextVolume === 0) postPreviewCommand('mute')
    }, 50)

    window.dispatchEvent(new CustomEvent('devopsdays:video-volume', { detail: { volume: isDucked ? 50 : 0 } }))

    return () => clearInterval(interval)
  }, [isAboutIntersecting, isVideoOpen, isPreviewPaused, isPreviewMuted, isIframeLoaded])

  useEffect(() => {
    if (isVideoOpen) {
      postPreviewCommand('pauseVideo')
    } else if (isAboutIntersecting && !isPreviewPaused) {
      postPreviewCommand('playVideo')
    }
  }, [isVideoOpen, isAboutIntersecting, isPreviewPaused])
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div id="gallery" className={styles.gallery}>
      {/* About card (copiado de AboutSection) */}
      <div className={aboutStyles.container}>
        <div className={aboutStyles.card}>
          <div
            className={aboutStyles.bgImage}
            style={{ '--bg-image': `url(${bgImageUrl})` } as CSSProperties}
          />
          <div className={aboutStyles.bgOverlay} />
          <div className={aboutStyles.content}>
            <h2 className={aboutStyles.title}>
              {tAbout.title.includes('DevOpsDays Lima 2026') ? (
                <>
                  {tAbout.title.split('DevOpsDays Lima 2026')[0]}
                  <span className={aboutStyles.logoText}>
                    <span className={aboutStyles.logoDevOps}>DevOps</span>
                    <span className={aboutStyles.logoDays}>Days Lima 2026</span>
                  </span>
                  {tAbout.title.split('DevOpsDays Lima 2026')[1]}
                </>
              ) : (
                tAbout.title
              )}
            </h2>
            <p className={aboutStyles.mission}>{tAbout.mission}</p>
            <div
              className={aboutStyles.videoContainer}
              onClick={() => setIsVideoOpen(true)}
            >
              {hasLoadedPreview ? (
                <>
                  <iframe
                    ref={previewIframeRef}
                    className={aboutStyles.videoPreviewIframe}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=${videoId}&playsinline=1&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
                    title={tAbout.videoPreviewTitle}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    tabIndex={-1}
                  />
                  <div className={aboutStyles.videoControls}>
                    <button
                      type="button"
                      className={aboutStyles.videoControlButton}
                      aria-label={isPreviewPaused ? tAbout.playPreviewLabel : tAbout.pausePreviewLabel}
                      onClick={(event) => {
                        event.stopPropagation()
                        if (isPreviewPaused) {
                          postPreviewCommand('playVideo')
                        } else {
                          postPreviewCommand('pauseVideo')
                        }
                        setIsPreviewPaused((current) => !current)
                      }}
                    >
                      {isPreviewPaused ? (
                        <Play className={aboutStyles.videoControlIcon} />
                      ) : (
                        <Pause className={aboutStyles.videoControlIcon} />
                      )}
                    </button>
                    <button
                      type="button"
                      className={aboutStyles.videoControlButton}
                      aria-label={isPreviewMuted ? tAbout.unmutePreviewLabel : tAbout.mutePreviewLabel}
                      onClick={(event) => {
                        event.stopPropagation()
                        setIsPreviewMuted((current) => !current)
                      }}
                    >
                      {isPreviewMuted ? (
                        <VolumeX className={aboutStyles.videoControlIcon} />
                      ) : (
                        <Volume2 className={aboutStyles.videoControlIcon} />
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className={aboutStyles.videoPreviewPlaceholder} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.carouselWrapper}>
          <Slider {...settings}>
            {galleryImages.map((image, index) => (
              <div key={index} className={styles.slideWrapper}>
                <button
                  type="button"
                  className={styles.imageContainer}
                  onClick={() => openLightbox(index)}
                  aria-label={t.ariaPreview(image.alt)}
                  data-track-name="abrir_imagen_gallery_home"
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.alt}
                    className={styles.image}
                  />
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>

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
              aria-label={t.ariaClose}
              data-track-name="cerrar_lightbox_gallery_home"
            >
              <X className={styles.closeIcon} />
            </button>

            <div className={styles.counter}>
              <p className={styles.counterText}>
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className={`${styles.navButton} ${styles.prevButton}`}
                  aria-label={t.ariaPrev}
                  data-track-name="anterior_lightbox_gallery_home"
                >
                  <ChevronLeft className={styles.chevronIcon} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className={`${styles.navButton} ${styles.nextButton}`}
                  aria-label={t.ariaNext}
                  data-track-name="siguiente_lightbox_gallery_home"
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
                src={galleryImages[lightboxIndex].url}
                alt={galleryImages[lightboxIndex].alt}
                className={styles.lightboxImage}
              />

              <div className={styles.caption}>
                <p className={styles.captionText}>
                  {galleryImages[lightboxIndex].alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={aboutStyles.modal}
            onClick={() => setIsVideoOpen(false)}
          >
            <div 
              style={{ position: 'relative', width: '100%', maxWidth: '80rem' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={aboutStyles.modalCloseButton}
                onClick={() => setIsVideoOpen(false)}
                aria-label={tAbout.closeLabel}
              >
                <X className={aboutStyles.closeIcon} />
                <span>{tAbout.closeLabel}</span>
              </button>
              <div className={aboutStyles.modalContent}>
                <iframe
                  className={aboutStyles.modalIframe}
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
                  title={tAbout.videoAriaLabel}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
