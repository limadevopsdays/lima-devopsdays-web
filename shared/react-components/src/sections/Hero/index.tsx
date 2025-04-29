import Paragraph from '../../paragraph';
import Button from '../../button';

export interface HeroSectionProps {
  title: string;
  imageSrc: string;
  dateText: string;
  locationText: string;
  altText: string;
  ctaText: string;
  ctaUrl: string;
}

export default function HeroSection({
  title = "Sponsors",
  dateText,
  locationText,
  imageSrc,
  altText,
  ctaText,
  ctaUrl
}: HeroSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <picture>
        <img src={imageSrc} alt={altText} width={204} height={151} />
      </picture>

      <div className='flex flex-col gap-6'>
        <h1 className='text-3xl md:text-8xl bg-linear-[90deg,#A150BF,#7B50BF,#2DABD1,#DAF7FB] text-transparent bg-clip-text font-bold'>{title}</h1>

        <div>
          <Paragraph className='text-base leading-5 md:text-2xl md:leading-8'>{dateText}</Paragraph>
          <Paragraph className='text-base leading-5 md:text-2xl md:leading-8' color="highlight" >{locationText}</Paragraph>
        </div>

        {/* TODO: Add counter */}

        <Button width='maxContent' size='large' as="a" href={ctaUrl} variant="primary" >
          {ctaText}
        </Button>
      </div>
    </section>
  );
}