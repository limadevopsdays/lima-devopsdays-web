import Subtitle from '../../subtitle';
import SpeakerCard, { SocialNetwork } from '../../speaker-card';
import TwitterIcon from '../../icons/Twitter';
import InstagramIcon from '../../icons/Instagram';
import LinkedinIcon from '../../icons/Linkedin';
import Paragraph from '../../paragraph';

export interface Speaker {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  socialNetworks: {
    url: string;
    iconName: string;
  }[];
  tags?: string[];
}

export interface SpeakersSectionProps {
  speakers: Speaker[];
  title?: string;
  description?: string;
}

const iconsByName: Record<string, typeof TwitterIcon> = {
  "Twitter": TwitterIcon,
  "Instagram": InstagramIcon,
  "Linkedin": LinkedinIcon
}

export default function SpeakersSection({
  speakers,
  description,
  title = "Speakers"
}: Readonly<SpeakersSectionProps>) {

  return (
    <section className="bg-gray-4">
      <div className="flex flex-col items-center gap-8 container-custom py-12 px-4">
        <Subtitle weight="light" size="lg">{title}</Subtitle>

        <div className='w-2/3 te'>
          <Paragraph className='text-center' weight='light'>
            {description}
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 md:gap-12">

          {speakers?.map((speaker) => {
            const socialNetworks: SocialNetwork[] = speaker.socialNetworks.map(({ url, iconName }) => {
              const Icon = iconsByName[iconName]
              return {
                url,
                icon: Icon ? <Icon /> : null
              }
            })

            return (
              <SpeakerCard
                key={speaker.id}
                imageSrc={speaker.imageSrc}
                title={speaker.title}
                description={speaker.description}
                socialNetworks={socialNetworks}
                tags={speaker.tags ?? []}
              />
            )
          })}
        </div>
      </div>
    </section>
  );
}
