import { Meta, StoryObj } from '@storybook/react';
import SponsorPricingTable from './index';

export default {
  decorators: [Story => <div className="bg-gray-4 p-12 rounded-md"><Story /></div>],
  title: 'Molecules/SponsorPricingTable',
  component: SponsorPricingTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof SponsorPricingTable>;

type Story = StoryObj<typeof SponsorPricingTable>;

export const Default: Story = {

};
