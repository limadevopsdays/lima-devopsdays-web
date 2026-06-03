import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChevronLeft, ChevronRight, Send, Github, Linkedin } from 'lucide-react'
import { Link } from 'react-router'
import { useEffect, useState, useRef } from 'react'
import type { CSSProperties } from 'react'
import styles from './index.module.css'
import { SectionHeader } from '../SectionHeader'
import { SmartCropImage } from '../../SmartCropImage'
import { useI18n } from '../../../i18n'
import { speakersI18n } from './i18n'
import {
  keynoteSpeakersI18n,
  invitedSpeakersI18n,
  type InvitedSpeaker,
  type KeynoteSpeaker,
} from '../../../data/mockContent.i18n'

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

function KeynoteSpeakerCard({ speaker, t }: { speaker: KeynoteSpeaker; t: ReturnType<typeof useI18n<typeof speakersI18n>> }) {
  return (
    <article className={styles.keynoteCard}>
      <div className={styles.keynoteCardInner}>
        <div className={styles.keynoteProfileImageBio}>
          <div className={styles.keynoteProfileImageWrapper}>
            <div className={styles.keynoteImageLink} aria-hidden="true">
              <SmartCropImage
                className={styles.keynoteImage}
                src={speaker.imageSrc}
                alt={speaker.alt}
                loading="lazy"
                cropWidth={500}
                cropHeight={400}
                fallbackPosition={speaker.imagePosition}
                style={{ objectFit: speaker.imageFit }}
              />
              <div className={styles.keynoteImageOverlay} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.keynoteMeta}>
            <div className={styles.keynoteTopRow}>
              <span className={styles.keynoteTag}>
                {speaker.company || speaker.tag}
              </span>

              <div
                className={styles.keynoteTagRow}
                style={{ '--track-color': speaker.thematicAxisColor || '#2563eb' } as CSSProperties}
              >
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
            </div>

            <h3 className={styles.keynoteName}>{speaker.name}</h3>
            {speaker.role ? <p className={styles.keynoteRole}>{speaker.role}</p> : null}

            <div className={styles.keynoteTopicBlock}>
              <p className={styles.keynoteTopicLabel}>{t.talkLabel}</p>
              <p className={styles.keynoteTopic}>
                <span>
                  <span>{speaker.topic}</span>
                  {speaker.topicSecondLine ? (
                    <span className={styles.keynoteTopicSecondLine}>{speaker.topicSecondLine}</span>
                  ) : null}
                </span>
              </p>
              {speaker.thematicAxis ? (
                <p
                  className={styles.keynoteTopicHashtag}
                  style={{ '--track-color': speaker.thematicAxisColor || '#f97316' } as CSSProperties}
                >
                  #{speaker.thematicAxis}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <span
        className={styles.keynoteCountryFlag}
        data-country={speaker.country}
        aria-label={speaker.country}
      />
      <a
        href={speaker.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.keynoteCardLinkOverlay}
        aria-label={t.ariaLinkedIn(speaker.name)}
        data-track-name="ver_linkedin_keynote_home"
      />
    </article>
  )
}

function InvitedSpeakerCard({ speaker, t }: { speaker: InvitedSpeaker; t: ReturnType<typeof useI18n<typeof speakersI18n>> }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkOverflow = () => {
      const element = metaRef.current
      if (element) {
        setIsOverflowing(element.scrollHeight > element.clientHeight + 2)
      }
    }

    const timer = setTimeout(checkOverflow, 100)
    window.addEventListener('resize', checkOverflow)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [speaker.topic])

  return (
    <article className={`${styles.invitedCard} ${isExpanded ? styles.invitedCardExpanded : ''}`}>
      <div className={styles.invitedCardInner}>
        <div className={styles.invitedProfileImageBio}>
          <div className={styles.invitedCircularProfileImageWrapper}>
            <div className={styles.invitedProfileImageWrapper}>
              <SmartCropImage
                className={styles.invitedProfileImage}
                src={speaker.imageSrc}
                alt={speaker.alt}
                loading="lazy"
                cropWidth={320}
                cropHeight={320}
              />
              <span
                className={styles.invitedCountryFlag}
                data-country={speaker.country}
                aria-label={speaker.country}
              />
            </div>
          </div>

          <div
            ref={metaRef}
            className={`${styles.invitedMeta} ${
              isExpanded ? styles.invitedMetaExpanded : styles.invitedMetaTruncated
            } ${!isExpanded && isOverflowing ? styles.invitedMetaOverflowing : ''}`}
          >
            <div
              className={styles.invitedTopRow}
              style={{ '--track-color': speaker.thematicAxisColor || '#2563eb' } as CSSProperties}
            >
              <span className={styles.invitedTag}>
                {speaker.company || speaker.thematicAxis || speaker.country}
              </span>
              {speaker.linkedin ? (
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.invitedLinkedin}
                  aria-label={t.ariaLinkedIn(speaker.name)}
                  data-track-name="ver_linkedin_invitado_home"
                >
                  <Linkedin className={styles.invitedLinkedinIcon} />
                </a>
              ) : null}
            </div>

            <h3 className={styles.invitedMemberName}>{speaker.name}</h3>
            <p className={styles.invitedMemberJob}>{speaker.role}</p>

            <div className={styles.invitedTopicBlock}>
              <p className={styles.invitedTopicLabel}>{t.talkLabel}</p>
              <p className={styles.invitedMemberTalk}>
                <span>{speaker.topic}</span>
              </p>
              {speaker.thematicAxis ? (
                <p
                  className={styles.invitedTopicHashtag}
                  style={{ '--track-color': speaker.thematicAxisColor || '#2563eb' } as CSSProperties}
                >
                  #{speaker.thematicAxis}
                </p>
              ) : null}
            </div>
          </div>

          {isOverflowing && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.expandButton}
            >
              {isExpanded ? `${t.expandLess} ▴` : `${t.expandMore} ▾`}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export function SpeakersSection() {
  const [visibleInvitedSlides, setVisibleInvitedSlides] = useState(4)
  const [activeInvitedTracks, setActiveInvitedTracks] = useState<string[]>([])
  const t = useI18n(speakersI18n)
  const keynoteSpeakers = useI18n(keynoteSpeakersI18n)
  const invitedSpeakers = useI18n(invitedSpeakersI18n)

  const invitedTrackOptions = Array.from(
    invitedSpeakers.reduce((map, speaker) => {
      if (speaker.thematicAxis) {
        map.set(speaker.thematicAxis, {
          name: speaker.thematicAxis,
          color: speaker.thematicAxisColor || '#2563eb',
        })
      }

      return map
    }, new Map<string, { name: string; color: string }>())
      .values()
  )

  const filteredInvitedSpeakers = invitedSpeakers.filter(
    (speaker) =>
      activeInvitedTracks.length === 0 ||
      !speaker.thematicAxis ||
      activeInvitedTracks.includes(speaker.thematicAxis)
  )

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

  function toggleInvitedTrack(trackName: string) {
    setActiveInvitedTracks((currentTracks) =>
      currentTracks.includes(trackName)
        ? currentTracks.filter((track) => track !== trackName)
        : [...currentTracks, trackName]
    )
  }

  const invitedSlidesToShow = Math.max(1, Math.min(visibleInvitedSlides, filteredInvitedSpeakers.length || 1))
  const canSlideInvited = filteredInvitedSpeakers.length > invitedSlidesToShow

  const invitedCarouselSettings = {
    dots: true,
    infinite: canSlideInvited,
    speed: 500,
    slidesToShow: invitedSlidesToShow,
    slidesToScroll: 1,
    autoplay: canSlideInvited,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: canSlideInvited && invitedSlidesToShow > 1,
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
                  <KeynoteSpeakerCard key={speaker.name} speaker={speaker} t={t} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.invitedPanel}>
            <div className={styles.invitedPanelContent}>
              <div className={styles.invitedPanelHeader}>
                <h3 className={styles.invitedPanelTitle}>
                  {t.invitedTitle === 'Invited Speakers' ? (
                    <><span className={styles.keynoteTitleAccent}>Invited</span> Speakers</>
                  ) : (
                    <>Speakers <span className={styles.keynoteTitleAccent}>invitados</span></>
                  )}
                </h3>
                <p className={styles.invitedPanelLead}>{t.invitedLead}</p>
              </div>

              <div className={styles.invitedFilters} aria-label={t.invitedFiltersLabel}>
                {invitedTrackOptions.map((track) => {
                  const isActive = activeInvitedTracks.includes(track.name)
                  const trackSpeakerCount = invitedSpeakers.filter(
                    (speaker) => speaker.thematicAxis === track.name
                  ).length

                  return (
                    <button
                      key={track.name}
                      type="button"
                      className={`${styles.invitedFilterTab} ${isActive ? styles.invitedFilterTabActive : ''}`}
                      style={{ '--track-color': track.color } as CSSProperties}
                      onClick={() => toggleInvitedTrack(track.name)}
                      aria-pressed={isActive}
                    >
                      {track.name}
                      {isActive && (
                        <span className={styles.invitedFilterTabCount}>
                          {trackSpeakerCount}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className={styles.invitedCarouselWrapper}>
                {filteredInvitedSpeakers.length > 0 ? (
                  <Slider {...invitedCarouselSettings}>
                    {filteredInvitedSpeakers.map((speaker) => (
                      <div key={speaker.name} className={styles.invitedSlideWrapper}>
                        <InvitedSpeakerCard speaker={speaker} t={t} />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
                )}
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

                 {/*
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
                 */}
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
