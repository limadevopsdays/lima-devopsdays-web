import { Meta, StoryObj } from '@storybook/react';
import OrganizationMemberCard from './index';

export default {
  decorators: [Story => <div className="bg-gray-4 p-12 rounded-md"><Story /></div>],
  title: 'Molecules/OrganizationMemberCard',
  component: OrganizationMemberCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof OrganizationMemberCard>;

type Story = StoryObj<typeof OrganizationMemberCard>;

export const Default: Story = {
  args: {
    imageSrc: 'https://picsum.photos/id/238/285/285',
    name: 'John Doe',
    role: 'Product Manager',
  },
};
