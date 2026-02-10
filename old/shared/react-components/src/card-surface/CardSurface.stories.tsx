import type { Meta, StoryObj } from '@storybook/react';
import CardSurface from '.';

const meta = {
  title: 'Atoms/CardSurface',
  component: CardSurface,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CardSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'This is a primary card surface',
    variant: 'primary',
    className: 'p-4'
  },
};

export const Secondary: Story = {
  args: {
    children: 'This is a secondary card surface',
    variant: 'secondary',
    className: 'p-4'
  },
};
