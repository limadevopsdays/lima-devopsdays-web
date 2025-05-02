import { ReactNode } from 'react';
import InfoStackGroup, { InfoStackGroupItem } from '../../info-stack-group';
import CardSurface from '../../card-surface';
import SimpleCard from '../../simple-card';
import Subtitle from '../../subtitle';

import HandShake from '../../icons/HandShake';
import LigthBulb from '../../icons/LigthBulb';
import Stocks from '../../icons/Stocks';

import { defaultParser } from '../../utils';

export interface StatisticProps {
  fields: {
    title: string;
    value: string;
  }
}

export interface CoreValue {
  fields: {
    description: string;
    iconName: string;
    title: string;
  },
  sys: {
    id: string;
  }
}

export interface AboutUsSectionProps {
  title: string;
  statistics: StatisticProps[];
  ourValues: {
    fields: {
      title: string;
      coreValues: CoreValue[];
    }
  },
  logo: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    }
  };
  description: ReactNode;
}

const iconsByName: Record<string, typeof HandShake> = {
  HandShake: HandShake,
  LigthBulb: LigthBulb,
  Stocks: Stocks
}

export default function AboutUsSection({
  title,
  statistics,
  description,
  logo,
  ourValues
}: Readonly<AboutUsSectionProps>) {

  const items: InfoStackGroupItem[] = ourValues.fields.coreValues.map(({ fields, sys }, index) => {
    const { iconName, title, description } = fields

    const Icon = iconsByName[iconName]

    return {
      id: `${index}-${sys.id}`,
      icon: Icon ? <Icon className="bg-cyan-base rounded-md p-1" width={32} height={32} /> : null,
      title,
      description
    }
  })

  return (
    <section className="bg-gray-5">
      <div className="w-full py-12 text-white max-w-[1200px] mx-auto px-4">
        <Subtitle className='mb-6' weight='light' size='lg' >{title}</Subtitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {statistics.map(({ fields }, index) => {
            const { title, value } = fields

            return (
              <SimpleCard
                key={index}
                title={value}
                description={title}
              />
            )
          })}
        </div>

        <InfoStackGroup
          title={ourValues.fields.title}
          items={items}
          cardSurfaceProps={{
            variant: 'primary'
          }}
          className="mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardSurface variant='primary' className="flex items-center justify-center p-2">
            <img
              src={logo.fields.file.url}
              alt={logo.fields.title}
              width={215}
              height={286}
              className="w-full h-auto"
            />
          </CardSurface>

          <CardSurface className='p-9' variant='primary' >
            {typeof description === 'string' ? defaultParser.parse(description) : description}
          </CardSurface>
        </div>
      </div>
    </section>
  );
}
