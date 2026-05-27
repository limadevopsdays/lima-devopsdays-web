import type { Locale } from '../i18n'
import {
  faq as faqEs,
  cfpTopics as cfpTopicsEs,
  scheduleDay1 as scheduleDay1Es,
  scheduleDay2 as scheduleDay2Es,
  type ScheduleSession,
} from './mockContent'

// ─── Speaker types ────────────────────────────────────────────────────────────
export type KeynoteSpeaker = {
  name: string
  tag: string
  role: string
  topic: string
  topicSecondLine?: string
  imageSrc: string
  imagePosition: string
  imageFit: string
  alt: string
  linkedin: string
  github?: string
}

export type InvitedSpeaker = {
  name: string
  role: string
  country: string
  topic: string
  imageSrc: string
  alt: string
}

// ─── Keynote Speakers ─────────────────────────────────────────────────────────
export const keynoteSpeakersI18n: Record<Locale, KeynoteSpeaker[]> = {
  es: [
    {
      name: 'Marc Hornbeek',
      tag: 'INTERNACIONAL',
      role: 'CEO y consultor principal',
      topic: 'Beyond DevSecOps: The Era of Intelligent Continuous Security',
      imageSrc: '/images/speakers/keynotes/marc_hornbeek.jpg',
      imagePosition: 'center center',
      imageFit: 'cover',
      alt: 'Marc Hornbeek, keynote speaker invitado en DevOpsDays Lima',
      linkedin: 'https://www.linkedin.com/in/marchornbeek/',
    },
    {
      name: 'Xavier Rene-Corail',
      tag: 'INTERNACIONAL',
      role: 'Lider de Github Security Labs',
      topic: 'Seguridad en pipelines de CI/CD, integrada de extremo a extremo.',
      topicSecondLine: 'Proteccion de la cadena de suministro de software (supply chain security).',
      imageSrc: '/images/speakers/keynotes/xavier_rene.jpeg',
      imagePosition: 'center bottom',
      imageFit: 'contain',
      alt: 'Xavier Rene-Corail, keynote speaker invitado en DevOpsDays Lima',
      linkedin: 'https://www.linkedin.com/in/xavier-ren%C3%A9-corail-2428431?trk=public_post-text',
      github: 'https://github.com/xcorail',
    },
  ],
  en: [
    {
      name: 'Marc Hornbeek',
      tag: 'INTERNATIONAL',
      role: 'CEO and Principal Consultant',
      topic: 'Beyond DevSecOps: The Era of Intelligent Continuous Security',
      imageSrc: '/images/speakers/keynotes/marc_hornbeek.jpg',
      imagePosition: 'center center',
      imageFit: 'cover',
      alt: 'Marc Hornbeek, keynote speaker at DevOpsDays Lima',
      linkedin: 'https://www.linkedin.com/in/marchornbeek/',
    },
    {
      name: 'Xavier Rene-Corail',
      tag: 'INTERNATIONAL',
      role: 'Head of GitHub Security Labs',
      topic: 'Seguridad en pipelines de CI/CD, integrada de extremo a extremo.',
      topicSecondLine: 'Proteccion de la cadena de suministro de software (supply chain security).',
      imageSrc: '/images/speakers/keynotes/xavier_rene.jpeg',
      imagePosition: 'center bottom',
      imageFit: 'contain',
      alt: 'Xavier Rene-Corail, keynote speaker at DevOpsDays Lima',
      linkedin: 'https://www.linkedin.com/in/xavier-ren%C3%A9-corail-2428431?trk=public_post-text',
      github: 'https://github.com/xcorail',
    },
  ],
}

// ─── Invited Speakers ─────────────────────────────────────────────────────────
export const invitedSpeakersI18n: Record<Locale, InvitedSpeaker[]> = {
  es: [
    { name: 'Jimmy Florez',        role: 'DevSecOps Lead en NEQUI',                                                            country: 'Colombia',  topic: 'De DevOps a Platform Engineering: El journey',                                                                                           imageSrc: '/images/speakers/speakers/jimmy_florez.png',          alt: 'Jimmy Florez, speaker invitado en DevOpsDays Lima' },
    { name: 'Juan Arguello',       role: 'Open Source Office Lead en BANCOLOMBIA',                                             country: 'Colombia',  topic: 'De OpenClaw a EnterpriseClaw: evolución del Platform Engineering hacia la Orquestación de Agentes.',                                   imageSrc: '/images/speakers/speakers/juan_arguello.png',         alt: 'Juan Arguello, speaker invitado en DevOpsDays Lima' },
    { name: 'Andrea Griffiths',    role: 'Senior Developer Advocate en GITHUB',                                                country: 'Colombia',  topic: 'Agentes en Producción: Lo Que Tuve Que Aprender Despúes De Automatizar Todo',                                                          imageSrc: '/images/speakers/speakers/andrea_griffiths.png',      alt: 'Andrea Griffiths, speaker invitado en DevOpsDays Lima' },
    { name: 'Angel Nuñez',         role: 'Head of Platform Engineering en BCP PERÚ',                                           country: 'Perú',      topic: 'Leading engineering through an agentic shift',                                                                                           imageSrc: '/images/speakers/speakers/angel_nunez.png',           alt: 'Angel Nuñez, speaker invitado en DevOpsDays Lima' },
    { name: 'Yury Niño',           role: 'Cloud Application Engineer en GOOGLE',                                               country: 'Colombia',  topic: 'STPA aplicado a DevOps & SRE',                                                                                                           imageSrc: '/images/speakers/speakers/yury_nino.png',             alt: 'Yury Niño, speaker invitado en DevOpsDays Lima' },
    { name: 'Emma Flores',         role: 'Digital Architecture Manager en NTT DATA',                                           country: 'Perú',      topic: 'De la automatización a la inteligencia operacional',                                                                                      imageSrc: '/images/speakers/speakers/emma_flores.png',           alt: 'Emma Flores, speaker invitado en DevOpsDays Lima' },
    { name: 'Sebastian Rojas',     role: 'Field Software Engineer en CANONICAL',                                               country: 'Perú',      topic: 'Convirtiendo baremetal en Nube: Despliega cualquier servidor físico con MAAS.',                                                          imageSrc: '/images/speakers/speakers/sebastian_rojas.png',       alt: 'Sebastian Rojas, speaker invitado en DevOpsDays Lima' },
    { name: 'Francisco Lopez',     role: 'Director Arquitectura y Estrategia - Risk & Compliance en Royal Bank de Canada',     country: 'Perú',      topic: 'Entrenar en la Nube, Desplegar en Casa: Estrategia Empresarial Híbrida para LLMs y modelos ML.',                                       imageSrc: '/images/speakers/speakers/francisco_lopez.png',       alt: 'Francisco Lopez, speaker invitado en DevOpsDays Lima' },
    { name: 'Ricardo Amarilla',    role: 'Senior Solutions Architect en GITLAB',                                               country: 'Paraguay',  topic: 'De Reactivo a Proactivo: Escalando DevSecOps con Agentes de IA.',                                                                        imageSrc: '/images/speakers/speakers/ricardo_amarilla .png',     alt: 'Ricardo Amarilla, speaker invitado en DevOpsDays Lima' },
    { name: 'Angelo Leva',         role: 'GDG Lead en TRANZACT',                                                               country: 'Perú',      topic: 'Specs antes que prompts: Spec Driven Development para Agentic Coding.',                                                                   imageSrc: '/images/speakers/speakers/angelo_leva.png',           alt: 'Angelo Leva, speaker invitado en DevOpsDays Lima' },
    { name: 'Carlos Gallardo',     role: 'CTO en CLEVERIT',                                                                    country: 'Chile',     topic: 'El AI Orchestrator cómo el SDLC debe cambiar.',                                                                                          imageSrc: '/images/speakers/speakers/carlos_gallardo.png',       alt: 'Carlos Gallardo, speaker invitado en DevOpsDays Lima' },
    { name: 'Victor Alvarez',      role: 'Systems Reliability Officer en Scotiabank',                                          country: 'Perú',      topic: 'De la reacción a la resiliencia: Escalando SRE del incidente a la decisión ejecutiva.',                                                  imageSrc: '/images/speakers/speakers/victor_alvarez.png',        alt: 'Victor Alvarez, speaker invitado en DevOpsDays Lima' },
    { name: 'Martin Grados',       role: 'Head of GenAI en MINSUR',                                                            country: 'Perú',      topic: 'La IA viene por nuestros trabajos y es una buena noticia.',                                                                               imageSrc: '/images/speakers/speakers/martin_grados.png',         alt: 'Martin Grados, speaker invitado en DevOpsDays Lima' },
    { name: 'Andre Delgado Ruiz',  role: 'Lead DevOps Operations en YAPE',                                                     country: 'Perú',      topic: 'DevOps: El lado humano de la operación.',                                                                                                imageSrc: '/images/speakers/speakers/andre_delgado.png',         alt: 'Andre Delgado Ruiz, speaker invitado en DevOpsDays Lima' },
  ],
  en: [
    { name: 'Jimmy Florez',        role: 'DevSecOps Lead at NEQUI',                                                            country: 'Colombia',  topic: 'De DevOps a Platform Engineering: El journey',                                                                                           imageSrc: '/images/speakers/speakers/jimmy_florez.png',          alt: 'Jimmy Florez, invited speaker at DevOpsDays Lima' },
    { name: 'Juan Arguello',       role: 'Open Source Office Lead at BANCOLOMBIA',                                             country: 'Colombia',  topic: 'De OpenClaw a EnterpriseClaw: evolución del Platform Engineering hacia la Orquestación de Agentes.',                                   imageSrc: '/images/speakers/speakers/juan_arguello.png',         alt: 'Juan Arguello, invited speaker at DevOpsDays Lima' },
    { name: 'Andrea Griffiths',    role: 'Senior Developer Advocate at GITHUB',                                                country: 'Colombia',  topic: 'Agentes en Producción: Lo Que Tuve Que Aprender Despúes De Automatizar Todo',                                                          imageSrc: '/images/speakers/speakers/andrea_griffiths.png',      alt: 'Andrea Griffiths, invited speaker at DevOpsDays Lima' },
    { name: 'Angel Nuñez',         role: 'Head of Platform Engineering at BCP PERÚ',                                           country: 'Perú',      topic: 'Leading engineering through an agentic shift',                                                                                           imageSrc: '/images/speakers/speakers/angel_nunez.png',           alt: 'Angel Nuñez, invited speaker at DevOpsDays Lima' },
    { name: 'Yury Niño',           role: 'Cloud Application Engineer at GOOGLE',                                               country: 'Colombia',  topic: 'STPA aplicado a DevOps & SRE',                                                                                                           imageSrc: '/images/speakers/speakers/yury_nino.png',             alt: 'Yury Niño, invited speaker at DevOpsDays Lima' },
    { name: 'Emma Flores',         role: 'Digital Architecture Manager at NTT DATA',                                           country: 'Perú',      topic: 'De la automatización a la inteligencia operacional',                                                                                      imageSrc: '/images/speakers/speakers/emma_flores.png',           alt: 'Emma Flores, invited speaker at DevOpsDays Lima' },
    { name: 'Sebastian Rojas',     role: 'Field Software Engineer at CANONICAL',                                               country: 'Perú',      topic: 'Convirtiendo baremetal en Nube: Despliega cualquier servidor físico con MAAS.',                                                          imageSrc: '/images/speakers/speakers/sebastian_rojas.png',       alt: 'Sebastian Rojas, invited speaker at DevOpsDays Lima' },
    { name: 'Francisco Lopez',     role: 'Architecture & Strategy Director - Risk & Compliance at Royal Bank of Canada',       country: 'Perú',      topic: 'Entrenar en la Nube, Desplegar en Casa: Estrategia Empresarial Híbrida para LLMs y modelos ML.',                                       imageSrc: '/images/speakers/speakers/francisco_lopez.png',       alt: 'Francisco Lopez, invited speaker at DevOpsDays Lima' },
    { name: 'Ricardo Amarilla',    role: 'Senior Solutions Architect at GITLAB',                                               country: 'Paraguay',  topic: 'De Reactivo a Proactivo: Escalando DevSecOps con Agentes de IA.',                                                                        imageSrc: '/images/speakers/speakers/ricardo_amarilla .png',     alt: 'Ricardo Amarilla, invited speaker at DevOpsDays Lima' },
    { name: 'Angelo Leva',         role: 'GDG Lead at TRANZACT',                                                               country: 'Perú',      topic: 'Specs antes que prompts: Spec Driven Development para Agentic Coding.',                                                                   imageSrc: '/images/speakers/speakers/angelo_leva.png',           alt: 'Angelo Leva, invited speaker at DevOpsDays Lima' },
    { name: 'Carlos Gallardo',     role: 'CTO at CLEVERIT',                                                                    country: 'Chile',     topic: 'El AI Orchestrator cómo el SDLC debe cambiar.',                                                                                          imageSrc: '/images/speakers/speakers/carlos_gallardo.png',       alt: 'Carlos Gallardo, invited speaker at DevOpsDays Lima' },
    { name: 'Victor Alvarez',      role: 'Systems Reliability Officer at Scotiabank',                                          country: 'Perú',      topic: 'De la reacción a la resiliencia: Escalando SRE del incidente a la decisión ejecutiva.',                                                  imageSrc: '/images/speakers/speakers/victor_alvarez.png',        alt: 'Victor Alvarez, invited speaker at DevOpsDays Lima' },
    { name: 'Martin Grados',       role: 'Head of GenAI at MINSUR',                                                            country: 'Perú',      topic: 'La IA viene por nuestros trabajos y es una buena noticia.',                                                                               imageSrc: '/images/speakers/speakers/martin_grados.png',         alt: 'Martin Grados, invited speaker at DevOpsDays Lima' },
    { name: 'Andre Delgado Ruiz',  role: 'Lead DevOps Operations at YAPE',                                                     country: 'Perú',      topic: 'DevOps: El lado humano de la operación.',                                                                                                imageSrc: '/images/speakers/speakers/andre_delgado.png',         alt: 'Andre Delgado Ruiz, invited speaker at DevOpsDays Lima' },
  ],
}

// ─── Session format labels ─────────────────────────────────────────────────────
export const sessionFormatLabels: Record<Locale, Record<string, string>> = {
  es: { Charla: 'Charla', Keynote: 'Keynote', Workshop: 'Workshop', Ignite: 'Ignite' },
  en: { Charla: 'Talk', Keynote: 'Keynote', Workshop: 'Workshop', Ignite: 'Ignite' },
}

// ─── CFP Topics ───────────────────────────────────────────────────────────────
export const cfpTopicsI18n: Record<Locale, typeof cfpTopicsEs> = {
  es: cfpTopicsEs,
  en: [
    { id: '1', icon: '🚀', label: 'CI/CD & Automation' },
    { id: '2', icon: '☁️', label: 'Cloud & Platform Eng.' },
    { id: '3', icon: '🔒', label: 'DevSecOps' },
    { id: '4', icon: '📊', label: 'Observability & SRE' },
    { id: '5', icon: '🤖', label: 'AI Ops' },
    { id: '6', icon: '🏗️', label: 'IaC & GitOps' },
  ],
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
const scheduleDay1En: ScheduleSession[] = [
  { time: '08:00', duration: '60 min', title: 'Registration & Welcome', type: 'break' },
  { time: '09:00', duration: '50 min', title: 'Keynote: DevOps in the Age of AI', speaker: 'Valeria Condori', type: 'keynote', room: 'Main Auditorium' },
  { time: '10:00', duration: '30 min', title: 'Break / Networking', type: 'break' },
  { time: '10:30', duration: '30 min', title: 'Platform Engineering: IDP in Production', speaker: 'Diego Bernales', type: 'talk', track: 'Track A', room: 'Room A' },
  { time: '10:30', duration: '30 min', title: 'DevSecOps: Painless Shift-Left', speaker: 'Luciana Rios', type: 'talk', track: 'Track B', room: 'Room B' },
  { time: '11:10', duration: '30 min', title: 'FinOps: Optimizing Costs on AWS', speaker: 'Carlos Mendoza', type: 'talk', track: 'Track A', room: 'Room A' },
  { time: '11:10', duration: '30 min', title: 'Multi-tenant Kubernetes in Production', speaker: 'Andrés Tapia', type: 'talk', track: 'Track B', room: 'Room B' },
  { time: '12:00', duration: '5×5 min', title: 'Ignite Talks', type: 'ignite', room: 'Main Auditorium' },
  { time: '12:30', duration: '90 min', title: 'Lunch + Tools Expo', type: 'break' },
  { time: '14:00', duration: '90 min', title: 'Open Spaces — Session 1', type: 'openspace', room: 'Open Area' },
  { time: '15:40', duration: '30 min', title: 'Break', type: 'break' },
  { time: '16:10', duration: '120 min', title: 'Workshop: Terraform + CDK in the Real World', speaker: 'Andrés Tapia', type: 'workshop', room: 'Workshop Room' },
  { time: '18:30', duration: '', title: 'Welcome Cocktail', type: 'break' },
]

const scheduleDay2En: ScheduleSession[] = [
  { time: '09:00', duration: '50 min', title: 'Keynote: DevOps Culture at LATAM Scale', speaker: 'Fernanda Castro', type: 'keynote', room: 'Main Auditorium' },
  { time: '10:00', duration: '30 min', title: 'Break / Networking', type: 'break' },
  { time: '10:30', duration: '30 min', title: 'Observability with OpenTelemetry', speaker: 'Valeria Condori', type: 'talk', track: 'Track A', room: 'Room A' },
  { time: '10:30', duration: '30 min', title: 'GitOps with ArgoCD + Flux', speaker: 'Diego Bernales', type: 'talk', track: 'Track B', room: 'Room B' },
  { time: '11:10', duration: '30 min', title: 'AI Ops: Models in Production with MLflow', type: 'talk', track: 'Track A', room: 'Room A' },
  { time: '12:00', duration: '5×5 min', title: 'Ignite Talks', type: 'ignite', room: 'Main Auditorium' },
  { time: '12:30', duration: '90 min', title: 'Lunch', type: 'break' },
  { time: '14:00', duration: '90 min', title: 'Open Spaces — Session 2', type: 'openspace', room: 'Open Area' },
  { time: '15:40', duration: '30 min', title: 'Break', type: 'break' },
  { time: '16:10', duration: '45 min', title: 'Panel: The Future of Engineering Platforms', type: 'talk', room: 'Main Auditorium' },
  { time: '17:00', duration: '', title: 'Closing + Community Retrospective', type: 'break' },
]

export const scheduleDay1I18n: Record<Locale, ScheduleSession[]> = {
  es: scheduleDay1Es,
  en: scheduleDay1En,
}

export const scheduleDay2I18n: Record<Locale, ScheduleSession[]> = {
  es: scheduleDay2Es,
  en: scheduleDay2En,
}

// ─── Venue ────────────────────────────────────────────────────────────────────
type VenueTransit = { type: 'ride' | 'metro' | 'bus'; name: string; stop: string; url: string }
type VenueFeature =
  | { type: 'stat'; value: string; label: string }
  | { type: 'flag'; available: boolean; flagText: string; label: string }

export const venueTransitI18n: Record<Locale, VenueTransit[]> = {
  es: [
    { type: 'ride', name: 'Uber', stop: 'Coordina claramente tu punto de recojo con el conductor.', url: 'https://www.uber.com/pe/es/' },
    { type: 'metro', name: 'Línea 1 del Metro de Lima', stop: 'Baja en La Cultura y camina unos minutos hasta el venue.', url: 'https://www.lineauno.pe/' },
    { type: 'bus', name: 'Metropolitano', stop: 'Baja en Canadá o Javier Prado y continúa hacia Av. Aviación.', url: 'https://www.metropolitano.com.pe/' },
  ],
  en: [
    { type: 'ride', name: 'Uber', stop: 'Clearly coordinate your pickup point with the driver.', url: 'https://www.uber.com/pe/es/' },
    { type: 'metro', name: 'Lima Metro Line 1', stop: 'Get off at La Cultura station and walk a few minutes to the venue.', url: 'https://www.lineauno.pe/' },
    { type: 'bus', name: 'Metropolitano', stop: 'Get off at Canadá or Javier Prado and continue towards Av. Aviación.', url: 'https://www.metropolitano.com.pe/' },
  ],
}

export const venueFeaturesI18n: Record<Locale, VenueFeature[]> = {
  es: [
    { type: 'stat', value: '1,200', label: 'Cap. personas' },
    { type: 'stat', value: '5', label: 'Salas de conferencia' },
    { type: 'flag', available: true, flagText: 'Sí', label: 'WiFi incluido' },
    { type: 'flag', available: false, flagText: 'No', label: 'Estacionamiento' },
    { type: 'flag', available: true, flagText: 'Sí', label: 'Accesibilidad' },
    { type: 'flag', available: true, flagText: 'Sí', label: 'Zona de comida' },
  ],
  en: [
    { type: 'stat', value: '1,200', label: 'Capacity' },
    { type: 'stat', value: '5', label: 'Conference rooms' },
    { type: 'flag', available: true, flagText: 'Yes', label: 'WiFi included' },
    { type: 'flag', available: false, flagText: 'No', label: 'Parking' },
    { type: 'flag', available: true, flagText: 'Yes', label: 'Accessibility' },
    { type: 'flag', available: true, flagText: 'Yes', label: 'Food area' },
  ],
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faqI18n: Record<Locale, Array<{ q: string; a: string }>> = {
  es: faqEs,
  en: [
    {
      q: 'What is DevOpsDays Lima and who is it for?',
      a: 'DevOpsDays Lima is a two-day community conference for **Software Engineers, Architects, Technical Leaders, DevOps Engineers, Security Engineers, CTOs, and CIOs**. The event brings the community together through **talks, workshops, open spaces, and networking** to share real-world experiences and best practices on how to build, operate, and evolve software.',
    },
    {
      q: 'When and where does the event take place?',
      a: 'DevOpsDays Lima 2026 will take place on **August 27 and 28, 2026**, starting at **8:00 AM**, at the **Lima Convention Center (LCC)**, located at **Av. De la Arqueología 206, San Borja, Lima, Peru**.',
    },
    {
      q: 'How do I register? How much do tickets cost?',
      a: 'You can register from the tickets section on the website or directly at **https://entradas.devopsdays.pe**. We currently offer two ticket options: **General and VIP**. Ticket sales are scheduled to start on **March 23, 2026**. If your team needs multiple tickets or special coordination, you can reach us at **tickets@devopsdays.pe**.',
    },
    {
      q: 'What format does the event follow?',
      a: 'The event combines different participation formats, including **keynotes, talks, workshops, and open spaces**. The agenda also includes networking spaces and community sessions focused on sharing real-world experiences.',
    },
    {
      q: 'Can I submit a talk proposal?',
      a: 'Yes. The **Call for Speakers** is open until **May 30, 2026**, and notifications will be sent from **June 15, 2026** onward. We look for real experiences, applied learnings, and case studies that help other teams make better decisions. Current tracks include **Platform Engineering & DevOps, Security & Digital Transformation, Modern Leadership & Team Culture, and AI & Data Strategy**.',
    },
    {
      q: 'Will there be food and refreshments?',
      a: 'Yes. During the event we will have **refreshment breaks** and catering designed to complement the full-day schedule. We will share more details soon about food and services included for each ticket type.',
    },
    {
      q: 'What is the dress code?',
      a: 'There is no **formal dress code**. We recommend comfortable, casual, or business casual attire appropriate for a professional environment and a two-day conference.',
    },
    {
      q: 'Will the event be recorded or streamed live?',
      a: 'The current website does not yet confirm **live streaming or session recordings**. We recommend following the official channels for upcoming updates.',
    },
    {
      q: 'How can I become a sponsor?',
      a: 'DevOpsDays Lima 2026 offers different sponsorship tiers with benefits such as **brand visibility, booths, event passes, and access to the LATAM tech community**. You can review the sponsors section, download the brochure, or write to **sponsors@devopsdays.pe** to start a conversation.',
    },
    {
      q: 'How can I stay informed and connect with the community?',
      a: 'You can follow the official DevOpsDays Lima channels for updates on speakers, tickets, sponsors, and the agenda. Our active channels are currently **LinkedIn and Instagram**.',
    },
  ],
}
