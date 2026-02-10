import Paragraph from '../../paragraph';
import Button from '../../button';
import BackwardsCounter from './BackwardsCounter';

export interface HeroSectionProps {
  title: string;
  date: string;
  placeText: string;
  ctaText: string;
  imgURL?: string;
  logoTitle?: string;
  ctaHref: string;
  showCta?: boolean;
  mainImageURL?: string;
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
  ctaText,
  logoTitle,
  ctaHref,
  showCta,
  mainImageURL
}: Readonly<HeroSectionProps>) {

  return (
    <section className='bg-gray-4'>
      <div className="flex flex-col-reverse md:flex-row md:items-center gap-4 max-w-[1200px] mx-auto px-6 pb-[120px] pt-[80px]">
        <div className='flex flex-col gap-6'>
          <h1 className='text-3xl md:text-6xl lg:text-8xl bg-linear-[90deg,#A150BF,#7B50BF,#2DABD1,#DAF7FB] text-transparent bg-clip-text font-bold'>{title}</h1>

          <div>
            <Paragraph className='text-base leading-5 md:text-2xl md:leading-8'>{formatDate(date)}</Paragraph>
            <Paragraph className='text-base leading-5 md:text-2xl md:leading-8' color="highlight" >{placeText}</Paragraph>
          </div>

          <BackwardsCounter targetDate={date} />
          {
            showCta && (
              <Button width='maxContent' size='large' as="a" href={ctaHref} variant="primary" >
                {ctaText}
              </Button>
            )
          }
        </div>
        <picture>
          <img src={mainImageURL} alt={logoTitle} className='w-full max-w-[525px] min-w-[344px]' />
        </picture>
      </div>
    </section>
  );
}
