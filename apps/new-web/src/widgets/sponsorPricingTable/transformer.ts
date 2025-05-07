import { ResolutionContext } from "inversify";
import { SponsorPricingTableSectionProps } from "react-components/sections/SponsorPricingTableSection";
import { CustomTemplateParser } from "react-utils";


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
  mediaKitLinks?: MediaKitLink[];
}

const transformer = (
  { description, title, mediaKitLinks }: TransformerProps,
  ctx: ResolutionContext
): SponsorPricingTableSectionProps => {
  const parser = ctx.get(CustomTemplateParser)
  const parsedDescription = parser.parse(description)

  const newProps = {
    title,
    description: parsedDescription,
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
