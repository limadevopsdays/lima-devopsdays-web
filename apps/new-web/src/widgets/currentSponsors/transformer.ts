import { ResolutionContext } from "inversify";
import { CurrentSponsorsSectionProps } from "react-components/sections/CurrentSponsorsSection";
import { CustomTemplateParser } from "react-utils";

const transformer = (props: any, ctx: ResolutionContext): CurrentSponsorsSectionProps => {
  const parser = ctx.get(CustomTemplateParser)

  const description = parser.parse(props.description)

  return {
    ...props,
    description
  }
};
export default transformer;
