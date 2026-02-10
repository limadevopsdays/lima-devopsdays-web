import { Meta, StoryObj } from '@storybook/react';
import SpeakerCard from './index';
import TwitterIcon from '../icons/Twitter';
import InstagramIcon from '../icons/Instagram';
import LinkedinIcon from '../icons/Linkedin';

export default {
  decorators: [Story => <div className="bg-gray-4 p-12 rounded-md"><Story /></div>],
  title: 'Molecules/SpeakerCard',
  component: SpeakerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof SpeakerCard>;

type Story = StoryObj<typeof SpeakerCard>;

export const Default: Story = {
  args: {
    imageSrc: 'https://picsum.photos/id/238/285/285',
    title: 'John Doe',
    description: 'Product Manager',
    socialNetworks: [
      { url: 'https://twitter.com/johndoe', icon: <TwitterIcon /> },
      { url: 'https://instagram.com/johndoe', icon: <InstagramIcon /> },
      { url: 'https://linkedin.com/in/johndoe', icon: <LinkedinIcon /> },
    ],
    tags: ['Google'],
  },
};