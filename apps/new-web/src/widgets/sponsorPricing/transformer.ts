import { ResolutionContext } from "inversify";
import { SponsorPricingSectionProps } from "react-components/sections/SponsorPricingSection";
import { CustomTemplateParser } from "react-utils";

interface CtaButton {
  fields: {
    text: string;
    href: string;
    isDisabled?: boolean;
    isHidden?: boolean;
  }
}

interface SponsorPackage {
  fields: {
    title: string;
    description: string;
    price: string;
    tier: string;
    benefits: string[];
    ctaButton?: CtaButton;
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
  sponsorPackages: SponsorPackage[];
  mediaKitLinks?: MediaKitLink[];
  ctaButton?: CtaButton;
}

const transformer = (
  { description, sponsorPackages, title, mediaKitLinks, ctaButton }: TransformerProps,
  ctx: ResolutionContext
): SponsorPricingSectionProps => {
  const parser = ctx.get(CustomTemplateParser)
  const parsedDescription = parser.parse(description)

  const newProps = {
    title,
    description: parsedDescription,
    pricingTiers: sponsorPackages.map((sponsorPackage) => {

      const {
        title,
        description,
        price,
        tier,
        benefits,
        ctaButton,
      } = sponsorPackage.fields

      return {
        name: title,
        description,
        price,
        tier: tier as 'bronze' | 'silver' | 'gold' | 'violet' | 'silveGray',
        benefits,
        ctaText: ctaButton?.fields.text,
        ctaHref: ctaButton?.fields.href,
        showCta: ctaButton && !ctaButton.fields.isHidden,
        disableCta: ctaButton?.fields.isDisabled,
      }
    }),
    mediaKitLinks: mediaKitLinks?.map((link) => ({
      text: link.fields.text,
      href: link.fields.href,
      iconName: link.fields.iconName,
      isHidden: link.fields.isHidden,
    })),
    ctaHref: ctaButton?.fields.href,
    ctaText: ctaButton?.fields.text,
    showCta: ctaButton && !ctaButton.fields.isHidden,
    ctaDisabled: ctaButton?.fields.isDisabled,
  }

  return newProps
};
export default transformer;
