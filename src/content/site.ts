export const navItems = [
  { href: '#speakers', labelKey: 'nav.speakers' },
  { href: '#schedule', labelKey: 'nav.schedule' },
  { href: '#sponsors', labelKey: 'nav.sponsors' },
  { href: '#faq', labelKey: 'nav.faq' },
] as const

export const ticketsUrl: string = import.meta.env.VITE_TICKETS_URL ?? 'https://tickets.devopsdays.pe/event/devopsdays-lima-2026-1/register'

export const socialLinks = [
  { href: 'https://www.linkedin.com/company/devops-days-lima/', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://www.instagram.com/devopsdayslima/', label: 'Instagram', icon: 'instagram' },
] as const
