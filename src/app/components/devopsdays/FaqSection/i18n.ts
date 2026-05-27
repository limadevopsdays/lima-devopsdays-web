import type { Locale } from '../../../i18n'

type FaqSectionI18n = {
  eyebrow: string
  title: string
  lead: string
}

export const faqSectionI18n: Record<Locale, FaqSectionI18n> = {
  es: {
    eyebrow: 'FAQ',
    title: 'Preguntas frecuentes',
    lead: 'Todo lo que necesitas saber antes de unirte a la comunidad.',
  },
  en: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    lead: 'Everything you need to know before joining the community.',
  },
}
