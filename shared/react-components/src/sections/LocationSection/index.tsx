import { ReactNode } from 'react';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import { defaultParser } from '../../utils';

export interface LocationSectionProps {
  title: string;
  description: ReactNode;
  logoUrl: string;
  logoAlt: string;
}

export default function LocationSection({
  title,
  description,
  logoUrl,
  logoAlt
}: Readonly<LocationSectionProps>) {
  return (
    <section id="location" className='bg-gray-4'>
      <div className='flex flex-col items-center container-custom gap-9 px-5 py-16'>
        <Subtitle size='lg'>{title}</Subtitle>

        <div className='flex flex-col md:flex-row gap-8 '>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1006387742827!2d-76.960532!3d-12.1052625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7686994faa1%3A0x267fc6c15b492e7!2sESAN%20Centro%20de%20Convenciones!5e0!3m2!1ses-419!2spe!4v1746413863421!5m2!1ses-419!2spe"
            width="591"
            height="300"
            className='border-0 rounded-3xl w-full'
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>

          <picture className='w-full'>
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
