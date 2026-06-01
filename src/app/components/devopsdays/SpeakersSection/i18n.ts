import type { Locale } from '../../../i18n'

type Track = { name: string; color: string }

type SpeakersI18n = {
  eyebrow: string
  title: string
  lead: string
  tagInternational: string
  ariaNext: string
  ariaPrev: string
  ariaLinkedIn: (name: string) => string
  ariaGitHub: (name: string) => string
  invitedTitle: string
  invitedLead: string
  invitedFiltersLabel: string
  invitedCountLabel: (visible: number, total: number) => string
  invitedEmptyState: string
  talkLabel: string
  cfsAvailableBadge: string
  cfsTitle: string
  cfsDescription: string
  cfsTracksLabel: string
  cfsTracks: Track[]
  cfsSecondaryBtn: string
  cfsPrimaryBtn: string
  cfsDeadline: string
  cfsDeadlineDate: string
  cfsNotification: string
  cfsNotificationDate: string
  expandMore: string
  expandLess: string
}

export const speakersI18n: Record<Locale, SpeakersI18n> = {
  es: {
    eyebrow: 'Speakers',
    title: 'Keynote Speakers',
    lead: 'Líderes de la industria tech compartiendo sus experiencias en producción.',
    tagInternational: 'INTERNACIONAL',
    ariaNext: 'Siguiente speaker',
    ariaPrev: 'Speaker anterior',
    ariaLinkedIn: (name) => `Ver perfil de LinkedIn de ${name}`,
    ariaGitHub: (name) => `Ver perfil de GitHub de ${name}`,
    invitedTitle: 'Speakers invitados',
    invitedLead: 'Una selección de speakers con experiencia en platform engineering, DevSecOps, SRE, IA y liderazgo técnico.',
    invitedFiltersLabel: 'Filtrar por eje temático',
    invitedCountLabel: (visible, total) => `${visible} de ${total} speakers`,
    invitedEmptyState: 'Activa al menos un eje temático para ver speakers invitados.',
    talkLabel: 'Charla:',
    cfsAvailableBadge: 'CALL FOR SPEAKERS DISPONIBLE',
    cfsTitle: 'Call for Speakers 2026',
    cfsDescription:
      'Comparte experiencias reales de producción: decisiones difíciles, aprendizajes concretos y casos que hayan movido equipos, plataformas o resultados de negocio. DevOpsDays Lima es parte de una comunidad global, pero con foco local y conversaciones que sí aterrizan en la realidad de la región.',
    cfsTracksLabel: 'Ejes Temáticos',
    cfsTracks: [
      { name: 'Platform Engineering & DevOps', color: '#2563eb' },
      { name: 'Seguridad y Transformación Tecnológica', color: '#f97316' },
      { name: 'Liderazgo Moderno y Cultura de Equipos', color: '#14b8a6' },
      { name: 'IA y Estrategia de Datos', color: '#a78bfa' },
    ],
    cfsSecondaryBtn: 'Ver detalles y beneficios',
    cfsPrimaryBtn: 'Call for Speakers',
    cfsDeadline: 'Cierre de propuestas:',
    cfsDeadlineDate: '30 de mayo de 2026',
    cfsNotification: 'Notificación:',
    cfsNotificationDate: 'A partir del 15 de junio de 2026',
    expandMore: 'Ver más',
    expandLess: 'Ver menos',
  },
  en: {
    eyebrow: 'Speakers',
    title: 'Keynote Speakers',
    lead: 'Tech industry leaders sharing their production experiences.',
    tagInternational: 'INTERNATIONAL',
    ariaNext: 'Next speaker',
    ariaPrev: 'Previous speaker',
    ariaLinkedIn: (name) => `View ${name}'s LinkedIn profile`,
    ariaGitHub: (name) => `View ${name}'s GitHub profile`,
    invitedTitle: 'Invited Speakers',
    invitedLead: 'A selection of speakers with expertise in platform engineering, DevSecOps, SRE, AI, and technical leadership.',
    invitedFiltersLabel: 'Filter by track',
    invitedCountLabel: (visible, total) => `${visible} of ${total} speakers`,
    invitedEmptyState: 'Enable at least one track to view invited speakers.',
    talkLabel: 'Talk:',
    cfsAvailableBadge: 'CALL FOR SPEAKERS OPEN',
    cfsTitle: 'Call for Speakers 2026',
    cfsDescription:
      'Share real production experiences: tough decisions, concrete learnings, and cases that moved teams, platforms, or business results. DevOpsDays Lima is part of a global community, but with a local focus and conversations that truly reflect the reality of the region.',
    cfsTracksLabel: 'Tracks',
    cfsTracks: [
      { name: 'Platform Engineering & DevOps', color: '#2563eb' },
      { name: 'Security & Digital Transformation', color: '#f97316' },
      { name: 'Modern Leadership & Team Culture', color: '#14b8a6' },
      { name: 'AI & Data Strategy', color: '#a78bfa' },
    ],
    cfsSecondaryBtn: 'View details and benefits',
    cfsPrimaryBtn: 'Call for Speakers',
    cfsDeadline: 'Submission deadline:',
    cfsDeadlineDate: 'May 30, 2026',
    cfsNotification: 'Notification:',
    cfsNotificationDate: 'From June 15, 2026',
    expandMore: 'Read more',
    expandLess: 'Read less',
  },
}
