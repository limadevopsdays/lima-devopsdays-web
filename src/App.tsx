import { SiteFooter } from './components/SiteFooter'
import { HeroBackground } from './components/HeroBackground'
import { SiteHeader } from './components/SiteHeader'
import { AboutSection } from './sections/AboutSection'
import { CodeOfConductSection } from './sections/CodeOfConductSection'
import { ExploreSection } from './sections/ExploreSection'
import { FaqSection } from './sections/FaqSection'
import { HeroSection } from './sections/HeroSection'
import { OrganizersSection } from './sections/OrganizersSection'
import { PastEventsSection } from './sections/PastEventsSection'
import { SpeakersSection } from './sections/SpeakersSection'
import { SponsorsSection } from './sections/SponsorsSection'
import { TicketsSection } from './sections/TicketsSection'
import { VenueSection } from './sections/VenueSection'
import { useI18n } from './i18n/useI18n'

function App() {
  const { t } = useI18n()

  return (
    <div className="app">
      <HeroBackground />
      <a className="skipLink" href="#content">
        {t('app.skipToContent')}
      </a>
      <SiteHeader />
      <main id="content" className="main" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <SponsorsSection />
        <SpeakersSection />
        <TicketsSection />
        <VenueSection />
        <ExploreSection />
        <OrganizersSection />
        <PastEventsSection />
        <CodeOfConductSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
