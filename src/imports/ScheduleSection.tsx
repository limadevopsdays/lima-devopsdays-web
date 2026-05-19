import { useState } from 'react'
import { Section } from '../components/Section'
import { useI18n } from '../i18n/useI18n'

export function ScheduleSection() {
  const { t } = useI18n()
  const [activeDay, setActiveDay] = useState<'day-1' | 'day-2'>('day-1')
  const messageKey = activeDay === 'day-1' ? 'schedule.day1Message' : 'schedule.day2Message'
  const dayLabelKey = activeDay === 'day-1' ? 'schedule.day1' : 'schedule.day2'
  const emoji = activeDay === 'day-1' ? '🎤' : '🚀'

  return (
    <Section
      id="schedule"
      eyebrow={t('schedule.eyebrow')}
      title={t('schedule.title')}
      lead={t('schedule.lead')}
    >
      <div className="schedule__tabs" role="tablist" aria-label={t('schedule.daysLabel')}>
        <button
          type="button"
          className="tab"
          role="tab"
          aria-selected={activeDay === 'day-1'}
          aria-label={`${t('schedule.day1')} (${t('schedule.day1Date')})`}
          onClick={() => setActiveDay('day-1')}
        >
          {t('schedule.day1Date')}
        </button>
        <button
          type="button"
          className="tab"
          role="tab"
          aria-selected={activeDay === 'day-2'}
          aria-label={`${t('schedule.day2')} (${t('schedule.day2Date')})`}
          onClick={() => setActiveDay('day-2')}
        >
          {t('schedule.day2Date')}
        </button>
      </div>

      <div className="schedule__box">
        <span className="schedule__emoji" aria-hidden="true">
          {emoji}
        </span>{' '}
        <strong>{t(dayLabelKey)}</strong>: {t(messageKey)}
        <div className="schedule__subnote">
          <em>{t('schedule.buildNote')}</em>
        </div>
      </div>
    </Section>
  )
}
