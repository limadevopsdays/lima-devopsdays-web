import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { ChevronUp } from 'lucide-react'
import { NavbarSection } from '../components/devopsdays/NavbarSection'
import { FooterSection } from '../components/devopsdays/FooterSection'
import { getTrackableButtonTarget, trackButtonClick, trackPageView } from '../lib/mixpanel'
import styles from './RootLayout.module.css'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      return
    }

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

      if (!element) {
        return
      }

      trackButtonClick(element)
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  return null
}

function FloatingScrollTopButton() {
  const location = useLocation()
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

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`${styles.scrollTopButton} ${isVisible ? styles.scrollTopButtonVisible : ''}`.trim()}
      onClick={handleClick}
      aria-label="Volver arriba"
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
      <FloatingScrollTopButton />
      <NavbarSection />
      <main id="main-content">
        <Outlet />
      </main>
      <FooterSection />
    </>
  )
}
