import { Meta, StoryObj } from '@storybook/react';
import SpeakersSection from './index';
import TwitterIcon from '../../icons/Twitter';
import InstagramIcon from '../../icons/Instagram';
import LinkedinIcon from '../../icons/Linkedin';

export default {
  decorators: [Story => <div className="bg-gray-4 p-12 rounded-md"><Story /></div>],
  title: 'Sections/SpeakersSection',
  component: SpeakersSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} as Meta<typeof SpeakersSection>;

type Story = StoryObj<typeof SpeakersSection>;

export const Default: Story = {
  args: {
    title: 'Speakers',
    speakers: [
      {
        id: '1',
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
      {
        id: '2',
        imageSrc: 'https://picsum.photos/id/239/285/285',
        title: 'Jane Smith',
        description: 'Software Engineer',
        socialNetworks: [
          { url: 'https://twitter.com/janesmith', icon: <TwitterIcon /> },
          { url: 'https://instagram.com/janesmith', icon: <InstagramIcon /> },
          { url: 'https://linkedin.com/in/janesmith', icon: <LinkedinIcon /> },
        ],
        tags: ['Microsoft'],
      },
      {
        id: '3',
        imageSrc: 'https://picsum.photos/id/240/285/285',
        title: 'Alice Johnson',
        description: 'UX Designer',
        socialNetworks: [
          { url: 'https://twitter.com/alicejohnson', icon: <TwitterIcon /> },
          { url: 'https://instagram.com/alicejohnson', icon: <InstagramIcon /> },
          { url: 'https://linkedin.com/in/alicejohnson', icon: <LinkedinIcon /> },
        ],
        tags: ['Adobe'],
      },
      {
        id: '4',
        imageSrc: 'https://picsum.photos/id/241/285/285',
        title: 'Bob Brown',
        description: 'DevOps Engineer',
        socialNetworks: [
          { url: 'https://twitter.com/bobbrown', icon: <TwitterIcon /> },
          { url: 'https://instagram.com/bobbrown', icon: <InstagramIcon /> },
          { url: 'https://linkedin.com/in/bobbrown', icon: <LinkedinIcon /> },
        ],
        tags: ['AWS'],
      },
      {
        id: '5',
        imageSrc: 'https://picsum.photos/id/242/285/285',
        title: 'Chris Green',
        description: 'Data Scientist',
        socialNetworks: [
          { url: 'https://twitter.com/chrisgreen', icon: <TwitterIcon /> },
          { url: 'https://instagram.com/chrisgreen', icon: <InstagramIcon /> },
          { url: 'https://linkedin.com/in/chrisgreen', icon: <LinkedinIcon /> },
        ],
        tags: ['Facebook'],
      },
      {
        id: '6',
        imageSrc: 'https://picsum.photos/id/243/285/285',
        title: 'Emma White',
        description: 'AI Researcher',
        socialNetworks: [
          { url: 'https://twitter.com/emmawhite', icon: <TwitterIcon /> },
          { url: 'https://instagram.com/emmawhite', icon: <InstagramIcon /> },
          { url: 'https://linkedin.com/in/emmawhite', icon: <LinkedinIcon /> },
        ],
        tags: ['OpenAI'],
      },
      {
        id: '7',
        imageSrc: 'https://picsum.photos/id/244/285/285',
        title: 'Liam Black',
        description: 'Cloud Architect',
        socialNetworks: [
          { url: 'https://twitter.com/liamblack', icon: <TwitterIcon /> },
          { url: 'https://instagram.com/liamblack', icon: <InstagramIcon /> },
          { url: 'https://linkedin.com/in/liamblack', icon: <LinkedinIcon /> },
        ],
        tags: ['Azure'],
      },
      {
        id: '8',
        imageSrc: 'https://picsum.photos/id/243/285/285',
        title: 'Sophia Blue',
        description: 'Frontend Developer',
        socialNetworks: [
          { url: 'https://twitter.com/sophiablue', icon: <TwitterIcon /> },
          { url: 'https://instagram.com/sophiablue', icon: <InstagramIcon /> },
          { url: 'https://linkedin.com/in/sophiablue', icon: <LinkedinIcon /> },
        ],
        tags: ['Netflix'],
      },
    ],
  },
};