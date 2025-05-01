import Paragraph from '../../paragraph';
import Button from '../../button';

export interface HeroSectionProps {
  title: string;
  date: string;
  placeText: string;
  logo: {
    url: string;
    title: string;
  }
  ctaText: string;
  ctaUrl: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const weekdays = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles',
    'Jueves', 'Viernes', 'Sábado'
  ];

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${weekday} ${day} de ${month}`;
}

export default function HeroSection({
  title = "Sponsors",
  date,
  placeText,
  logo,
  ctaText,
  ctaUrl
}: HeroSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <picture>
        <img src={logo.url} alt={logo.title} width={204} height={151} />
      </picture>

      <div className='flex flex-col gap-6'>
        <h1 className='text-3xl md:text-8xl bg-linear-[90deg,#A150BF,#7B50BF,#2DABD1,#DAF7FB] text-transparent bg-clip-text font-bold'>{title}</h1>

        <div>
          <Paragraph className='text-base leading-5 md:text-2xl md:leading-8'>{formatDate(date)}</Paragraph>
          <Paragraph className='text-base leading-5 md:text-2xl md:leading-8' color="highlight" >{placeText}</Paragraph>
        </div>

        {/* TODO: Add counter */}

        <Button width='maxContent' size='large' as="a" href={ctaUrl} variant="primary" >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}