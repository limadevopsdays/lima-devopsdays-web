import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styles from '../SpeakersSection/index.module.css'

interface AvatarZoomOverlayProps {
  src: string | null
  name: string
  initials: string
  gradientColor?: string
  onClose: () => void
}

export function AvatarZoomOverlay({
  src,
  name,
  initials,
  gradientColor = '#6B51EF',
  onClose,
}: AvatarZoomOverlayProps) {
  // Cerrar con Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    // Bloquear scroll del body mientras está abierto
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prev
    }
  }, [handleKey])

  return createPortal(
    <div
      className={styles.avatarZoomBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto de ${name}`}
    >
      <div
        className={styles.avatarZoomBox}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.avatarZoomClose}
          onClick={onClose}
          aria-label="Cerrar"
          type="button"
        >
          ✕
        </button>

        {src ? (
          <img
            src={src}
            alt={name}
            className={styles.avatarZoomImg}
            draggable={false}
          />
        ) : (
          <div
            className={styles.avatarZoomFallback}
            style={{
              background: `linear-gradient(135deg, ${gradientColor} 0%, color-mix(in srgb, ${gradientColor} 55%, white) 100%)`,
            }}
          >
            {initials}
          </div>
        )}

        <div className={styles.avatarZoomName}>{name}</div>
      </div>
    </div>,
    document.body
  )
}
