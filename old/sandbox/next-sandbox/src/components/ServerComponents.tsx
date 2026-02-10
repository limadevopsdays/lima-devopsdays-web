import { ComponentProps, ElementType, ReactElement } from "react";
import HeroSection from "react-components/sections/Hero";
import AboutUsSection from "react-components/sections/AboutUsSection"
import AgendaSection from "react-components/sections/AgendaSection"
import CallForSpeakersSection from "react-components/sections/CallForSpeakersSection";
import CurrentSponsorsSection from "react-components/sections/CurrentSponsorsSection";
import Footer from "react-components/sections/Footer";
import Header from "react-components/sections/Header";
import SpeakersSection from "react-components/sections/SpeakersSection";
import SponsorPricingSection from "react-components/sections/SponsorPricingSection";

// TODO: add more sections
const ServerComponents: Record<string, <T extends ElementType>(props: ComponentProps<T>)=>ReactElement> = {
  hero: HeroSection,
  aboutUs: AboutUsSection,
  agenda: AgendaSection,
  callForSpeakers: CallForSpeakersSection,
  currentSponsors: CurrentSponsorsSection,
  footer: Footer,
  header: Header,
  speakers: SpeakersSection,
  sponsorPricing: SponsorPricingSection,
}

export default ServerComponents;
