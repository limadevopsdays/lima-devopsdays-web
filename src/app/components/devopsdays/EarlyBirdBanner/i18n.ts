import type { Locale } from '../../../i18n'

type EarlyBirdI18n = {
  ariaLabel: string
  title: string
  titleHighlight: string
  subtitle: string
  description: string
  cta: string
  badgeUrgency: string
  badgeDateExtended: string
  badgeDateEvent: string
  discountHeader: string
  discountFooter: string
}

export const earlyBirdI18n: Record<Locale, EarlyBirdI18n> = {
  es: {
    ariaLabel: 'Ver ofertas Early Bird',
    title: 'Early Bird',
    titleHighlight: '❤️‍🔥',
    subtitle: 'en entradas',
    description: 'Aprovecha descuentos en entradas y asegura tu lugar en DevOpsDays Lima 2026. 🚀',
    cta: 'Ver ofertas →',
    badgeUrgency: '¡SOLO POR POCOS DIAS!',
    badgeDateExtended: 'Se amplia hasta el 15 de junio',
    badgeDateEvent: 'Nos vemos este 27 y 28 de agosto',
    discountHeader: 'Ahorra hasta',
    discountFooter: '¡Días limitados!',
  },
  en: {
    ariaLabel: 'View Early Bird offers',
    title: 'Early Bird',
    titleHighlight: '❤️‍🔥',
    subtitle: 'off tickets',
    description: 'Take advantage of ticket discounts and secure your spot at DevOpsDays Lima 2026. 🚀',
    cta: 'View offers →',
    badgeUrgency: 'LIMITED TIME ONLY!',
    badgeDateExtended: 'Extended until June 15',
    badgeDateEvent: 'See you August 27 & 28',
    discountHeader: 'Save up to',
    discountFooter: 'Limited days!',
  },
}
