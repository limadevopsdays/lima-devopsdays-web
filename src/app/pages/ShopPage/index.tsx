import React, { useCallback, useEffect, useState } from 'react'
import { Ticket, ArrowRight, Calendar, MapPin, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { siteContent } from '../../data/mockContent'
import { isTicketSaleOpen } from '../../lib/tickets'
import { useI18n, useLocale } from '../../i18n'
import { shopI18n } from './i18n'
import { MERCH_CATALOG, MERCH_SHOP_URL } from '../../data/merch'
import { EarlyBirdBanner } from '../../components/devopsdays/EarlyBirdBanner'
import { MerchShowcase } from '../../components/devopsdays/MerchShowcase'
import styles from './index.module.css'

const EVENT_DATE = new Date('2026-08-27T09:00:00-05:00')
const saleOpen = isTicketSaleOpen()

function useCountdown() {
  const [diff, setDiff] = useState(EVENT_DATE.getTime() - Date.now())
  useEffect(() => {
    const id = setInterval(() => setDiff(EVENT_DATE.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const d = Math.max(0, diff)
  return {
    days:    Math.floor(d / 86400000),
    hours:   Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
    isOver:  d === 0,
  }
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!text) { setDisplayed(''); return }
    let idx = 0
    setDisplayed('')
    const id = setInterval(() => {
      idx++
      setDisplayed(text.slice(0, idx))
      if (idx >= text.length) clearInterval(id)
    }, 70)
    return () => clearInterval(id)
  }, [text])
  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <span className={styles.typewriterCursor} aria-hidden="true" />
      )}
    </>
  )
}

export default function ShopPage() {
  const t = useI18n(shopI18n)
  const locale = useLocale()
  const countdown = useCountdown()

  // Autoplay merch en el hero
  const [featuredIdx, setFeaturedIdx] = useState(0)
  const [heroAnimKey, setHeroAnimKey] = useState(0)
  const [autoplayReset, setAutoplayReset] = useState(0)

  // Corazones flotantes al hacer click en el producto
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; color: string; drift: number; size: number }[]>([])

  const handleProductClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    const colors = ['#aef542', '#c4ff6b', '#d4ff8a', '#8ee020']
    setHearts(prev => [
      ...prev,
      {
        id: Date.now(),
        x: cx + (Math.random() - 0.5) * 24,
        y: cy + (Math.random() - 0.5) * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 40,
        size: 1.1 + Math.random() * 0.5,
      },
    ])
  }, [])

  const goNext = useCallback(() => {
    setFeaturedIdx(i => (i + 1) % MERCH_CATALOG.length)
    setHeroAnimKey(k => k + 1)
  }, [])

  const nextFeatured = useCallback(() => {
    goNext()
    setAutoplayReset(k => k + 1)
  }, [goNext])

  const prevFeatured = useCallback(() => {
    setFeaturedIdx(i => (i - 1 + MERCH_CATALOG.length) % MERCH_CATALOG.length)
    setHeroAnimKey(k => k + 1)
    setAutoplayReset(k => k + 1)
  }, [])

  useEffect(() => {
    const id = setInterval(goNext, 3000)
    return () => clearInterval(id)
  }, [autoplayReset, goNext])

  const featuredItem = MERCH_CATALOG[featuredIdx]

  const countdownUnits = [
    { value: countdown.days,    label: t.countdownDays },
    { value: countdown.hours,   label: t.countdownHours },
    { value: countdown.minutes, label: t.countdownMinutes },
    { value: countdown.seconds, label: t.countdownSeconds },
  ]

  return (
    <div className={styles.page}>
      <section className={styles.hero}>

        {/* ── Left panel ─────────────────────────────────────────── */}
        <div className={styles.heroLeft}>
          <img
            src="/images/brand/logotipo.png"
            alt="DevOpsDays Lima"
            className={styles.heroLogo}
          />

          <div className={styles.heroLeftInner}>

            {/* Left column: copy + meta pinned to bottom */}
            <div className={styles.heroContent}>
              <div className={styles.heroCopy}>
                <p className={styles.heroEyebrow}>{t.heroBadge}</p>
                <h1 className={styles.heroTitle}>
                  {t.heroTitleMain}{' '}
                  <span className={styles.heroTitleHighlight}>{t.heroTitleHighlight}</span>
                </h1>
                <p className={styles.heroDesc}>{t.heroDesc}</p>
              </div>

              <div className={styles.heroMetaGroup}>
                <div className={styles.heroMetaBar}>
                  <div className={styles.heroMetaItem}>
                    <Calendar size={13} className={styles.heroMetaIcon} />
                    <div className={styles.heroMetaText}>
                      <span className={styles.heroMetaLabel}>{t.metaFechaLabel}</span>
                      <span className={styles.heroMetaValue}>{t.metaFechaValue}</span>
                    </div>
                  </div>
                  <span className={styles.heroMetaSep} />
                  <div className={styles.heroMetaItem}>
                    <MapPin size={13} className={styles.heroMetaIcon} />
                    <div className={styles.heroMetaText}>
                      <span className={styles.heroMetaLabel}>{t.metaLugarLabel}</span>
                      <span className={styles.heroMetaValue}>{t.metaLugarValue}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={siteContent.ticketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroTicketsCta}
                  data-track-name="comprar_entradas_hero_shop"
                >
                  <Ticket size={16} />
                  {t.heroTicketsCta}
                </a>
              </div>
            </div>

            {/* Right column: glass card — tickets prominentes arriba */}
            <div className={styles.heroCards}>
              <div className={styles.infoCard}>

                {!countdown.isOver && (
                  <div className={styles.countdownSection}>
                    <p className={styles.countdownLabel}>{t.countdownLabel}</p>
                    <div className={styles.countdownRow}>
                      {countdownUnits.map((unit, i) => (
                        <div key={unit.label} className={styles.countdownUnit}>
                          {i > 0 && <span className={styles.countdownSep}>:</span>}
                          <div className={styles.countdownBox}>
                            <span className={styles.countdownNum}>
                              {String(unit.value).padStart(2, '0')}
                            </span>
                            <span className={styles.countdownUnitLabel}>{unit.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.infoCardDivider} />

                <div className={styles.ticketList}>
                  {saleOpen
                    ? t.prices.map((p) => (
                        <a
                          key={p.name}
                          href={siteContent.ticketsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.ticketPriceCard}
                          data-variant={p.variant}
                          data-track-name={`ver_ticket_${p.name.toLowerCase().replace(/\s/g, '_')}_shop_hero`}
                        >
                          <div className={styles.ticketEarlyBirdRow}>
                            <span className={styles.ticketEarlyBirdLabel}>
                              <Zap size={7} />
                              EARLY BIRD
                            </span>
                            <span className={styles.ticketDiscount}>{p.discount}</span>
                          </div>
                          <div className={styles.ticketHorizDivider} />
                          <span className={styles.ticketName}>{p.name}</span>
                          <div className={styles.ticketPriceRow}>
                            <span className={styles.ticketPriceMain}>
                              <span className={styles.ticketCurrency}>{p.price[0]}</span>
                              {p.price.slice(1)}
                            </span>
                            <span className={styles.ticketPriceOriginal}>{p.originalPrice}</span>
                          </div>
                          <p className={styles.ticketDesc}>{p.description}</p>
                        </a>
                      ))
                    : <p className={styles.ticketComingSoon}>{t.ticketComingSoon}</p>
                  }
                </div>

              </div>
            </div>
          </div>

          <img
            src="/images/brand/mascota.png"
            alt=""
            aria-hidden="true"
            className={styles.heroMascota}
          />
        </div>

        {/* ── Right panel — merch con autoplay ─────────────────── */}
        <div className={styles.heroRight}>
          <div className={styles.shopTopRow}>
            <p className={styles.shopEyebrow}>{t.shopEyebrow}</p>
            <span className={styles.shopBadge}>{t.shopBadge}</span>
          </div>
          <h2 className={styles.shopTitle}>{t.shopTitle}</h2>
          <p className={styles.shopDesc}>{t.shopDesc}</p>

          <div className={styles.shopCover}>
            <div className={styles.shopCoverStage} onClick={handleProductClick}>
              <div key={heroAnimKey} className={styles.shopCoverBurst}>
                <span className={`${styles.star} ${styles.s1}`} aria-hidden="true" />
                <span className={`${styles.star} ${styles.s2}`} aria-hidden="true" />
                <span className={`${styles.star} ${styles.s3}`} aria-hidden="true" />
                <span className={`${styles.star} ${styles.s4}`} aria-hidden="true" />
                <span className={`${styles.star} ${styles.s5}`} aria-hidden="true" />
                <span className={`${styles.star} ${styles.s6}`} aria-hidden="true" />
                <img
                  src={featuredItem.image}
                  alt={featuredItem.name[locale]}
                  className={styles.shopCoverHeroImg}
                  draggable={false}
                />
              </div>
              {hearts.map(heart => (
                <span
                  key={heart.id}
                  className={styles.heart}
                  aria-hidden="true"
                  style={{
                    left: `${heart.x}px`,
                    top: `${heart.y}px`,
                    color: heart.color,
                    fontSize: `${heart.size}rem`,
                    '--drift': `${heart.drift}px`,
                  } as React.CSSProperties}
                  onAnimationEnd={() => setHearts(prev => prev.filter(h => h.id !== heart.id))}
                >
                  ❤
                </span>
              ))}
            </div>
            <p key={heroAnimKey} className={styles.shopCoverName}>
              <TypewriterText text={featuredItem.name[locale]} />
            </p>
            <div className={styles.shopCoverProgressRow}>
              <button
                className={styles.shopCoverNavBtn}
                onClick={prevFeatured}
                aria-label={t.shopPrevLabel}
              >
                <ChevronLeft size={13} />
              </button>
              <div className={styles.shopCoverProgress} aria-hidden="true">
                <div key={heroAnimKey} className={styles.shopCoverProgressBar} />
              </div>
              <button
                className={styles.shopCoverNavBtn}
                onClick={nextFeatured}
                aria-label={t.shopNextLabel}
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          <a
            href={MERCH_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shopCta}
            data-track-name="explorar_tienda_hero_shop"
          >
            {t.shopCta}
            <ArrowRight size={16} />
          </a>
        </div>

      </section>

      {/* ── Early Bird — sección con identidad visual ─────────── */}
      <section className={styles.earlyBirdSection}>
        <div className={styles.earlyBirdDivider}>
          <span className={styles.earlyBirdDividerLine} />
          <span className={styles.earlyBirdDividerLabel}>EARLY BIRD</span>
          <span className={styles.earlyBirdDividerLine} />
        </div>
        <div className={styles.earlyBirdWrap}>
          <EarlyBirdBanner />
        </div>
      </section>

      {/* ── Toda la Colección — carrusel ─────────────────────── */}
      <MerchShowcase items={MERCH_CATALOG} />
    </div>
  )
}
