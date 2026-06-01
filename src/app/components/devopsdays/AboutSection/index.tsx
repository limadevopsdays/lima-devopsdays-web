import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import styles from './index.module.css'
import { useI18n } from '../../../i18n'
import { aboutI18n } from './i18n'

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

export function AboutSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isPreviewPaused, setIsPreviewPaused] = useState(false)
  const [isPreviewMuted, setIsPreviewMuted] = useState(false)
  const [isAboutIntersecting, setIsAboutIntersecting] = useState(false)
  const [hasLoadedPreview, setHasLoadedPreview] = useState(false)
  
  const playerContainerRef = useRef<HTMLDivElement | null>(null)
  const previewIframeRef = useRef<HTMLIFrameElement | null>(null)
  const currentVolumeRef = useRef(0)
  const t = useI18n(aboutI18n)

  const postPreviewCommand = (func: string, args: any[] = []) => {
    previewIframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func,
        args,
      }),
      '*',
    )
  }

  // Observe the #about section visibility in the viewport
  useEffect(() => {
    const sectionElement = document.getElementById('about')
    if (!sectionElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAboutIntersecting(entry.isIntersecting)
        // Once the user gets close to the section, lock the loading status to true
        if (entry.isIntersecting) {
          setHasLoadedPreview(true)
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the section is visible
        rootMargin: '200px', // Pre-fetch and compile the YouTube player when it is within 200px of entering viewport
      }
    )

    observer.observe(sectionElement)
    return () => {
      observer.disconnect()
    }
  }, [])

  // Smoothly fade volume between 0 and 100 based on status
  useEffect(() => {
    const targetVolume = (isAboutIntersecting && !isVideoOpen && !isPreviewPaused && !isPreviewMuted) ? 100 : 0

    const interval = setInterval(() => {
      const current = currentVolumeRef.current
      if (current === targetVolume) {
        clearInterval(interval)
        return
      }

      const step = 5
      let nextVolume = current
      if (current < targetVolume) {
        nextVolume = Math.min(current + step, targetVolume)
      } else {
        nextVolume = Math.max(current - step, targetVolume)
      }

      currentVolumeRef.current = nextVolume
      postPreviewCommand('setVolume', [nextVolume])

      // Ensure iframe matches correct muted/unmuted state on transition thresholds
      if (nextVolume > 0 && current === 0) {
        postPreviewCommand('unMute')
      }
      if (nextVolume === 0) {
        postPreviewCommand('mute')
      }
    }, 50) // Smooth update every 50ms (takes 1.0s to fade from 0 to 100)

    return () => {
      clearInterval(interval)
    }
  }, [isAboutIntersecting, isVideoOpen, isPreviewPaused, isPreviewMuted])

  useEffect(() => {
    if (!isVideoOpen || !playerContainerRef.current) return

    let volumeInterval: NodeJS.Timeout | null = null

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
            event.target.setVolume(0)
            event.target.playVideo()

            let currentVolume = 0
            const targetVolume = 35
            volumeInterval = setInterval(() => {
              currentVolume += 2
              if (currentVolume >= targetVolume) {
                event.target.setVolume(targetVolume)
                if (volumeInterval) clearInterval(volumeInterval)
              } else {
                event.target.setVolume(currentVolume)
              }
            }, 100)
          },
        },
      })
    }

    if (window.YT?.Player) {
      initializePlayer()
    } else {
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
    }

    return () => {
      if (volumeInterval) {
        clearInterval(volumeInterval)
      }
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
              <span className={styles.eyebrow}>{t.eyebrow}</span>
            </div>

            {/* Title */}
            <h2 className={styles.title}>
              {t.title.includes('DevOpsDays Lima 2026') ? (
                <>
                  {t.title.split('DevOpsDays Lima 2026')[0]}
                  <span className={styles.logoText}>
                    <span className={styles.logoDevOps}>DevOps</span>
                    <span className={styles.logoDays}>Days Lima 2026</span>
                  </span>
                  {t.title.split('DevOpsDays Lima 2026')[1]}
                </>
              ) : (
                t.title
              )}
            </h2>

            {/* Mission text */}
            <p className={styles.mission}>{t.mission}</p>

            {/* Video preview */}
            <div
              className={styles.videoContainer}
              onClick={() => setIsVideoOpen(true)}
            >
              {hasLoadedPreview ? (
                <>
                  <iframe
                    ref={previewIframeRef}
                    className={styles.videoPreviewIframe}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=${videoId}&playsinline=1&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
                    title={t.videoPreviewTitle}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    tabIndex={-1}
                  />
                  
                  <div className={styles.videoControls}>
                    <button
                      type="button"
                      className={styles.videoControlButton}
                      aria-label={isPreviewPaused ? t.playPreviewLabel : t.pausePreviewLabel}
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
                        <Play className={styles.videoControlIcon} />
                      ) : (
                        <Pause className={styles.videoControlIcon} />
                      )}
                    </button>

                    <button
                      type="button"
                      className={styles.videoControlButton}
                      aria-label={isPreviewMuted ? t.unmutePreviewLabel : t.mutePreviewLabel}
                      onClick={(event) => {
                        event.stopPropagation()
                        if (isPreviewMuted) {
                          postPreviewCommand('unMute')
                        } else {
                          postPreviewCommand('mute')
                        }
                        setIsPreviewMuted((current) => !current)
                      }}
                    >
                      {isPreviewMuted ? (
                        <VolumeX className={styles.videoControlIcon} />
                      ) : (
                        <Volume2 className={styles.videoControlIcon} />
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles.videoPreviewPlaceholder} />
              )}
            </div>

            {/* Storytelling Stats */}
            <div className={styles.statsGrid}>
              {t.stats.map((stat, idx) => {
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
              {t.closeLabel} <X className={styles.closeIcon} />
            </button>

            <div
              ref={playerContainerRef}
              className={styles.modalIframe}
              aria-label={t.videoAriaLabel}
            />
          </div>
        </div>
      )}
    </section>
  )
}
