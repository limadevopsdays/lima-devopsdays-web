import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

//TODO: evaluate to extend to backward countdown and forward countdown
export function useCountdown(targetDate: string | Date) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    }
  );

  useEffect(() => {
    const target = dayjs(new Date(targetDate));

    const interval = setInterval(() => {
      const now = dayjs();
      const diff = target.diff(now);
      const dur = dayjs.duration(diff > 0 ? diff : 0);
      setTime({
        days: parseInt(String(dur.asDays()), 10),
        hours: dur.hours(),
        minutes: dur.minutes(),
        seconds: dur.seconds(),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}
