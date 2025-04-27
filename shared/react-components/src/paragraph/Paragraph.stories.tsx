import { Meta, StoryObj } from '@storybook/react';
import Paragraph from '.'

const meta = {
  title: 'Atoms/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AsLabel: Story = {
  args: {
    color: 'primary',
    weight: 'regular',
    style: 'normal',
    children: 'Ingresa tu documento de identidad',
    as: 'label',
  }
}

