import { OrganizationProps } from "react-components/sections/Organization";
import { CoreValueDefault, OrganizationPropsDefault, SpeakerProfileDefault } from "./interface";

const transformer = (props: OrganizationPropsDefault):OrganizationProps => {

  const newProps = {
    ...props,
    speakerProfile: props.speakerProfile.map((speaker: SpeakerProfileDefault) => ({
      name: speaker.fields.name,
      role: speaker.fields.role,
      imageUrl: speaker.fields.image.fields.file.url
    })),
    coreValue: props.coreValue.map((value: CoreValueDefault) => ({
      url: value.fields.url,
      iconName: value.fields.iconName,
      title: value.fields.title,
      description: value.fields.description
    }))
  }

  return newProps;
}
export default transformer;
