export const navItems = [
  { href: '#speakers', labelKey: 'nav.speakers' },
  { href: '#schedule', labelKey: 'nav.schedule' },
  { href: '#sponsors', labelKey: 'nav.sponsors' },
  { href: '#faq', labelKey: 'nav.faq' },
] as const

export const ticketsUrl: string | undefined = import.meta.env.VITE_TICKETS_URL

export const socialLinks = [
  { href: 'https://www.linkedin.com', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://www.instagram.com', label: 'Instagram', icon: 'instagram' },
] as const
