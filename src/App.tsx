import { SiteFooter } from './components/SiteFooter'
import { HeroBackground } from './components/HeroBackground'
import { SiteHeader } from './components/SiteHeader'
import { AboutSection } from './sections/AboutSection'
import { FaqSection } from './sections/FaqSection'
import { HeroSection } from './sections/HeroSection'
import { OrganizersSection } from './sections/OrganizersSection'
import { ScheduleSection } from './sections/ScheduleSection'
import { SpeakersSection } from './sections/SpeakersSection'
import { SponsorsSection } from './sections/SponsorsSection'
import { VenueSection } from './sections/VenueSection'
import { useI18n } from './i18n/useI18n'

function App() {
  const { t } = useI18n()

  return (
    <div className="min-h-full relative isolate after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-screen after:bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.035)_1px,transparent_1px,transparent_6px)] after:opacity-[0.12] after:mix-blend-overlay after:z-[-2] after:pointer-events-none after:[mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)] after:[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)] motion-safe:after:animate-[scanDrift_5.5s_linear_infinite] [:root[data-theme=light]_&]:after:opacity-[0.06]">
      <HeroBackground />
      <a
        className="absolute top-3 left-3 py-[10px] px-3 rounded-full bg-site-skiplink-bg border border-site-border text-site-text -translate-y-[160%] transition-transform duration-[120ms] ease-out z-[1000] focus:translate-y-0"
        href="#content"
      >
        {t('app.skipToContent')}
      </a>
      <SiteHeader />
      <main id="content" className="outline-none" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <SpeakersSection />
        <ScheduleSection />
        <SponsorsSection />
        <VenueSection />
        <OrganizersSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
