import type { Locale } from '../../i18n'

type HomePageI18n = {
  ticketsGallerySectionLabel: string
}

export const homePageI18n: Record<Locale, HomePageI18n> = {
  es: {
    ticketsGallerySectionLabel: 'Tickets y galería',
  },
  en: {
    ticketsGallerySectionLabel: 'Tickets and gallery',
  },
}
