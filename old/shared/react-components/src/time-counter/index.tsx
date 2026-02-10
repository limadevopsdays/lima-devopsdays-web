import CardSurface from '../card-surface';
import { ComponentProps, ElementType } from 'react';
import TimePart from '../time-part';
import Separator from '../separator';

export interface TimerCounterOwnProps {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  daysLabel?: string;
  hoursLabel?: string;
  minutesLabel?: string;
  secondsLabel?: string;
  direction?: 'vertical' | 'horizontal';
}


function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export default function TimeCounter<T extends ElementType = 'div'>(
  {
    days, hours, minutes, seconds,
    daysLabel = 'Days',
    hoursLabel = 'Hours',
    minutesLabel = 'Minutes',
    secondsLabel = 'Seconds',
    direction = 'horizontal',
    className = '',
    ...props
  }: ComponentProps<typeof CardSurface<T>> & TimerCounterOwnProps & { className?: string }
) {
  return (
    <CardSurface
      className={`flex ${direction === 'vertical' ? 'flex-col' : ''} gap-4 items-center justify-center w-fit p-4 md:px-9 ${className ?? ''}`.trim()}
      {...props}
    >

      {isValidNumber(days) && <>
        <TimePart value={days} label={daysLabel} />
        <Separator direction={direction} />
      </>
      }
      {isValidNumber(hours) &&
       <>
        <TimePart value={hours} label={hoursLabel} />
        <Separator direction={direction} />
       </>
      }
      {isValidNumber(minutes) &&
        <>
          <TimePart value={minutes} label={minutesLabel} />
          <Separator direction={direction} />
        </>
      }
      {isValidNumber(seconds) && <TimePart value={seconds} label={secondsLabel} />}

    </CardSurface>
  );
}
