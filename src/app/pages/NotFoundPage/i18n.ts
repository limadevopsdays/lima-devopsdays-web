import type { Locale } from '../../i18n'

type NotFoundPageI18n = {
  title: string
  description: string
  backToHome: string
  viewTickets: string
  goBack: string
}

export const notFoundPageI18n: Record<Locale, NotFoundPageI18n> = {
  es: {
    title: 'Página no encontrada',
    description: 'Lo sentimos, la página que buscas no existe o ha sido movida.',
    backToHome: 'Volver al Inicio',
    viewTickets: 'Ver Tickets',
    goBack: 'Volver atrás',
  },
  en: {
    title: 'Page not found',
    description: 'Sorry, the page you are looking for does not exist or has been moved.',
    backToHome: 'Back to Home',
    viewTickets: 'View Tickets',
    goBack: 'Go back',
  },
}
