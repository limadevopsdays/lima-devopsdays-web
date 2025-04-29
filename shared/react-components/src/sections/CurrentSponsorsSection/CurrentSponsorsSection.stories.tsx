import { Meta, StoryObj } from '@storybook/react';
import CurrentSponsorsSection from './index';

export default {
  decorators: [Story => <div className="bg-gray-5 py-8 px-4 rounded-md mx-auto max-w-[1400px]"><Story /></div>],
  title: 'Sections/CurrentSponsorsSection',
  component: CurrentSponsorsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} as Meta<typeof CurrentSponsorsSection>;

type Story = StoryObj<typeof CurrentSponsorsSection>;

export const Default: Story = {
  args: {
    title: 'Our Sponsors',
    description: <>
      DevOps Days Lima no sería posible sin el valioso apoyo de organizaciones líderes en el país. Estas empresas no solo contribuyen a hacer realidad este encuentro, sino que comparten nuestra visión de impulsar la excelencia operativa y la cultura de colaboración en el desarrollo de software
    </>,
    tiers: [
      {
        id: '1',
        title: 'Gold Sponsors',
        sponsors: [
          { id: 'g1', imageSrc: 'https://picsum.photos/id/243/183/100', altText: 'Gold Sponsor 1' },
          { id: 'g2', imageSrc: 'https://picsum.photos/id/244/183/100', altText: 'Gold Sponsor 2' },
          { id: 'g3', imageSrc: 'https://picsum.photos/id/249/183/100', altText: 'Gold Sponsor 3' },
          { id: 'g4', imageSrc: 'https://picsum.photos/id/244/183/100', altText: 'Gold Sponsor 4' },
          { id: 'g5', imageSrc: 'https://picsum.photos/id/247/183/100', altText: 'Gold Sponsor 5' },
          { id: 'g6', imageSrc: 'https://picsum.photos/id/248/183/100', altText: 'Gold Sponsor 6' },
          { id: 'g7', imageSrc: 'https://picsum.photos/id/249/183/100', altText: 'Gold Sponsor 7' },
          { id: 'g8', imageSrc: 'https://picsum.photos/id/250/183/100', altText: 'Gold Sponsor 8' },
          { id: 'g9', imageSrc: 'https://picsum.photos/id/251/183/100', altText: 'Gold Sponsor 9' },
          { id: 'g10', imageSrc: 'https://picsum.photos/id/252/183/100', altText: 'Gold Sponsor 10' },
        ],
      },
      {
        id: '2',
        title: 'Silver Sponsors',
        sponsors: [
          { id: 's1', imageSrc: 'https://picsum.photos/id/253/183/100', altText: 'Silver Sponsor 1' },
          { id: 's2', imageSrc: 'https://picsum.photos/id/254/183/100', altText: 'Silver Sponsor 2' },
        ],
      },
      {
        id: '3',
        title: 'Bronze Sponsors',
        sponsors: [
          { id: 'b1', imageSrc: 'https://picsum.photos/id/255/183/100', altText: 'Bronze Sponsor 1' },
          { id: 'b2', imageSrc: 'https://picsum.photos/id/256/183/100', altText: 'Bronze Sponsor 2' },
          { id: 'b3', imageSrc: 'https://picsum.photos/id/257/183/100', altText: 'Bronze Sponsor 3' },
          { id: 'b4', imageSrc: 'https://picsum.photos/id/258/183/100', altText: 'Bronze Sponsor 4' },
          { id: 'b5', imageSrc: 'https://picsum.photos/id/259/183/100', altText: 'Bronze Sponsor 5' },
        ],
      },
    ],
  },
};