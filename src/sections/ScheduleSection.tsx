import { useState } from 'react'
import { Section } from '../components/Section'
import { useI18n } from '../i18n/useI18n'

const TAB_BASE =
  'inline-flex items-center gap-[10px] border border-site-border bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] text-site-text-muted rounded-full py-2 px-3 cursor-pointer font-normal shadow-none transition-[border-color,box-shadow,color,font-weight] duration-[120ms] ease hover:text-site-text-soft hover:border-[rgba(var(--site-accent-rgb),0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-focus)] [:root[data-theme=light]_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))]'

const TAB_ACTIVE =
  'border-[rgba(var(--site-accent-rgb),0.4)] shadow-[0_8px_20px_rgba(var(--site-accent-rgb),0.12)] text-site-text font-extrabold [:root[data-theme=light]_&]:text-[rgba(0,0,0,0.9)] [:root[data-theme=light]_&]:border-[rgba(var(--site-accent-rgb),0.32)] [:root[data-theme=light]_&]:shadow-[0_10px_22px_rgba(var(--site-accent-rgb),0.1)]'

const BOX =
  'border border-white/[0.09] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] rounded-[12px] py-4 px-[18px] text-site-text text-base [:root[data-theme=light]_&]:border-black/[0.1] [:root[data-theme=light]_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))]'

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
      <div className="flex gap-[14px] flex-wrap mb-3" role="tablist" aria-label={t('schedule.daysLabel')}>
        <button
          type="button"
          className={`${TAB_BASE}${activeDay === 'day-1' ? ` ${TAB_ACTIVE}` : ''}`}
          role="tab"
          aria-selected={activeDay === 'day-1'}
          aria-label={`${t('schedule.day1')} (${t('schedule.day1Date')})`}
          onClick={() => setActiveDay('day-1')}
        >
          {t('schedule.day1Date')}
        </button>
        <button
          type="button"
          className={`${TAB_BASE}${activeDay === 'day-2' ? ` ${TAB_ACTIVE}` : ''}`}
          role="tab"
          aria-selected={activeDay === 'day-2'}
          aria-label={`${t('schedule.day2')} (${t('schedule.day2Date')})`}
          onClick={() => setActiveDay('day-2')}
        >
          {t('schedule.day2Date')}
        </button>
      </div>

      <div className={BOX}>
        <span aria-hidden="true">{emoji}</span>{' '}
        <strong>{t(dayLabelKey)}</strong>: {t(messageKey)}
        <div className="mt-[10px] text-site-text-muted">
          <em>{t('schedule.buildNote')}</em>
        </div>
      </div>
    </Section>
  )
}
