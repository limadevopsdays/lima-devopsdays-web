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

interface TransformerProps {
  title: string;
  description: string;
  ctaHref: string;
  ctaText: string;
  sponsorPackages: SponsorPackage[];
}

const transformer = ({ ctaHref, ctaText, description, sponsorPackages, title }: TransformerProps): SponsorPricingSectionProps => {

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
    }))
  }

  return newProps
};
export default transformer;
