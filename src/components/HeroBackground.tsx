import { useEffect, useRef } from 'react'

function parseRgbTriplet(value: string) {
  const parts = value
    .split(',')
    .map((p) => Number.parseInt(p.trim(), 10))
    .filter((n) => Number.isFinite(n))
  if (parts.length !== 3) return null
  return { r: parts[0]!, g: parts[1]!, b: parts[2]! }
}

function rgba(rgb: { r: number; g: number; b: number }, a: number) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

type Spark = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  ttl: number
  size: number
  colorA: { r: number; g: number; b: number }
  colorB: { r: number; g: number; b: number }
}

export function HeroBackground({ height = '100vh' }: { height?: number | string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastFrameMsRef = useRef<number | null>(null)
  const sparksRef = useRef<Spark[]>([])
  const lastSparkRef = useRef(0)
  const hoverRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function readPalette() {
      const styles = getComputedStyle(document.documentElement)
      const a = parseRgbTriplet(styles.getPropertyValue('--site-accent-rgb'))
      const b = parseRgbTriplet(styles.getPropertyValue('--site-accent-2-rgb'))
      return {
        a: a ?? { r: 24, g: 184, b: 208 },
        b: b ?? { r: 128, g: 72, b: 176 },
      }
    }

    let reduced = prefersReducedMotion()
    const reducedMql = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const onReducedChange = () => {
      reduced = prefersReducedMotion()
      if (reduced) {
        sparksRef.current = []
        drawFrame(0)
      }
    }
    reducedMql?.addEventListener?.('change', onReducedChange)

    let palette = readPalette()
    const observer = new MutationObserver(() => {
      palette = readPalette()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = Math.max(1, canvas.clientWidth)
      const h = Math.max(1, canvas.clientHeight)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawnSparks = (clientX: number, clientY: number) => {
      if (reduced) return
      const now = performance.now()
      if (now - lastSparkRef.current < 14) return
      lastSparkRef.current = now

      const rect = canvas.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return
      const x = clientX - rect.left
      const y = clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return

      const count = 3 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2
        const speed = 160 + Math.random() * 220
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 60,
          life: 0,
          ttl: 260 + Math.random() * 320,
          size: 0.9 + Math.random() * 1.8,
          colorA: palette.a,
          colorB: palette.b,
        })
      }

      if (sparksRef.current.length > 220) {
        sparksRef.current.splice(0, sparksRef.current.length - 220)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const inRect =
        rect.width > 0 &&
        rect.height > 0 &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      hoverRef.current = inRect
      if (inRect) spawnSparks(event.clientX, event.clientY)
    }

    const onPointerLeave = () => {
      hoverRef.current = false
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', onPointerLeave)

    const drawFrame = (timeMs: number) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return

      const last = lastFrameMsRef.current
      const dtMs = last === null ? 16 : Math.max(8, Math.min(40, timeMs - last))
      lastFrameMsRef.current = timeMs

      ctx.clearRect(0, 0, w, h)
      if (reduced) return

      const isLight = document.documentElement.dataset.theme === 'light'

      const gravity = 620
      const drag = 0.985
      for (let i = sparksRef.current.length - 1; i >= 0; i -= 1) {
        const s = sparksRef.current[i]!
        s.life += dtMs
        if (s.life >= s.ttl) {
          sparksRef.current.splice(i, 1)
          continue
        }

        const time = dtMs / 1000
        s.vx *= drag
        s.vy = s.vy * drag + gravity * time
        s.x += s.vx * time
        s.y += s.vy * time
      }

      ctx.globalCompositeOperation = isLight ? 'multiply' : 'lighter'
      for (const s of sparksRef.current) {
        const p = 1 - s.life / s.ttl
        const alpha = Math.max(0, Math.min(1, p)) * (isLight ? 0.95 : 0.7)
        const mix = (Math.sin((s.life / s.ttl) * Math.PI) + 1) * 0.5
        const rgb = {
          r: Math.round(s.colorA.r * (1 - mix) + s.colorB.r * mix),
          g: Math.round(s.colorA.g * (1 - mix) + s.colorB.g * mix),
          b: Math.round(s.colorA.b * (1 - mix) + s.colorB.b * mix),
        }

        const tail = 0.018
        ctx.strokeStyle = rgba(rgb, alpha)
        ctx.lineWidth = Math.max(1, s.size) * (isLight ? 1.25 : 1)
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.vx * tail, s.y - s.vy * tail)
        ctx.stroke()

        ctx.fillStyle = rgba(rgb, alpha * 0.75)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * 0.9, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const frame = (timeMs: number) => {
      drawFrame(timeMs)
      if (reduced) return
      rafRef.current = window.requestAnimationFrame(frame)
    }

    const onResize = () => {
      resize()
      drawFrame(0)
    }

    resize()
    drawFrame(0)
    lastFrameMsRef.current = null
    rafRef.current = window.requestAnimationFrame(frame)
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', onPointerLeave)
      window.removeEventListener('resize', onResize)
      reducedMql?.removeEventListener?.('change', onReducedChange)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="heroSparks" aria-hidden="true" style={{ height }}>
      <canvas ref={canvasRef} className="heroSparks__canvas" />
    </div>
  )
}
