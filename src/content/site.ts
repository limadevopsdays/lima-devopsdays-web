export const navItems = [
  { href: '/#speakers', labelKey: 'nav.speakers' },
  { href: '/#schedule', labelKey: 'nav.schedule' },
  { href: '/sponsors', labelKey: 'nav.sponsors' },
  { href: '/#faq', labelKey: 'nav.faq' },
] as const

export const ticketsUrl: string | undefined = import.meta.env.VITE_TICKETS_URL

/**
 * Registration form URL for the CfP. Can be an internal path (/apply) or
 * an external URL (https://…). When set, the CTA button appears in the CFP card.
 */
export const registrationUrl = "https://docs.google.com/forms"

export const socialLinks = [
  { href: 'https://www.linkedin.com/company/devops-days-lima/', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://www.instagram.com/devopsdayslima/', label: 'Instagram', icon: 'instagram' },
] as const

export const sponsorContactEmail = 'sponsors@devopsdays.pe'

export const sponsorBrochures = {
  es: '/assets/pdf/sponsors-es-devopsdayslima-2026.pdf',
  en: '/assets/pdf/sponsors-en-devopsdayslima-2026.pdf',
} as const
