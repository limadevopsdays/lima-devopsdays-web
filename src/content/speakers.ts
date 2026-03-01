import { useI18n } from '../i18n/useI18n'
import type { TranslationKey } from '../i18n/translations'

export type Speaker = {
  name: string
  role: string
  topic: string
  imageSrc: string
  linkedin?: string
  country?: string
  format?: 'keynote' | 'talk' | 'workshop' | 'lightning'
}

/** Controls the CFP invitation card. Set to false once the CfP closes. */
export const cfpOpen = true

/** Controls the speaker list. Set to true once speakers are confirmed and ready to show. */
export const speakersVisible = false

export type SpeakerTopic = {
  key: TranslationKey
  icon: string
}

export const speakerTopics: SpeakerTopic[] = [
  { key: 'speakers.topic1', icon: '\u2638\ufe0f' },  // Kubernetes
  { key: 'speakers.topic2', icon: '\ud83d\udce1' },  // Service mesh / observability
  { key: 'speakers.topic3', icon: '\u26a1' },        // CI/CD & GitOps
  { key: 'speakers.topic4', icon: '\ud83c\udfd7\ufe0f' }, // Platform engineering
  { key: 'speakers.topic5', icon: '\ud83d\udd12' },  // Security
  { key: 'speakers.topic6', icon: '\ud83d\udcca' },  // Case studies
]

export const speakers: Speaker[] = [
  {
    name: 'Alex Oladele',
    role: 'SRE Lead \u00b7 Cloud Guild',
    topic: 'From pager fatigue to platform leverage: what we automated (and what we didn\u2019t).',
    imageSrc: 'https://picsum.photos/seed/alex-oladele/128/128',
    linkedin: 'https://linkedin.com/in/alex-oladele',
    country: '\ud83c\uddf3\ud83c\uddec',
    format: 'talk',
  },
  {
    name: 'Bassem Dghaidi',
    role: 'Staff Engineer \u00b7 DeliveryOps',
    topic: 'GitOps in the real world: drift, guardrails, and sane rollback strategies.',
    imageSrc: 'https://picsum.photos/seed/bassem-dghaidi/128/128',
    linkedin: 'https://linkedin.com/in/bassem-dghaidi',
    country: '\ud83c\uddf1\ud83c\udde7',
    format: 'keynote',
  },
  {
    name: 'Bree Hall',
    role: 'Developer Advocate \u00b7 Secure Supply Co.',
    topic: 'Software supply chain security without slowing teams down.',
    imageSrc: 'https://picsum.photos/seed/bree-hall/128/128',
    linkedin: 'https://linkedin.com/in/bree-hall',
    country: '\ud83c\uddfa\ud83c\uddf8',
    format: 'talk',
  },
  {
    name: 'Den Delimarsky',
    role: 'Platform PM \u00b7 Internal Tools',
    topic: 'How to pitch platform work: metrics, narratives, and adoption loops.',
    imageSrc: 'https://picsum.photos/seed/den-delimarsky/128/128',
    linkedin: 'https://linkedin.com/in/den-delimarsky',
    country: '\ud83c\uddfa\ud83c\uddf8',
    format: 'workshop',
  },
  {
    name: 'Rajeev Nair',
    role: 'Principal Engineer \u00b7 Observability Lab',
    topic: 'Tracing is a product: design dashboards people actually use.',
    imageSrc: 'https://picsum.photos/seed/rajeev-nair/128/128',
    linkedin: 'https://linkedin.com/in/rajeev-nair',
    country: '\ud83c\uddee\ud83c\uddf3',
    format: 'talk',
  },
  {
    name: 'Sharanya Doddapaneni',
    role: 'AI Engineer \u00b7 Automation Studio',
    topic: 'AI for incident response: chatops, runbooks, and safe automation boundaries.',
    imageSrc: 'https://picsum.photos/seed/sharanya-doddapaneni/128/128',
    linkedin: 'https://linkedin.com/in/sharanya-doddapaneni',
    country: '\ud83c\uddee\ud83c\uddf3',
    format: 'lightning',
  },
]

/**
 * Returns all translated strings for the speakers domain.
 * Components must use this hook instead of calling t('speakers.*') directly.
 */
export function useSpeakerStrings() {
  const { t } = useI18n()
  return {
    // section header
    eyebrow:          t('speakers.eyebrow'),
    title:            t('speakers.title'),
    lead:             t('speakers.lead'),
    // cfp
    cfpEyebrow:       t('speakers.cfpEyebrow'),
    cfpTitle:         t('speakers.cfpTitle'),
    cfpLead:          t('speakers.cfpLead'),
    cfpTagline:       t('speakers.cfpTagline'),
    becomeSpeakerCta: t('speakers.becomeSpeakerCta'),
    // topics
    topicsTitle:      t('speakers.topicsTitle'),
    topics: speakerTopics.map(({ key, icon }) => ({
      id:    key as string,
      label: t(key),
      icon,
    })),
    // coming-soon note
    noteTitle:        t('speakers.noteTitle'),
    noteBody:         t('speakers.noteBody'),
    noteHint:         t('speakers.noteHint'),
    // cta / apply
    ctaTitle:         t('speakers.ctaTitle'),
    ctaBody:          t('speakers.ctaBody'),
    cta:              t('speakers.cta'),
    viewAll:          t('speakers.viewAll'),
    viewDetails:      t('speakers.viewDetails'),
  }
}
