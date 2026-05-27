import { useState } from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SectionHeader } from '../SectionHeader'
import { organizers } from '../../../data/mockContent'
import styles from './index.module.css'
import { useI18n } from '../../../i18n'
import { organizersI18n } from './i18n'

const organizerImages: Record<string, string> = {
  'Lenard Vega': '/images/organizers/lenard.jpg',
  'Diana Uriol': '/images/organizers/diana.jpg',
  'Danilo Briceño': '/images/organizers/danilo.jpg',
  'Gino Leon': '/images/organizers/gino.jpg',
  'Fredy Hernandez': '/images/organizers/fredy.jpg',
  'Ronald Requena': '/images/organizers/ronald.jpg',
  'Jhonnatan Correa': '/images/organizers/jhonnatan.jpeg',
  'Stefani Sánchez': '/images/organizers/stefani.jpg',
}

function normalizeGithub(v: string) {
  return v.startsWith('http') ? v : `https://github.com/${v}`
}
function normalizeTwitter(v: string) {
  const h = v.startsWith('@') ? v.slice(1) : v
  return `https://x.com/${h}`
}

export function OrganizersSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const t = useI18n(organizersI18n)

  return (
    <section id="organizers" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          eyebrow={t.eyebrow}
          eyebrowColor="#6B51EF"
          title={t.title}
          lead={t.lead}
        />

        <div className={styles.grid}>
          {organizers.map((member, idx) => {
            const hasLinks = Boolean(member.linkedin || member.github || member.twitter)
            const isHovered = hoveredIndex === idx

            return (
              <div
                key={member.name}
                className={styles.memberCard}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {member.imageSrc && (
                  <div className={styles.avatarContainer}>
                    <img
                      src={organizerImages[member.name] || member.imageSrc}
                      alt=""
                      className={styles.avatar}
                      loading="lazy"
                    />

                    <div className={styles.overlay}>
                      <div className={styles.overlayInfo}>
                        <h3 className={styles.overlayName}>{member.name}</h3>
                        <p className={styles.overlayRole}>{member.role}</p>
                      </div>

                      {hasLinks && (
                        <div className={styles.socialLinks}>
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.socialLink}
                              aria-label={t.ariaLinkedIn(member.name)}
                            >
                              <FaLinkedin size={14} style={{ color: isHovered ? '#0077b5' : '#ffffff' }} />
                            </a>
                          )}
                          {member.github && (
                            <a
                              href={normalizeGithub(member.github)}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.socialLink}
                              aria-label={t.ariaGitHub(member.name)}
                            >
                              <FaGithub size={14} style={{ color: isHovered ? '#334155' : '#ffffff' }} />
                            </a>
                          )}
                          {member.twitter && (
                            <a
                              href={normalizeTwitter(member.twitter)}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.socialLink}
                              aria-label={t.ariaTwitter(member.name)}
                            >
                              <FaXTwitter size={14} style={{ color: isHovered ? '#334155' : '#ffffff' }} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className={styles.cardInfo}>
                  <h3 className={styles.cardName}>{member.name}</h3>
                  <p className={styles.cardRole}>{member.role}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
