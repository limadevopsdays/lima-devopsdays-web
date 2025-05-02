import Paragraph from '../../paragraph';
import Button from '../../button';
import BackwardsCounter from './BackwardsCounter';

export interface HeroSectionProps {
  title: string;
  date: string;
  placeText: string;
  logo: Record<string, Record<string, unknown>>;
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
  ctaUrl,
}: Readonly<HeroSectionProps>) {

  const { title: logoTitle } = logo.fields;

  return (
    <section className='bg-gray-4'>
      <div className="flex flex-col gap-4 max-w-[1200px] mx-auto px-6 pb-[120px] pt-[80px]">
        <picture>
          <img src={"/logo.svg"} alt={String(logoTitle)} width={204} height={151} />
        </picture>

        <div className='flex flex-col gap-6'>
          <h1 className='text-3xl md:text-8xl bg-linear-[90deg,#A150BF,#7B50BF,#2DABD1,#DAF7FB] text-transparent bg-clip-text font-bold'>{title}</h1>

          <div>
            <Paragraph className='text-base leading-5 md:text-2xl md:leading-8'>{formatDate(date)}</Paragraph>
            <Paragraph className='text-base leading-5 md:text-2xl md:leading-8' color="highlight" >{placeText}</Paragraph>
          </div>

          <BackwardsCounter targetDate={date} />
          <Button width='maxContent' size='large' as="a" href={ctaUrl} variant="primary" >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
