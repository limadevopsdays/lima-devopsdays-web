import { Send, CheckCircle } from 'lucide-react'
import { Link } from 'react-router'
import styles from './SpeakersSection.module.css'

// Imagen hero de speaker - Ruta portable para exportación
const speakerEdition2025 = '/images/speakers/speakers%201.jpg'
const keynoteMarcHornbeek = '/images/speakers/keynotes/marc_hornbeek.jpeg'

// Speakers destacados de ediciones pasadas
const PAST_SPEAKERS = [
  'María González - AWS',
  'Carlos Ruiz - Google Cloud',
  'Ana Torres - Microsoft Azure',
  'Luis Pérez - Red Hat',
  'Sofia Mendoza - HashiCorp',
  'Diego Vargas - Datadog'
]

// Tracks/Ejes tematicos con color asociado al concepto principal
const tracks = [
  { name: 'Platform Engineering & DevOps', color: '#2563eb' }, // Azul: ingeniería, sistemas, estructura
  { name: 'Seguridad y Transformación Tecnológica', color: '#f97316' }, // Naranja: tensión, cambio, criticidad sin semántica de error
  { name: 'Liderazgo Moderno y Cultura de Equipos', color: '#14b8a6' }, // Teal: colaboración, evolución, equipos
  { name: 'IA y Estrategia de Datos', color: '#a78bfa' }, // Morado claro: discovery e inteligencia sin competir con el color de marca
]

const keynoteSpeakers = [
  {
    name: 'Marc Hornbeek',
    role: 'CEO y consultor principal',
    imageSrc: keynoteMarcHornbeek,
    alt: 'Marc Hornbeek, keynote speaker invitado en DevOpsDays Lima',
    linkedin: 'https://www.linkedin.com/in/marchornbeek/',
  },
]

export function SpeakersSection() {
  return (
    <section id="speakers" className={styles.section}>
      {/* SOCIAL PROOF - Foto + Lista de speakers */}
      <div className={styles.socialProofSection}>
        <div className={styles.container}>
          <div className={styles.speakersHeader}>
            <div className={styles.keynoteIntroBadge}>
              SPEAKERS
            </div>
            <h2 className={styles.speakersTitle}>
              Keynote Speakers
            </h2>
            <p className={styles.speakersLead}>
              Líderes de la industria tech compartiendo sus experiencias en producción.
            </p>
          </div>
          <div className={styles.keynotePanel}>
            <div className={styles.keynotePanelContent}>
              <div className={styles.keynoteShowcase}>
                {keynoteSpeakers.map((speaker) => (
                  <article key={speaker.name} className={styles.keynoteCard}>
                  <div className={styles.keynoteImageFrame}>
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.keynoteImageLink}
                      aria-label={`Ver perfil de LinkedIn de ${speaker.name}`}
                      data-track-name="ver_linkedin_keynote_home"
                    >
                      <img
                        className={styles.keynoteImage}
                        src={speaker.imageSrc}
                        alt={speaker.alt}
                        loading="lazy"
                      />
                      <div className={styles.keynoteImageOverlay} aria-hidden="true" />
                    </a>
                  </div>

                  <div className={styles.keynoteMeta}>
                    <h3 className={styles.keynoteName}>{speaker.name}</h3>
                    <p className={styles.keynoteRole}>{speaker.role}</p>
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>
          <div className={styles.socialProofCard}>
            <div className={styles.socialProofGrid}>
              <div
                className={styles.socialProofImage}
                style={{ '--social-proof-bg': `url(${speakerEdition2025})` } as React.CSSProperties}
              />

              <div className={styles.socialProofContent}>
                <div className={styles.socialProofBadge}>
                  <CheckCircle className={styles.checkIcon} />
                  <span className={styles.socialProofBadgeText}>Edición 2025</span>
                </div>

                <h2 className={styles.socialProofTitle}>
                  Únete a estos speakers destacados
                </h2>

                <p className={styles.socialProofDescription}>
                  En DevOpsDays Lima 2025 reunimos speakers con experiencia real en plataforma, seguridad, datos y liderazgo técnico.
                  Tu historia puede aportar criterio, contexto y aprendizaje práctico a la comunidad en 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER CTA - Call for Speakers */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBannerBg} />
        <div className={styles.ctaBannerOverlay} />

        <div className={styles.ctaBannerContainer}>
          <div className={styles.grid}>
            {/* Columna izquierda: Contenido principal */}
            <div className={styles.content}>
              <div>
                <div className={styles.badgeContainer}>
                  <div className={styles.badgeDot} />
                  <span className={styles.badgeText}>
                    CALL FOR SPEAKERS DISPONIBLE
                  </span>
                </div>

                <h2 className={styles.title}>
                  Call for Speakers
                </h2>

                <p className={styles.description}>
                  Comparte experiencias reales de producción: decisiones difíciles, aprendizajes concretos y casos que hayan movido equipos, plataformas o resultados de negocio.
                  DevOpsDays Lima es parte de una comunidad global, pero con foco local y conversaciones que sí aterrizan en la realidad de la región.
                </p>

                {/* Label para ejes temáticos */}
                <p className={styles.tracksLabel}>
                  Ejes Temáticos
                </p>

                {/* Ejes temáticos en una línea horizontal */}
                <div className={styles.tracks}>
                  {tracks.map((track, idx) => (
                    <span
                      key={idx}
                      className={styles.trackPill}
                      style={{ '--track-color': track.color } as React.CSSProperties}
                    >
                      {track.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna derecha: Fechas y CTA */}
            <div className={styles.dates}>
              <Link
                to="/speakers"
                className={styles.ctaButton}
                data-track-name="call_for_speakers_banner_home"
              >
                <Send className={styles.ctaIcon} />
                Call for Speakers
              </Link>

              <div>
                <p className={styles.dateText}>
                  Cierre de propuestas: <strong>30 de mayo de 2026</strong>
                </p>
                <p className={styles.dateText}>
                  Notificación: <strong>A partir del 15 de junio de 2026</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
