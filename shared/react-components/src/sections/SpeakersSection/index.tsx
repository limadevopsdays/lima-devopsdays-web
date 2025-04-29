import Subtitle from '../../subtitle';
import SpeakerCard, { SocialNetwork } from '../../speaker-card';

export interface Speaker {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  socialNetworks: SocialNetwork[];
  tags: string[];
}

export interface SpeakersSectionProps {
  speakers: Speaker[];
  title?: string;
}

export default function SpeakersSection({
  speakers,
  title = "Speakers"
}: SpeakersSectionProps) {
  return (
    <section className="flex flex-col items-center gap-8">
      <Subtitle weight="light" size="lg">{title}</Subtitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {speakers.map((speaker) => (
          <SpeakerCard
            key={speaker.id}
            imageSrc={speaker.imageSrc}
            title={speaker.title}
            description={speaker.description}
            socialNetworks={speaker.socialNetworks}
            tags={speaker.tags}
          />
        ))}
      </div>
    </section>
  );
}