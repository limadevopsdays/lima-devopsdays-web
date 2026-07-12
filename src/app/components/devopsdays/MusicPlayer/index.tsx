'use client'
import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, ChevronDown, ChevronUp, X, SkipBack, SkipForward } from 'lucide-react'
import styles from './index.module.css'

const PLAYLIST = [
  {
    title: 'The DevOpssion',
    subtitle: 'DOD Lima',
    src: '/music/devopsdayslima_theme.mp3'
  },
  {
    title: 'The DevOpssion Instrumental',
    subtitle: 'DOD Lima',
    src: '/music/devopsdayslima_soundtrack.mp3'
  }
]

const Marquee = 'marquee' as any

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [minimized, setMinimized] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [videoVolume, setVideoVolume] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  /* sync volume with dynamic video ducking */
  useEffect(() => {
    if (audioRef.current) {
      // Duck the background music proportionally as the video volume increases (max video volume is 50)
      const effectiveVolume = volume * (1 - videoVolume / 50)
      audioRef.current.volume = effectiveVolume
      audioRef.current.muted = muted
    }
  }, [volume, muted, videoVolume, currentTrackIndex])

  /* listen to video volume events for dynamic audio ducking */
  useEffect(() => {
    const handleVideoVolume = (e: Event) => {
      const customEvent = e as CustomEvent<{ volume: number }>
      if (customEvent.detail && typeof customEvent.detail.volume === 'number') {
        setVideoVolume(customEvent.detail.volume)
      }
    }
    window.addEventListener('devopsdays:video-volume', handleVideoVolume)
    return () => window.removeEventListener('devopsdays:video-volume', handleVideoVolume)
  }, [])

  /* autoplay when the promo banner is dismissed */
  useEffect(() => {
    let interactionListenersActive = false;

    const playAudio = () => {
      const audio = audioRef.current
      if (!audio || playing) return

      audio.play()
        .then(() => {
          setPlaying(true)
          cleanupGestureListeners()
        })
        .catch(() => {
          // Autoplay blocked by browser policy (no user interaction yet).
          // Register gesture listeners to trigger play on first interaction.
          setupGestureListeners()
        })
    }

    const handleGesture = () => {
      playAudio()
    }

    const setupGestureListeners = () => {
      if (interactionListenersActive) return
      interactionListenersActive = true
      window.addEventListener('click', handleGesture, { once: true })
      window.addEventListener('keydown', handleGesture, { once: true })
      window.addEventListener('touchstart', handleGesture, { once: true })
      window.addEventListener('mousedown', handleGesture, { once: true })
    }

    const cleanupGestureListeners = () => {
      if (!interactionListenersActive) return
      interactionListenersActive = false
      window.removeEventListener('click', handleGesture)
      window.removeEventListener('keydown', handleGesture)
      window.removeEventListener('touchstart', handleGesture)
      window.removeEventListener('mousedown', handleGesture)
    }

    const handleBannerClose = () => {
      playAudio()
    }

    window.addEventListener('devopsdays:banner-closed', handleBannerClose)

    return () => {
      window.removeEventListener('devopsdays:banner-closed', handleBannerClose)
      cleanupGestureListeners()
    }
  }, [playing])

  /* handle track change */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.load()
    if (playing) {
      audio.play().catch((err) => {
        console.error('Error starting playback after track change:', err)
      })
    }
  }, [currentTrackIndex])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length)
  }

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length)
  }

  const handleEnded = () => {
    handleNext()
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setProgress(audio.currentTime)
    setDuration(audio.duration || 0)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Number(e.target.value)
    setProgress(Number(e.target.value))
  }

  const fmt = (s: number) => {
    if (!isFinite(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div
      className={`${styles.player} ${minimized ? styles.minimized : ''}`}
      onClick={minimized ? () => setMinimized(false) : undefined}
      style={{ cursor: minimized ? 'pointer' : 'default' }}
      title={minimized ? 'Expandir reproductor' : undefined}
    >
      <audio
        ref={audioRef}
        src={PLAYLIST[currentTrackIndex].src}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Floating small-scale local preview popup */}
      {showLightbox && !minimized && (
        <div className={styles.albumPreviewPopup} onClick={(e) => e.stopPropagation()}>
          <button 
            className={styles.previewCloseBtn} 
            onClick={() => setShowLightbox(false)}
            aria-label="Cerrar vista previa"
            title="Cerrar"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
          <img 
            src="/images/brand/album.jpg" 
            alt="The DevOpssion Album Art - Vista previa" 
            className={styles.previewImage}
          />
        </div>
      )}

      {/* Album art — click to open zoom lightbox */}
      <div 
        className={styles.albumArtContainer}
        onClick={(e) => {
          if (!minimized) {
            e.stopPropagation()
            setShowLightbox(!showLightbox)
          }
        }}
        title={!minimized ? 'Ampliar carátula' : undefined}
      >
        <img
          src="/images/brand/album.jpg"
          alt="The DevOpssion Album Art"
          className={`${styles.albumArt} ${playing ? styles.albumArtPlaying : ''}`}
        />
        {!minimized && (
          <div className={styles.albumArtHoverOverlay}>
            <span className={styles.zoomText}>🔍</span>
          </div>
        )}
      </div>

      {/* Track info — right of album art */}
      {!minimized && (
        <div className={styles.trackInfo}>
          <div className={styles.title}>
            {PLAYLIST[currentTrackIndex].title.length > 16 ? (
              <Marquee behavior="scroll" direction="left" scrollamount="2" scrolldelay="85">
                {PLAYLIST[currentTrackIndex].title}
              </Marquee>
            ) : (
              PLAYLIST[currentTrackIndex].title
            )}
          </div>
          <div className={styles.subtitle}>{PLAYLIST[currentTrackIndex].subtitle}</div>
        </div>
      )}

      {minimized ? (
        /* Minimized: click to expand */
        <div className={styles.minimizeBtn}>
          <span className={styles.minimizeLabel}>{PLAYLIST[currentTrackIndex].title}</span>
          <ChevronUp size={16} strokeWidth={2.5} className={styles.expandIcon} />
        </div>
      ) : (
        <div className={styles.controls}>
          {/* Middle Section: Centered playback controls and Seek bar */}
          <div className={styles.middleSection}>
            <div className={styles.playbackButtons}>
              <button
                className={styles.navBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                aria-label="Canción anterior"
                title="Anterior"
              >
                <SkipBack size={16} fill="currentColor" strokeWidth={2} />
              </button>

              <button
                className={styles.playBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  toggle()
                }}
                aria-label={playing ? 'Pausar' : 'Reproducir'}
              >
                {playing
                  ? <Pause size={18} fill="currentColor" strokeWidth={2.5} />
                  : <Play size={18} fill="currentColor" strokeWidth={2.5} />}
              </button>

              <button
                className={styles.navBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                aria-label="Siguiente canción"
                title="Siguiente"
              >
                <SkipForward size={16} fill="currentColor" strokeWidth={2} />
              </button>
            </div>

            <div className={styles.seekRow} onClick={(e) => e.stopPropagation()}>
              <span className={styles.time}>{fmt(progress)}</span>
              <input
                type="range"
                className={styles.seek}
                min={0}
                max={duration || 100}
                step={0.1}
                value={progress}
                onChange={handleSeek}
                aria-label="Progreso de la canción"
                style={{
                  background: `linear-gradient(to right, #ffffff ${(progress / (duration || 100)) * 100}%, #3a3a3a ${(progress / (duration || 100)) * 100}%)`
                }}
              />
              <span className={styles.time}>{fmt(duration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className={styles.volGroup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.volPopup}>
              {showVolume && (
                <div className={styles.volSliderWrap}>
                  <input
                    type="range"
                    className={styles.volSlider}
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value))
                      if (muted) setMuted(false)
                    }}
                    aria-label="Volumen"
                    style={{
                      background: `linear-gradient(to top, #ffffff ${(muted ? 0 : volume) * 100}%, #3a3a3a ${(muted ? 0 : volume) * 100}%)`
                    }}
                  />
                </div>
              )}
              <button
                className={styles.volBtn}
                onClick={() => setShowVolume(!showVolume)}
                onBlur={() => setTimeout(() => setShowVolume(false), 150)}
                aria-label={showVolume ? 'Cerrar volumen' : 'Abrir volumen'}
              >
                {muted || volume === 0 ? <VolumeX size={16} strokeWidth={2.5} /> : <Volume2 size={16} strokeWidth={2.5} />}
              </button>
            </div>
          </div>

          {/* Minimize */}
          <button
            className={styles.minimizeBtn}
            onClick={(e) => {
              e.stopPropagation()
              setMinimized(true)
            }}
            aria-label="Minimizar reproductor"
            title="Minimizar"
          >
            <ChevronDown size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  )
}
