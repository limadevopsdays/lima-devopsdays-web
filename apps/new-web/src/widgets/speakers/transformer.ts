import { SpeakersSectionProps } from "react-components/sections/SpeakersSection";

interface SocialNetwork {
  fields: {
    iconName: string;
    url: string;
  }
}

interface SpeakerProfile {
  fields: {
    name: string;
    role: string;
    image: {
      fields: {
        title: string;
        file: {
          url: string;
        };
      }
    },
    companies: string[];
    socialNetworks: SocialNetwork[];
  },
  sys: {
    id: string;
  }
}

interface TransformerProps {
  title: string;
  speakerProfiles: SpeakerProfile[];
}

const transformer = ({ title, speakerProfiles }: TransformerProps): SpeakersSectionProps => {
  const newProps = {
    title,
    speakers: speakerProfiles.map(({ fields, sys }, index) => {
      const { name, role, image, companies, socialNetworks } = fields;
      const imageSrc = image.fields.file.url;

      const tags = companies.map((company) => company);

      return {
        id: `${index}${sys.id}`,
        imageSrc,
        title: name,
        description: role,
        tags,
        socialNetworks: socialNetworks.map(({ fields }) => ({
          url: fields.url,
          iconName: fields.iconName,
        }))
      };
    }),
  }

  return newProps;
};

export default transformer;
