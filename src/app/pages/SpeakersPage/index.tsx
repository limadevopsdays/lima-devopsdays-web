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
import { SpeakersSection } from '../../components/devopsdays/SpeakersSection'

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
      {/* Social Proof Hero — hidden for now
      <section className={styles.introSection}>
        ...
      </section>
      */}

      {/* Important Dates — hidden for now
      {cfpOpen && (
        <section className={styles.datesSection}>
          ...
        </section>
      )}
      */}

      {/* CTA Killer Section — hidden for now
      <section className={styles.ctaSection}>
        ...
      </section>
      */}

      {/* Invited Speakers carousel */}
      <SpeakersSection showInvited />

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
