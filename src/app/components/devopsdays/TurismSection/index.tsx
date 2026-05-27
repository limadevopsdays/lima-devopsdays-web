import { useEffect, useState, type CSSProperties, type ComponentType } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { MdTrain, MdDirectionsBus } from 'react-icons/md'
import { FaCar, FaWalking } from 'react-icons/fa'
import { motion, AnimatePresence } from 'motion/react'
import { SectionHeader } from '../SectionHeader'
import styles from './index.module.css'
import { useI18n } from '../../../i18n'
import { turismI18n } from './i18n'

type TransportType = 'metro' | 'bus' | 'taxi' | 'walk'

const placeImages: Record<string, string> = {
  hero: '/images/tourism/plaza-de-armas.jpg',
  barranco: '/images/tourism/barranco.jpg',
  larcomar: '/images/tourism/larcomar.jpeg',
  chinatown: '/images/tourism/barrio-chino.jpeg',
  amor: '/images/tourism/parque-del-amor.png',
  aguas: '/images/tourism/paque-de-las-aguas-2.webp',
  centro: '/images/tourism/plaza-de-armas-2.jpg',
}

const transportConfig: Record<
  TransportType,
  { bg: string; iconClass: string; Icon: ComponentType<{ size?: number; className?: string }> }
> = {
  metro: { bg: '#e0f2fe', iconClass: styles.iconMetro, Icon: MdTrain },
  bus: { bg: '#fff7ed', iconClass: styles.iconBus, Icon: MdDirectionsBus },
  taxi: { bg: '#f3e8ff', iconClass: styles.iconTaxi, Icon: FaCar },
  walk: { bg: '#f0fdf4', iconClass: styles.iconWalk, Icon: FaWalking },
}

export function TurismSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const t = useI18n(turismI18n)
  const places = t.places.map((p) => ({ ...p, src: placeImages[p.area] ?? '' }))

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
      else if (e.key === 'ArrowLeft') setActiveIndex((p) => (p! > 0 ? p! - 1 : places.length - 1))
      else if (e.key === 'ArrowRight') setActiveIndex((p) => (p! < places.length - 1 ? p! + 1 : 0))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, places.length])

  const active = activeIndex !== null ? places[activeIndex] : null

  return (
    <section id="turismo" className={styles.section}>
      <div className={styles.videoBg} aria-hidden="true">
        <iframe
          className={styles.videoIframe}
          src="https://www.youtube.com/embed/ZyHrKZawDKw?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=ZyHrKZawDKw&playsinline=1&disablekb=1&modestbranding=1&iv_load_policy=3"
          allow="autoplay; encrypted-media"
          title={t.videoTitle}
        />
      </div>
      <div className={styles.videoOverlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <SectionHeader
              eyebrow={t.eyebrow}
              eyebrowColor="#93e279"
              title={t.title}
              titleColor="#ffffff"
              lead={t.lead}
              leadColor="rgba(203,213,225,0.9)"
            />
          </div>
        </div>

        <div className={styles.bentoGrid}>
          {places.map((place, i) => (
            <button
              key={place.area}
              className={`${styles.cell} ${styles[`cell_${place.area}`]}`}
              onClick={() => setActiveIndex(i)}
              aria-label={t.ariaPlace(place.name)}
              data-track-name="abrir_lugar_turismo_home"
            >
              <img src={place.src} alt={place.name} className={styles.cellImage} loading="lazy" />
              <div className={styles.cellOverlay}>
                <span className={styles.cellDistrict}>{place.district}</span>
                <p className={styles.cellName}>{place.name}</p>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.mpCallout}>
          <div className={styles.mpImageWrap}>
            <img
              src="/images/tourism/macchu-picchu.jpg"
              alt={t.imageMachuPicchuAlt}
              className={styles.mpImage}
              loading="lazy"
            />
          </div>
          <div className={styles.mpContent}>
            <span className={styles.mpBadge}>
              <MapPin size={11} />
              {t.mpBadge}
            </span>
            <h3 className={styles.mpTitle}>{t.mpTitle}</h3>
            <p className={styles.mpDesc}>{t.mpDesc}</p>
            <a
              href="https://www.peru.travel/es/atractivos/machu-picchu"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mpLink}
              data-track-name="ver_machu_picchu_turismo"
              data-track-destination="peru_travel"
            >
              {t.mpLink}
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.modal}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              className={styles.modalCard}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalImageWrap}>
                <img src={active.src} alt={active.name} className={styles.modalImage} />
              </div>

              <div className={styles.modalInfo}>
                <div>
                  <span className={styles.modalDistrict}>{active.district}</span>
                  <h3 className={styles.modalTitle}>{active.name}</h3>
                  <p className={styles.modalDesc}>{active.desc}</p>
                </div>

                <div className={styles.modalDivider} />

                <div>
                  <p className={styles.modalSectionLabel}>{t.howToArrive}</p>
                  <div className={styles.transportList}>
                    {active.transport.map((t, i) => {
                      const cfg = transportConfig[t.type as TransportType]
                      const Inner = (
                        <>
                          <div className={styles.transportIcon} style={{ '--t-bg': cfg.bg } as CSSProperties}>
                            <cfg.Icon size={15} className={cfg.iconClass} />
                          </div>
                          <div>
                            <p className={styles.transportName}>{t.name}</p>
                            <p className={styles.transportStop}>{t.stop}</p>
                          </div>
                        </>
                      )

                      return t.url ? (
                        <a key={i} href={t.url} target="_blank" rel="noopener noreferrer" className={styles.transportItem}>
                          {Inner}
                        </a>
                      ) : (
                        <div key={i} className={styles.transportItem}>
                          {Inner}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <button onClick={() => setActiveIndex(null)} className={styles.closeButton} aria-label={t.ariaClose}>
                <X size={20} />
              </button>

              <button
                onClick={() => setActiveIndex((p) => (p! > 0 ? p! - 1 : places.length - 1))}
                className={`${styles.navButton} ${styles.prevButton}`}
                aria-label={t.ariaPrev}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => setActiveIndex((p) => (p! < places.length - 1 ? p! + 1 : 0))}
                className={`${styles.navButton} ${styles.nextButton}`}
                aria-label={t.ariaNext}
              >
                <ChevronRight size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
