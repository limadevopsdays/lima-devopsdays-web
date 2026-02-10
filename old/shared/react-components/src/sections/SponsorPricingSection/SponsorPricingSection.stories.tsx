import type { Meta, StoryObj } from '@storybook/react';
import SponsorPricingSection from './index';
import Paragraph from '../../paragraph';

const meta = {
  decorators: [Story => <div className="bg-gray-4 p-4 rounded-md max-w-[1400px] mx-auto"><Story /></div>],
  title: 'Sections/SponsorPricingSection',
  component: SponsorPricingSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SponsorPricingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sponsors',
    description: <>
      Todos los sponsor contarán con logos en <Paragraph size="xl" as="span" color="highlight">web, banners,materiales promocionales y correos.</Paragraph><br />
      Asi como presencia en pantallas <Paragraph size="xl" as="span" color="highlight"> dentro del evento y durante los descansos</Paragraph>
    </>,
    ctaHref: '#',
    ctaText: 'Quiero ser sponsor',
    pricingTiers: [
      {
        name: 'Bronce',
        description: 'Sponsor Básico',
        price: '$1,500 USD',
        tier: 'bronze',
        benefits: [
          'Entradas cortesía: 2',
          'Descuento entradas corporativas (Max. 10): 5%',
          'Mención en redes sociales',
        ],
      },
      {
        name: 'Plata',
        description: 'Sponsor Avanzado',
        price: '$3,000 USD',
        tier: 'silver',
        benefits: [
          'Entradas cortesía: 4',
          'Descuento entradas corporativas (Max. 10): 10%',
          'Post en redes sociales (LinkedIn e instagram)',
          'Mención del presentador',
          'Stand pequeño (1mx1m)',
          'Presentación en escenario central: 2 min.',
        ],
      },
      {
        name: 'Oro',
        description: 'Sponsor Deluxe',
        price: '$5,000 USD',
        tier: 'gold',
        benefits: [
          'Entradas cortesía: 8',
          'Descuento entradas corporativas (Max. 10): 20%',
          'Post Destacado en redes sociales (LinkedIn e instagram)',
          'Mención del presentador',
          'Stand grande (3mx2m)',
          'Presentación en escenario central: 5 min.',
        ],
      },
    ],
  },
};


export const BuyTickets: Story = {
  args: {
    title: 'Adquiere tu entrada',
    description: "¡Únete a la revolución tecnológica y sé el protagonista del cambio!",
    showCta: false,
    pricingTiers: [
      {
        name: 'Early Bird',
        description: '¡Aprovecha el precio más bajo! Solo 100 entradas.',
        price: '$45 USD',
        tier: 'violet',
        benefits: [
          'Acceso general al evento',
          'Acceso al área de networking',
          'Acceso a los talleres',
          'Lanyard del evento',
          'Polo exclusivo del evento',
          'Sorteo exclusivo',
          'Merchandise oficial',
          'Acceso a productos y servicios exclusivos',
        ],
        showCta: true,
        ctaText: 'Comprar entrada',
        ctaHref: '#',
        disableCta: false,
      },
      {
        name: 'Entrada Normal',
        description: '¡No pierdas la oportunidad de ser parte del evento!',
        price: '$60 USD',
        tier: 'silveGray',
        benefits: [
          'Acceso general al evento',
          'Acceso al área de networking',
          'Acceso a los talleres',
          'Lanyard del evento',
          'Polo exclusivo del evento',
          'Sorteo exclusivo',
          'Merchandise oficial',
          'Acceso a productos y servicios exclusivos',
        ],
        showCta: true,
        ctaText: 'Comprar entrada',
        ctaHref: '#',
        disableCta: true,
      },
    ],
  },
};
