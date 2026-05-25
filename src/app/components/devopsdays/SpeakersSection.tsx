import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChevronLeft, ChevronRight, Send, Github, Linkedin } from 'lucide-react'
import { Link } from 'react-router'
import styles from './SpeakersSection.module.css'
import { SectionHeader } from './SectionHeader'

// Imagen hero de speaker - Ruta portable para exportación
const speakerEdition2025 = '/images/speakers/speakers%201.jpg'
const keynoteMarcHornbeek = '/images/speakers/keynotes/marc_hornbeek.jpg'
const keynoteXavierRene = '/images/speakers/keynotes/xavier_rene.jpeg'
const speakerJimmyFlorez = '/images/speakers/speakers/jimmy_florez.png'
const speakerJuanArguello = '/images/speakers/speakers/juan_arguello.png'
const speakerAndreaGriffiths = '/images/speakers/speakers/andrea_griffiths.png'
const speakerAngelNunez = '/images/speakers/speakers/angel_nun%CC%83ez.png'
const speakerYuryNino = '/images/speakers/speakers/yury_nin%CC%83o.png'
const speakerEmmaFlores = '/images/speakers/speakers/emma_flores.png'
const speakerSebastianRojas = '/images/speakers/speakers/sebastian_rojas.png'
const speakerFranciscoLopez = '/images/speakers/speakers/francisco_lopez.png'
const speakerRicardoAmarilla = '/images/speakers/speakers/ricardo_amarilla%20.png'
const speakerAngeloLeva = '/images/speakers/speakers/angelo_leva.png'
const speakerCarlosGallardo = '/images/speakers/speakers/carlos_gallardo.png'
const speakerVictorAlvarez = '/images/speakers/speakers/victor_alvarez.png'
const speakerMartinGrados = '/images/speakers/speakers/martin_grados.png'
const speakerAndreDelgado = '/images/speakers/speakers/andre_delgado.png'

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
    tag: 'INTERNACIONAL',
    role: 'CEO y consultor principal',
    topic: 'Beyond DevSecOps: The Era of Intelligent Continuous Security',
    imageSrc: keynoteMarcHornbeek,
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
    imageSrc: keynoteXavierRene,
    imagePosition: 'center bottom',
    imageFit: 'contain',
    alt: 'Xavier Rene-Corail, keynote speaker invitado en DevOpsDays Lima',
    linkedin: 'https://www.linkedin.com/in/xavier-ren%C3%A9-corail-2428431?trk=public_post-text',
    github: 'https://github.com/xcorail',
  },
]

const invitedSpeakers = [
  {
    name: 'Jimmy Florez',
    role: 'DevSecOps Lead en NEQUI',
    country: 'Colombia',
    topic: 'De DevOps a Platform Engineering: El journey',
    imageSrc: speakerJimmyFlorez,
    alt: 'Jimmy Florez, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Juan Arguello',
    role: 'Open Source Office Lead en BANCOLOMBIA',
    country: 'Colombia',
    topic: 'De OpenClaw a EnterpriseClaw: evolución del Platform Engineering hacia la Orquestación de Agentes.',
    imageSrc: speakerJuanArguello,
    alt: 'Juan Arguello, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Andrea Griffiths',
    role: 'Senior Developer Advocate en GITHUB',
    country: 'Colombia',
    topic: 'Agentes en Producción: Lo Que Tuve Que Aprender Despúes De Automatizar Todo',
    imageSrc: speakerAndreaGriffiths,
    alt: 'Andrea Griffiths, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Angel Nuñez',
    role: 'Head of Platform Engineering en BCP PERÚ',
    country: 'Perú',
    topic: 'Leading engineering through an agentic shift',
    imageSrc: speakerAngelNunez,
    alt: 'Angel Nuñez, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Yury Niño',
    role: 'Cloud Application Engineer en GOOGLE',
    country: 'Colombia',
    topic: 'STPA aplicado a DevOps & SRE',
    imageSrc: speakerYuryNino,
    alt: 'Yury Niño, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Emma Flores',
    role: 'Digital Architecture Manager en NTT DATA',
    country: 'Perú',
    topic: 'De la automatización a la inteligencia operacional',
    imageSrc: speakerEmmaFlores,
    alt: 'Emma Flores, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Sebastian Rojas',
    role: 'Field Software Engineer en CANONICAL',
    country: 'Perú',
    topic: 'Convirtiendo baremetal en Nube: Despliega cualquier servidor físico con MAAS.',
    imageSrc: speakerSebastianRojas,
    alt: 'Sebastian Rojas, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Francisco Lopez',
    role: 'Director Arquitectura y Estrategia - Risk & Compliance en Royal Bank de Canada',
    country: 'Perú',
    topic: 'Entrenar en la Nube, Desplegar en Casa: Estrategia Empresarial Híbrida para LLMs y modelos ML.',
    imageSrc: speakerFranciscoLopez,
    alt: 'Francisco Lopez, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Ricardo Amarilla',
    role: 'Senior Solutions Architect en GITLAB',
    country: 'Paraguay',
    topic: 'De Reactivo a Proactivo: Escalando DevSecOps con Agentes de IA.',
    imageSrc: speakerRicardoAmarilla,
    alt: 'Ricardo Amarilla, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Angelo Leva',
    role: 'GDG Lead en TRANZACT',
    country: 'Perú',
    topic: 'Specs antes que prompts: Spec Driven Development para Agentic Coding.',
    imageSrc: speakerAngeloLeva,
    alt: 'Angelo Leva, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Carlos Gallardo',
    role: 'CTO en CLEVERIT',
    country: 'Chile',
    topic: 'El AI Orchestrator cómo el SDLC debe cambiar.',
    imageSrc: speakerCarlosGallardo,
    alt: 'Carlos Gallardo, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Victor Alvarez',
    role: 'Systems Reliability Officer en Scotiabank',
    country: 'Perú',
    topic: 'De la reacción a la resiliencia: Escalando SRE del incidente a la decisión ejecutiva.',
    imageSrc: speakerVictorAlvarez,
    alt: 'Victor Alvarez, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Martin Grados',
    role: 'Head of GenAI en MINSUR',
    country: 'Perú',
    topic: 'La IA viene por nuestros trabajos y es una buena noticia.',
    imageSrc: speakerMartinGrados,
    alt: 'Martin Grados, speaker invitado en DevOpsDays Lima',
  },
  {
    name: 'Andre Delgado Ruiz',
    role: 'Lead DevOps Operations en YAPE',
    country: 'Perú',
    topic: 'DevOps: El lado humano de la operación.',
    imageSrc: speakerAndreDelgado,
    alt: 'Andre Delgado Ruiz, speaker invitado en DevOpsDays Lima',
  },
]

function InvitedNextArrow(props: any) {
  const { onClick } = props
  return (
    <button
      type="button"
      className={`${styles.invitedArrow} ${styles.invitedNextArrow}`}
      onClick={onClick}
      aria-label="Siguiente speaker"
      data-track-name="siguiente_speakers_invitados_home"
    >
      <ChevronRight className={styles.invitedArrowIcon} />
    </button>
  )
}

function InvitedPrevArrow(props: any) {
  const { onClick } = props
  return (
    <button
      type="button"
      className={`${styles.invitedArrow} ${styles.invitedPrevArrow}`}
      onClick={onClick}
      aria-label="Speaker anterior"
      data-track-name="anterior_speakers_invitados_home"
    >
      <ChevronLeft className={styles.invitedArrowIcon} />
    </button>
  )
}

export function SpeakersSection() {
  const invitedCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <InvitedNextArrow />,
    prevArrow: <InvitedPrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <section id="speakers" className={styles.section}>
      <div className={styles.keynoteSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Speakers"
            eyebrowColor="#6B51EF"
            title={<><span className={styles.keynoteTitleAccent}>Keynote</span> Speakers</>}
            lead="Líderes de la industria tech compartiendo sus experiencias en producción."
          />
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
                        style={{
                          objectPosition: speaker.imagePosition,
                          objectFit: speaker.imageFit,
                        }}
                      />
                      <div className={styles.keynoteImageOverlay} aria-hidden="true" />
                    </a>
                  </div>

                  <div className={styles.keynoteMeta}>
                    <div className={styles.keynoteTagRow}>
                      <span className={styles.keynoteTag}>{speaker.tag}</span>
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.keynoteLinkedin}
                        aria-label={`Ver LinkedIn de ${speaker.name}`}
                        data-track-name="ver_linkedin_tag_keynote_home"
                      >
                        <Linkedin className={styles.keynoteLinkedinIcon} />
                      </a>
                      {speaker.github ? (
                        <a
                          href={speaker.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.keynoteGithub}
                          aria-label={`Ver GitHub de ${speaker.name}`}
                          data-track-name="ver_github_tag_keynote_home"
                        >
                          <Github className={styles.keynoteGithubIcon} />
                        </a>
                      ) : null}
                    </div>
                    <h3 className={styles.keynoteName}>{speaker.name}</h3>
                    {speaker.role ? <p className={styles.keynoteRole}>{speaker.role}</p> : null}
                    <p className={styles.keynoteTopic}>
                      <span>
                        <span>{speaker.topic}</span>
                        {speaker.topicSecondLine ? (
                          <span className={styles.keynoteTopicSecondLine}>{speaker.topicSecondLine}</span>
                        ) : null}
                      </span>
                    </p>
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>

          <div className={styles.sectionDivider} aria-hidden="true" />

          <div className={styles.invitedPanel}>
            <div className={styles.invitedPanelContent}>
              <div className={styles.invitedPanelHeader}>
                <h3 className={styles.invitedPanelTitle}>
                  <span className={styles.keynoteTitleAccent}>Speakers</span> invitados
                </h3>
                <p className={styles.invitedPanelLead}>
                  Una selección de speakers con experiencia en platform engineering, DevSecOps, SRE, IA y liderazgo técnico.
                </p>
              </div>

              <div className={styles.invitedCarouselWrapper}>
                <Slider {...invitedCarouselSettings}>
                  {invitedSpeakers.map((speaker) => (
                    <div key={speaker.name} className={styles.invitedSlideWrapper}>
                      <article className={styles.invitedCard}>
                        <div className={styles.invitedCardInner}>
                          <div className={styles.invitedProfileImageBio}>
                            <div className={styles.invitedProfileImageWrapper}>
                              <div
                                className={styles.invitedProfileImage}
                                style={{ backgroundImage: `url(${speaker.imageSrc})` }}
                                role="img"
                                aria-label={speaker.alt}
                              />
                              <span
                                className={styles.invitedCountryFlag}
                                data-country={speaker.country}
                                aria-label={speaker.country}
                              />
                            </div>
                            <h3 className={styles.invitedMemberName}>{speaker.name}</h3>
                            <p className={styles.invitedMemberJob}>{speaker.role}</p>
                            <p className={styles.invitedMemberTalk}>
                              <span>{speaker.topic}</span>
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </Slider>
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
                  Call for Speakers 2026
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
              <div className={styles.ctaActions}>
                <Link
                  to="/speakers"
                  className={styles.ctaSecondaryButton}
                  data-track-name="ver_detalles_beneficios_speakers_home"
                >
                  Ver detalles y beneficios
                </Link>

                <a
                  href="https://talks.devopsdays.org/devopsdays-lima-2026/cfp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                  data-track-name="call_for_speakers_banner_home"
                >
                  <Send className={styles.ctaIcon} />
                  Call for Speakers
                </a>
              </div>

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
