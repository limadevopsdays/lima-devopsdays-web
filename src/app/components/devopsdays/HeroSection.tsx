import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import styles from './HeroSection.module.css'

// Imágenes para Grid 2x2 - DevOpsDays Lima REALES
const galleryImages = [
  {
    src: '/images/hero/hero%201.jpg',
    alt: 'Comunidad DevOpsDays Lima 2025 reunida con letras LIMA - Primera edición',
    overlayClass: styles.overlayPurple
  },
  {
    src: '/images/hero/hero%202.jpg',
    alt: 'Presentación keynote en auditorio DevOpsDays Lima con speaker en escenario principal',
    overlayClass: styles.overlayCyan
  },
  {
    src: '/images/hero/hero%203.jpg',
    alt: 'Speaker presentando en DevOpsDays Lima con audiencia tech profesional',
    overlayClass: styles.overlayGreen
  },
  {
    src: '/images/hero/hero%204.jpg',
    alt: 'Audiencia DevOpsDays Lima enfocada en charla técnica sobre DevOps',
    overlayClass: styles.overlayOrange
  }
]

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      id="hero"
      className={styles.hero}
      aria-label="Hero DevOpsDays Lima 2026"
    >
      <div className={styles.videoLayer} aria-hidden="true">
        <video
          className={styles.videoBackground}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/hero/hummingbird.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoFade} />
      </div>

      {/* Background decoration - HÍBRIDO DIAGONAL + DOTS */}
      <div className={styles.bgDecoration}>
        <div className={styles.diagonalLines} />
        <div className={styles.diagonalLinesInverse} />
        <div className={styles.dots} />
        <div className={styles.dotsSecondary} />
        <div className={styles.glowBlobTop} />
        <div className={styles.glowBlobBottom} />
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        
        {/* Left: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className={styles.content}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>
              Lima, Perú · 27–28 ago 2026
            </span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.titlePrimary}>DevOpsDays</span>
            <br />
            <span className={styles.titleAccent}>Lima 2026</span>
          </h1>

          <p className={styles.description}>
            El punto de encuentro para Ingenieros de Software, Arquitectos, Líderes Técnicos, Ingenieros DevOps, Ingenieros de seguridad, CTOs y CIOs. Conecta con la comunidad, aprende de casos reales y acelera decisiones que impactan negocio y plataforma.
          </p>

          <div className={styles.metaInfo}>
            <div className={styles.metaBadge}>
              <Calendar className={styles.iconPurple} />
              27 – 28 de agosto, 2026
            </div>
            <div className={styles.metaBadge}>
              <MapPin className={styles.iconOrange} />
              Lima Centro de Convenciones (LCC)
            </div>
          </div>

          <div className={styles.ctaButtons}>
            <Link
              to="/tickets"
              className={`${styles.ctaButton} ${styles.ctaPrimary}`}
              data-track-name="comprar_tickets_hero_home"
            >
              Comprar Tickets
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/speakers"
              className={`${styles.ctaButton} ${styles.ctaSecondary}`}
              data-track-name="call_for_speakers_hero_home"
            >
              Call for Speakers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Right: GRID 2x2 */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={styles.gallery}
        >
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              className={styles.galleryItem}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.galleryImage}
                loading="lazy"
              />
              <div className={`${styles.galleryOverlay} ${image.overlayClass}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
