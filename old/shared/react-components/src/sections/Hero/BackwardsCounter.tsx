'use client';

import { useCountdown } from "react-hooks/use-countdown";

import TimeCounter from '../../time-counter'
import { useEffect, useState } from "react";

export interface BackwardsCounterProps {
  readonly targetDate: string
}

export default function BackwardsCounter({
  targetDate
}: BackwardsCounterProps) {
  const [inClient, setInClient] = useState(false);

  useEffect(() => {
    setInClient(true);
  }, []);

  const timeLeft = useCountdown(targetDate);

  const isVisible = Object.values(timeLeft).some(Boolean) && inClient;

  return <TimeCounter
    daysLabel="Días"
    hoursLabel="Horas"
    minutesLabel="Minutos"
    secondsLabel="Segundos"
    className={`bg-gray-3 transition-all ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-1/4'}`}
    {...timeLeft}
  />
}
