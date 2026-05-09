import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { MdTrain, MdDirectionsBus } from 'react-icons/md'
import { FaCar, FaWalking } from 'react-icons/fa'
import { motion, AnimatePresence } from 'motion/react'
import { SectionHeader } from './SectionHeader'
import styles from './TurismSection.module.css'

type TransportType = 'metro' | 'bus' | 'taxi' | 'walk'

interface TransportItem {
  type: TransportType
  name: string
  stop: string
  url?: string
}

interface Place {
  src: string
  name: string
  desc: string
  district: string
  area: string
  transport: TransportItem[]
}

const places: Place[] = [
  {
    src: '/images/turism/plaza-de-armas.jpg',
    name: 'Plaza de Armas',
    desc: 'El corazón histórico de Lima, rodeado de edificios coloniales y la Catedral de Lima.',
    district: 'Cercado de Lima',
    area: 'hero',
    transport: [
      { type: 'metro', name: 'Línea 1 del Metro', stop: 'Estación Grau · 10 min caminando' },
      { type: 'bus', name: 'Metropolitano', stop: 'Estación Jr. de la Unión', url: 'https://www.metropolitano.com.pe/' },
      { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 20 (~$5) desde Miraflores' },
    ],
  },
  {
    src: '/images/turism/barranco.jpg',
    name: 'Barranco',
    desc: 'El barrio bohemio de Lima, lleno de arte, música, restaurantes y el icónico Puente de los Suspiros.',
    district: 'Barranco',
    area: 'barranco',
    transport: [
      { type: 'bus', name: 'Metropolitano', stop: 'Estación Bulevar Barranco', url: 'https://www.metropolitano.com.pe/' },
      { type: 'bus', name: 'Bus', stop: 'Líneas 36 y 38 por Av. Grau' },
      { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 12 (~$3) desde Miraflores' },
    ],
  },
  {
    src: '/images/turism/larcomar.jpeg',
    name: 'Larcomar',
    desc: 'Centro comercial y de entretenimiento construido sobre el acantilado de Miraflores con vista al Pacífico.',
    district: 'Miraflores',
    area: 'larcomar',
    transport: [
      { type: 'bus', name: 'Metropolitano', stop: 'Estación Ricardo Palma · 5 min caminando', url: 'https://www.metropolitano.com.pe/' },
      { type: 'walk', name: 'A pie', stop: '20 min desde Óvalo Miraflores por el malecón' },
      { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 10 (~$3) desde Miraflores' },
    ],
  },
  {
    src: '/images/turism/barrio-chino.jpeg',
    name: 'Barrio Chino',
    desc: 'El barrio chino más grande de Sudamérica. La calle Capón es famosa por sus restaurantes chifa y tiendas asiáticas.',
    district: 'Cercado de Lima',
    area: 'chinatown',
    transport: [
      { type: 'metro', name: 'Línea 1 del Metro', stop: 'Estación Grau · 5 min caminando' },
      { type: 'bus', name: 'Metropolitano', stop: 'Estación Jr. de la Unión', url: 'https://www.metropolitano.com.pe/' },
      { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 20 (~$5) desde Miraflores' },
    ],
  },
  {
    src: '/images/turism/parque-del-amor.png',
    name: 'Parque del Amor',
    desc: 'Parque a orillas del acantilado de Miraflores con esculturas, mosaicos coloridos y vistas al Océano Pacífico.',
    district: 'Miraflores',
    area: 'amor',
    transport: [
      { type: 'bus', name: 'Metropolitano', stop: 'Estación Óvalo Miraflores · 10 min caminando', url: 'https://www.metropolitano.com.pe/' },
      { type: 'walk', name: 'A pie', stop: '5 min desde Larcomar por el malecón' },
      { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 8 (~$2) desde Miraflores' },
    ],
  },
  {
    src: '/images/turism/paque-de-las-aguas-2.webp',
    name: 'Parque de las Aguas',
    desc: 'El complejo de fuentes más grande del mundo según el Guinness. Espectáculo nocturno de luces y agua.',
    district: 'Cercado de Lima',
    area: 'aguas',
    transport: [
      { type: 'bus', name: 'Metropolitano', stop: 'Estación 28 de Julio · 10 min caminando', url: 'https://www.metropolitano.com.pe/' },
      { type: 'bus', name: 'Bus', stop: 'Av. Brasil, varias líneas' },
      { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 12 (~$3) desde Miraflores' },
    ],
  },
  {
    src: '/images/turism/plaza-de-armas-2.jpg',
    name: 'Centro Histórico',
    desc: 'Patrimonio de la Humanidad UNESCO. Iglesias barrocas, conventos coloniales y la arquitectura virreinal mejor conservada de América.',
    district: 'Cercado de Lima',
    area: 'centro',
    transport: [
      { type: 'metro', name: 'Línea 1 del Metro', stop: 'Estaciones Grau o Colmena' },
      { type: 'bus', name: 'Metropolitano', stop: 'Múltiples paradas en el centro', url: 'https://www.metropolitano.com.pe/' },
      { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 20 (~$5) desde Miraflores' },
    ],
  },
]

const transportConfig: Record<TransportType, { bg: string; iconClass: string; Icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  metro:  { bg: '#e0f2fe', iconClass: styles.iconMetro, Icon: MdTrain },
  bus:    { bg: '#fff7ed', iconClass: styles.iconBus,   Icon: MdDirectionsBus },
  taxi:   { bg: '#f3e8ff', iconClass: styles.iconTaxi,  Icon: FaCar },
  walk:   { bg: '#f0fdf4', iconClass: styles.iconWalk,  Icon: FaWalking },
}

export function TurismSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
      else if (e.key === 'ArrowLeft') setActiveIndex((p) => (p! > 0 ? p! - 1 : places.length - 1))
      else if (e.key === 'ArrowRight') setActiveIndex((p) => (p! < places.length - 1 ? p! + 1 : 0))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  const active = activeIndex !== null ? places[activeIndex] : null

  return (
    <section id="turismo" className={styles.section}>
      {/* Video background */}
      <div className={styles.videoBg} aria-hidden="true">
        <iframe
          className={styles.videoIframe}
          src="https://www.youtube.com/embed/ZyHrKZawDKw?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=ZyHrKZawDKw&playsinline=1&disablekb=1&modestbranding=1&iv_load_policy=3"
          allow="autoplay; encrypted-media"
          title="Video de fondo - Marca Perú"
        />
      </div>
      <div className={styles.videoOverlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <SectionHeader
              eyebrow="Turismo"
              eyebrowColor="#93e279"
              title="Descubre Lima"
              titleColor="#ffffff"
              lead="Más allá del evento, Lima te espera. Historia milenaria, gastronomía de clase mundial y barrios vibrantes frente al Pacífico."
              leadColor="rgba(203,213,225,0.9)"
            />
          </div>
        </div>

        {/* Bento grid */}
        <div className={styles.bentoGrid}>
          {places.map((place, i) => (
            <button
              key={place.area}
              className={`${styles.cell} ${styles[`cell_${place.area}`]}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Ver información de ${place.name}`}
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

        {/* Machu Picchu callout */}
        <div className={styles.mpCallout}>
          <div className={styles.mpImageWrap}>
            <img
              src="/images/turism/macchu-picchu.jpg"
              alt="Machu Picchu"
              className={styles.mpImage}
              loading="lazy"
            />
          </div>
          <div className={styles.mpContent}>
            <span className={styles.mpBadge}>
              <MapPin size={11} />
              Cusco · A 1h 20min en avión desde Lima
            </span>
            <h3 className={styles.mpTitle}>Machu Picchu</h3>
            <p className={styles.mpDesc}>
              Aprovecha tu viaje a Perú y visita la ciudadela inca más famosa del mundo. Una de las 7 maravillas del mundo moderno que no puedes dejar de ver.
            </p>
            <a
              href="https://www.peru.travel/es/atractivos/machu-picchu"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mpLink}
              data-track-name="ver_machu_picchu_turismo"
              data-track-destination="peru_travel"
            >
              Planifica tu visita →
            </a>
          </div>
        </div>
      </div>

      {/* Detail modal */}
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
              {/* Photo */}
              <div className={styles.modalImageWrap}>
                <img src={active.src} alt={active.name} className={styles.modalImage} />
              </div>

              {/* Info panel */}
              <div className={styles.modalInfo}>
                <div>
                  <span className={styles.modalDistrict}>{active.district}</span>
                  <h3 className={styles.modalTitle}>{active.name}</h3>
                  <p className={styles.modalDesc}>{active.desc}</p>
                </div>

                <div className={styles.modalDivider} />

                <div>
                  <p className={styles.modalSectionLabel}>Cómo llegar</p>
                  <div className={styles.transportList}>
                    {active.transport.map((t, i) => {
                      const cfg = transportConfig[t.type]
                      const Inner = (
                        <>
                          <div className={styles.transportIcon} style={{ '--t-bg': cfg.bg } as React.CSSProperties}>
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

              {/* Close */}
              <button
                onClick={() => setActiveIndex(null)}
                className={styles.closeButton}
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              {/* Nav arrows */}
              <button
                onClick={() => setActiveIndex((p) => (p! > 0 ? p! - 1 : places.length - 1))}
                className={`${styles.navButton} ${styles.prevButton}`}
                aria-label="Anterior"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => setActiveIndex((p) => (p! < places.length - 1 ? p! + 1 : 0))}
                className={`${styles.navButton} ${styles.nextButton}`}
                aria-label="Siguiente"
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
