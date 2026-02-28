// ─── Tier definitions ────────────────────────────────────────────────────────

export type TierValue = true | false | string

export const sponsorTiers = [
  { id: 'platinum' as const, featured: true, labelKey: 'sponsors.tier.platinum' },
  { id: 'gold' as const, labelKey: 'sponsors.tier.gold' },
  { id: 'silver' as const, labelKey: 'sponsors.tier.silver' },
  { id: 'bronze' as const, labelKey: 'sponsors.tier.bronze' },
]

export const TIERS = sponsorTiers.map((tier) => tier.id)

// ─── Benefits comparison table ────────────────────────────────────────────────

export const sponsorBenefits = [
  {
    id: 'regularPrice',
    title: 'Regular price',
    subtitle: 'Tax not included',
    platinum: '$10,000' as TierValue,
    gold: '$7,000' as TierValue,
    silver: '$4,000' as TierValue,
    bronze: '$2,000' as TierValue,
  },
  {
    id: 'discountedPrice',
    title: 'Discounted price (20%)',
    subtitle: 'Until MAR 30th 2026 · Tax not included',
    platinum: '$8,000' as TierValue,
    gold: '$5,600' as TierValue,
    silver: '$3,200' as TierValue,
    bronze: '$1,600' as TierValue,
  },
  {
    id: 'presentation5',
    title: 'Presentation (5min)',
    subtitle: 'Sponsor keynote',
    platinum: true as TierValue,
    gold: false as TierValue,
    silver: false as TierValue,
    bronze: false as TierValue,
  },
  {
    id: 'presentationRecording',
    title: 'Presentation video recording',
    subtitle: 'Sponsor keynote',
    platinum: true as TierValue,
    gold: false as TierValue,
    silver: false as TierValue,
    bronze: false as TierValue,
  },
  {
    id: 'presentation20',
    title: 'Presentation (20min)',
    subtitle: 'Demo session at secondary ambience',
    platinum: true as TierValue,
    gold: true as TierValue,
    silver: false as TierValue,
    bronze: false as TierValue,
  },
  {
    id: 'optinList',
    title: 'Participant opt-in list',
    footnote: '*',
    subtitle: 'Chance to receive the list',
    platinum: true as TierValue,
    gold: true as TierValue,
    silver: false as TierValue,
    bronze: false as TierValue,
  },
  {
    id: 'participantInfo',
    title: 'Participant information',
    subtitle: 'Organic through NFC technology',
    platinum: true as TierValue,
    gold: true as TierValue,
    silver: true as TierValue,
    bronze: false as TierValue,
  },
  {
    id: 'raffle',
    title: 'Raffles for audience',
    subtitle: 'At main room',
    platinum: true as TierValue,
    gold: true as TierValue,
    silver: true as TierValue,
    bronze: false as TierValue,
  },
  {
    id: 'logoEvent',
    title: 'Logo showcase',
    subtitle: 'During the event',
    platinum: true as TierValue,
    gold: true as TierValue,
    silver: true as TierValue,
    bronze: false as TierValue,
  },
  {
    id: 'logoMedia',
    title: 'Logo showcase',
    subtitle: 'Through media channels and merch',
    platinum: true as TierValue,
    gold: true as TierValue,
    silver: true as TierValue,
    bronze: true as TierValue,
  },
  {
    id: 'passes',
    title: 'Full access pass',
    subtitle: 'Access to all ambients',
    platinum: '12' as TierValue,
    gold: '8' as TierValue,
    silver: '4' as TierValue,
    bronze: '2' as TierValue,
  },
  {
    id: 'extraPasses',
    title: 'Additional passes',
    subtitle: 'At discounted price · 10 max',
    platinum: '30%' as TierValue,
    gold: '20%' as TierValue,
    silver: '10%' as TierValue,
    bronze: '5%' as TierValue,
  },
  {
    id: 'stand',
    title: 'Stand dimensions',
    footnote: '**',
    platinum: 'Large (5m x 3m)' as TierValue,
    gold: 'Medium (3m x 2m)' as TierValue,
    silver: 'Small (1m x 1m)' as TierValue,
    bronze: false as TierValue,
  },
  {
    id: 'mediaCoverage',
    title: 'Media coverage',
    footnote: '***',
    platinum: 'Featured advertising' as TierValue,
    gold: 'Featured advertising' as TierValue,
    silver: 'Advertising' as TierValue,
    bronze: 'Mention' as TierValue,
  },
]

export const sponsorFootnotes = [
  {
    marker: '*',
    text: 'Opt-in attendees are those who have explicitly confirmed to receive communications about the event.',
  },
  {
    marker: '**',
    text: 'The size of the Platinum stand is referential and may change depending on the available space.',
  },
  {
    marker: '***',
    text: 'Featured advertising includes a 2-minute interview-style video.',
  },
]

// ─── Current sponsors ─────────────────────────────────────────────────────────

export const sponsors = [
  {
    tier: 'platinum' as const,
    items: [
      {
        name: 'Dynatrace',
        logoSrcDark: '/assets/sponsors/dark/Dynatrace.svg',
        logoSrcLight: '/assets/sponsors/light/Dynatrace.svg',
        href: 'https://www.dynatrace.com/',
      },
    ],
  },
  { tier: 'gold' as const,   items: [] as { name: string; logoSrcDark?: string; logoSrcLight?: string; href?: string }[] },
  { tier: 'silver' as const, items: [] as { name: string; logoSrcDark?: string; logoSrcLight?: string; href?: string }[] },
  { tier: 'bronze' as const, items: [] as { name: string; logoSrcDark?: string; logoSrcLight?: string; href?: string }[] },
]

export const sponsorStats = [
  { value: '450+', labelKey: 'sponsors.stat.professionals' },
  { value: '2',    labelKey: 'sponsors.stat.days' },
  { value: '3ra',  labelKey: 'sponsors.stat.edition' },
  { value: 'Lima', labelKey: 'sponsors.stat.location' },
] as const
