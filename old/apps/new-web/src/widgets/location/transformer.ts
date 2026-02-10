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
  },
  iframeUrl: string;
  isHidden?: boolean;
}

const transformer = (props: RawProps): LocationSectionProps => {
  const {
    title,
    description,
    placeImage,
    iframeUrl,
    isHidden = false
  } = props;

  const newProps = {
    title,
    description,
    logoUrl: placeImage.fields.file.url,
    logoAlt: placeImage.fields.title,
    iframeUrl,
    isHidden
  }

  return newProps
};
export default transformer;
