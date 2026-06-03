import type { Locale } from '../../i18n'

type TopicCardI18n = { title: string; description: string }
type TimelineItemI18n = { label: string; description: string }

type SpeakersPageI18n = {
  dateLocale: string
  socialProofAlt: string
  badgeText: string
  introTitle: string
  introDescription: string
  benefits: readonly [string, string, string]
  datesSectionTitle: string
  datesSectionLead: string
  timeline: readonly [TimelineItemI18n, TimelineItemI18n, TimelineItemI18n]
  ctaBadgeText: string
  ctaTitle: string
  ctaDescription: string
  ctaButton: string
  ctaDeadline1Label: string
  ctaDeadline1Value: string
  ctaDeadline2Label: string
  ctaDeadline2Value: string
  topicsSectionTitle: string
  topicsSectionLead: string
  topicCards: readonly [TopicCardI18n, TopicCardI18n, TopicCardI18n, TopicCardI18n]
}

export const speakersPageI18n: Record<Locale, SpeakersPageI18n> = {
  es: {
    dateLocale: 'es-PE',
    socialProofAlt: 'Speakers y comunidad en DevOpsDays Lima',
    badgeText: 'Speakers 2026',
    introTitle: 'Comparte tu experiencia con la comunidad DevOps',
    introDescription:
      'Buscamos speakers con experiencia real en transformación DevOps. Si tu aprendizaje nació en entornos reales y hoy puede ayudar a otros equipos a tomar mejores decisiones, queremos escucharte.',
    benefits: [
      'Acceso completo al evento',
      'Visibilidad ante la comunidad LATAM',
      'Networking con líderes del ecosistema regional',
    ],
    datesSectionTitle: '¡Estas son tus fechas clave!',
    datesSectionLead:
      'Estas son las fechas clave para planificar tu postulación y seguir el proceso con claridad.',
    timeline: [
      {
        label: 'APERTURA CFS',
        description: 'Inicia el período para enviar propuestas de charlas',
      },
      {
        label: 'CIERRE CFS',
        description: 'Fecha límite para enviar tu propuesta',
      },
      {
        label: 'Notificación',
        description: 'Te notificamos si tu charla fue seleccionada',
      },
    ],
    ctaBadgeText: 'CALL FOR SPEAKERS CERRADO',
    ctaTitle: '¿Tienes una historia que contar?',
    ctaDescription:
      'Comparte experiencia aplicada, criterio técnico y aprendizajes que puedan elevar la conversación de la comunidad DevOps en Perú. Buscamos talks con sustancia, casos reales y lecciones que ayuden a otros equipos a ejecutar mejor.',
    ctaButton: 'Enviar una propuesta',
    ctaDeadline1Label: 'Cierre de propuestas: ',
    ctaDeadline1Value: '30 de mayo de 2026',
    ctaDeadline2Label: 'Notificación: ',
    ctaDeadline2Value: 'A partir del 15 de junio de 2026',
    topicsSectionTitle: 'Ejes Temáticos',
    topicsSectionLead:
      'Buscamos propuestas que mezclen profundidad técnica, contexto real y relevancia para la comunidad. Estos son los ejes que hoy consideramos más estratégicos para DevOpsDays Lima 2026.',
    topicCards: [
      {
        title: 'Platform Engineering & DevOps',
        description: 'CI/CD, observabilidad, experiencia del desarrollador, entrega de software.',
      },
      {
        title: 'Seguridad y Transformación Tecnológica',
        description: 'Cloud, automatización, ciberseguridad, arquitectura moderna.',
      },
      {
        title: 'Liderazgo Moderno y Cultura de Equipos',
        description: 'Equipos de alto rendimiento, cultura DevOps, gestión de ingeniería.',
      },
      {
        title: 'IA y Estrategia de Datos',
        description: 'IA en producción, estrategia de datos, herramientas de IA generativa aplicadas.',
      },
    ],
  },
  en: {
    dateLocale: 'en-US',
    socialProofAlt: 'Speakers and community at DevOpsDays Lima',
    badgeText: 'Speakers 2026',
    introTitle: 'Share your experience with the DevOps community',
    introDescription:
      'We are looking for speakers with real DevOps transformation experience. If your learning was forged in real environments and can help other teams make better decisions, we want to hear you.',
    benefits: [
      'Full event access',
      'Visibility to the LATAM community',
      'Networking with regional ecosystem leaders',
    ],
    datesSectionTitle: 'These are your key dates!',
    datesSectionLead:
      'These are the key dates to plan your submission and follow the process clearly.',
    timeline: [
      {
        label: 'CFS OPENS',
        description: 'The period to submit talk proposals begins',
      },
      {
        label: 'CFS CLOSES',
        description: 'Deadline to submit your proposal',
      },
      {
        label: 'Notification',
        description: 'We will notify you if your talk was selected',
      },
    ],
    ctaBadgeText: 'CALL FOR SPEAKERS CLOSED',
    ctaTitle: 'Do you have a story to tell?',
    ctaDescription:
      'Share applied experience, technical judgment and lessons learned that can elevate the DevOps community conversation in Peru. We are looking for talks with substance, real-world cases and lessons that help other teams execute better.',
    ctaButton: 'Submit a proposal',
    ctaDeadline1Label: 'Proposal deadline: ',
    ctaDeadline1Value: 'May 30, 2026',
    ctaDeadline2Label: 'Notification: ',
    ctaDeadline2Value: 'From June 15, 2026',
    topicsSectionTitle: 'Thematic Areas',
    topicsSectionLead:
      'We are looking for proposals that blend technical depth, real context and relevance for the community. These are the areas we consider most strategic for DevOpsDays Lima 2026.',
    topicCards: [
      {
        title: 'Platform Engineering & DevOps',
        description: 'CI/CD, observability, developer experience, software delivery.',
      },
      {
        title: 'Security & Technological Transformation',
        description: 'Cloud, automation, cybersecurity, modern architecture.',
      },
      {
        title: 'Modern Leadership & Team Culture',
        description: 'High-performance teams, DevOps culture, engineering management.',
      },
      {
        title: 'AI & Data Strategy',
        description: 'AI in production, data strategy, applied generative AI tools.',
      },
    ],
  },
}
