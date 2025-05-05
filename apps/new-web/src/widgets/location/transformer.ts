import { LocationSectionProps } from "react-components/sections/LocationSection";

interface RawProps {
  title: string;
  description: string;
  placeImage: {
    fields: {
      title: string;
      file: {
        url: string;
      }
    }
  }

}

const transformer = (props: RawProps): LocationSectionProps => {

  const newProps = {
    title: props.title,
    description: props.description,
    logoUrl: props.placeImage.fields.file.url,
    logoAlt: props.placeImage.fields.title
  }

  return newProps
};
export default transformer;
