import type { Locale } from '../../../i18n'

type TicketsI18n = {
  eyebrow: string
  title: string
  lead: string
  location: string
  ariaVip: string
  ariaGeneral: string
  earlyBird: string
  onSale: string
  comingSoon: string
  saleStart: (date: string) => string
  saleStarted: (date: string) => string
  secondaryBtn: string
  ticketDateMonth: string
}

export const ticketsI18n: Record<Locale, TicketsI18n> = {
  es: {
    eyebrow: 'Tickets',
    title: 'Elige el ticket ideal para tu experiencia',
    lead: 'Dos modalidades pensadas para distintos niveles de acceso y networking. Ambos tickets te conectan con la comunidad DevOps. El ticket VIP amplía la experiencia con beneficios premium.',
    location: 'Lima Centro de Convenciones (LCC)',
    ariaVip: 'Comprar ticket VIP',
    ariaGeneral: 'Comprar ticket General',
    earlyBird: 'EARLY BIRD',
    onSale: 'DISPONIBLE',
    comingSoon: 'PRÓXIMAMENTE',
    saleStart: (date) => `Inicio de venta: ${date}`,
    saleStarted: (date) => `Venta iniciada: ${date}`,
    secondaryBtn: 'Ver detalles y beneficios de tickets',
    ticketDateMonth: 'AGO 2026',
  },
  en: {
    eyebrow: 'Tickets',
    title: 'Choose the ideal ticket for your experience',
    lead: 'Two options designed for different levels of access and networking. Both tickets connect you with the DevOps community. The VIP ticket expands the experience with premium benefits.',
    location: 'Lima Convention Center (LCC)',
    ariaVip: 'Buy VIP ticket',
    ariaGeneral: 'Buy General ticket',
    earlyBird: 'EARLY BIRD',
    onSale: 'ON SALE',
    comingSoon: 'COMING SOON',
    saleStart: (date) => `Sale starts: ${date}`,
    saleStarted: (date) => `Sale started: ${date}`,
    secondaryBtn: 'View ticket details and benefits',
    ticketDateMonth: 'AUG 2026',
  },
}
