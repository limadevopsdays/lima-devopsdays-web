import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

//TODO: evaluate to extend to backward countdown and forward countdown
export function useCountdown(targetDate: string | Date | dayjs.Dayjs) {
  const [time, setTime] = useState(() => {
    const now = dayjs();
    const target = dayjs(targetDate);
    const diff = target.diff(now);
    const dur = dayjs.duration(diff > 0 ? diff : 0);
    return {
      days: dur.days(),
      hours: dur.hours(),
      minutes: dur.minutes(),
      seconds: dur.seconds(),
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const target = dayjs(targetDate);
      const diff = target.diff(now);
      const dur = dayjs.duration(diff > 0 ? diff : 0);
      setTime({
        days: dur.days(),
        hours: dur.hours(),
        minutes: dur.minutes(),
        seconds: dur.seconds(),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}
