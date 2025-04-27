import type { Meta, StoryObj } from '@storybook/react';
import SimpleCard from '.';

const meta = {
  title: 'Molecules/SimpleCard',
  component: SimpleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SimpleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a description for the simple card.',
  },
};
