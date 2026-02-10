import React, { useState, useEffect } from 'react';

const CountdownTimer = ({
  targetDate,
  className = "",
  showLabels = true,
  showTitle = false,
  title = "Countdown Timer",
  compact = false
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Function to calculate time remaining
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();

      // Return all zeros if the date has passed
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Set up interval to update countdown
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  // Use compact display for smaller spaces
  if (compact) {
    return (
      <div className={`inline-flex items-center space-x-2 font-mono text-sm ${className}`}>
        <span>{String(timeLeft.days).padStart(2, '0')}d</span>
        <span>:</span>
        <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
        <span>:</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
        <span>:</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 ${className}`}>
      {showTitle && <h3 className="text-lg font-medium mr-2">{title}</h3>}

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex flex-col items-center">
          <div className="text-xl sm:text-2xl font-semibold">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          {showLabels && <div className="text-xs opacity-70">Días</div>}
        </div>

        <div className="text-xl">:</div>

        <div className="flex flex-col items-center">
          <div className="text-xl sm:text-2xl font-semibold">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          {showLabels && <div className="text-xs opacity-70">Horas</div>}
        </div>

        <div className="text-xl">:</div>

        <div className="flex flex-col items-center">
          <div className="text-xl sm:text-2xl font-semibold">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          {showLabels && <div className="text-xs opacity-70">Minutos</div>}
        </div>

        <div className="text-xl">:</div>

        <div className="flex flex-col items-center">
          <div className="text-xl sm:text-2xl font-semibold">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          {showLabels && <div className="text-xs opacity-70">Segundos</div>}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
