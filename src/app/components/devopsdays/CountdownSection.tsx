import { useEffect, useState } from 'react'
import { Clock, CheckCircle } from 'lucide-react'
import styles from './CountdownSection.module.css'

const EVENT_DATE = new Date('2026-08-27T09:00:00-05:00')

function useCountdown() {
  const [diff, setDiff] = useState(EVENT_DATE.getTime() - Date.now())
  useEffect(() => {
    const id = setInterval(() => setDiff(EVENT_DATE.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const d = Math.max(0, diff)
  const isEventStarted = d === 0
  return {
    days:    Math.floor(d / 86400000),
    hours:   Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
    isEventStarted
  }
}

export function CountdownSection() {
  const { days, hours, minutes, seconds, isEventStarted } = useCountdown()

  return (
    <section className={styles.section}>
      {/* Background image with overlay */}
      <div 
        className={styles.bgImage}
        style={{ backgroundImage: 'url(/images/cross/colibri.png)' }}
      />
      <div className={styles.bgOverlay} />

      <div className={styles.container}>
        <div className={styles.inner}>
          
          {/* Left: Message */}
          <div className={styles.message}>
            <div className={styles.messageIcon}>
              {isEventStarted ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <Clock className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              {isEventStarted ? (
                <>
                  <p className={styles.messageTitle}>
                    ¡El evento ya comenzó! 🎉
                  </p>
                </>
              ) : (
                <>
                  <p className={styles.messageTitle}>
                    El evento comienza en
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right: Countdown */}
          {!isEventStarted && (
            <div className={styles.countdown}>
              <div className={styles.countdownUnit}>
                <div className={styles.countdownBox}>
                  <span className={styles.countdownNumber}>
                    {String(days).padStart(2, '0')}
                  </span>
                </div>
                <span className={styles.countdownLabel}>días</span>
              </div>

              <span className={styles.countdownSeparator}>:</span>

              <div className={styles.countdownUnit}>
                <div className={styles.countdownBox}>
                  <span className={styles.countdownNumber}>
                    {String(hours).padStart(2, '0')}
                  </span>
                </div>
                <span className={styles.countdownLabel}>hrs</span>
              </div>

              <span className={styles.countdownSeparator}>:</span>

              <div className={styles.countdownUnit}>
                <div className={styles.countdownBox}>
                  <span className={styles.countdownNumber}>
                    {String(minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className={styles.countdownLabel}>min</span>
              </div>

              <span className={styles.countdownSeparator}>:</span>

              <div className={styles.countdownUnit}>
                <div className={styles.countdownBox}>
                  <span className={styles.countdownNumber}>
                    {String(seconds).padStart(2, '0')}
                  </span>
                </div>
                <span className={styles.countdownLabel}>seg</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
