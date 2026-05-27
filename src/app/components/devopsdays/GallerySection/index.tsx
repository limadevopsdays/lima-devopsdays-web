import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { ImageWithFallback } from '../../figma/ImageWithFallback'
import styles from './index.module.css'
import { useI18n } from '../../../i18n'
import { galleryI18n } from './i18n'
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

  return (
    <div id="gallery" className={styles.gallery}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.mission}>{t.missionText}</p>
        </div>

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
    </div>
  )
}
