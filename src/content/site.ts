export const navItems = [
  { href: '#about', labelKey: 'nav.about' },
  { href: '#sponsors', labelKey: 'nav.sponsors' },
  { href: '#speakers', labelKey: 'nav.speakers' },
  { href: '#tickets', labelKey: 'nav.tickets' },
  { href: '#past-events', labelKey: 'nav.pastEvents' },
  { href: '#faq', labelKey: 'nav.faq' },
] as const

export const ticketsUrl: string | undefined = import.meta.env.VITE_TICKETS_URL

export const socialLinks = [
  { href: 'https://www.linkedin.com/company/devops-days-lima/', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://www.instagram.com/devopsdayslima/', label: 'Instagram', icon: 'instagram' },
] as const
