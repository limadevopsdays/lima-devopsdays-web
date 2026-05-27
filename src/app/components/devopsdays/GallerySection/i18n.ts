import type { Locale } from '../../../i18n'

type GalleryI18n = {
  missionText: string
  ariaNext: string
  ariaPrev: string
  ariaClose: string
  ariaPreview: (alt: string) => string
}

export const galleryI18n: Record<Locale, GalleryI18n> = {
  es: {
    missionText:
      'En DevOpsDays Lima 2025 fue nuestra primera edición exitosa con más de 450 participantes, reuniendo a profesionales de tecnología, líderes de la industria y entusiastas de DevOps en un evento memorable que marcó el inicio de esta comunidad en el país.',
    ariaNext: 'Siguiente imagen',
    ariaPrev: 'Imagen anterior',
    ariaClose: 'Cerrar',
    ariaPreview: (alt) => `Previsualizar ${alt}`,
  },
  en: {
    missionText:
      'DevOpsDays Lima 2025 was our first successful edition with over 450 attendees, bringing together tech professionals, industry leaders, and DevOps enthusiasts in a memorable event that marked the beginning of this community in the country.',
    ariaNext: 'Next image',
    ariaPrev: 'Previous image',
    ariaClose: 'Close',
    ariaPreview: (alt) => `Preview ${alt}`,
  },
}
