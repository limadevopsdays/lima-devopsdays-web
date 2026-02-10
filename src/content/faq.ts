import type { TranslationKey } from '../i18n/translations'

export type FaqItem = {
  qKey: TranslationKey
  aKey: TranslationKey
}

export const faq: FaqItem[] = [
  {
    qKey: 'faq.q1',
    aKey: 'faq.a1',
  },
  {
    qKey: 'faq.q2',
    aKey: 'faq.a2',
  },
  {
    qKey: 'faq.q3',
    aKey: 'faq.a3',
  },
  {
    qKey: 'faq.q4',
    aKey: 'faq.a4',
  },
]
