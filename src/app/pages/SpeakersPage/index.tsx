import {
  Mic,
  Users,
  Brain,
} from 'lucide-react';
import React from 'react'
import { SectionHeader } from '../../components/devopsdays/SectionHeader'
import { Server, Shield, ClipboardPenLine } from 'lucide-react'
import { useI18n } from '../../i18n'
import { speakersPageI18n } from './i18n'
import styles from './index.module.css'

// Configuración estática por tarjeta temática (iconos y colores, sin texto)
const TOPIC_CARDS_CONFIG = [
  { icon: Server, color: '#2563eb' },
  { icon: Shield, color: '#f97316' },
  { icon: Users, color: '#14b8a6' },
  { icon: Brain, color: '#a78bfa' },
] as const

function localDate(year: number, month: number, day: number) {
  return new Date(year, month - 1, day)
}

// Solo fechas — labels y descripciones vienen de i18n
const timelineData = [
  { date: localDate(2026, 3, 6) },
  { date: localDate(2026, 5, 30) },
  { date: localDate(2026, 6, 15) },
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

  const statuses = timelineData.map((item, index) => {
    if (now >= item.date) return 'past'
    if (index === 1 && now >= timelineData[0].date && now < timelineData[1].date) return 'active'
    return 'future'
  })

  const progressSegments: number[] = []

  for (let i = 0; i < timelineData.length - 1; i++) {
    const startDate = timelineData[i].date
    const endDate = timelineData[i + 1].date

    if (now < startDate) {
      progressSegments.push(0)
    } else if (now >= endDate) {
      progressSegments.push(100)
    } else {
      const totalDuration = endDate.getTime() - startDate.getTime()
      const elapsed = now.getTime() - startDate.getTime()
      const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
      progressSegments.push(progress)
    }
  }

  return { statuses, progressSegments }
}

export default function SpeakersPage() {
  const t = useI18n(speakersPageI18n)
  const cfpOpen = true
  const { statuses, progressSegments } = calculateTimelineStatus()
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
                  alt={t.socialProofAlt}
                  className={styles.socialProofImageMedia}
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className={styles.socialProofContent}>
                <div className={styles.socialProofBadge}>
                  <Mic size={20} className={styles.socialProofBadgeIcon} />
                  <span className={styles.socialProofBadgeText}>{t.badgeText}</span>
                </div>

                <h1 className={styles.introTitle}>{t.introTitle}</h1>

                <p className={styles.introDescription}>{t.introDescription}</p>

                <div className={styles.benefitsList}>
                  {t.benefits.map((benefit, idx) => (
                    <div key={idx} className={styles.benefitItem}>
                      <span>{benefit}</span>
                    </div>
                  ))}
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
            <h2 className={styles.datesSectionTitle}>{t.datesSectionTitle}</h2>

            <p className={styles.datesSectionLead}>{t.datesSectionLead}</p>

            <div className={styles.timeline}>
              {timelineData.map((item, index) => (
                <div key={index} style={{ display: 'contents' }}>
                  <div className={styles.timelineItem}>
                    <div className={`${styles.timelineDot} ${styles[`dot${statuses[index].charAt(0).toUpperCase() + statuses[index].slice(1)}`]}`}></div>
                    <div className={`${styles.timelineCard} ${statuses[index] === 'past' ? styles.timelineCardActive : ''}`}>
                      <div className={`${styles.timelineBadge} ${styles[`badge${statuses[index].charAt(0).toUpperCase() + statuses[index].slice(1)}`]}`}>
                        {t.timeline[index].label}
                      </div>
                      <div className={styles.timelineDate}>
                        {item.date.toLocaleDateString(t.dateLocale, { day: 'numeric', month: 'long' })}
                      </div>
                      <div className={styles.timelineYear}>
                        {item.date.getFullYear()}
                      </div>
                      <div className={styles.timelineDescription}>
                        {t.timeline[index].description}
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
                <span className={styles.ctaBadgePillText}>{t.ctaBadgeText}</span>
              </div>

              <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>

              <p className={styles.ctaDescription}>{t.ctaDescription}</p>
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
                {t.ctaButton}
              </a>

              <div className={styles.ctaDatesGroup}>
                <p className={styles.ctaDeadline}>
                  {t.ctaDeadline1Label}<strong>{t.ctaDeadline1Value}</strong>
                </p>
                <p className={styles.ctaDeadline}>
                  {t.ctaDeadline2Label}<strong>{t.ctaDeadline2Value}</strong>
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
            <h2 className={styles.topicsSectionTitle}>{t.topicsSectionTitle}</h2>

            <p className={styles.topicsSectionLead}>{t.topicsSectionLead}</p>

            <div className={styles.topicsGrid}>
              {TOPIC_CARDS_CONFIG.map((config, idx) => {
                const Icon = config.icon

                return (
                  <div
                    key={idx}
                    className={styles.topicCard}
                    style={{ '--topic-color': config.color } as React.CSSProperties}
                  >
                    <div className={styles.topicIcon}>
                      <Icon size={32} />
                    </div>
                    <h3 className={styles.topicTitle}>{t.topicCards[idx].title}</h3>
                    <p className={styles.topicDescription}>{t.topicCards[idx].description}</p>
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
