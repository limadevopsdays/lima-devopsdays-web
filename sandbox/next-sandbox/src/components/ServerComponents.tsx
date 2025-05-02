import { ComponentProps, ElementType, ReactElement } from "react";
import HeroSection from "react-components/sections/Hero";
import AboutUsSection from "react-components/sections/AboutUsSection"


// TODO: add more sections
const ServerComponents: Record<string, <T extends ElementType>(props: ComponentProps<T>)=>ReactElement> = {
  hero: HeroSection,
  aboutUs: AboutUsSection,
}

export default ServerComponents;
