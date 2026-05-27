import type { Locale } from '../../i18n'

type LayoutI18n = {
  ariaScrollTop: string
}

export const layoutI18n: Record<Locale, LayoutI18n> = {
  es: {
    ariaScrollTop: 'Volver arriba',
  },
  en: {
    ariaScrollTop: 'Back to top',
  },
}

type SeoEntry = {
  title: string
  description: string
  canonicalPath: string
  robots?: string
}

export const routeSeo: Record<Locale, Record<string, SeoEntry>> = {
  es: {
    '/': {
      title: 'DevOpsDays Lima 2026 | 27 y 28 de agosto en Lima',
      description:
        'DevOpsDays Lima 2026 - Conecta con expertos internacionales, aprende las ultimas tendencias DevOps y transforma tu carrera. 27-28 de agosto 2026 · Centro de Convenciones, Lima, Peru.',
      canonicalPath: '/',
      robots: 'index,follow,max-image-preview:large',
    },
    '/tickets': {
      title: 'Tickets | DevOpsDays Lima 2026',
      description:
        'Compra tus tickets para DevOpsDays Lima 2026 y elige la modalidad que mejor se ajuste a tu experiencia durante el evento.',
      canonicalPath: '/tickets',
      robots: 'index,follow,max-image-preview:large',
    },
    '/sorteo-entradas': {
      title: 'Sorteo de entradas | DevOpsDays Lima 2026',
      description:
        'Carga un CSV de participantes y ejecuta el sorteo de entradas de DevOpsDays Lima 2026 con validacion basica y seleccion aleatoria.',
      canonicalPath: '/sorteo-entradas',
      robots: 'noindex,follow',
    },
    '/speakers': {
      title: 'Speakers | DevOpsDays Lima 2026',
      description:
        'Conoce a los speakers de DevOpsDays Lima 2026 y revisa la convocatoria para compartir experiencias reales con la comunidad.',
      canonicalPath: '/speakers',
      robots: 'index,follow,max-image-preview:large',
    },
    '/sponsors': {
      title: 'Sponsors | DevOpsDays Lima 2026',
      description:
        'Revisa las oportunidades de sponsorship de DevOpsDays Lima 2026 y descarga el brochure oficial para marcas y partners.',
      canonicalPath: '/sponsors',
      robots: 'index,follow,max-image-preview:large',
    },
    '/code-of-conduct': {
      title: 'Code of Conduct | DevOpsDays Lima 2026',
      description:
        'Consulta el codigo de conducta oficial de DevOpsDays Lima 2026 para asistentes, speakers, sponsors y organizadores.',
      canonicalPath: '/code-of-conduct',
      robots: 'index,follow,max-image-preview:large',
    },
  },
  en: {
    '/': {
      title: 'DevOpsDays Lima 2026 | August 27–28 in Lima',
      description:
        'DevOpsDays Lima 2026 — Connect with international experts, learn the latest DevOps trends, and transform your career. August 27–28, 2026 · Lima Convention Center, Lima, Peru.',
      canonicalPath: '/',
      robots: 'index,follow,max-image-preview:large',
    },
    '/tickets': {
      title: 'Tickets | DevOpsDays Lima 2026',
      description:
        'Get your tickets for DevOpsDays Lima 2026 and choose the option that best fits your experience at the event.',
      canonicalPath: '/tickets',
      robots: 'index,follow,max-image-preview:large',
    },
    '/sorteo-entradas': {
      title: 'Ticket Raffle | DevOpsDays Lima 2026',
      description:
        'Load a CSV of participants and run the DevOpsDays Lima 2026 ticket raffle with basic validation and random selection.',
      canonicalPath: '/sorteo-entradas',
      robots: 'noindex,follow',
    },
    '/speakers': {
      title: 'Speakers | DevOpsDays Lima 2026',
      description:
        'Meet the DevOpsDays Lima 2026 speakers and check out the call for speakers to share your real-world experience with the community.',
      canonicalPath: '/speakers',
      robots: 'index,follow,max-image-preview:large',
    },
    '/sponsors': {
      title: 'Sponsors | DevOpsDays Lima 2026',
      description:
        'Explore sponsorship opportunities at DevOpsDays Lima 2026 and download the official brochure for brands and partners.',
      canonicalPath: '/sponsors',
      robots: 'index,follow,max-image-preview:large',
    },
    '/code-of-conduct': {
      title: 'Code of Conduct | DevOpsDays Lima 2026',
      description:
        'Read the official Code of Conduct for DevOpsDays Lima 2026 for attendees, speakers, sponsors, and organizers.',
      canonicalPath: '/code-of-conduct',
      robots: 'index,follow,max-image-preview:large',
    },
  },
}

export const fallbackSeo: Record<Locale, Omit<SeoEntry, 'canonicalPath'> & { canonicalPath?: string }> = {
  es: {
    title: 'Pagina no encontrada | DevOpsDays Lima 2026',
    description: 'La pagina que buscas no existe o fue movida dentro de DevOpsDays Lima 2026.',
    robots: 'noindex,follow',
  },
  en: {
    title: 'Page not found | DevOpsDays Lima 2026',
    description: 'The page you are looking for does not exist or was moved within DevOpsDays Lima 2026.',
    robots: 'noindex,follow',
  },
}
