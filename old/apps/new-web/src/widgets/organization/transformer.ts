import { OrganizationProps } from "react-components/sections/Organization";
import { OrganizationPropsDefault, SpeakerProfileDefault } from "./interface";

const transformer = (props: OrganizationPropsDefault): OrganizationProps => {
  const newProps = {
    ...props,
    speakerProfile: props.speakerProfile.map(
      (speaker: SpeakerProfileDefault) => ({
        name: speaker.fields.name,
        role: speaker.fields.role,
        imageUrl: speaker.fields.image.fields.file.url,
        socialNetworks: speaker.fields.socialNetworks?.map((socialNetwork) => ({
          iconName: socialNetwork.fields.iconName,
          url: socialNetwork.fields.url,
        })),
      })
    ),
  };

  return newProps;
};
export default transformer;
