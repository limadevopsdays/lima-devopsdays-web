import Subtitle from '../subtitle';
import Paragraph from '../paragraph';

import { SocialNetwork } from '../speaker-card';

export interface OrganizationMemberCardProps {
  imageUrl: string;
  name: string;
  role: string[];
  socialNetworks?: SocialNetwork[] | undefined;
}

export default function OrganizationMemberCard({
  imageUrl,
  name,
  role,
  socialNetworks
}: OrganizationMemberCardProps) {

  return (
    <article className="flex flex-col gap-2 justify-start">
      <picture className="rounded-3xl flex justify-center">
        <img className="rounded-3xl" src={imageUrl} alt={name} width={285} height={285} />
      </picture>

      <div className="flex flex-col justify-center xl:items-start items-center gap-2 xl:gap-3">

        <Subtitle className='truncate text-lg text-left' weight='medium'>{name}</Subtitle>
        <div className=' flex flex-col gap-2 sm:h-[42px] '>
          {
            role?.map((roleText, index) => (
              <Paragraph key={index} size="md" color='secondary' className='truncate text-center xl:text-left'>
                {roleText}
              </Paragraph>
            ))
          }
        </div>

        <div className="w-full flex gap-2 justify-center xl:justify-start items-center">
          {socialNetworks && socialNetworks.map(({ url, icon }, index) => (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
          ))}
        </div>

      </div>

    </article >
  );
};
