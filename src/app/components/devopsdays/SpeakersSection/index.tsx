import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChevronLeft, ChevronRight, Send, Github, Linkedin } from 'lucide-react'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import { SectionHeader } from '../SectionHeader'
import { useI18n } from '../../../i18n'
import { speakersI18n } from './i18n'
import { keynoteSpeakersI18n, invitedSpeakersI18n } from '../../../data/mockContent.i18n'

// Imagen hero ediciones pasadas
const speakerEdition2025 = '/images/speakers/speakers%201.jpg'

function InvitedNextArrow({ onClick, ariaLabel }: { onClick?: () => void; ariaLabel: string }) {
  return (
    <button
      type="button"
      className={`${styles.invitedArrow} ${styles.invitedNextArrow}`}
      onClick={onClick}
      aria-label={ariaLabel}
      data-track-name="siguiente_speakers_invitados_home"
    >
      <ChevronRight className={styles.invitedArrowIcon} />
    </button>
  )
}

function InvitedPrevArrow({ onClick, ariaLabel }: { onClick?: () => void; ariaLabel: string }) {
  return (
    <button
      type="button"
      className={`${styles.invitedArrow} ${styles.invitedPrevArrow}`}
      onClick={onClick}
      aria-label={ariaLabel}
      data-track-name="anterior_speakers_invitados_home"
    >
      <ChevronLeft className={styles.invitedArrowIcon} />
    </button>
  )
}

export function SpeakersSection() {
  const [visibleInvitedSlides, setVisibleInvitedSlides] = useState(4)
  const t = useI18n(speakersI18n)
  const keynoteSpeakers = useI18n(keynoteSpeakersI18n)
  const invitedSpeakers = useI18n(invitedSpeakersI18n)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(max-width: 1199px)')

    const syncVisibleSlides = () => {
      setVisibleInvitedSlides(mediaQuery.matches ? 1 : 4)
    }

    syncVisibleSlides()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncVisibleSlides)

      return () => {
        mediaQuery.removeEventListener('change', syncVisibleSlides)
      }
    }

    mediaQuery.addListener(syncVisibleSlides)

    return () => {
      mediaQuery.removeListener(syncVisibleSlides)
    }
  }, [])

  const invitedCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: visibleInvitedSlides,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: visibleInvitedSlides > 1,
    nextArrow: <InvitedNextArrow ariaLabel={t.ariaNext} />,
    prevArrow: <InvitedPrevArrow ariaLabel={t.ariaPrev} />,
  }

  return (
    <section id="speakers" className={styles.section}>
      <div className={styles.keynoteSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow={t.eyebrow}
            eyebrowColor="#6B51EF"
            title={<><span className={styles.keynoteTitleAccent}>Keynote</span> Speakers</>}
            lead={t.lead}
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
                      aria-label={t.ariaLinkedIn(speaker.name)}
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
                      <span className={styles.keynoteTag}>
                        {speaker.tag}
                      </span>
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.keynoteLinkedin}
                        aria-label={t.ariaLinkedIn(speaker.name)}
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
                          aria-label={t.ariaGitHub(speaker.name)}
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
                  {t.invitedTitle}
                </h3>
                <p className={styles.invitedPanelLead}>{t.invitedLead}</p>
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
                  <span className={styles.badgeText}>{t.cfsAvailableBadge}</span>
                </div>

                <h2 className={styles.title}>{t.cfsTitle}</h2>

                <p className={styles.description}>{t.cfsDescription}</p>

                <p className={styles.tracksLabel}>{t.cfsTracksLabel}</p>

                <div className={styles.tracks}>
                  {t.cfsTracks.map((track, idx) => (
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
                  {t.cfsSecondaryBtn}
                </Link>

                <a
                  href="https://talks.devopsdays.org/devopsdays-lima-2026/cfp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                  data-track-name="call_for_speakers_banner_home"
                >
                  <Send className={styles.ctaIcon} />
                  {t.cfsPrimaryBtn}
                </a>
              </div>

              <div>
                <p className={styles.dateText}>
                  {t.cfsDeadline} <strong>{t.cfsDeadlineDate}</strong>
                </p>
                <p className={styles.dateText}>
                  {t.cfsNotification} <strong>{t.cfsNotificationDate}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
