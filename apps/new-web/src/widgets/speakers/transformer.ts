import type { SpeakersSectionProps } from "react-components/sections/SpeakersSection";

interface SpeakerWithTalk {
  id: string;
  name: string;
  imageSrc: string;
  talkTitle: string;
  talkAbstract?: string;
}

interface ApiTransformerProps {
  title: string;
  description?: string;
  speakers: SpeakerWithTalk[];
}

interface SocialNetwork {
  fields: {
    iconName: string;
    url: string;
  };
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
      };
    };
    companies: string[];
    socialNetworks: SocialNetwork[];
  };
  sys: {
    id: string;
  };
}

interface ContentfulTransformerProps {
  title: string;
  description?: string;
  speakerProfiles: SpeakerProfile[];
}

type TransformerProps = ApiTransformerProps | ContentfulTransformerProps;

const isContentfulTransformer = (props: TransformerProps): props is ContentfulTransformerProps => {
  return 'speakerProfiles' in props;
};

//TODO: Deberías tener un transformer por data source.
const transformer = (props: TransformerProps): SpeakersSectionProps => {
  const { title, description } = props;

  if (isContentfulTransformer(props)) {
    const { speakerProfiles } = props;

    return {
      title,
      description,
      speakers: speakerProfiles?.map(({ fields, sys }, index) => {
        const { name, role, image, companies, socialNetworks } = fields;
        const imageSrc = image.fields.file.url;
        const tags = companies?.map((company) => company);

        return {
           id: `${index}${sys.id}`,
           imageSrc,
           name: name,
           talkTitle: role,
           talkAbstract: companies?.join(', '),
         };
      }),
    };
  } else {
    const { speakers } = props;

    return {
      title,
      description,
      speakers: speakers?.map((speaker) => ({
        id: speaker.id,
        imageSrc: speaker.imageSrc,
        name: speaker.name,
        talkTitle: speaker.talkTitle,
        talkAbstract: speaker.talkAbstract,
      })),
    };
  }
};

export default transformer;
