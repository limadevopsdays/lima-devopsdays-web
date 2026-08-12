import type { Locale } from '../../../i18n'
import type { SessionType } from '../../../data/mockContent'

type TypeLabel = { label: string }

type ScheduleI18n = {
  eyebrow: string
  title: string
  lead: string
  day1Label: string
  day2Label: string
  day1Date: string
  day2Date: string
  typeLabels: Record<SessionType, TypeLabel>
}

export const scheduleI18n: Record<Locale, ScheduleI18n> = {
  es: {
    eyebrow: 'Programa',
    title: 'Conoce nuestro programa',
    lead: 'Dos días de charlas técnicas, talleres y open spaces',
    day1Label: 'Día 1',
    day2Label: 'Día 2',
    day1Date: '27 Ago',
    day2Date: '28 Ago',
    typeLabels: {
      keynote:   { label: 'Keynote' },
      talk:      { label: 'Charla' },
      workshop:  { label: 'Workshop' },
      openspace: { label: 'Open Space' },
      ignite:    { label: 'Ignite' },
      break:     { label: 'Pausa' },
    },
  },
  en: {
    eyebrow: 'Schedule',
    title: 'Discover our program',
    lead: 'Two days of technical talks, workshops and open spaces',
    day1Label: 'Day 1',
    day2Label: 'Day 2',
    day1Date: 'Aug 27',
    day2Date: 'Aug 28',
    typeLabels: {
      keynote:   { label: 'Keynote' },
      talk:      { label: 'Talk' },
      workshop:  { label: 'Workshop' },
      openspace: { label: 'Open Space' },
      ignite:    { label: 'Ignite' },
      break:     { label: 'Break' },
    },
  },
}
