import type { Meta, StoryObj } from '@storybook/react';
import AboutUsSection from './index';
import HandShake from '../../icons/HandShake';
import LigthBulb from '../../icons/LigthBulb';
import Stocks from '../../icons/Stocks';

const meta: Meta<typeof AboutUsSection> = {
  decorators: [Story => <div className="bg-gray-5 p-4 rounded-md"><Story /></div>],
  title: 'Sections/AboutUsSection',
  component: AboutUsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

// TODO: Check props 
export const Default: Story = {
  args: {
    title: 'About Us',
    statistics: [
      { fields: { value: '30K+', title: 'Global Attendees' } },
      { fields: { value: '60+', title: 'Organizing Countries' } },
      { fields: { value: '15+', title: 'Years Building Community' } },
    ],
    ourValues: {
      fields: {
        title: 'Our Values',
        coreValues: [
          {
            sys: { id: 'collaboration' },
            fields: {
              iconName: 'HandShake',
              title: 'Collaboration',
              description: 'We foster strong partnerships and teamwork.',
            },
          },
          {
            sys: { id: 'innovation' },
            fields: {
              iconName: 'LigthBulb',
              title: 'Innovation',
              description: 'Bright ideas drive our progress.',
            },
          },
          {
            sys: { id: 'growth' },
            fields: {
              iconName: 'Stocks',
              title: 'Growth',
              description: 'We help you reach new heights.',
            },
          },
        ],
      },
    },
    description: (
      <>
        <p className="mb-4 text-lg">
          DevOpsDays is a global conference on DevOps practices, tools, and culture. It brings together professionals to share knowledge and experiences.
        </p>
        <p className="mb-4 text-lg">
          Our mission at DevOpsDays Lima is to <span className="text-cyan-base">drive technological evolution</span> with an event that connects professionals, fosters the exchange of DevOps knowledge, and reinforces a culture of continuous innovation based on real-world experiences.
        </p>
      </>
    ),
    logo: {
      fields: {
        file: {
          url: '/logo.svg',
        },
        title: 'logo',
      },
    },
  },
};

export const WithoutLogo: Story = {
  args: {
    ...Default.args,
    logo: undefined,
  },
};