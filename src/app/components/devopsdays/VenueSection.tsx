import { useState, useEffect } from 'react'
import { MapPin, ArrowUpRight, X, ChevronLeft, ChevronRight, Car } from 'lucide-react'
import { MdTrain, MdDirectionsBus } from 'react-icons/md'
import { motion, AnimatePresence } from 'motion/react'
import { venue } from '../../data/mockContent'
import styles from './VenueSection.module.css'

const stats = [
  { value: '800 - 1000', label: 'Capacidad' },
  { value: '5', label: 'Salas' },
  { value: 'Sí', label: 'Wi-Fi' },
  { value: 'No', label: 'Parking' },
]

export function VenueSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : venue.photos.length - 1))
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < venue.photos.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const nextPhoto = () => {
    setLightboxIndex((prev) => (prev < venue.photos.length - 1 ? prev + 1 : 0))
  }

  const prevPhoto = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : venue.photos.length - 1))
  }

  return (
    <section id="venue" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.eyebrowContainer}>
          <span className={styles.eyebrow}>Ubicación</span>
        </div>

        <div className={styles.mainGrid}>
          {/* Map */}
          <div className={styles.mapContainer}>
            <iframe
              title="Mapa del venue"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Centro+de+Convenciones+de+Lima,+Av.+De+la+Arqueolog%C3%ADa+206,+San+Borja,+Lima,+Per%C3%BA&output=embed"
              className={styles.map}
              allowFullScreen
            />
          </div>

          {/* Info panel */}
          <div className={styles.infoPanel}>
            {/* Name + address + CTA */}
            <div>
              <h2 className={styles.venueTitle}>{venue.name}</h2>
              <div className={styles.addressContainer}>
                <MapPin className={styles.mapPinIcon} />
                <div>
                  <p className={`${styles.addressText} ${styles.addressPrimary}`}>{venue.address1}</p>
                  <p className={`${styles.addressText} ${styles.addressSecondary}`}>{venue.address2}</p>
                </div>
              </div>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapsButton}
                data-track-name="ver_maps_venue_home"
              >
                Ver en Maps
                <ArrowUpRight className={styles.arrowIcon} />
              </a>
            </div>

            <div className={styles.divider} />

            {/* Transport | Stats */}
            <div className={styles.twoColGrid}>
              {/* Transport */}
              <div>
                <p className={styles.sectionLabel}>Cómo llegar</p>
                <div className={styles.transitList}>
                  {venue.transit.map((route, i) => {
                    const transitBg =
                      route.type === 'metro' ? '#e0f2fe' :
                      route.type === 'bus' ? '#fff7ed' :
                      '#f3e8ff'
                    
                    const IconComponent =
                      route.type === 'metro' ? MdTrain :
                      route.type === 'bus' ? MdDirectionsBus :
                      Car
                    
                    const iconClass =
                      route.type === 'metro' ? styles.transitIconMetro :
                      route.type === 'bus' ? styles.transitIconBus :
                      styles.transitIconCar

                    return (
                      <a
                        key={i}
                        href={route.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.transitItem}
                        data-track-name="ver_ruta_venue_home"
                      >
                        <div
                          className={styles.transitIcon}
                          style={{ '--transit-bg': transitBg } as React.CSSProperties}
                        >
                          <IconComponent size={16} className={iconClass} />
                        </div>
                        <div>
                          <p className={styles.transitName}>{route.name}</p>
                          <p className={styles.transitStop}>{route.stop}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Stats */}
              <div>
                <p className={styles.sectionLabel}>Instalaciones</p>
                <div className={styles.statsGrid}>
                  {stats.map(({ value, label }) => (
                    <div key={label} className={styles.statCard}>
                      <span className={styles.statValue}>{value}</span>
                      <span className={styles.statLabel}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Gallery */}
            <div>
              <p className={styles.sectionLabel}>Galería ({venue.photos.length} fotos)</p>
              <div className={styles.galleryGrid}>
                {venue.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => openLightbox(i)}
                    className={styles.galleryButton}
                    aria-label={photo.alt}
                    data-track-name="abrir_galeria_venue_home"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className={styles.galleryImage}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
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
              onClick={() => setLightboxOpen(false)}
              className={styles.closeButton}
              aria-label="Cerrar"
              data-track-name="cerrar_galeria_venue_home"
            >
              <X className={styles.closeIcon} />
            </button>

            <div className={styles.counter}>
              <p className={styles.counterText}>
                {lightboxIndex + 1} / {venue.photos.length}
              </p>
            </div>

            {venue.photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevPhoto()
                  }}
                  className={`${styles.navButton} ${styles.prevButton}`}
                  aria-label="Anterior"
                  data-track-name="anterior_galeria_venue_home"
                >
                  <ChevronLeft className={styles.chevronIcon} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextPhoto()
                  }}
                  className={`${styles.navButton} ${styles.nextButton}`}
                  aria-label="Siguiente"
                  data-track-name="siguiente_galeria_venue_home"
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
              className={styles.imageContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={venue.photos[lightboxIndex].src}
                alt={venue.photos[lightboxIndex].alt}
                className={styles.lightboxImage}
              />

              <div className={styles.caption}>
                <p className={styles.captionText}>
                  {venue.photos[lightboxIndex].alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
