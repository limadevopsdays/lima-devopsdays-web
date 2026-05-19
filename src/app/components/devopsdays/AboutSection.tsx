import { Play, X } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import styles from './AboutSection.module.css'

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (event: {
              target: {
                setVolume: (volume: number) => void
                playVideo: () => void
              }
            }) => void
          }
        },
      ) => unknown
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

const videoId = 'OOYWupGVhqA'

const bgImageUrl = 'https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvcHMlMjB0ZWFtJTIwd29ya2luZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3MzA4NTE1OHww&ixlib=rb-4.1.0&q=80&w=1080'

const storytellingStats = [
  { 
    emoji: '🎉',
    title: 'La comunidad más grande de Perú', 
    subtitle: 'Se esperan +800 participantes',
    color: '#6B51EF'
  },
  { 
    emoji: '✨',
    title: 'Dos días completos de aprendizaje', 
    subtitle: 'Charlas + Talleres + Open Spaces + Networking',
    color: '#93e279'
  },
  { 
    emoji: '🥳',
    title: 'Regresamos en el 2026', 
    subtitle: '2da edición del evento en Lima Centro de Convenciones (LCC)',
    color: 'var(--color-blue-additional)'
  },
]

export function AboutSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const playerContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isVideoOpen || !playerContainerRef.current) return

    const initializePlayer = () => {
      if (!window.YT?.Player || !playerContainerRef.current) return

      playerContainerRef.current.innerHTML = '<div id="about-video-player"></div>'

      new window.YT.Player('about-video-player', {
        videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(30)
            event.target.playVideo()
          },
        },
      })
    }

    if (window.YT?.Player) {
      initializePlayer()
      return
    }

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(script)
    }

    const previousHandler = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previousHandler?.()
      initializePlayer()
    }

    return () => {
      window.onYouTubeIframeAPIReady = previousHandler
    }
  }, [isVideoOpen])

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Background image */}
          <div 
            className={styles.bgImage}
            style={{ '--bg-image': `url(${bgImageUrl})` } as CSSProperties}
          />

          {/* Overlay BLANCO/GRIS MUY CLARO */}
          <div className={styles.bgOverlay} />

          {/* Content */}
          <div className={styles.content}>
            {/* Eyebrow */}
            <div className={styles.eyebrowContainer}>
              <span className={styles.eyebrow}>
                ¡Regresamos este 2026! 💪
              </span>
            </div>

            {/* Title */}
            <h2 className={styles.title}>
              ¿Qué es <span className={styles.titleBrandLima}>DevOps</span><span className={styles.titleBrandPurple}>Days Lima</span> <span className={styles.titleBrandYear}>2026</span>?
            </h2>

            {/* Mission text */}
            <p className={styles.mission}>
              Nuestra misión en DevOpsDays Lima es impulsar la evolución tecnológica con un evento
              que conecta a profesionales, fomenta el intercambio de conocimientos DevOps y
              refuerza una cultura de innovación continua basada en experiencias reales.
            </p>

            {/* Video preview */}
            <div
              className={styles.videoContainer}
              onClick={() => setIsVideoOpen(true)}
            >
              <iframe
                className={styles.videoPreviewIframe}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=${videoId}&playsinline=1&modestbranding=1&iv_load_policy=3`}
                title="Vista previa automática del video DevOpsDays Lima"
                allow="autoplay; encrypted-media; picture-in-picture"
                tabIndex={-1}
              />
              
              {/* Play overlay */}
              <div className={styles.videoOverlay}>
                <div className={styles.playButton}>
                  <Play className={styles.playIcon} fill="#ffffff" />
                </div>
              </div>

              {/* Badge */}
              <div className={styles.videoBadge}>
                🎬 Reproduciendo · clic para abrir con audio
              </div>
            </div>

            {/* Storytelling Stats */}
            <div className={styles.statsGrid}>
              {storytellingStats.map((stat, idx) => {
                return (
                  <div
                    key={idx}
                    className={`${styles.statCard} ${idx === 0 ? styles.statCardPrimary : ''} ${idx === 1 ? styles.statCardLima : ''} ${idx === 2 ? styles.statCardBlue : ''}`}
                    style={{ '--stat-color': stat.color } as CSSProperties}
                  >
                    <div className={styles.statHeader}>
                      <div className={styles.statIconWrap}>
                        <span className={styles.statEmoji} aria-hidden="true">
                          {stat.emoji}
                        </span>
                      </div>
                      <h3 className={styles.statTitle}>
                        {stat.title}
                      </h3>
                    </div>
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

            <div
              ref={playerContainerRef}
              className={styles.modalIframe}
              aria-label="DevOpsDays Lima - Video oficial"
            />
          </div>
        </div>
      )}
    </section>
  )
}
