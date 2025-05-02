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

    sponsorTiers: [
      {
        sys: { id: '1' },
        fields: {
          title: 'Gold Sponsors',
          sponsors: [
            {
              sys: { id: '1' },
              fields: {
                title: 'Gold Sponsor 1',
                file: {
                  url: 'https://picsum.photos/id/243/183/100',
                },
              },
            },
            {
              sys: { id: '2' },
              fields: {
                title: 'Gold Sponsor 2',
                file: {
                  url: 'https://picsum.photos/id/244/183/100',
                },
              },
            },
            {
              sys: { id: '3' },
              fields: {
                title: 'Gold Sponsor 3',
                file: {
                  url: 'https://picsum.photos/id/249/183/100',
                },
              },
            },
            {
              sys: { id: '4' },
              fields: {
                title: 'Gold Sponsor 4',
                file: {
                  url: 'https://picsum.photos/id/244/183/100',
                },
              },
            },
            {
              sys: { id: '5' },
              fields: {
                title: 'Gold Sponsor 5',
                file: {
                  url: 'https://picsum.photos/id/247/183/100',
                },
              },
            },
            {
              sys: { id: '6' },
              fields: {
                title: 'Gold Sponsor 6',
                file: {
                  url: 'https://picsum.photos/id/248/183/100',
                },
              },
            },
            {
              sys: { id: '7' },
              fields: {
                title: 'Gold Sponsor 7',
                file: {
                  url: 'https://picsum.photos/id/249/183/100',
                },
              },
            },
            {
              sys: { id: '8' },
              fields: {
                title: 'Gold Sponsor 8',
                file: {
                  url: 'https://picsum.photos/id/250/183/100',
                },
              },
            },
            {
              sys: { id: '9' },
              fields: {
                title: 'Gold Sponsor 9',
                file: {
                  url: 'https://picsum.photos/id/251/183/100',
                },
              },
            },
            {
              sys: { id: '10' },
              fields: {
                title: 'Gold Sponsor 10',
                file: {
                  url: 'https://picsum.photos/id/252/183/100',
                },
              },
            },
          ],
        }
      },
      {
        sys: { id: '2' },
        fields: {
          title: 'Silver Sponsors',
          sponsors: [
            {
              sys: { id: '1' },
              fields: {
                title: 'Silver Sponsor 1',
                file: {
                  url: 'https://picsum.photos/id/253/183/100',
                },
              },
            },
            {
              sys: { id: '2' },
              fields: {
                title: 'Silver Sponsor 2',
                file: {
                  url: 'https://picsum.photos/id/254/183/100',
                },
              },
            },
          ],
        }
      },
      {
        sys: { id: '3' },
        fields: {
          title: 'Bronze Sponsors',
          sponsors: [
            {
              sys: { id: '1' },
              fields: {
                title: 'Bronze Sponsor 1',
                file: {
                  url: 'https://picsum.photos/id/255/183/100',
                },
              },
            },
            {
              sys: { id: '2' },
              fields: {
                title: 'Bronze Sponsor 2',
                file: {
                  url: 'https://picsum.photos/id/256/183/100',
                },
              },
            },
            {
              sys: { id: '3' },
              fields: {
                title: 'Bronze Sponsor 3',
                file: {
                  url: 'https://picsum.photos/id/257/183/100',
                },
              },
            },
            {
              sys: { id: '4' },
              fields: {
                title: 'Bronze Sponsor 4',
                file: {
                  url: 'https://picsum.photos/id/258/183/100',
                },
              },
            },
            {
              sys: { id: '5' },
              fields: {
                title: 'Bronze Sponsor 5',
                file: {
                  url: 'https://picsum.photos/id/259/183/100',
                },
              },
            },
          ],
        }
      }
    ]
  },
};