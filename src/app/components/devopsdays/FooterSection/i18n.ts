import type { Locale } from '../../../i18n'

type FooterLink = { label: string; to: string; accent?: boolean }

type FooterI18n = {
  copyright: string
  ariaNav: string
  ariaLinkedIn: string
  ariaInstagram: string
  links: FooterLink[]
}

export const footerI18n: Record<Locale, FooterI18n> = {
  es: {
    copyright: '© 2026 DevOpsDays Lima. Todos los derechos reservados.',
    ariaNav: 'Enlaces del footer',
    ariaLinkedIn: 'LinkedIn de DevOpsDays Lima',
    ariaInstagram: 'Instagram de DevOpsDays Lima',
    links: [
      { label: 'Sponsors', to: '/#sponsors' },
      { label: 'Tickets', to: '/tickets' },
      { label: 'Speakers', to: '/#speakers' },
      { label: 'Ubicación', to: '/#venue' },
      { label: 'Turismo', to: '/#turismo', accent: true },
    ],
  },
  en: {
    copyright: '© 2026 DevOpsDays Lima. All rights reserved.',
    ariaNav: 'Footer links',
    ariaLinkedIn: 'DevOpsDays Lima on LinkedIn',
    ariaInstagram: 'DevOpsDays Lima on Instagram',
    links: [
      { label: 'Sponsors', to: '/#sponsors' },
      { label: 'Tickets', to: '/tickets' },
      { label: 'Speakers', to: '/#speakers' },
      { label: 'Venue', to: '/#venue' },
      { label: 'Tourism', to: '/#turismo', accent: true },
    ],
  },
}
