import { ReactNode } from 'react';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import { defaultParser } from '../../utils';

export interface LocationSectionProps {
  title: string;
  description: ReactNode;
  logoUrl: string;
  logoAlt: string;
  isHidden?: boolean;
  iframeUrl?: string;
}

export default function LocationSection({
  title,
  description,
  logoUrl,
  logoAlt,
  iframeUrl,
  isHidden = false,
}: Readonly<LocationSectionProps>) {
  return (
    <section hidden={isHidden} id="location" className='bg-gray-4'>
      <div className='flex flex-col items-center container-custom gap-9 px-5 py-16'>
        <Subtitle size='lg'>{title}</Subtitle>

        <div className='flex flex-col md:flex-row gap-8 '>
          <iframe src={iframeUrl} width="591" height="300" className='border-0 rounded-3xl' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

          <picture>
            <img className='rounded-3xl w-full h-full object-cover' src={logoUrl} alt={logoAlt} width={591} height={300} />
          </picture>
        </div>

        <Paragraph className='text-center'>
          {typeof description === 'string' ? defaultParser.parse(description) : description}
        </Paragraph>
      </div>
    </section>
  );
}
