import type { Locale } from '../../../i18n'

type NavLink = { label: string; hash: string; accent?: boolean }

type NavbarI18n = {
  ariaNav: string
  ariaLogo: string
  ariaBuyTickets: string
  ctaLabel: string
  ariaMenuOpen: string
  ariaMenuClose: string
  navLinks: NavLink[]
}

export const navbarI18n: Record<Locale, NavbarI18n> = {
  es: {
    ariaNav: 'Navegación principal',
    ariaLogo: 'DevOpsDays Lima - Ir al inicio',
    ariaBuyTickets: 'Comprar tickets para DevOpsDays Lima 2026',
    ctaLabel: 'Comprar Tickets',
    ariaMenuOpen: 'Abrir menú de navegación',
    ariaMenuClose: 'Cerrar menú de navegación',
    navLinks: [
      { label: 'Sponsors', hash: '#sponsors' },
      { label: 'Tickets', hash: '#tickets' },
      { label: 'Speakers', hash: '#speakers' },
      { label: 'Ubicación', hash: '#venue' },
      { label: 'Turismo', hash: '#turismo', accent: true },
      { label: 'FAQ', hash: '#faq' },
    ],
  },
  en: {
    ariaNav: 'Main navigation',
    ariaLogo: 'DevOpsDays Lima - Go to home',
    ariaBuyTickets: 'Buy tickets for DevOpsDays Lima 2026',
    ctaLabel: 'Buy Tickets',
    ariaMenuOpen: 'Open navigation menu',
    ariaMenuClose: 'Close navigation menu',
    navLinks: [
      { label: 'Sponsors', hash: '#sponsors' },
      { label: 'Tickets', hash: '#tickets' },
      { label: 'Speakers', hash: '#speakers' },
      { label: 'Venue', hash: '#venue' },
      { label: 'Tourism', hash: '#turismo', accent: true },
      { label: 'FAQ', hash: '#faq' },
    ],
  },
}
