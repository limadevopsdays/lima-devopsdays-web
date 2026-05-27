import type { Locale } from '../../i18n'

type ConsequenceI18n = { level: string; description: string }
type ReportingOptionI18n = { title: string; text: string }

type CodeOfConductPageI18n = {
  heroTitlePrimary: string
  heroTitleAccent: string
  purposeTitle: string
  purposeText1: string
  purposeText2: string
  expectedBehaviorEyebrow: string
  expectedBehaviorTitle: string
  expectedBehaviors: readonly [string, string, string, string, string, string]
  unacceptableEyebrow: string
  unacceptableTitle: string
  unacceptableLead: string
  unacceptableBehaviors: readonly [string, string, string, string, string, string]
  consequencesEyebrow: string
  consequencesTitle: string
  consequences: readonly [ConsequenceI18n, ConsequenceI18n, ConsequenceI18n, ConsequenceI18n]
  reportingEyebrow: string
  reportingTitle: string
  reportingChannelsTitle: string
  reportingOptions: readonly [ReportingOptionI18n, ReportingOptionI18n, ReportingOptionI18n]
  reportingEmailNote: string
  reportingConfidentialityNote: string
  scopeTitle: string
  scopeText: string
  scopeItems: readonly [string, string, string, string, string]
  ctaTitle: string
  ctaDescription: string
  ctaNote: string
  ctaLinkText: string
}

export const codeOfConductPageI18n: Record<Locale, CodeOfConductPageI18n> = {
  es: {
    heroTitlePrimary: 'Construyendo una comunidad',
    heroTitleAccent: 'segura e inclusiva',
    purposeTitle: 'Nuestro Propósito',
    purposeText1:
      'Este Código de Conducta describe las expectativas para todos aquellos que participan en DevOpsDays Lima, ya sea como asistentes, speakers, sponsors, organizadores o voluntarios. Nuestro objetivo es crear un ambiente donde todos se sientan bienvenidos, seguros y capaces de participar plenamente.',
    purposeText2:
      'No toleramos el acoso en ninguna forma. Los participantes que violen estas reglas pueden ser sancionados o expulsados del evento a discreción de los organizadores.',
    expectedBehaviorEyebrow: 'Comportamiento Esperado',
    expectedBehaviorTitle: 'Lo que esperamos de nuestra comunidad',
    expectedBehaviors: [
      'Ser respetuoso con diferentes opiniones, puntos de vista y experiencias',
      'Dar y aceptar críticas constructivas de manera profesional',
      'Demostrar empatía y amabilidad hacia los demás participantes',
      'Ser considerado con el tiempo y espacio de los demás',
      'Usar lenguaje inclusivo y profesional en todo momento',
      'Respetar los límites y privacidad de otros asistentes',
    ],
    unacceptableEyebrow: 'Comportamiento Inaceptable',
    unacceptableTitle: 'Lo que no toleramos',
    unacceptableLead:
      'Los siguientes comportamientos son considerados acoso y son inaceptables en nuestros eventos',
    unacceptableBehaviors: [
      'Acoso o intimidación de cualquier tipo, ya sea verbal, física o virtual',
      'Comentarios ofensivos relacionados con género, orientación sexual, raza, religión o discapacidad',
      'Atención sexual no deseada, comentarios inapropiados o avances no solicitados',
      'Interrupción deliberada de charlas, presentaciones u otros eventos',
      'Publicación de información privada de otros sin permiso explícito',
      'Conducta que pueda considerarse inapropiada en un entorno profesional',
    ],
    consequencesEyebrow: 'Consecuencias',
    consequencesTitle: 'Qué pasa si se viola el código',
    consequences: [
      {
        level: 'Advertencia Verbal',
        description:
          'Primera instancia de comportamiento inapropiado menor. Se proporciona orientación clara sobre el comportamiento esperado.',
      },
      {
        level: 'Advertencia Formal',
        description:
          'Comportamiento repetitivo o de mayor gravedad. Se documenta y comunica formalmente al infractor.',
      },
      {
        level: 'Expulsión Temporal',
        description:
          'Comportamiento grave o repetitivo. Expulsión del evento actual y prohibición de asistir a eventos futuros por un período determinado.',
      },
      {
        level: 'Expulsión Permanente',
        description:
          'Violación grave o repetida del código. Prohibición permanente de todos los eventos DevOpsDays Lima.',
      },
    ],
    reportingEyebrow: 'Cómo Reportar',
    reportingTitle: '¿Presenciaste o experimentaste acoso?',
    reportingChannelsTitle: 'Canales de Reporte',
    reportingOptions: [
      {
        title: 'En el Evento',
        text: 'Busca a cualquier miembro del equipo organizador (identificados con credenciales especiales) o acércate al Registration Desk.',
      },
      {
        title: 'Por Email',
        text: 'Envía un reporte confidencial a: conduct@devopsdays.pe',
      },
      {
        title: 'Anónimo',
        text: 'Si prefieres reportar de forma anónima, puedes usar nuestro formulario web que no requiere identificación personal.',
      },
    ],
    reportingEmailNote: 'Envía un reporte confidencial a: ',
    reportingConfidentialityNote:
      'Confidencialidad garantizada: Todos los reportes serán tratados con estricta confidencialidad. Solo se compartirá la información necesaria para investigar y resolver el incidente.',
    scopeTitle: 'Alcance del Código',
    scopeText: 'Este Código de Conducta aplica a todos los espacios relacionados con DevOpsDays Lima, incluyendo:',
    scopeItems: [
      'El evento principal (charlas, workshops, open spaces)',
      'Eventos sociales oficiales (cenas, after-parties)',
      'Canales de comunicación online (Slack, Discord, redes sociales)',
      'Comunicaciones uno-a-uno relacionadas con el evento',
      'Interacciones en áreas públicas cuando representas al evento',
    ],
    ctaTitle: '¿Preguntas sobre el Código de Conducta?',
    ctaDescription:
      'Estamos aquí para ayudar. Si tienes dudas o necesitas aclaraciones, no dudes en contactarnos.',
    ctaNote: 'Este código se basa en el ',
    ctaLinkText: 'Código de Conducta oficial de DevOpsDays',
  },
  en: {
    heroTitlePrimary: 'Building a community',
    heroTitleAccent: 'safe and inclusive',
    purposeTitle: 'Our Purpose',
    purposeText1:
      'This Code of Conduct describes the expectations for all those who participate in DevOpsDays Lima, whether as attendees, speakers, sponsors, organizers or volunteers. Our goal is to create an environment where everyone feels welcome, safe and able to participate fully.',
    purposeText2:
      'We do not tolerate harassment in any form. Participants who violate these rules may be sanctioned or expelled from the event at the discretion of the organizers.',
    expectedBehaviorEyebrow: 'Expected Behavior',
    expectedBehaviorTitle: 'What we expect from our community',
    expectedBehaviors: [
      'Be respectful of different opinions, viewpoints and experiences',
      'Give and accept constructive criticism in a professional manner',
      'Show empathy and kindness toward other participants',
      'Be considerate of others\' time and space',
      'Use inclusive and professional language at all times',
      'Respect the boundaries and privacy of other attendees',
    ],
    unacceptableEyebrow: 'Unacceptable Behavior',
    unacceptableTitle: 'What we do not tolerate',
    unacceptableLead:
      'The following behaviors are considered harassment and are unacceptable at our events',
    unacceptableBehaviors: [
      'Harassment or intimidation of any kind, whether verbal, physical or virtual',
      'Offensive comments related to gender, sexual orientation, race, religion or disability',
      'Unwanted sexual attention, inappropriate comments or unsolicited advances',
      'Deliberate disruption of talks, presentations or other events',
      'Publishing private information about others without explicit permission',
      'Conduct that could be considered inappropriate in a professional environment',
    ],
    consequencesEyebrow: 'Consequences',
    consequencesTitle: 'What happens if the code is violated',
    consequences: [
      {
        level: 'Verbal Warning',
        description:
          'First instance of minor inappropriate behavior. Clear guidance is provided on expected behavior.',
      },
      {
        level: 'Formal Warning',
        description:
          'Repetitive or more serious behavior. Formally documented and communicated to the offender.',
      },
      {
        level: 'Temporary Expulsion',
        description:
          'Serious or repetitive behavior. Expulsion from the current event and ban from attending future events for a determined period.',
      },
      {
        level: 'Permanent Expulsion',
        description:
          'Serious or repeated violation of the code. Permanent ban from all DevOpsDays Lima events.',
      },
    ],
    reportingEyebrow: 'How to Report',
    reportingTitle: 'Did you witness or experience harassment?',
    reportingChannelsTitle: 'Reporting Channels',
    reportingOptions: [
      {
        title: 'At the Event',
        text: 'Look for any member of the organizing team (identified with special credentials) or approach the Registration Desk.',
      },
      {
        title: 'By Email',
        text: 'Send a confidential report to: conduct@devopsdays.pe',
      },
      {
        title: 'Anonymous',
        text: 'If you prefer to report anonymously, you can use our web form that does not require personal identification.',
      },
    ],
    reportingEmailNote: 'Send a confidential report to: ',
    reportingConfidentialityNote:
      'Confidentiality guaranteed: All reports will be treated with strict confidentiality. Only the information necessary to investigate and resolve the incident will be shared.',
    scopeTitle: 'Scope of the Code',
    scopeText: 'This Code of Conduct applies to all spaces related to DevOpsDays Lima, including:',
    scopeItems: [
      'The main event (talks, workshops, open spaces)',
      'Official social events (dinners, after-parties)',
      'Online communication channels (Slack, Discord, social media)',
      'One-on-one communications related to the event',
      'Interactions in public areas when representing the event',
    ],
    ctaTitle: 'Questions about the Code of Conduct?',
    ctaDescription:
      'We are here to help. If you have any doubts or need clarification, do not hesitate to contact us.',
    ctaNote: 'This code is based on the ',
    ctaLinkText: 'official DevOpsDays Code of Conduct',
  },
}
