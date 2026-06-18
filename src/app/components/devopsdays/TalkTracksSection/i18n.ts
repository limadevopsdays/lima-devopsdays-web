import type { Locale } from '../../../i18n'

type TrackI18n = {
  title: string
  description: string
}

type TalkTracksI18n = {
  eyebrow: string
  titlePart1: string
  titlePart2: string
  lead: string
  tracks: TrackI18n[]
}

export const talkTracksI18n: Record<Locale, TalkTracksI18n> = {
  es: {
    eyebrow: 'SPEAKERS',
    titlePart1: 'Nuestros ',
    titlePart2: 'Talk Tracks',
    lead: 'Explora los pilares temáticos estratégicos que marcarán el rumbo de la innovación técnica y organizacional en esta edición de DevOpsDays Lima 2026.',
    tracks: [
      {
        title: 'Platform Engineering & DevOps',
        description: 'Diseño y optimización de plataformas de desarrollo internas (IDPs), automatización avanzada de ciclos de entrega de software con CI/CD robusto, orquestación moderna de contenedores y prácticas avanzadas de SRE junto a observabilidad continua para habilitar la total autonomía de los equipos de ingeniería.',
      },
      {
        title: 'Seguridad y Transformación Tecnológica',
        description: 'Integración nativa de la ciberseguridad dentro del ciclo de vida del software (DevSecOps), adopción estratégica de la nube y diseño de arquitecturas resilientes. Foco en la mitigación efectiva de riesgos y el cumplimiento normativo en entornos híbridos y multi-cloud sin comprometer la agilidad empresarial.',
      },
      {
        title: 'Liderazgo Moderno y Cultura de Equipos',
        description: 'Estrategias de gestión de ingeniería con enfoque centrado en las personas, impulsando la colaboración interfuncional de alto impacto. Modelos organizacionales y métricas modernas orientadas al rendimiento y bienestar, diseñados para mitigar el desgaste (burnout) y madurar la cultura de la mejora continua.',
      },
      {
        title: 'IA y Estrategia de Datos',
        description: 'Operacionalización de modelos de Inteligencia Artificial y Machine Learning en entornos de producción (AIOps/MLOps), estructuración de canalizaciones de datos escalables e integración ética de asistentes de codificación agentic y herramientas generativas para maximizar el valor del SDLC.',
      },
    ],
  },
  en: {
    eyebrow: 'SPEAKERS',
    titlePart1: 'Our ',
    titlePart2: 'Talk Tracks',
    lead: 'Explore the strategic thematic pillars that will drive technical and organizational innovation at DevOpsDays Lima 2026.',
    tracks: [
      {
        title: 'Platform Engineering & DevOps',
        description: 'Design and optimization of Internal Developer Platforms (IDPs), advanced software delivery automation through robust CI/CD pipelines, modern container orchestration, and progressive SRE practices alongside continuous observability to empower development teams with self-service autonomy.',
      },
      {
        title: 'Security & Technological Transformation',
        description: 'Native cybersecurity integration throughout the software lifecycle (DevSecOps), strategic cloud adoption, and design of highly resilient system architectures. Focus on risk mitigation and security compliance across hybrid and multi-cloud environments without hindering delivery velocity.',
      },
      {
        title: 'Modern Leadership & Team Culture',
        description: 'People-first engineering management strategies promoting high-impact, cross-functional collaboration. Organizational models and engineering metrics centered around efficiency and developer experience, designed to prevent burnout and foster a culture of shared responsibility and learning.',
      },
      {
        title: 'AI & Data Strategy',
        description: 'Operationalizing Artificial Intelligence and Machine Learning models in production pipelines (AIOps/MLOps), designing scalable data architectures, and ethically adopting agentic coding assistants and generative tools to optimize and accelerate the software development lifecycle.',
      },
    ],
  },
}
