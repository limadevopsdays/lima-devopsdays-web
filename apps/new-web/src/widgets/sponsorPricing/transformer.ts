import { SponsorPricingSectionProps } from "react-components/sections/SponsorPricingSection";

interface SponsorPackage {
  fields: {
    title: string;
    description: string;
    price: string;
    tier: string;
    benefits: string[];
  }
}

interface MediaKitLink {
  fields: {
    href: string;
    text: string;
    iconName?: string;
    isHidden?: boolean;
  }
}

interface TransformerProps {
  title: string;
  description: string;
  ctaHref: string;
  ctaText: string;
  sponsorPackages: SponsorPackage[];
  mediaKitLinks: MediaKitLink[];
}

const transformer = ({ ctaHref, ctaText, description, sponsorPackages, title, mediaKitLinks }: TransformerProps): SponsorPricingSectionProps => {
  const newProps = {
    title,
    description,
    ctaHref,
    ctaText,
    pricingTiers: sponsorPackages.map((sponsorPackage) => ({
      name: sponsorPackage.fields.title,
      description: sponsorPackage.fields.description,
      price: sponsorPackage.fields.price,
      tier: sponsorPackage.fields.tier as 'bronze' | 'silver' | 'gold',
      benefits: sponsorPackage.fields.benefits,
    })),
    mediaKitLinks: mediaKitLinks.map((link) => ({
      text: link.fields.text,
      href: link.fields.href,
      iconName: link.fields.iconName,
      isHidden: link.fields.isHidden,
    })),
  }

  return newProps
};
export default transformer;
