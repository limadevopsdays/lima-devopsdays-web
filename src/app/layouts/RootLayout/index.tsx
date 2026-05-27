import { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { ChevronUp } from 'lucide-react'
import { NavbarSection } from '../../components/devopsdays/NavbarSection'
import { FooterSection } from '../../components/devopsdays/FooterSection'
import { getTrackableButtonTarget, trackButtonClick, trackPageView } from '../../lib/mixpanel'
import { useI18n, useLocale } from '../../i18n'
import { routeSeo, fallbackSeo, layoutI18n } from './i18n'
import styles from './index.module.css'

const SITE_URL = 'https://devopsdays.pe'

function ScrollToTop() {
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  return null
}

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`
    trackPageView(path)
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const element = getTrackableButtonTarget(event.target)
      if (!element) return
      trackButtonClick(element)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}

function SeoTracker() {
  const location = useLocation()
  const locale = useLocale()

  useEffect(() => {
    const seoByLocale = routeSeo[locale]
    const seo = seoByLocale[location.pathname] ?? {
      ...fallbackSeo[locale],
      canonicalPath: location.pathname,
    }

    document.title = seo.title

    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector(selector)
      if (element) element.setAttribute('content', content)
    }

    const canonicalHref = `${SITE_URL}${seo.canonicalPath}`
    const canonicalTag = document.querySelector('link[rel="canonical"]')
    if (canonicalTag) canonicalTag.setAttribute('href', canonicalHref)

    setMeta('meta[name="title"]', seo.title)
    setMeta('meta[name="description"]', seo.description)
    setMeta('meta[name="robots"]', seo.robots ?? 'index,follow,max-image-preview:large')
    setMeta('meta[property="og:title"]', seo.title)
    setMeta('meta[property="og:description"]', seo.description)
    setMeta('meta[property="og:url"]', canonicalHref)
    setMeta('meta[property="twitter:title"]', seo.title)
    setMeta('meta[property="twitter:description"]', seo.description)
    setMeta('meta[property="twitter:url"]', canonicalHref)
  }, [location.pathname, locale])

  return null
}

function FloatingScrollTopButton() {
  const location = useLocation()
  const t = useI18n(layoutI18n)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const aboutSection = document.getElementById('about')
      if (!aboutSection) {
        setIsVisible(false)
        return
      }
      const aboutTop = aboutSection.getBoundingClientRect().top + window.scrollY
      setIsVisible(window.scrollY >= aboutTop)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [location.pathname, location.hash])

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      type="button"
      className={`${styles.scrollTopButton} ${isVisible ? styles.scrollTopButtonVisible : ''}`.trim()}
      onClick={handleClick}
      aria-label={t.ariaScrollTop}
      data-track-name="scroll_top_floating"
      tabIndex={isVisible ? 0 : -1}
    >
      <ChevronUp className={styles.scrollTopIcon} />
    </button>
  )
}

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <SeoTracker />
      <FloatingScrollTopButton />
      <NavbarSection />
      <main id="main-content">
        <Outlet />
      </main>
      <FooterSection />
    </>
  )
}
