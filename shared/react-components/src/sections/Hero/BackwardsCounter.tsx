'use client';

import { useCountdown } from "react-hooks/use-countdown";

import TimeCounter from '../../time-counter'

export interface BackwardsCounterProps {
  readonly targetDate: string
}

export default function BackwardsCounter({
  targetDate
}: BackwardsCounterProps) {
  const timeLeft = useCountdown(targetDate);

  return <TimeCounter {...timeLeft} />
}
