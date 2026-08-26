import type { Locale } from '../../../i18n'

type OrganizersI18n = {
  eyebrow: string
  title: string
  lead: string
  collaboratorsTitle: string
  collaboratorsLead: string
  ariaLinkedIn: (name: string) => string
  ariaGitHub: (name: string) => string
  ariaTwitter: (name: string) => string
}

export const organizersI18n: Record<Locale, OrganizersI18n> = {
  es: {
    eyebrow: 'Organizadores',
    title: 'El equipo detrás del evento',
    lead: 'Un grupo de voluntarios apasionados por la comunidad DevOps de Perú que trabajan todo el año para hacer posible este evento.',
    collaboratorsTitle: 'Colaboradores',
    collaboratorsLead: 'Gracias al talento, compromiso y energía de nuestros voluntarios y colaboradores que hacen de DevOpsDays Lima una experiencia transformadora e inolvidable. 💜',
    ariaLinkedIn: (name) => `LinkedIn de ${name}`,
    ariaGitHub: (name) => `GitHub de ${name}`,
    ariaTwitter: (name) => `X/Twitter de ${name}`,
  },
  en: {
    eyebrow: 'Organizers',
    title: 'The team behind the event',
    lead: 'A group of volunteers passionate about the DevOps community in Peru who work all year round to make this event possible.',
    collaboratorsTitle: 'Collaborators',
    collaboratorsLead: 'Thanks to the talent, dedication, and energy of our volunteers and collaborators who make DevOpsDays Lima a truly unforgettable experience.',
    ariaLinkedIn: (name) => `${name} on LinkedIn`,
    ariaGitHub: (name) => `${name} on GitHub`,
    ariaTwitter: (name) => `${name} on X/Twitter`,
  },
}
