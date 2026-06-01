import { useEffect, useState, useRef, type CSSProperties, type ImgHTMLAttributes } from 'react'
import type smartcrop from 'smartcrop'

type SmartCropImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  cropWidth: number
  cropHeight: number
  fallbackPosition?: string
}

const LOCAL_STORAGE_KEY = 'lima_devopsdays_crop_cache_v1'

// Persistent localStorage-backed cache to completely bypass dynamic smartcrop processing
// on subsequent visits and page transitions!
let cropCache: Record<string, string> = {}
try {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      cropCache = JSON.parse(stored)
    }
  }
} catch (e) {
  console.warn('Failed to load smartcrop cache from localStorage:', e)
}

function saveCropToCache(key: string, value: string) {
  cropCache[key] = value
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cropCache))
    }
  } catch (e) {
    console.warn('Failed to save smartcrop cache to localStorage:', e)
  }
}

function normalizeObjectPosition(x: number, y: number) {
  const safeX = Math.min(100, Math.max(0, x))
  const safeY = Math.min(100, Math.max(0, y))
  return `${safeX}% ${safeY}%`
}

function useSmartCropPosition(
  src: string | undefined,
  cropWidth: number,
  cropHeight: number,
  fallbackPosition: string,
  elementRef: React.RefObject<HTMLImageElement | null>
) {
  const cacheKey = src ? `${src}:${cropWidth}x${cropHeight}` : ''
  const cachedVal = cacheKey ? cropCache[cacheKey] : null

  const [objectPosition, setObjectPosition] = useState(cachedVal || fallbackPosition)

  useEffect(() => {
    if (!src || typeof window === 'undefined') {
      setObjectPosition(fallbackPosition)
      return
    }

    // If already computed and stored in localStorage cache, apply immediately and do nothing else!
    if (cachedVal) {
      setObjectPosition(cachedVal)
      return
    }

    let cancelled = false
    let observer: IntersectionObserver | null = null
    let idleId: number | null = null
    let timeoutId: any = null

    const runSmartCrop = () => {
      const image = new window.Image()
      image.decoding = 'async'
      image.src = src

      image.onload = async () => {
        if (cancelled) return
        try {
          // Dynamic import: completely removes smartcrop-js from the initial critical JS bundle chunks!
          const smartcropModule = await import('smartcrop')
          const sc = (smartcropModule.default || smartcropModule) as typeof smartcrop

          const result = await sc.crop(image, {
            width: cropWidth,
            height: cropHeight,
          })

          const topCrop = result?.topCrop
          if (cancelled || !topCrop) {
            return
          }

          const centerX = ((topCrop.x + topCrop.width / 2) / image.naturalWidth) * 100
          const centerY = ((topCrop.y + topCrop.height / 2) / image.naturalHeight) * 100
          const nextPosition = normalizeObjectPosition(centerX, centerY)

          saveCropToCache(cacheKey, nextPosition)
          setObjectPosition(nextPosition)
        } catch {
          if (!cancelled) {
            setObjectPosition(fallbackPosition)
          }
        }
      }

      image.onerror = () => {
        if (!cancelled) {
          setObjectPosition(fallbackPosition)
        }
      }
    }

    const scheduleSmartCrop = () => {
      // Defer dynamic calculations during idle browser time to keep page load/animations completely smooth
      if ('requestIdleCallback' in window) {
        idleId = (window as any).requestIdleCallback(
          () => {
            if (!cancelled) {
              runSmartCrop()
            }
          },
          { timeout: 2000 }
        )
      } else {
        timeoutId = setTimeout(() => {
          if (!cancelled) {
            runSmartCrop()
          }
        }, 300)
      }
    }

    // IntersectionObserver: Only calculate smartcrops for images that are in or near the viewport!
    if (elementRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            scheduleSmartCrop()
            if (observer) {
              observer.disconnect()
              observer = null
            }
          }
        },
        {
          rootMargin: '200px', // Start preparing smart crop when image is within 200px of scrolling into view
        }
      )
      observer.observe(elementRef.current)
    } else {
      scheduleSmartCrop()
    }

    return () => {
      cancelled = true
      if (observer) {
        observer.disconnect()
      }
      if (idleId !== null && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId)
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
    }
  }, [cropHeight, cropWidth, fallbackPosition, src, cachedVal, cacheKey])

  return objectPosition
}

export function SmartCropImage({
  cropWidth,
  cropHeight,
  fallbackPosition = '50% 50%',
  style,
  src,
  ...props
}: SmartCropImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const objectPosition = useSmartCropPosition(src, cropWidth, cropHeight, fallbackPosition, imgRef)

  return (
    <img
      ref={imgRef}
      {...props}
      src={src}
      style={{
        transition: 'object-position 0.4s cubic-bezier(0.16, 1, 0.3, 1)', // Smooth micro-animation for crop adjustment
        ...style as CSSProperties,
        objectPosition,
      }}
    />
  )
}
