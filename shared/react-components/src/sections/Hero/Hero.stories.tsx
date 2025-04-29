import { Meta, StoryObj } from '@storybook/react';
import HeroSection from './index';

export default {
  decorators: [Story => <div className="bg-gray-5 py-8 px-4 rounded-md mx-auto max-w-[1400px]"><Story /></div>],
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} as Meta<typeof HeroSection>;

type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    title: 'DevOps Days Lima',
    dateText: 'Jueves 21 de Agosto',
    locationText: 'ESAN Centro de Convenciones',
    imageSrc: './logo.svg',
    altText: 'Hero Image',
    ctaText: 'Inscribirme',
    ctaUrl: 'https://example.com/tickets',
  },
};