/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import TimeCounter from '.';
import dayjs from 'dayjs';
import { useCountdown } from 'react-hooks/use-countdown';

import  duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

const targetDate = '2025-05-04T04:22:06';

export const LiveCountdown: StoryObj<typeof TimeCounter> = {
  render: (args) => {
    const time = useCountdown(targetDate);
    return <TimeCounter {...args} {...time} />;
  },
  args: {},
};
