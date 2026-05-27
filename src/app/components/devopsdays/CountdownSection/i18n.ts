import type { Locale } from '../../../i18n'

type CountdownI18n = {
  eventStarted: string
  eventSoon: string
  days: string
  hours: string
  minutes: string
  seconds: string
}

export const countdownI18n: Record<Locale, CountdownI18n> = {
  es: {
    eventStarted: '¡El evento ya comenzó! 🎉',
    eventSoon: 'El evento empieza pronto',
    days: 'días',
    hours: 'hrs',
    minutes: 'min',
    seconds: 'seg',
  },
  en: {
    eventStarted: 'The event has started! 🎉',
    eventSoon: 'The event is coming soon',
    days: 'days',
    hours: 'hrs',
    minutes: 'min',
    seconds: 'sec',
  },
}
