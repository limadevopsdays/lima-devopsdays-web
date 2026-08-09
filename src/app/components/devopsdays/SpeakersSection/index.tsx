import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Mic, Send, Github, Linkedin } from 'lucide-react'
import { Link } from 'react-router'
import { useEffect, useState, useRef } from 'react'
import type { CSSProperties } from 'react'
import styles from './index.module.css'
import { SectionHeader } from '../SectionHeader'
import { SmartCropImage } from '../../SmartCropImage'
import { CountryFlag } from '../CountryFlag'
import {
  ScheduleSpeakersSection,
  cfpScheduleSpeakers,
  ScheduleSpeakerCard,
  resolveTrackColor,
} from '../ScheduleSpeakersSection'
import ownStyles from '../ScheduleSpeakersSection/index.module.css'
import { useI18n, useLocale } from '../../../i18n'
import { speakersI18n } from './i18n'
import {
  keynoteSpeakersI18n,
  invitedSpeakersI18n,
  type InvitedSpeaker,
  type KeynoteSpeaker,
} from '../../../data/mockContent.i18n'

// Imagen hero ediciones pasadas
const speakerEdition2025 = '/images/speakers/speakers%201.jpg'

function InvitedNextArrow(props: any) {
  const { onClick, ariaLabel } = props
  return (
    <button
      type="button"
      className={`${styles.invitedArrow} ${styles.invitedNextArrow}`}
      onClick={onClick}
      aria-label={ariaLabel || 'Siguiente'}
      data-track-name="siguiente_speakers_invitados_home"
    >
      <ChevronRight className={styles.invitedArrowIcon} />
    </button>
  )
}

function InvitedPrevArrow(props: any) {
  const { onClick, ariaLabel } = props
  return (
    <button
      type="button"
      className={`${styles.invitedArrow} ${styles.invitedPrevArrow}`}
      onClick={onClick}
      aria-label={ariaLabel || 'Anterior'}
      data-track-name="anterior_speakers_invitados_home"
    >
      <ChevronLeft className={styles.invitedArrowIcon} />
    </button>
  )
}

function InvitedCarousel({
  speakers,
  t,
  slidesToShow,
  canSlide,
  cardClassName,
  hideTopic,
}: {
  speakers: InvitedSpeaker[]
  t: ReturnType<typeof useI18n<typeof speakersI18n>>
  slidesToShow: number
  canSlide: boolean
  cardClassName?: string
  hideTopic?: boolean
}) {
  const sliderRef = useRef<Slider | null>(null)

  const settings = {
    dots: true,
    infinite: canSlide,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: canSlide,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div className={styles.invitedControlsBar}>
        <button
          type="button"
          className={`${styles.invitedArrow} ${styles.invitedPrevArrow}`}
          onClick={() => sliderRef.current?.slickPrev()}
          aria-label={t.ariaPrev}
          data-track-name="anterior_speakers_invitados_home"
        >
          <ChevronLeft className={styles.invitedArrowIcon} />
        </button>
        <ul className={styles.invitedDotsList}>{dots}</ul>
        <button
          type="button"
          className={`${styles.invitedArrow} ${styles.invitedNextArrow}`}
          onClick={() => sliderRef.current?.slickNext()}
          aria-label={t.ariaNext}
          data-track-name="siguiente_speakers_invitados_home"
        >
          <ChevronRight className={styles.invitedArrowIcon} />
        </button>
      </div>
    ),
  }

  return (
    <Slider ref={sliderRef} {...settings}>
      {speakers.map((speaker) => (
        <div key={speaker.name} className={styles.invitedSlideWrapper}>
          <InvitedSpeakerCard speaker={speaker} t={t} className={cardClassName} hideTopic={hideTopic} />
        </div>
      ))}
    </Slider>
  )
}

function KeynoteCarousel({
  speakers,
  t,
  slidesToShow,
  canSlide,
}: {
  speakers: KeynoteSpeaker[]
  t: ReturnType<typeof useI18n<typeof speakersI18n>>
  slidesToShow: number
  canSlide: boolean
}) {
  const sliderRef = useRef<Slider | null>(null)

  const settings = {
    dots: true,
    infinite: canSlide,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: canSlide,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div className={styles.invitedControlsBar}>
        <button
          type="button"
          className={`${styles.invitedArrow} ${styles.invitedPrevArrow}`}
          onClick={() => sliderRef.current?.slickPrev()}
          aria-label={t.ariaPrev}
          data-track-name="anterior_keynote_home"
        >
          <ChevronLeft className={styles.invitedArrowIcon} />
        </button>
        <ul className={styles.invitedDotsList}>{dots}</ul>
        <button
          type="button"
          className={`${styles.invitedArrow} ${styles.invitedNextArrow}`}
          onClick={() => sliderRef.current?.slickNext()}
          aria-label={t.ariaNext}
          data-track-name="siguiente_keynote_home"
        >
          <ChevronRight className={styles.invitedArrowIcon} />
        </button>
      </div>
    ),
  }

  return (
    <Slider ref={sliderRef} {...settings}>
      {speakers.map((speaker) => (
        <div key={speaker.name} className={styles.invitedSlideWrapper}>
          <KeynoteSpeakerCard speaker={speaker} t={t} />
        </div>
      ))}
    </Slider>
  )
}

function KeynoteSpeakerCard({ speaker, t }: { speaker: KeynoteSpeaker; t: ReturnType<typeof useI18n<typeof speakersI18n>> }) {
  const [imageFailed, setImageFailed] = useState(false)
  const initials = speaker.name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <article className={styles.keynoteCard}>
      <div className={styles.keynoteCardInner}>
        <div className={styles.keynoteProfileImageBio}>
          <div className={styles.keynoteProfileImageWrapper}>
            <div className={styles.keynoteImageLink} aria-hidden="true">
              {speaker.imageSrc && !imageFailed ? (
                <SmartCropImage
                  className={styles.keynoteImage}
                  src={speaker.imageSrc}
                  alt={speaker.alt}
                  loading="lazy"
                  cropWidth={500}
                  cropHeight={400}
                  fallbackPosition={speaker.imagePosition}
                  style={{ objectFit: speaker.imageFit }}
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className={styles.keynoteImageFallback}>{initials}</div>
              )}
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
                {speaker.linkedin ? (
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
                ) : null}
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
      <CountryFlag
        country={speaker.country}
        className={styles.keynoteCountryFlag}
        svgClassName={styles.countryFlagSvg}
      />
    </article>
  )
}

function InvitedSpeakerCard({
  speaker,
  t,
  className,
  hideTopic = false,
}: {
  speaker: InvitedSpeaker
  t: ReturnType<typeof useI18n<typeof speakersI18n>>
  className?: string
  hideTopic?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const metaRef = useRef<HTMLDivElement>(null)

  const [imageFailed, setImageFailed] = useState(false)

  const initials = speaker.name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

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
  }, [speaker.topic, speaker.role, speaker.company, speaker.name, hideTopic])

  const hasImage = Boolean(speaker.imageSrc && speaker.imageSrc.trim() && !imageFailed)

  const isModerator = Boolean(
    (speaker.name && speaker.name.toLowerCase().includes('moderador')) ||
    (speaker.company && speaker.company.toLowerCase().includes('moderador'))
  )
  const cleanName = speaker.name ? speaker.name.replace(/\s*-\s*\[\s*moderador\s*\]/i, '').trim() : ''

  return (
    <article className={`${styles.invitedCard} ${isExpanded ? styles.invitedCardExpanded : ''} ${className || ''}`}>
      {isModerator && (
        <div className={styles.moderatorRibbon}>
          <span>🎙️ Moderador</span>
        </div>
      )}
      <div className={styles.invitedCardInner}>
        <div className={styles.invitedProfileImageBio}>
          <div className={styles.invitedCircularProfileImageWrapper}>
            <div className={styles.invitedProfileImageWrapper}>
              {hasImage ? (
                <SmartCropImage
                  className={styles.invitedProfileImage}
                  src={speaker.imageSrc}
                  alt={speaker.alt || cleanName}
                  loading="lazy"
                  cropWidth={320}
                  cropHeight={320}
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div
                  className={styles.invitedProfileImage}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${speaker.thematicAxisColor || '#6B51EF'} 0%, color-mix(in srgb, ${speaker.thematicAxisColor || '#6B51EF'} 55%, white) 100%)`,
                    color: '#ffffff',
                    fontFamily: 'var(--brand-heading-fontFamily)',
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                  }}
                >
                  {initials}
                </div>
              )}
              {speaker.country ? (
                <CountryFlag
                  country={speaker.country}
                  className={styles.invitedCountryFlag}
                  svgClassName={styles.countryFlagSvg}
                />
              ) : null}
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
              {speaker.company ? (
                <span className={styles.invitedTag}>
                  {speaker.company}
                </span>
              ) : null}
              {speaker.linkedin ? (
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.invitedLinkedin}
                  aria-label={t.ariaLinkedIn(cleanName)}
                  data-track-name="ver_linkedin_invitado_home"
                >
                  <Linkedin className={styles.invitedLinkedinIcon} />
                </a>
              ) : null}
            </div>

            <h3 className={styles.invitedMemberName}>{cleanName}</h3>
            {speaker.role ? (
              <p className={styles.invitedMemberJob}>{speaker.role}</p>
            ) : null}

            {!hideTopic && (
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
            )}
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

interface SpeakersSectionProps {
  showInvited?: boolean
  showCfpSpeakers?: boolean
}

export function SpeakersSection({
  showInvited = false,
  showCfpSpeakers = true,
}: SpeakersSectionProps) {
  const [visibleInvitedSlides, setVisibleInvitedSlides] = useState(5)
  const [isMobile, setIsMobile] = useState(false)
  const [activeKeynoteTracks, setActiveKeynoteTracks] = useState<string[]>([])
  const [activeInvitedTracks, setActiveInvitedTracks] = useState<string[]>([])
  const [collapsedPanels, setCollapsedPanels] = useState<Set<string>>(new Set())
  const t = useI18n(speakersI18n)
  const locale = useLocale() as 'es' | 'en'
  const staticKeynotes = useI18n(keynoteSpeakersI18n)
  const staticInvited = useI18n(invitedSpeakersI18n)

  // Dynamically map Keynotes from scheduleSpeakers.json merged with static attributes (photos, tags, etc.)
  const keynoteSpeakers: KeynoteSpeaker[] = staticKeynotes.map((staticSp) => {
    const jsonSp = cfpScheduleSpeakers.find((sp) => {
      const spName = sp.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      const stName = staticSp.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      const parts = stName.split(' ')
      return spName.includes(parts[0]) && spName.includes(parts[parts.length - 1])
    })
    if (!jsonSp) return staticSp
    return {
      ...staticSp,
      company: jsonSp.company || staticSp.company,
      role: jsonSp.jobTitle || staticSp.role,
      country: jsonSp.location || staticSp.country,
      topic: (jsonSp.topic && !jsonSp.topic.toLowerCase().includes('panel')) ? jsonSp.topic : staticSp.topic,
      linkedin: jsonSp.linkedin || staticSp.linkedin,
      imageSrc: jsonSp.avatar || staticSp.imageSrc,
      thematicAxis: jsonSp.trackName || staticSp.thematicAxis,
      thematicAxisColor: resolveTrackColor(jsonSp.trackNameEn, jsonSp.trackColor),
    }
  })

  // Dynamically map Invited Speakers from scheduleSpeakers.json merged with static attributes
  const invitedSpeakers: InvitedSpeaker[] = staticInvited.map((staticSp) => {
    const jsonSp = cfpScheduleSpeakers.find((sp) => {
      const spName = sp.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      const stName = staticSp.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      const parts = stName.split(' ')
      return spName.includes(parts[0]) && spName.includes(parts[parts.length - 1])
    })
    if (!jsonSp) return staticSp
    return {
      ...staticSp,
      company: jsonSp.company || staticSp.company,
      role: jsonSp.jobTitle || staticSp.role,
      country: jsonSp.location || staticSp.country,
      topic: jsonSp.topic || staticSp.topic,
      linkedin: jsonSp.linkedin || staticSp.linkedin,
      imageSrc: jsonSp.avatar || staticSp.imageSrc,
      thematicAxis: jsonSp.trackName || staticSp.thematicAxis,
      thematicAxisColor: resolveTrackColor(jsonSp.trackNameEn, jsonSp.trackColor),
    }
  })

  // Scroll to invited section on mount if navigated with hash
  useEffect(() => {
    if (!showInvited) return
    if (window.location.hash === '#invited-speakers') {
      const el = document.getElementById('invited-speakers')
      if (el) {
        // Short delay so the page finishes rendering first
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
      }
    }
  }, [showInvited])

  const keynoteTrackOptions = Array.from(
    keynoteSpeakers.reduce((map, speaker) => {
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

  const filteredKeynoteSpeakers = keynoteSpeakers.filter(
    (speaker) =>
      activeKeynoteTracks.length === 0 ||
      !speaker.thematicAxis ||
      activeKeynoteTracks.includes(speaker.thematicAxis)
  )

  const filteredInvitedSpeakers = invitedSpeakers.filter(
    (speaker) =>
      activeInvitedTracks.length === 0 ||
      !speaker.thematicAxis ||
      activeInvitedTracks.includes(speaker.thematicAxis)
  )

  const invitedSlidesToShow = Math.max(1, Math.min(visibleInvitedSlides, filteredInvitedSpeakers.length || 1))
  const canSlideInvited = filteredInvitedSpeakers.length > invitedSlidesToShow

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const syncVisibleSlides = () => {
      const w = window.innerWidth
      setIsMobile(w <= 640)
      if (w <= 640) {
        setVisibleInvitedSlides(1)
      } else if (w <= 768) {
        setVisibleInvitedSlides(2)
      } else if (w <= 1024) {
        setVisibleInvitedSlides(3)
      } else if (w <= 1280) {
        setVisibleInvitedSlides(4)
      } else {
        setVisibleInvitedSlides(5)
      }
    }

    syncVisibleSlides()

    window.addEventListener('resize', syncVisibleSlides)
    return () => {
      window.removeEventListener('resize', syncVisibleSlides)
    }
  }, [])

  function toggleInvitedTrack(trackName: string) {
    setActiveInvitedTracks((currentTracks) =>
      currentTracks.includes(trackName)
        ? currentTracks.filter((track) => track !== trackName)
        : [...currentTracks, trackName]
    )
  }

  function toggleKeynoteTrack(trackName: string) {
    setActiveKeynoteTracks((currentTracks) =>
      currentTracks.includes(trackName)
        ? currentTracks.filter((track) => track !== trackName)
        : [...currentTracks, trackName]
    )
  }

  function togglePanel(panelId: string) {
    setCollapsedPanels((prev) => {
      const next = new Set(prev)
      if (next.has(panelId)) {
        next.delete(panelId)
      } else {
        next.add(panelId)
      }
      return next
    })
  }



  return (
    <section id="speakers" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          className={styles.keynoteHeader}
          eyebrow={t.eyebrow}
          eyebrowColor="#6B51EF"
        />

        <div id="keynote-speakers" className={styles.keynoteSpeakers}>
          <SectionHeader
            className={styles.keynoteTitleHeader}
            title={<><span className={styles.keynoteTitleAccent}>Keynote</span> Speakers</>}
            lead={t.lead}
          />
          <div className={styles.invitedFilters} aria-label={t.invitedFiltersLabel}>
            {keynoteTrackOptions.map((track) => {
              const isActive = activeKeynoteTracks.includes(track.name)
              const trackSpeakerCount = keynoteSpeakers.filter(
                (speaker) => speaker.thematicAxis === track.name
              ).length

              return (
                <button
                  key={track.name}
                  type="button"
                  className={`${styles.invitedFilterTab} ${isActive ? styles.invitedFilterTabActive : ''}`}
                  style={{ '--track-color': track.color } as CSSProperties}
                  onClick={() => toggleKeynoteTrack(track.name)}
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

          <div className={styles.keynotePanel}>
            {filteredKeynoteSpeakers.length > 0 ? (
              isMobile ? (
                <div className={styles.invitedCarouselWrapper}>
                  <KeynoteCarousel
                    speakers={filteredKeynoteSpeakers}
                    t={t}
                    slidesToShow={1}
                    canSlide={filteredKeynoteSpeakers.length > 1}
                  />
                </div>
              ) : (
                <div className={styles.keynoteShowcase}>
                  {filteredKeynoteSpeakers.map((speaker) => (
                    <KeynoteSpeakerCard key={speaker.name} speaker={speaker} t={t} />
                  ))}
                </div>
              )
            ) : (
              <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
            )}
          </div>
        </div>

        {showInvited ? (
          <>
            {/* Panel de Seguridad */}
            {(() => {
              const securityPanelSpeakers = cfpScheduleSpeakers.filter(
                (sp) => sp.topic && sp.topic.trim() === '[ Panel ] - Seguridad'
              )
              const mappedSpeakers: InvitedSpeaker[] = securityPanelSpeakers
                .map((sp) => {
                  const isXavier = sp.code === 'TAKGE7' || sp.name.includes('Xavier')
                  return {
                    name: isXavier ? `${sp.name} - [Moderador]` : sp.name,
                    company: sp.company || '',
                    role: sp.jobTitle || '',
                    country: sp.location || '',
                    topic: sp.topic || '',
                    thematicAxis: sp.trackName || sp.trackNameEn || undefined,
                    thematicAxisColor: resolveTrackColor(sp.trackNameEn, sp.trackColor),
                    imageSrc: sp.avatar || '',
                    alt: sp.name,
                    linkedin: sp.linkedin || undefined,
                  }
                })
                .sort((a, b) => {
                  const aMod = a.name.toLowerCase().includes('moderador') ? -1 : 1
                  const bMod = b.name.toLowerCase().includes('moderador') ? -1 : 1
                  return aMod - bMod
                })
              const panelSlidesToShow = Math.max(1, Math.min(visibleInvitedSlides, mappedSpeakers.length || 1))
              const canSlidePanel = mappedSpeakers.length > panelSlidesToShow

              const isCollapsed = collapsedPanels.has('panel-seguridad')
              return (
                <div
                  id="panel-seguridad"
                  className={`${styles.speakersSubsection} ${styles.invitedPanel}`}
                >
                  <SectionHeader
                    className={styles.keynoteTitleHeader}
                    title={
                      <>
                        Panel <span className={styles.keynoteTitleAccent}>Seguridad</span>
                        <button
                          type="button"
                          className={styles.panelCollapseBtn}
                          onClick={() => togglePanel('panel-seguridad')}
                          aria-expanded={!isCollapsed}
                          aria-controls="panel-seguridad-content"
                          title={isCollapsed ? 'Expandir' : 'Minimizar'}
                        >
                          {isCollapsed ? <ChevronDown className={styles.panelCollapseIcon} /> : <ChevronUp className={styles.panelCollapseIcon} />}
                        </button>
                      </>
                    }
                    lead={t.panelSecurityLead}
                  />
                  <div
                    id="panel-seguridad-content"
                    className={`${styles.panelCollapsible} ${isCollapsed ? styles.panelCollapsed : ''}`}
                  >
                    {mappedSpeakers.length > 0 ? (
                      <div className={styles.invitedCarouselWrapper}>
                        <InvitedCarousel
                          speakers={mappedSpeakers}
                          t={t}
                          slidesToShow={panelSlidesToShow}
                          canSlide={canSlidePanel}
                          cardClassName={styles.panelCardCompact}
                          hideTopic
                        />
                      </div>
                    ) : (
                      <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
                    )}
                  </div>
                </div>
              )
            })()}

            {/* Panel Fintech */}
            {(() => {
              const fintechPanelSpeakers = cfpScheduleSpeakers.filter(
                (sp) => sp.topic && sp.topic.trim() === '[ Panel ] - Fintech'
              )
              const mappedSpeakers: InvitedSpeaker[] = fintechPanelSpeakers
                .map((sp) => ({
                  name: sp.name,
                  company: sp.company || '',
                  role: sp.jobTitle || '',
                  country: sp.location || '',
                  topic: sp.topic || '',
                  thematicAxis: sp.trackName || sp.trackNameEn || undefined,
                  thematicAxisColor: resolveTrackColor(sp.trackNameEn, sp.trackColor),
                  imageSrc: sp.avatar || '',
                  alt: sp.name,
                  linkedin: sp.linkedin || undefined,
                }))
                .sort((a, b) => {
                  const aMod = a.name.toLowerCase().includes('moderador') ? -1 : 1
                  const bMod = b.name.toLowerCase().includes('moderador') ? -1 : 1
                  return aMod - bMod
                })
              const panelSlidesToShow = Math.max(1, Math.min(visibleInvitedSlides, mappedSpeakers.length || 1))
              const canSlidePanel = mappedSpeakers.length > panelSlidesToShow

              const isCollapsed = collapsedPanels.has('panel-fintech')
              return (
                <div
                  id="panel-fintech"
                  className={`${styles.speakersSubsection} ${styles.invitedPanel}`}
                >
                  <SectionHeader
                    className={styles.keynoteTitleHeader}
                    title={
                      <>
                        Panel <span className={styles.keynoteTitleAccent}>Fintech</span>
                        <button
                          type="button"
                          className={styles.panelCollapseBtn}
                          onClick={() => togglePanel('panel-fintech')}
                          aria-expanded={!isCollapsed}
                          aria-controls="panel-fintech-content"
                          title={isCollapsed ? 'Expandir' : 'Minimizar'}
                        >
                          {isCollapsed ? <ChevronDown className={styles.panelCollapseIcon} /> : <ChevronUp className={styles.panelCollapseIcon} />}
                        </button>
                      </>
                    }
                    lead={t.panelFintechLead}
                  />
                  <div
                    id="panel-fintech-content"
                    className={`${styles.panelCollapsible} ${isCollapsed ? styles.panelCollapsed : ''}`}
                  >
                    {mappedSpeakers.length > 0 ? (
                      <div className={styles.invitedCarouselWrapper}>
                        <InvitedCarousel
                          speakers={mappedSpeakers}
                          t={t}
                          slidesToShow={panelSlidesToShow}
                          canSlide={canSlidePanel}
                          cardClassName={styles.panelCardCompact}
                          hideTopic
                        />
                      </div>
                    ) : (
                      <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
                    )}
                  </div>
                </div>
              )
            })()}

            {/* Panel Banca */}
            {(() => {
              const bankingPanelSpeakers = cfpScheduleSpeakers.filter(
                (sp) => sp.topic && sp.topic.trim() === '[ Panel ] - Banca'
              )
              const mappedSpeakers: InvitedSpeaker[] = bankingPanelSpeakers
                .map((sp) => ({
                  name: sp.name,
                  company: sp.company || '',
                  role: sp.jobTitle || '',
                  country: sp.location || '',
                  topic: sp.topic || '',
                  thematicAxis: sp.trackName || sp.trackNameEn || undefined,
                  thematicAxisColor: resolveTrackColor(sp.trackNameEn, sp.trackColor),
                  imageSrc: sp.avatar || '',
                  alt: sp.name,
                  linkedin: sp.linkedin || undefined,
                }))
                .sort((a, b) => {
                  const aMod = a.name.toLowerCase().includes('moderador') ? -1 : 1
                  const bMod = b.name.toLowerCase().includes('moderador') ? -1 : 1
                  return aMod - bMod
                })
              const panelSlidesToShow = Math.max(1, Math.min(visibleInvitedSlides, mappedSpeakers.length || 1))
              const canSlidePanel = mappedSpeakers.length > panelSlidesToShow

              const isCollapsed = collapsedPanels.has('panel-banca')
              return (
                <div
                  id="panel-banca"
                  className={`${styles.speakersSubsection} ${styles.invitedPanel}`}
                >
                  <SectionHeader
                    className={styles.keynoteTitleHeader}
                    title={
                      <>
                        Panel <span className={styles.keynoteTitleAccent}>Banca</span>
                        <button
                          type="button"
                          className={styles.panelCollapseBtn}
                          onClick={() => togglePanel('panel-banca')}
                          aria-expanded={!isCollapsed}
                          aria-controls="panel-banca-content"
                          title={isCollapsed ? 'Expandir' : 'Minimizar'}
                        >
                          {isCollapsed ? <ChevronDown className={styles.panelCollapseIcon} /> : <ChevronUp className={styles.panelCollapseIcon} />}
                        </button>
                      </>
                    }
                    lead={t.panelBankingLead}
                  />
                  <div
                    id="panel-banca-content"
                    className={`${styles.panelCollapsible} ${isCollapsed ? styles.panelCollapsed : ''}`}
                  >
                    {mappedSpeakers.length > 0 ? (
                      <div className={styles.invitedCarouselWrapper}>
                        <InvitedCarousel
                          speakers={mappedSpeakers}
                          t={t}
                          slidesToShow={panelSlidesToShow}
                          canSlide={canSlidePanel}
                          cardClassName={styles.panelCardCompact}
                          hideTopic
                        />
                      </div>
                    ) : (
                      <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
                    )}
                  </div>
                </div>
              )
            })()}

            {/* Invited Speakers */}
            <div
              id="invited-speakers"
              className={`${styles.speakersSubsection} ${styles.invitedPanel} ${styles.invitedPanelContent}`}
            >
              <SectionHeader
                className={styles.keynoteTitleHeader}
                title={
                  t.invitedTitle === 'Invited Speakers' ? (
                    <><span className={styles.keynoteTitleAccent}>Invited</span> Speakers
                      <button
                        type="button"
                        className={styles.panelCollapseBtn}
                        onClick={() => togglePanel('invited-speakers')}
                        aria-expanded={!collapsedPanels.has('invited-speakers')}
                        aria-controls="invited-speakers-content"
                        title={collapsedPanels.has('invited-speakers') ? 'Expandir' : 'Minimizar'}
                      >
                        {collapsedPanels.has('invited-speakers') ? <ChevronDown className={styles.panelCollapseIcon} /> : <ChevronUp className={styles.panelCollapseIcon} />}
                      </button>
                    </>
                  ) : (
                    <>Speakers <span className={styles.keynoteTitleAccent}>invitados</span>
                      <button
                        type="button"
                        className={styles.panelCollapseBtn}
                        onClick={() => togglePanel('invited-speakers')}
                        aria-expanded={!collapsedPanels.has('invited-speakers')}
                        aria-controls="invited-speakers-content"
                        title={collapsedPanels.has('invited-speakers') ? 'Expandir' : 'Minimizar'}
                      >
                        {collapsedPanels.has('invited-speakers') ? <ChevronDown className={styles.panelCollapseIcon} /> : <ChevronUp className={styles.panelCollapseIcon} />}
                      </button>
                    </>
                  )
                }
                lead={t.invitedLead}
              />

              <div
                id="invited-speakers-content"
                className={`${styles.panelCollapsible} ${collapsedPanels.has('invited-speakers') ? styles.panelCollapsed : ''}`}
              >
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
                    <InvitedCarousel
                      speakers={filteredInvitedSpeakers}
                      t={t}
                      slidesToShow={invitedSlidesToShow}
                      canSlide={canSlideInvited}
                    />
                  ) : (
                    <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.seeAllInvitedContainer}>
            <a href="https://devopsdays.pe/speakers" className={styles.seeAllInvitedButton}>
              <span>{locale === 'es' ? 'Ver todos los speakers' : 'See all speakers'}</span>
              <Mic className={styles.seeAllInvitedButtonIcon} aria-hidden="true" />
            </a>
          </div>
        )}

        {showCfpSpeakers ? <ScheduleSpeakersSection as="div" id="cfp-speakers" /> : null}
      </div>

      {/* BANNER CTA "Speakers 2026" — hidden for later
      <div className={styles.ctaBanner}>
        ...
      </div>
      */}
    </section>
  )
}
