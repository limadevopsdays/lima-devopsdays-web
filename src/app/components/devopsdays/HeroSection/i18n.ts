import type { Locale } from '../../../i18n'

type GalleryImageI18n = { alt: string; openAriaLabel: string }

type HeroSectionI18n = {
  sectionAriaLabel: string
  logoAlt: string
  description: string
  promptTarget: string
  date: string
  location: string
  primaryCta: string
  secondaryCta: string
  closeImageAriaLabel: string
  previousImageAriaLabel: string
  nextImageAriaLabel: string
  galleryImages: GalleryImageI18n[]
}

export const heroSectionI18n: Record<Locale, HeroSectionI18n> = {
  es: {
    sectionAriaLabel: 'Hero DevOpsDays Lima 2026',
    logoAlt: 'DevOpsDays Lima 2026',
    description:
      'El punto de encuentro para Ingenieros de Software, Arquitectos, Líderes Técnicos, Ingenieros DevOps, Ingenieros de seguridad, CTOs y CIOs. Conecta con la comunidad, aprende de casos reales y acelera decisiones que impactan negocio y plataforma.',
    promptTarget: 'negocio y plataforma',
    date: '27 – 28 de agosto, 2026',
    location: 'Lima Centro de Convenciones (LCC)',
    primaryCta: 'Comprar Tickets',
    secondaryCta: 'Call for Speakers',
    closeImageAriaLabel: 'Cerrar imagen',
    previousImageAriaLabel: 'Imagen anterior',
    nextImageAriaLabel: 'Siguiente imagen',
    galleryImages: [
      {
        alt: 'Comunidad DevOpsDays Lima 2025 reunida con letras LIMA - Primera edición',
        openAriaLabel: 'Abrir imagen del hero. Comunidad DevOpsDays Lima 2025 reunida con letras LIMA - Primera edición',
      },
      {
        alt: 'Presentación keynote en auditorio DevOpsDays Lima con speaker en escenario principal',
        openAriaLabel: 'Abrir imagen del hero. Presentación keynote en auditorio DevOpsDays Lima con speaker en escenario principal',
      },
      {
        alt: 'Speaker presentando en DevOpsDays Lima con audiencia tech profesional',
        openAriaLabel: 'Abrir imagen del hero. Speaker presentando en DevOpsDays Lima con audiencia tech profesional',
      },
      {
        alt: 'Audiencia DevOpsDays Lima enfocada en charla técnica sobre DevOps',
        openAriaLabel: 'Abrir imagen del hero. Audiencia DevOpsDays Lima enfocada en charla técnica sobre DevOps',
      },
    ],
  },
  en: {
    sectionAriaLabel: 'DevOpsDays Lima 2026 hero section',
    logoAlt: 'DevOpsDays Lima 2026',
    description:
      'The meeting point for Software Engineers, Architects, Technical Leaders, DevOps Engineers, Security Engineers, CTOs, and CIOs. Connect with the community, learn from real-world cases, and accelerate decisions that impact business and platform.',
    promptTarget: 'business and platform',
    date: 'August 27–28, 2026',
    location: 'Lima Convention Center (LCC)',
    primaryCta: 'Buy Tickets',
    secondaryCta: 'Call for Speakers',
    closeImageAriaLabel: 'Close image',
    previousImageAriaLabel: 'Previous image',
    nextImageAriaLabel: 'Next image',
    galleryImages: [
      {
        alt: 'DevOpsDays Lima 2025 community gathered around the LIMA letters - first edition',
        openAriaLabel: 'Open hero image. DevOpsDays Lima 2025 community gathered around the LIMA letters - first edition',
      },
      {
        alt: 'Keynote presentation in the DevOpsDays Lima auditorium with a speaker on the main stage',
        openAriaLabel: 'Open hero image. Keynote presentation in the DevOpsDays Lima auditorium with a speaker on the main stage',
      },
      {
        alt: 'Speaker presenting at DevOpsDays Lima with a professional tech audience',
        openAriaLabel: 'Open hero image. Speaker presenting at DevOpsDays Lima with a professional tech audience',
      },
      {
        alt: 'DevOpsDays Lima audience focused on a technical DevOps talk',
        openAriaLabel: 'Open hero image. DevOpsDays Lima audience focused on a technical DevOps talk',
      },
    ],
  },
}
