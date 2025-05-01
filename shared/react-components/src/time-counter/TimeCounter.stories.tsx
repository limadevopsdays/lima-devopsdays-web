import type { Meta, StoryObj } from '@storybook/react';
import TimeCounter from '.';

const meta: Meta<typeof TimeCounter> = {
  title: 'Molecules/TimeCounter',
  component: TimeCounter,
  tags: ['autodocs'],
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default: StoryObj<typeof TimeCounter> = {
  args: {
    days: 2,
    hours: 5,
    minutes: 30,
    seconds: 12,
  },
};

export const CustomLabels: StoryObj<typeof TimeCounter> = {
  args: {
    days: 1,
    hours: 2,
    minutes: 3,
    seconds: 4,
    daysLabel: 'Días',
    hoursLabel: 'Horas',
    minutesLabel: 'Minutos',
    secondsLabel: 'Segundos',
  },
};

export const MissingParts: StoryObj<typeof TimeCounter> = {
  args: {
    hours: 8,
    seconds: 45,
  },
};

export const HorizontalVariant: StoryObj<typeof TimeCounter> = {
  args: {
    days: 1,
    hours: 2,
    minutes: 3,
    seconds: 4,
    direction: 'vertical'
  },
};
