import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { HeroBackground } from './components/HeroBackground'
import { SiteHeader } from './components/SiteHeader'
import { useI18n } from './i18n/useI18n'
import { HomePage } from './pages/HomePage'
import { SponsorsSection } from './pages/SponsorsPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  const { t } = useI18n()

  return (
    <div className="app">
      <HeroBackground />
      <a className="skipLink" href="#content">
        {t('app.skipToContent')}
      </a>
      <ScrollToTop />
      <SiteHeader />
      <main id="content" className="main" tabIndex={-1}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="sponsors" element={<SponsorsSection />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
