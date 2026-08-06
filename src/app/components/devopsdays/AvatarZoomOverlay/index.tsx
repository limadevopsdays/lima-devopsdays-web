import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from '../SpeakersSection/index.module.css'

interface AvatarZoomOverlayProps {
  src: string | null
  name: string
  initials: string
  gradientColor?: string
  onClose: () => void
}

// Elemento raíz dedicado que vive fuera de cualquier árbol con transform
function getZoomRoot(): HTMLElement {
  let root = document.getElementById('avatar-zoom-root')
  if (!root) {
    root = document.createElement('div')
    root.id = 'avatar-zoom-root'
    // Estilos inline directos — no dependen de CSS modules ni de cascade
    Object.assign(root.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '99999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // Fondo con blur
      background: 'rgba(10, 10, 20, 0.55)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      // Animación fade
      opacity: '0',
      transition: 'opacity 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
      cursor: 'zoom-out',
    })
    document.body.appendChild(root)
    // Trigger fade-in en siguiente frame
    requestAnimationFrame(() => {
      root!.style.opacity = '1'
    })
  }
  return root
}

export function AvatarZoomOverlay({
  src,
  name,
  initials,
  gradientColor = '#6B51EF',
  onClose,
}: AvatarZoomOverlayProps) {
  const rootRef = useRef<HTMLElement | null>(null)

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    // Crear el root dedicado
    rootRef.current = getZoomRoot()

    document.addEventListener('keydown', handleKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const root = rootRef.current
    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === root) onClose()
    }
    root.addEventListener('click', handleBackdropClick)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prev
      root.removeEventListener('click', handleBackdropClick)
      // Fade-out antes de remover
      root.style.opacity = '0'
      setTimeout(() => {
        if (root.parentNode) root.parentNode.removeChild(root)
      }, 220)
    }
  }, [handleKey, onClose])

  if (typeof document === 'undefined') return null

  const root = rootRef.current || getZoomRoot()

  return createPortal(
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
    </div>,
    root
  )
}
