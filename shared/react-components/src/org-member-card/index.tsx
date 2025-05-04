import Subtitle from '../subtitle';
import Paragraph from '../paragraph';

export interface SpeakerCardProps {
  imageSrc: string;
  name: string;
  role: string;
}

export default function OrganizationMemberCard({
  imageSrc,
  name,
  role,
}: SpeakerCardProps) {
  return (
    <article className="flex flex-col gap-2 ">
      <picture className="rounded-3xl flex justify-center">
        <img className="rounded-3xl" src={imageSrc} alt={name} width={285} height={285} />
      </picture>

      <div>
        <div className="flex flex-col justify-center items-center">
          <Subtitle className='truncate' weight='medium' size="sm">{name}</Subtitle>
          <Paragraph color='secondary' size="xl" >{role}</Paragraph>
        </div>
      </div>
    </article>
  );
};
