import { Meta, StoryObj } from '@storybook/react';
import SponsorPricingTableSectionProps from './index';
import Paragraph from '../../paragraph';

export default {
  decorators: [Story => <div className="bg-gray-4 p-12 rounded-md"><Story /></div>],
  title: 'Sections/SponsorPricingTableSectionProps',
  component: SponsorPricingTableSectionProps,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof SponsorPricingTableSectionProps>;

type Story = StoryObj<typeof SponsorPricingTableSectionProps>;

export const Default: Story = {
  args: {
    title: 'Sponsors',
    description: <>
      Todos los sponsor contarán con logos en <Paragraph size="xl" as="span" color="highlight">web, banners,materiales promocionales y correos.</Paragraph><br />
      Asi como presencia en pantallas <Paragraph size="xl" as="span" color="highlight"> dentro del evento y durante los descansos</Paragraph>
    </>,
    mediaKitLinks: [
      {
        text: 'Descargar Media Kit',
        href: '#',
        iconName: 'Download',
      },
      {
        text: 'Descargar Media Kit 2',
        href: '#',
        iconName: 'Download',
      }
    ],
  },
};
