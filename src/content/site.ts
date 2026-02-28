export const navItems = [
  { href: '/#speakers', labelKey: 'nav.speakers' },
  { href: '/#schedule', labelKey: 'nav.schedule' },
  { href: '/sponsors', labelKey: 'nav.sponsors' },
  { href: '/#faq', labelKey: 'nav.faq' },
] as const

export const ticketsUrl: string | undefined = import.meta.env.VITE_TICKETS_URL

export const socialLinks = [
  { href: 'https://www.linkedin.com/company/devops-days-lima/', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://www.instagram.com/devopsdayslima/', label: 'Instagram', icon: 'instagram' },
] as const

export const sponsorContactEmail = 'sponsors@devopsdays.pe'

export const sponsorBrochures = {
  es: '/assets/pdf/sponsors-es-devopsdayslima-2026.pdf',
  en: '/assets/pdf/sponsors-en-devopsdayslima-2026.pdf',
} as const
