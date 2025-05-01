import type { Meta, StoryObj } from '@storybook/react';
import TimePart from '.';

const meta: Meta<typeof TimePart> = {
  title: 'Atoms/TimePart',
  component: TimePart,
  tags: ['autodocs'],
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default: StoryObj<typeof TimePart> = {
  args: {
    value: 7,
    label: 'Days',
  },
};

export const TwoDigits: StoryObj<typeof TimePart> = {
  args: {
    value: 3,
    label: 'Hours',
  },
};

export const CustomLabel: StoryObj<typeof TimePart> = {
  args: {
    value: 15,
    label: 'Minutos',
  },
};
