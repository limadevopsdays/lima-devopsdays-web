import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AboutSection } from '../sections/AboutSection'
import { FaqSection } from '../sections/FaqSection'
import { HeroSection } from '../sections/HeroSection'
import { OrganizersSection } from '../sections/OrganizersSection'
import { ScheduleSection } from '../sections/ScheduleSection'
import { SpeakersSection } from '../sections/SpeakersSection'
import { SponsorsCta } from '../sections/SponsorsCta'
import { VenueSection } from '../sections/VenueSection'

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <ScheduleSection />
      <SponsorsCta />
      <VenueSection />
      <OrganizersSection />
      <FaqSection />
    </>
  )
}
