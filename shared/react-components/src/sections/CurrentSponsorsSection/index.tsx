import { ReactNode } from 'react';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import CardSurface from '../../card-surface';

export interface Sponsor {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
    }
  }
}

export interface SponsorTier {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    sponsors: Sponsor[];
    isCenter?: boolean;
  }
}

export interface CurrentSponsorsSectionProps {
  title: string;
  description: ReactNode;
  sponsorTiers: SponsorTier[];
}

export default function CurrentSponsorsSection({
  title,
  description,
  sponsorTiers,
}: Readonly<CurrentSponsorsSectionProps>) {

  return (
    <section className="bg-gray-5">
      <div className='flex flex-col gap-8 max-w-[1200px] mx-auto px-6 py-[64px]'>
        <Subtitle weight="light" size="lg">{title}</Subtitle>

        <Paragraph as="div" weight='light' size="lg">
          {description}
        </Paragraph>

        <div className="flex flex-col gap-6">
          {sponsorTiers?.map(({ fields, sys }, index) => {
            const { title, sponsors, isCenter } = fields;

            return (
              <div key={`${index}-${sys.id}`}>
                <CardSurface variant='primary' className='flex flex-col gap-6 px-8 py-4 items-center'>
                  <Subtitle className='text-center' weight='light' size="lg">{title}</Subtitle>
                  <div className={`flex justify-center ${isCenter ? 'md:justify-center' : "md:md:justify-start"} flex-wrap gap-5 w-full`}>
                    {sponsors.map(({ fields, sys }, index) => {
                      const { title, file } = fields;
                      return (
                        <label htmlFor={title} className='cursor-pointer' key={`${index}-${sys.id}`}>
                          <picture>
                            <img src={file.url} alt={title} height={130} width={250} />
                          </picture>
                        </label>
                      )
                    })}
                  </div>
                </CardSurface>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
