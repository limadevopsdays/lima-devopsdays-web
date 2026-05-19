import { 
  Calendar, 
  Mic,
  Ticket,
  Clock,
  CheckCircle,
  Lightbulb,
  Users,
  Code,
  Rocket,
  Target,
  Video,
  Award,
  TrendingUp,
  Brain,
  Megaphone
} from 'lucide-react';
import React from 'react'
import { SectionHeader } from '../components/devopsdays/SectionHeader'
import { cfpOpen } from '../data/mockContent'
import { Server, Shield, ClipboardPenLine, Check, Mail, CheckCircle2, MessageSquare, Gift } from 'lucide-react'
import styles from './SpeakersPage.module.css'

const topicCards = [
  {
    title: 'Platform Engineering & DevOps',
    description: 'CI/CD, observabilidad, experiencia del desarrollador, entrega de software.',
    icon: Server,
    color: '#2563eb'
  },
  {
    title: 'Seguridad y Transformación Tecnológica',
    description: 'Cloud, automatización, ciberseguridad, arquitectura moderna.',
    icon: Shield,
    color: '#f97316'
  },
  {
    title: 'Liderazgo Moderno y Cultura de Equipos',
    description: 'Equipos de alto rendimiento, cultura DevOps, gestión de ingeniería.',
    icon: Users,
    color: '#14b8a6'
  },
  {
    title: 'IA y Estrategia de Datos',
    description: 'IA en producción, estrategia de datos, herramientas de IA generativa aplicadas.',
    icon: Brain,
    color: '#a78bfa'
  }
] as const

function localDate(year: number, month: number, day: number) {
  return new Date(year, month - 1, day)
}

// Definir las fechas importantes
const timelineData = [
  { 
    label: 'APERTURA CFS', 
    date: localDate(2026, 3, 6), 
    status: 'past' as const,
    description: 'Inicia el período para enviar propuestas de charlas'
  },
  { 
    label: 'CIERRE CFS', 
    date: localDate(2026, 5, 30), 
    status: 'active' as const,
    description: 'Fecha límite para enviar tu propuesta'
  },
  { 
    label: 'Notificación', 
    date: localDate(2026, 6, 15), 
    status: 'future' as const,
    description: 'Te notificamos si tu charla fue seleccionada'
  }
]

// Función para calcular días restantes hasta cierre CFP
function calculateDaysRemaining() {
  const now = new Date()
  const closeDate = localDate(2026, 5, 30)
  const diffTime = closeDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

// Función para calcular el estado y progreso
function calculateTimelineStatus() {
  const now = new Date()
  
  // Determinar el estado de cada milestone basado en la fecha actual
  const statuses = timelineData.map((item, index) => {
    if (now >= item.date) return 'past'
    // El segundo item (Cierre) debe estar en active si estamos entre apertura y cierre
    if (index === 1 && now >= timelineData[0].date && now < timelineData[1].date) return 'active'
    return 'future'
  })
  
  // Calcular progreso entre fases
  const progressSegments: number[] = []
  
  for (let i = 0; i < timelineData.length - 1; i++) {
    const startDate = timelineData[i].date
    const endDate = timelineData[i + 1].date
    
    if (now < startDate) {
      // Fase futura: 0%
      progressSegments.push(0)
    } else if (now >= endDate) {
      // Fase completada: 100%
      progressSegments.push(100)
    } else {
      // Fase en progreso: calcular porcentaje
      const totalDuration = endDate.getTime() - startDate.getTime()
      const elapsed = now.getTime() - startDate.getTime()
      const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
      progressSegments.push(progress)
    }
  }
  
  return { statuses, progressSegments }
}

export default function SpeakersPage() {
  const cfpOpen = true
  const { statuses, progressSegments } = calculateTimelineStatus()
  const daysRemaining = calculateDaysRemaining()
  const socialProofImage = '/images/speakers/page/banner%201.jpg'

  return (
    <div className={styles.page}>
      {/* Social Proof Hero */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          <div className={styles.socialProofCard}>
            <div className={styles.socialProofGrid}>
              <div className={styles.socialProofImage}>
                <img
                  src={socialProofImage}
                  alt="Speakers y comunidad en DevOpsDays Lima"
                  className={styles.socialProofImageMedia}
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className={styles.socialProofContent}>
                <div className={styles.socialProofBadge}>
                  <Mic size={20} className={styles.socialProofBadgeIcon} />
                  <span className={styles.socialProofBadgeText}>Call for Speakers 2026</span>
                </div>

                <h1 className={styles.introTitle}>
                  Comparte tu experiencia con la comunidad DevOps
                </h1>

                <p className={styles.introDescription}>
                  Buscamos speakers con experiencia real en transformación DevOps. Si tu aprendizaje nació en entornos reales
                  y hoy puede ayudar a otros equipos a tomar mejores decisiones, queremos escucharte.
                </p>

                <div className={styles.benefitsList}>
                  <div className={styles.benefitItem}>
                    <span>Acceso completo al evento</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <span>Visibilidad ante la comunidad LATAM</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <span>Networking con líderes del ecosistema regional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      {cfpOpen && (
        <section className={styles.datesSection}>
          <div className={styles.container}>
            <h2 className={styles.datesSectionTitle}>¡Estas son tus fechas clave!</h2>

            <p className={styles.datesSectionLead}>
              Estas son las fechas clave para planificar tu postulación y seguir el proceso con claridad.
            </p>

            <div className={styles.timeline}>
              {timelineData.map((item, index) => (
                <div key={index} style={{ display: 'contents' }}>
                  <div className={styles.timelineItem}>
                    <div className={`${styles.timelineDot} ${styles[`dot${statuses[index].charAt(0).toUpperCase() + statuses[index].slice(1)}`]}`}></div>
                    <div className={`${styles.timelineCard} ${statuses[index] === 'past' ? styles.timelineCardActive : ''}`}>
                      <div className={`${styles.timelineBadge} ${styles[`badge${statuses[index].charAt(0).toUpperCase() + statuses[index].slice(1)}`]}`}>
                        {item.label}
                      </div>
                      <div className={styles.timelineDate}>
                        {item.date.toLocaleDateString('es-PE', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className={styles.timelineYear}>
                        {item.date.getFullYear()}
                      </div>
                      <div className={styles.timelineDescription}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                  
                  {index < timelineData.length - 1 && (
                    <div 
                      className={styles.timelineLine}
                      style={{ '--progress': `${progressSegments[index]}%` } as React.CSSProperties}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Killer Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaLeftContent}>
              <div className={styles.ctaBadgeContainer}>
                <div className={styles.ctaBadgeDot} />
                <span className={styles.ctaBadgePillText}>CALL FOR SPEAKERS DISPONIBLE</span>
              </div>

              <h2 className={styles.ctaTitle}>¿Tienes una historia que contar?</h2>
              
              <p className={styles.ctaDescription}>
                Comparte experiencia aplicada, criterio técnico y aprendizajes que puedan elevar la conversación de la comunidad DevOps en Perú.
                Buscamos talks con sustancia, casos reales y lecciones que ayuden a otros equipos a ejecutar mejor.
              </p>

            </div>
            
            <div className={styles.ctaRightContent}>
              <a 
                href="https://talks.devopsdays.org/devopsdays-lima-2026/cfp" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.ctaButton}
                data-track-name="enviar_propuesta_cta_speakers"
              >
                <ClipboardPenLine size={20} className={styles.ctaButtonIcon} />
                Enviar una propuesta
              </a>

              <div className={styles.ctaDatesGroup}>
                <p className={styles.ctaDeadline}>
                  Cierre de propuestas: <strong>30 de mayo de 2026</strong>
                </p>
                <p className={styles.ctaDeadline}>
                  Notificación: <strong>A partir del 15 de junio de 2026</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ejes Temáticos Section */}
      {cfpOpen && (
        <section className={styles.topicsSection} id="ejes-tematicos">
          <div className={styles.container}>
            <h2 className={styles.topicsSectionTitle}>Ejes Temáticos</h2>

            <p className={styles.topicsSectionLead}>
              Buscamos propuestas que mezclen profundidad técnica, contexto real y relevancia para la comunidad.
              Estos son los ejes que hoy consideramos más estratégicos para DevOpsDays Lima 2026.
            </p>

            <div className={styles.topicsGrid}>
              {topicCards.map((topic) => {
                const Icon = topic.icon

                return (
                  <div
                    key={topic.title}
                    className={styles.topicCard}
                    style={{ '--topic-color': topic.color } as React.CSSProperties}
                  >
                    <div className={styles.topicIcon}>
                      <Icon size={32} />
                    </div>
                    <h3 className={styles.topicTitle}>{topic.title}</h3>
                    <p className={styles.topicDescription}>
                      {topic.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
