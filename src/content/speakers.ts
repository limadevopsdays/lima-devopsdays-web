export type Speaker = {
  name: string
  role: string
  topic: string
  imageSrc: string
}

export const speakers: Speaker[] = [
  {
    name: 'Alex Oladele',
    role: 'SRE Lead · Cloud Guild',
    topic: 'From pager fatigue to platform leverage: what we automated (and what we didn’t).',
    imageSrc: 'https://picsum.photos/seed/alex-oladele/128/128',
  },
  {
    name: 'Bassem Dghaidi',
    role: 'Staff Engineer · DeliveryOps',
    topic: 'GitOps in the real world: drift, guardrails, and sane rollback strategies.',
    imageSrc: 'https://picsum.photos/seed/bassem-dghaidi/128/128',
  },
  {
    name: 'Bree Hall',
    role: 'Developer Advocate · Secure Supply Co.',
    topic: 'Software supply chain security without slowing teams down.',
    imageSrc: 'https://picsum.photos/seed/bree-hall/128/128',
  },
  {
    name: 'Den Delimarsky',
    role: 'Platform PM · Internal Tools',
    topic: 'How to pitch platform work: metrics, narratives, and adoption loops.',
    imageSrc: 'https://picsum.photos/seed/den-delimarsky/128/128',
  },
  {
    name: 'Rajeev Nair',
    role: 'Principal Engineer · Observability Lab',
    topic: 'Tracing is a product: design dashboards people actually use.',
    imageSrc: 'https://picsum.photos/seed/rajeev-nair/128/128',
  },
  {
    name: 'Sharanya Doddapaneni',
    role: 'AI Engineer · Automation Studio',
    topic: 'AI for incident response: chatops, runbooks, and safe automation boundaries.',
    imageSrc: 'https://picsum.photos/seed/sharanya-doddapaneni/128/128',
  },
]
