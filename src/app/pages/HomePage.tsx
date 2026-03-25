import { HeroSection } from '../components/devopsdays/HeroSection'
import { EarlyBirdBanner } from '../components/devopsdays/EarlyBirdBanner'
import { CountdownSection } from '../components/devopsdays/CountdownSection'
import { AboutSection } from '../components/devopsdays/AboutSection'
import { SponsorsSection } from '../components/devopsdays/SponsorsSection'
import { TicketsSection } from '../components/devopsdays/TicketsSection'
import { GallerySection } from '../components/devopsdays/GallerySection'
import { SpeakersSection } from '../components/devopsdays/SpeakersSection'
import { VenueSection } from '../components/devopsdays/VenueSection'
import { OrganizersSection } from '../components/devopsdays/OrganizersSection'
import { FaqSection } from '../components/devopsdays/FaqSection'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EarlyBirdBanner />
      <CountdownSection />
      <AboutSection />
      <SponsorsSection />
      <section className={styles.ticketsGalleryBlock} aria-label="Tickets y galería">
        <TicketsSection />
        <GallerySection />
      </section>
      <SpeakersSection />
      <VenueSection />
      <OrganizersSection />
      <FaqSection />
    </>
  )
}
