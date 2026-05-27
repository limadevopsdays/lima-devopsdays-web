import type { Locale } from '../../../i18n'

type VenueI18n = {
  eyebrow: string
  title: string
  lead: string
  venueName: string
  mapsBtn: string
  howToGetThere: string
  installations: string
  gallery: (n: number) => string
  ariaClose: string
  ariaPrev: string
  ariaNext: string
  ariaPhoto: (alt: string) => string
  mapTitle: string
}

export const venueI18n: Record<Locale, VenueI18n> = {
  es: {
    eyebrow: 'Ubicación',
    title: 'Venue y cómo llegar',
    lead: 'Nos encontramos en Lima Centro de Convenciones, un espacio preparado para charlas, networking y una experiencia cómoda para toda la comunidad.',
    venueName: 'Lima Centro de Convenciones',
    mapsBtn: 'Ver en Maps',
    howToGetThere: 'Cómo llegar',
    installations: 'Instalaciones',
    gallery: (n) => `Galería (${n} fotos)`,
    ariaClose: 'Cerrar',
    ariaPrev: 'Anterior',
    ariaNext: 'Siguiente',
    ariaPhoto: (alt) => alt,
    mapTitle: 'Mapa del venue',
  },
  en: {
    eyebrow: 'Venue',
    title: 'Venue & how to get there',
    lead: 'We are located at the Lima Convention Center, a space designed for talks, networking, and a comfortable experience for the entire community.',
    venueName: 'Lima Convention Center',
    mapsBtn: 'View on Maps',
    howToGetThere: 'How to get there',
    installations: 'Facilities',
    gallery: (n) => `Gallery (${n} photos)`,
    ariaClose: 'Close',
    ariaPrev: 'Previous',
    ariaNext: 'Next',
    ariaPhoto: (alt) => alt,
    mapTitle: 'Venue map',
  },
}
