import { ReactNode } from 'react';
import InfoStackGroup, { InfoStackGroupItem } from '../../info-stack-group';
import CardSurface from '../../card-surface';
import SimpleCard from '../../simple-card';
import Subtitle from '../../subtitle';

export interface StatisticProps {
  value: string;
  description: string;
}

export interface AboutUsSectionProps {
  title: string;
  statistics: StatisticProps[];
  valuesTitle: string;
  values: InfoStackGroupItem[];
  description: ReactNode;
  logoImage?: ReactNode;
}

export default function AboutUsSection({
  title,
  statistics,
  valuesTitle,
  values,
  description,
  logoImage,
}: Readonly<AboutUsSectionProps>) {
  return (
    <section className="w-full py-12 text-white">
      <Subtitle className='mb-6' weight='light' size='lg' >{title}</Subtitle>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {statistics.map(({ description, value }, index) => (
          <SimpleCard
            key={index}
            title={value}
            description={description}
          />
        ))}
      </div>

      <InfoStackGroup
        title={valuesTitle}
        items={values}
        cardSurfaceProps={{
          variant: 'primary'
        }}
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {logoImage && (
          <CardSurface variant='primary' className="flex items-center justify-center p-2">
            {logoImage}
          </CardSurface>
        )}

        <CardSurface className='p-9' variant='primary' >
          {description}
        </CardSurface>
      </div>
    </section>
  );
}
