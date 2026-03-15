import { Play, X, Users, Calendar, Rocket } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { useState } from 'react'
import styles from './AboutSection.module.css'

// YouTube video thumbnail (preview image)
const videoThumbnail = 'https://img.youtube.com/vi/OOYWupGVhqA/maxresdefault.jpg'
const videoId = 'OOYWupGVhqA'

const bgImageUrl = 'https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvcHMlMjB0ZWFtJTIwd29ya2luZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3MzA4NTE1OHww&ixlib=rb-4.1.0&q=80&w=1080'

const missionText =
  'Nuestra misión en DevOpsDays Lima es impulsar la evolución tecnológica con un evento que conecta a profesionales, fomenta el intercambio de conocimientos DevOps y refuerza una cultura de innovación continua basada en experiencias reales.'

const storytellingStats = [
  { 
    icon: Users, 
    title: 'La comunidad tech más grande de Perú', 
    subtitle: 'Se espera +800 Ingenieros de Software, Arquitectos, Líderes Técnicos, Ingenieros DevOps, Ingenieros de seguridad, CTOs y CIOs',
    color: '#7c3aed'
  },
  { 
    icon: Calendar, 
    title: 'Dos días completos de aprendizaje', 
    subtitle: 'Charlas + Talleres + Open Spaces + Networking',
    color: '#7c3aed'
  },
  { 
    icon: Rocket, 
    title: 'Regresamos en el 2026', 
    subtitle: '2da edición del evento en Lima Centro de Convenciones (LCC)',
    color: '#7c3aed'
  },
]

export function AboutSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Background image */}
          <div 
            className={styles.bgImage}
            style={{ '--bg-image': `url(${bgImageUrl})` } as React.CSSProperties}
          />

          {/* Overlay BLANCO/GRIS MUY CLARO */}
          <div className={styles.bgOverlay} />

          {/* Content */}
          <div className={styles.content}>
            {/* Eyebrow */}
            <div className={styles.eyebrowContainer}>
              <span className={styles.eyebrow}>
                ¡Regresamos este 2026!
              </span>
            </div>

            {/* Title */}
            <h2 className={styles.title}>
              ¿Qué es DevOpsDays Lima?
            </h2>

            {/* Mission text */}
            <p className={styles.mission}>
              {missionText}
            </p>

            {/* Video thumbnail */}
            <div
              className={styles.videoContainer}
              onClick={() => setIsVideoOpen(true)}
            >
              <img
                src={videoThumbnail}
                alt="Vista previa del video resumen de DevOpsDays Lima 2025 - Primera Edición"
                className={styles.videoThumbnail}
                loading="lazy"
              />
              
              {/* Play overlay */}
              <div className={styles.videoOverlay}>
                <div className={styles.playButton}>
                  <Play className={styles.playIcon} fill="#ffffff" />
                </div>
              </div>

              {/* Badge */}
              <div className={styles.videoBadge}>
                🎬 Ver video · 1ra Edición
              </div>
            </div>

            {/* Storytelling Stats */}
            <div className={styles.statsGrid}>
              {storytellingStats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div
                    key={idx}
                    className={styles.statCard}
                    style={{ '--stat-color': stat.color } as React.CSSProperties}
                  >
                    <Icon className={styles.statIcon} />
                    <h3 className={styles.statTitle}>
                      {stat.title}
                    </h3>
                    <p className={styles.statSubtitle}>
                      {stat.subtitle}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Video modal */}
      {isVideoOpen && (
        <div
          className={styles.modal}
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalCloseButton}
              onClick={() => setIsVideoOpen(false)}
            >
              Cerrar <X className={styles.closeIcon} />
            </button>

            <iframe
              className={styles.modalIframe}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="DevOpsDays Lima - Video oficial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
