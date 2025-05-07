import type { Meta, StoryObj } from '@storybook/react';
import CallForSpeakersSection from './index';
import Paragraph from '../../paragraph';

const meta = {
  decorators: [Story => <div className="bg-gray-4 p-4 rounded-md"><Story /></div>],
  title: 'Sections/CallForSpeakersSection',
  component: CallForSpeakersSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CallForSpeakersSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Call for Speakers',
    description: <>Si tienes una idea innovadora, una experiencia única o una<br /> visión fresca sobre los siguientes temas <Paragraph color="highlight" as="span">¡queremos escucharte!</Paragraph><br /> Envíanos tu propuesta y sé parte de este gran evento.</>,
    topics: [
      ['Agile', 'CI/CD', 'Continuous Testing', 'Continuous Security'],
      ['Infrastructure as Code', 'Site Reliability Engineering', 'AI & MLOps'],
      ['Platform Engineering', 'CloudOps', 'Culture Transformation'],
    ],
    ctaText: 'Submit your proposal',
    ctaHref: 'https://example.com',
  },
};