import Subtitle from '../subtitle';
import Paragraph from '../paragraph';
import Tag from './Tag';

export interface SocialNetwork {
  url: string;
  icon: React.ReactNode;
}

export interface SpeakerCardProps {
  imageSrc: string;
  title: string;
  description: string;
  socialNetworks: SocialNetwork[];
  tags: string[];
}

export default function SpeakerCard({
  imageSrc,
  title,
  description,
  socialNetworks,
  tags
}: SpeakerCardProps) {

  return (
    <article className="flex flex-col gap-2">
      <picture className="rounded-3xl w-72 md:w-56 aspect-square" >
        <img className="rounded-3xl object-cover w-full h-full" src={imageSrc} alt={title} />
      </picture>

      <div>
        <div className="flex justify-between items-center">
          <Subtitle className='truncate text-lg' weight='medium'>{title}</Subtitle>
          <div className="flex gap-2">
            {socialNetworks.map(({ url, icon }, index) => (
              <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
            ))}
          </div>
        </div>

        <Paragraph size="md" color='secondary' >{description}</Paragraph>

        {tags.length > 0 && (
          <div className="mt-3 flex gap-2">
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </article >
  );
};
