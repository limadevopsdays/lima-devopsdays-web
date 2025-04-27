import type { Meta, StoryObj } from '@storybook/react';
import Panel from './index';

const meta = {
  title: 'Atoms/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Agile',
  },
};
