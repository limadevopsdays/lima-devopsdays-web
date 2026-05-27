import { HeroSection } from '../../components/devopsdays/HeroSection'
import { EarlyBirdBanner } from '../../components/devopsdays/EarlyBirdBanner'
import { CountdownSection } from '../../components/devopsdays/CountdownSection'
import { AboutSection } from '../../components/devopsdays/AboutSection'
import { SponsorsSection } from '../../components/devopsdays/SponsorsSection'
import { TicketsSection } from '../../components/devopsdays/TicketsSection'
import { GallerySection } from '../../components/devopsdays/GallerySection'
import { SpeakersSection } from '../../components/devopsdays/SpeakersSection'
import { VenueSection } from '../../components/devopsdays/VenueSection'
import { TurismSection } from '../../components/devopsdays/TurismSection'
import { OrganizersSection } from '../../components/devopsdays/OrganizersSection'
import { FaqSection } from '../../components/devopsdays/FaqSection'
import styles from './index.module.css'
import { useI18n } from '../../i18n'
import { homePageI18n } from './i18n'

export default function HomePage() {
  const t = useI18n(homePageI18n)

  return (
    <>
      <HeroSection />
      <EarlyBirdBanner />
      <CountdownSection />
      <AboutSection />
      <SponsorsSection />
      <section className={styles.ticketsGalleryBlock} aria-label={t.ticketsGallerySectionLabel}>
        <TicketsSection />
        <GallerySection />
      </section>
      <SpeakersSection />
      <VenueSection />
      <TurismSection />
      <OrganizersSection />
      <FaqSection />
    </>
  )
}
