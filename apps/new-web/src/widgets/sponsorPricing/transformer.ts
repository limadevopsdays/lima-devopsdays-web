import { ResolutionContext } from "inversify";
import { SponsorPricingSectionProps } from "react-components/sections/SponsorPricingSection";
import { CustomTemplateParser } from "react-utils";

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
  mediaKitLinks?: MediaKitLink[];
}

const transformer = (
  { ctaHref, ctaText, description, sponsorPackages, title, mediaKitLinks }: TransformerProps,
  ctx: ResolutionContext
): SponsorPricingSectionProps => {
  const parser = ctx.get(CustomTemplateParser)
  const parsedDescription = parser.parse(description)

  const newProps = {
    title,
    description: parsedDescription,
    ctaHref,
    ctaText,
    pricingTiers: sponsorPackages.map((sponsorPackage) => ({
      name: sponsorPackage.fields.title,
      description: sponsorPackage.fields.description,
      price: sponsorPackage.fields.price,
      tier: sponsorPackage.fields.tier as 'bronze' | 'silver' | 'gold',
      benefits: sponsorPackage.fields.benefits,
    })),
    mediaKitLinks: mediaKitLinks?.map((link) => ({
      text: link.fields.text,
      href: link.fields.href,
      iconName: link.fields.iconName,
      isHidden: link.fields.isHidden,
    })),
  }

  return newProps
};
export default transformer;
