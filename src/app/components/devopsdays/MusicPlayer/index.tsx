'use client'
import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react'
import styles from './index.module.css'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [minimized, setMinimized] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [videoVolume, setVideoVolume] = useState(0)

  /* sync volume with dynamic video ducking */
  useEffect(() => {
    if (audioRef.current) {
      // Duck the background music proportionally as the video volume increases (max video volume is 50)
      const effectiveVolume = volume * (1 - videoVolume / 50)
      audioRef.current.volume = effectiveVolume
      audioRef.current.muted = muted
    }
  }, [volume, muted, videoVolume])

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
    <div className={`${styles.player} ${minimized ? styles.minimized : ''}`}>
      <audio
        ref={audioRef}
        src="/music/devopsdayslima_theme.mp3"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Album art — always visible */}
      <img
        src="/images/brand/mascota.png"
        alt="DevOpsDays Lima mascota"
        className={`${styles.albumArt} ${playing ? styles.albumArtPlaying : ''}`}
      />

      {/* Track info — right of album art */}
      {!minimized && (
        <div className={styles.trackInfo}>
          <span className={styles.title}>Song Theme</span>
          <span className={styles.subtitle}>DevOpsDays Lima</span>
        </div>
      )}

      {minimized ? (
        /* Minimized: click to expand */
        <button
          className={styles.minimizeBtn}
          onClick={() => setMinimized(false)}
          aria-label="Expandir reproductor"
        >
          <span className={styles.minimizeLabel}>DevOpsDays Lima Theme</span>
        </button>
      ) : (
        <div className={styles.controls}>
          {/* Play / Pause */}
          <button
            className={styles.playBtn}
            onClick={toggle}
            aria-label={playing ? 'Pausar' : 'Reproducir'}
          >
            {playing
              ? <Pause size={18} fill="currentColor" strokeWidth={2.5} />
              : <Play size={18} fill="currentColor" strokeWidth={2.5} />}
          </button>

          {/* Seek bar */}
          <div className={styles.meta}>
            <div className={styles.seekRow}>
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
          <div className={styles.volGroup}>
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
            onClick={() => setMinimized(true)}
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
