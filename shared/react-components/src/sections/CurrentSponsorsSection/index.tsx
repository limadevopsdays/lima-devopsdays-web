import { ReactNode } from 'react';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import CardSurface from '../../card-surface';

export interface Sponsor {
  id: string;
  imageSrc: string;
  altText: string;
}

export interface Tier {
  id: string;
  title: string;
  sponsors: Sponsor[];
}

export interface CurrentSponsorsSectionProps {
  title: string;
  description: ReactNode;
  tiers: Tier[];
}

export default function CurrentSponsorsSection({
  title = "Sponsors",
  description,
  tiers
}: CurrentSponsorsSectionProps) {
  return (
    <section className="flex flex-col gap-8">
      <Subtitle weight="light" size="lg">{title}</Subtitle>

      <Paragraph weight='light' size="lg">{description}</Paragraph>

      <div className="flex flex-col gap-6">
        {tiers.map(({ title, sponsors, id }) => (
          <CardSurface variant='primary' className='flex flex-col gap-6 px-8 py-4 items-center' key={id}>
            <Subtitle weight='light' size="lg">{title}</Subtitle>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5'>
              {sponsors.map(({ id, altText, imageSrc }) => (
                <picture key={id}>
                  <img src={imageSrc} alt={altText} width={183} height={100} />
                </picture>
              ))}
            </div>
          </CardSurface>
        ))}
      </div>
    </section>
  );
}