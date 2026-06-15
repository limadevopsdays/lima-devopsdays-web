import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import styles from './index.module.css'
import { useI18n } from '../../../i18n'
import { aboutI18n } from './i18n'
const galleryImages = [
  '/images/about/about-1.jpg',
  '/images/about/about-2.jpg',
  '/images/about/about-3.jpg',
  '/images/about/about-4.jpg',
]


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
  const [isPreviewMuted, setIsPreviewMuted] = useState(true)
  const [isAboutIntersecting, setIsAboutIntersecting] = useState(false)
  const [hasLoadedPreview, setHasLoadedPreview] = useState(false)
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  
  const playerContainerRef = useRef<HTMLDivElement | null>(null)
  const previewIframeRef = useRef<HTMLIFrameElement | null>(null)
  const currentVolumeRef = useRef(0)
  const t = useI18n(aboutI18n)

  // Listen for user interaction to allow unmuting automatically
  useEffect(() => {
    const handleInteraction = () => {
      setIsPreviewMuted(false)
      cleanup()
    }

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

  // Listen for the YouTube iframe onReady event to know when the API is active
  useEffect(() => {
    if (!hasLoadedPreview) return

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== previewIframeRef.current?.contentWindow) return
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        if (data.event === 'onReady' || data.event === 'initialDelivery') {
          setIsIframeLoaded(true)
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }

    window.addEventListener('message', handleMessage)

    // Fallback: set loaded to true after 1.5 seconds of mounting
    const timer = setTimeout(() => {
      setIsIframeLoaded(true)
    }, 1500)

    return () => {
      window.removeEventListener('message', handleMessage)
      clearTimeout(timer)
    }
  }, [hasLoadedPreview])

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
    if (!isIframeLoaded) return

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
  }, [isAboutIntersecting, isVideoOpen, isPreviewPaused, isPreviewMuted, isIframeLoaded])

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

      {/* Gallery Image Row */}
      <div className={styles.imageRowContainer}>
        <div className={styles.imageRowGrid}>
          {galleryImages.map((image, idx) => (
            <div key={idx} className={styles.imageRowItem}>
              <img
                src={image}
                alt={`DevOpsDays Lima gallery ${idx + 1}`}
                className={styles.imageRowImg}
                loading="lazy"
              />
            </div>
          ))}
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
