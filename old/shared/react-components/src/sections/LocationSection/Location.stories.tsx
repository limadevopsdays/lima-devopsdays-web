import type { Meta, StoryObj } from '@storybook/react';
import LocationSection from './index';

const meta = {
  decorators: [Story => <div className="bg-gray-4 p-4 rounded-md"><Story /></div>],
  title: 'Sections/LocationSection',
  component: LocationSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Location',
    description: <>El Centro de Convenciones de la Universidad ESAN<br /> será el escenario donde convergerán la tecnología, la inspiración y las grandes ideas.</>,
    logoAlt: 'Logo de la Universidad ESAN',
    logoUrl: 'https://picsum.photos/id/249/591/300',
  },
};