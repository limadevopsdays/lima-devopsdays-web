import type { Locale } from '../../../i18n'

type Stat = { emoji: string; color: string; title: string; subtitle: string }

type AboutI18n = {
  eyebrow: string
  title: string
  mission: string
  videoPreviewTitle: string
  videoAriaLabel: string
  closeLabel: string
  pausePreviewLabel: string
  playPreviewLabel: string
  mutePreviewLabel: string
  unmutePreviewLabel: string
  stats: Stat[]
}

export const aboutI18n: Record<Locale, AboutI18n> = {
  es: {
    eyebrow: '¡Regresamos este 2026! 💪',
    title: '¿Qué es DevOpsDays Lima 2026?',
    mission:
      'Nuestra misión en DevOpsDays Lima es impulsar la evolución tecnológica con un evento que conecta a profesionales, fomenta el intercambio de conocimientos DevOps y refuerza una cultura de innovación continua basada en experiencias reales.',
    videoPreviewTitle: 'Vista previa automática del video DevOpsDays Lima',
    videoAriaLabel: 'DevOpsDays Lima - Video oficial',
    closeLabel: 'Cerrar',
    pausePreviewLabel: 'Pausar video',
    playPreviewLabel: 'Reanudar video',
    mutePreviewLabel: 'Silenciar video',
    unmutePreviewLabel: 'Activar audio',
    stats: [
      {
        emoji: '🎉',
        color: '#6B51EF',
        title: 'La comunidad más grande de Perú',
        subtitle: 'Se esperan +800 participantes entre Ingenieros DevOps, Ingenieros de seguridad, CTOs y CIOs',
      },
      {
        emoji: '✨',
        color: '#93e279',
        title: 'Dos días completos de aprendizaje',
        subtitle: 'Charlas (Keynotes, speakers) + Talleres + Open Spaces + Networking',
      },
      {
        emoji: '🥳',
        color: 'var(--color-blue-additional)',
        title: 'Regresamos en el 2026',
        subtitle: 'Con nuestra 2da edición del evento en Lima Centro de Convenciones (LCC)',
      },
    ],
  },
  en: {
    eyebrow: "We're back in 2026! 💪",
    title: 'What is DevOpsDays Lima 2026?',
    mission:
      'Our mission at DevOpsDays Lima is to drive technological evolution with an event that connects professionals, fosters the exchange of DevOps knowledge, and reinforces a culture of continuous innovation based on real-world experiences.',
    videoPreviewTitle: 'Automatic preview of the DevOpsDays Lima video',
    videoAriaLabel: 'DevOpsDays Lima - Official video',
    closeLabel: 'Close',
    pausePreviewLabel: 'Pause video',
    playPreviewLabel: 'Resume video',
    mutePreviewLabel: 'Mute video',
    unmutePreviewLabel: 'Enable audio',
    stats: [
      {
        emoji: '🎉',
        color: '#6B51EF',
        title: "Peru's largest DevOps community",
        subtitle: '+800 attendees expected including DevOps Engineers, Security Engineers, CTOs and CIOs',
      },
      {
        emoji: '✨',
        color: '#93e279',
        title: 'Two full days of learning',
        subtitle: 'Talks (Keynotes, speakers) + Workshops + Open Spaces + Networking',
      },
      {
        emoji: '🥳',
        color: 'var(--color-blue-additional)',
        title: 'Back in 2026',
        subtitle: 'Our 2nd edition at the Lima Convention Center (LCC)',
      },
    ],
  },
}
