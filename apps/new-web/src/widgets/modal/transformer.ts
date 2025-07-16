import { ResolutionContext } from "inversify";
import { CustomTemplateParser } from "react-utils";

const transformer = (props: any,  ctx: ResolutionContext) => {
  const { id, image, title, buttonText, richText,buttonLink } = props;

  const parser = ctx.get(CustomTemplateParser)
  const parsedRichText = richText && parser.parse(richText);

  return {
    id,
    image: image.fields.file.url,
    title,
    buttonText,
    richText:parsedRichText,
    buttonLink
  };
}

export default transformer;
