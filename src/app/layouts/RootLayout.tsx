import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { NavbarSection } from '../components/devopsdays/NavbarSection'
import { FooterSection } from '../components/devopsdays/FooterSection'
import { getTrackableButtonTarget, trackButtonClick, trackPageView } from '../lib/mixpanel'

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

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <NavbarSection />
      <main id="main-content">
        <Outlet />
      </main>
      <FooterSection />
    </>
  )
}
