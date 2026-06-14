import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import { ShoppingBag, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n, useLocale } from '../../../i18n'
import { merchShowcaseI18n } from './i18n'
import type { MerchItem } from '../../../data/merch'
import { MERCH_SHOP_URL } from '../../../data/merch'
import styles from './index.module.css'

type Props = { items: MerchItem[] }

// Extra items rendered on each side so they peek in during drag
const EXTRA = 2

// Gap in rem per visibleCount — must match CSS breakpoints
const GAP_REM: Record<number, number> = { 4: 0.85, 3: 0.65, 2: 0.5 }

function useVisibleCount(): number {
  const [count, setCount] = useState(4)
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      setCount(w < 600 ? 2 : w < 900 ? 3 : 4)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])
  return count
}

const mod = (n: number, m: number) => ((n % m) + m) % m

export function MerchShowcase({ items }: Props) {
  const t = useI18n(merchShowcaseI18n)
  const locale = useLocale()
  const visibleCount = useVisibleCount()
  const [startIdx, setStartIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef<number | null>(null)
  const hasDragged = useRef(false)   // true only after crossing the 6px threshold
  const justDragged = useRef(false)  // blocks the click that follows a drag
  const isAnimating = useRef(false)

  // Returns card width, gap, and step (card + gap) based on current DOM state
  const computeMetrics = useCallback(() => {
    const fallback = { cardW: 200, gapPx: 14, stepW: 214 }
    if (!outerRef.current) return fallback
    const rootFs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    const gapPx = (GAP_REM[visibleCount] ?? 0.85) * rootFs
    const containerW = outerRef.current.offsetWidth
    const cardW = Math.max(60, (containerW - gapPx * (visibleCount - 1)) / visibleCount)
    return { cardW, gapPx, stepW: cardW + gapPx }
  }, [visibleCount])

  // Apply card width CSS var and initial track offset before first paint and on resize
  useLayoutEffect(() => {
    if (!outerRef.current || !trackRef.current) return
    const { cardW, stepW } = computeMetrics()
    // --card-w propagates to all .card children via CSS var inheritance
    outerRef.current.style.setProperty('--card-w', `${cardW}px`)
    trackRef.current.style.transition = 'none'
    trackRef.current.style.transform = `translateX(${-EXTRA * stepW}px)`
  }, [computeMetrics])

  const navigate = useCallback((steps: number) => {
    if (isAnimating.current || !trackRef.current) return
    isAnimating.current = true

    const track = trackRef.current
    const { stepW } = computeMetrics()
    const baseOffset = -EXTRA * stepW
    const targetOffset = baseOffset - steps * stepW

    track.style.transition = 'transform 420ms cubic-bezier(0.23, 1, 0.32, 1)'
    track.style.transform = `translateX(${targetOffset}px)`

    const onEnd = () => {
      track.removeEventListener('transitionend', onEnd)
      // Force synchronous re-render with updated items before resetting transform
      flushSync(() => {
        setStartIdx(i => mod(i + steps, items.length))
      })
      track.style.transition = 'none'
      track.style.transform = `translateX(${baseOffset}px)`
      track.getBoundingClientRect() // force reflow so reset is committed
      isAnimating.current = false
    }
    track.addEventListener('transitionend', onEnd, { once: true })
  }, [computeMetrics, items.length])

  const next = useCallback(() => navigate(1), [navigate])
  const prev = useCallback(() => navigate(-1), [navigate])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4200)
    return () => clearInterval(id)
  }, [next, paused])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimating.current) return
    dragStartX.current = e.clientX
    hasDragged.current = false
    // NOTE: no setPointerCapture here — it blocks clicks on child <a> tags.
    // Capture is set in onPointerMove once the drag threshold is confirmed.
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null || !trackRef.current) return
    const delta = e.clientX - dragStartX.current

    if (!hasDragged.current) {
      if (Math.abs(delta) < 6) return // below drag threshold — still a potential tap
      hasDragged.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
      e.currentTarget.style.cursor = 'grabbing'
      setPaused(true)
    }

    const { stepW } = computeMetrics()
    trackRef.current.style.transition = 'none'
    trackRef.current.style.transform = `translateX(${-EXTRA * stepW + delta}px)`
  }

  const snapBack = () => {
    if (!trackRef.current) return
    const { stepW } = computeMetrics()
    const track = trackRef.current
    track.style.transition = 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)'
    track.style.transform = `translateX(${-EXTRA * stepW}px)`
    const onEnd = () => { track.style.transition = 'none'; track.removeEventListener('transitionend', onEnd) }
    track.addEventListener('transitionend', onEnd, { once: true })
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    const wasDragging = hasDragged.current

    e.currentTarget.style.cursor = ''
    dragStartX.current = null
    hasDragged.current = false

    if (!wasDragging) return // was a tap — let the click on the <a> propagate naturally

    setPaused(false)
    // Block the synthetic click that browsers fire after pointerup
    justDragged.current = true
    setTimeout(() => { justDragged.current = false }, 200)

    const { stepW } = computeMetrics()
    const rawSnap = Math.round(Math.abs(delta) / stepW)
    const snapCount = Math.min(rawSnap, EXTRA)

    if (snapCount === 0) {
      snapBack()
    } else {
      navigate(delta < 0 ? snapCount : -snapCount)
    }
  }

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasDragging = hasDragged.current
    e.currentTarget.style.cursor = ''
    dragStartX.current = null
    hasDragged.current = false
    if (wasDragging) {
      setPaused(false)
      snapBack()
    }
  }

  // Intercept click in capture phase so drags never trigger <a> navigation
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (justDragged.current) {
      justDragged.current = false
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // Render EXTRA items on each side for the peek-during-drag effect
  const renderCount = visibleCount + EXTRA * 2
  const visibleItems = Array.from({ length: renderCount }, (_, offset) => {
    const itemOffset = offset - EXTRA
    return {
      item: items[mod(startIdx + itemOffset, items.length)],
      key: `${startIdx}-${itemOffset}`,
    }
  })

  return (
    <section
      className={styles.section}
      aria-label={t.title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.spotlight} aria-hidden="true" />

      <div className={styles.header}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.desc}>{t.description}</p>
      </div>

      <div className={styles.carouselRow}>
        <button className={styles.navBtn} onClick={prev} aria-label={t.prevLabel}>
          <ChevronLeft size={20} />
        </button>

        <div
          ref={outerRef}
          className={styles.trackOuter}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onClickCapture={onClickCapture}
        >
          <div ref={trackRef} className={styles.track}>
            {visibleItems.map(({ item, key }) => (
              <a
                key={key}
                href={item.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                data-track-name={`coleccion_ver_${item.id}`}
              >
                <div className={styles.cardStage}>
                  <img
                    src={item.image}
                    alt={item.name[locale]}
                    className={styles.cardImg}
                    draggable={false}
                  />
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.cardName}>{item.name[locale]}</span>
                  <span className={styles.cardCta}>
                    {t.storeLabel}
                    <ExternalLink size={11} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <button className={styles.navBtn} onClick={next} aria-label={t.nextLabel}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className={styles.dots} role="tablist">
        {items.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={i === startIdx}
            aria-label={item.name[locale]}
            className={styles.dot}
            data-active={i === startIdx}
            onClick={() => {
              if (i === startIdx || isAnimating.current || !trackRef.current) return
              const { stepW } = computeMetrics()
              // Jump instantly to selected item without animation
              flushSync(() => setStartIdx(i))
              trackRef.current!.style.transition = 'none'
              trackRef.current!.style.transform = `translateX(${-EXTRA * stepW}px)`
            }}
          />
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <a
          href={MERCH_SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <ShoppingBag size={16} />
          {t.ctaText}
          <ExternalLink size={13} />
        </a>
      </div>
    </section>
  )
}
