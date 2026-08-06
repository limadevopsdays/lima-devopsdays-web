import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChevronLeft, ChevronRight, Mic, Send, Github, Linkedin } from 'lucide-react'
import { AvatarZoomOverlay } from '../AvatarZoomOverlay'
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
}: {
  speakers: InvitedSpeaker[]
  t: ReturnType<typeof useI18n<typeof speakersI18n>>
  slidesToShow: number
  canSlide: boolean
  cardClassName?: string
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
          <InvitedSpeakerCard speaker={speaker} t={t} className={cardClassName} />
        </div>
      ))}
    </Slider>
  )
}

function KeynoteSpeakerCard({ speaker, t }: { speaker: KeynoteSpeaker; t: ReturnType<typeof useI18n<typeof speakersI18n>> }) {
  const [imageFailed, setImageFailed] = useState(false)
  const [zoomed, setZoomed] = useState(false)
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
            <div
              className={styles.keynoteImageLink}
              aria-label={`Ver foto de ${speaker.name}`}
              onClick={() => setZoomed(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setZoomed(true)}
            >
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
          {zoomed && (
            <AvatarZoomOverlay
              src={!imageFailed ? (speaker.imageSrc || null) : null}
              name={speaker.name}
              initials={initials}
              gradientColor={speaker.thematicAxisColor || '#7c3aed'}
              onClose={() => setZoomed(false)}
            />
          )}

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
}: {
  speaker: InvitedSpeaker
  t: ReturnType<typeof useI18n<typeof speakersI18n>>
  className?: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const metaRef = useRef<HTMLDivElement>(null)

  const [imageFailed, setImageFailed] = useState(false)
  const [zoomed, setZoomed] = useState(false)
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
  }, [speaker.topic])

  const hasImage = Boolean(speaker.imageSrc && speaker.imageSrc.trim() && !imageFailed)

  const isModerator = Boolean(
    (speaker.name && speaker.name.toLowerCase().includes('moderador')) ||
    (speaker.company && speaker.company.toLowerCase().includes('moderador'))
  )
  const cleanName = speaker.name ? speaker.name.replace(/\s*-\s*\[\s*moderador\s*\]/i, '').trim() : ''

  return (
    <article className={`${styles.invitedCard} ${isExpanded ? styles.invitedCardExpanded : ''} ${className || ''}`}>
      <div className={styles.invitedCardInner}>
        <div className={styles.invitedProfileImageBio}>
          <div
              className={styles.invitedCircularProfileImageWrapper}
              onClick={() => setZoomed(true)}
              role="button"
              tabIndex={0}
              aria-label={`Ver foto de ${cleanName}`}
              onKeyDown={(e) => e.key === 'Enter' && setZoomed(true)}
            >
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
            {zoomed && (
              <AvatarZoomOverlay
                src={hasImage ? (speaker.imageSrc || null) : null}
                name={cleanName}
                initials={initials}
                gradientColor={speaker.thematicAxisColor || '#6B51EF'}
                onClose={() => setZoomed(false)}
              />
            )}

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
            {isModerator ? (
              <p className={`${styles.invitedMemberJob} ${styles.moderatorJob}`}>🎙️ Moderador</p>
            ) : speaker.role ? (
              <p className={styles.invitedMemberJob}>{speaker.role}</p>
            ) : null}

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

interface SpeakersSectionProps {
  showInvited?: boolean
  showCfpSpeakers?: boolean
}

export function SpeakersSection({
  showInvited = false,
  showCfpSpeakers = true,
}: SpeakersSectionProps) {
  const [visibleInvitedSlides, setVisibleInvitedSlides] = useState(4)
  const [activeKeynoteTracks, setActiveKeynoteTracks] = useState<string[]>([])
  const [activeInvitedTracks, setActiveInvitedTracks] = useState<string[]>([])
  const t = useI18n(speakersI18n)
  const locale = useLocale() as 'es' | 'en'
  const keynoteSpeakers = useI18n(keynoteSpeakersI18n)
  const invitedSpeakers = useI18n(invitedSpeakersI18n)

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

  function toggleKeynoteTrack(trackName: string) {
    setActiveKeynoteTracks((currentTracks) =>
      currentTracks.includes(trackName)
        ? currentTracks.filter((track) => track !== trackName)
        : [...currentTracks, trackName]
    )
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
              <div className={styles.keynoteShowcase}>
                {filteredKeynoteSpeakers.map((speaker) => (
                  <KeynoteSpeakerCard key={speaker.name} speaker={speaker} t={t} />
                ))}
              </div>
            ) : (
              <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
            )}
          </div>
        </div>

        {showInvited ? (
          <>
            <div
              id="invited-speakers"
              className={`${styles.speakersSubsection} ${styles.invitedPanel} ${styles.invitedPanelContent}`}
            >
              <SectionHeader
                className={styles.keynoteTitleHeader}
                title={
                  t.invitedTitle === 'Invited Speakers' ? (
                    <><span className={styles.keynoteTitleAccent}>Invited</span> Speakers</>
                  ) : (
                    <>Speakers <span className={styles.keynoteTitleAccent}>invitados</span></>
                  )
                }
                lead={t.invitedLead}
              />

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

            {/* Panel de Seguridad */}
            {(() => {
              const securityPanelSpeakers = cfpScheduleSpeakers.filter(
                (sp) => sp.topic && sp.topic.trim() === '[ Panel ] - Seguridad'
              )
              const mappedSpeakers: InvitedSpeaker[] = securityPanelSpeakers
                .map((sp) => ({
                  name: sp.name,
                  company: '',
                  role: '',
                  country: '',
                  topic: sp.topic || '',
                  thematicAxis: sp.trackName || sp.trackNameEn || undefined,
                  thematicAxisColor: resolveTrackColor(sp.trackNameEn, sp.trackColor),
                  imageSrc: sp.avatar || '',
                  alt: sp.name,
                }))
                .sort((a, b) => {
                  const aMod = a.name.toLowerCase().includes('moderador') ? -1 : 1
                  const bMod = b.name.toLowerCase().includes('moderador') ? -1 : 1
                  return aMod - bMod
                })
              const panelSlidesToShow = Math.max(1, Math.min(visibleInvitedSlides, mappedSpeakers.length || 1))
              const canSlidePanel = mappedSpeakers.length > panelSlidesToShow

              return (
                <div
                  id="panel-seguridad"
                  className={`${styles.speakersSubsection} ${styles.panelSeguridad}`}
                >
                  <SectionHeader
                    className={styles.keynoteTitleHeader}
                    title={
                      <>
                        Panel <span className={styles.keynoteTitleAccent}>Seguridad</span>
                      </>
                    }
                    lead={t.panelSecurityLead}
                  />
                  {mappedSpeakers.length > 0 ? (
                    <div className={styles.invitedCarouselWrapper}>
                      <InvitedCarousel
                        speakers={mappedSpeakers}
                        t={t}
                        slidesToShow={panelSlidesToShow}
                        canSlide={canSlidePanel}
                        cardClassName={styles.panelCardCompact}
                      />
                    </div>
                  ) : (
                    <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
                  )}
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
                  company: '',
                  role: '',
                  country: '',
                  topic: sp.topic || '',
                  thematicAxis: sp.trackName || sp.trackNameEn || undefined,
                  thematicAxisColor: resolveTrackColor(sp.trackNameEn, sp.trackColor),
                  imageSrc: sp.avatar || '',
                  alt: sp.name,
                }))
                .sort((a, b) => {
                  const aMod = a.name.toLowerCase().includes('moderador') ? -1 : 1
                  const bMod = b.name.toLowerCase().includes('moderador') ? -1 : 1
                  return aMod - bMod
                })
              const panelSlidesToShow = Math.max(1, Math.min(visibleInvitedSlides, mappedSpeakers.length || 1))
              const canSlidePanel = mappedSpeakers.length > panelSlidesToShow

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
                      </>
                    }
                    lead={t.panelFintechLead}
                  />
                  {mappedSpeakers.length > 0 ? (
                    <div className={styles.invitedCarouselWrapper}>
                      <InvitedCarousel
                        speakers={mappedSpeakers}
                        t={t}
                        slidesToShow={panelSlidesToShow}
                        canSlide={canSlidePanel}
                        cardClassName={styles.panelCardCompact}
                      />
                    </div>
                  ) : (
                    <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
                  )}
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
                  company: '',
                  role: '',
                  country: '',
                  topic: sp.topic || '',
                  thematicAxis: sp.trackName || sp.trackNameEn || undefined,
                  thematicAxisColor: resolveTrackColor(sp.trackNameEn, sp.trackColor),
                  imageSrc: sp.avatar || '',
                  alt: sp.name,
                }))
                .sort((a, b) => {
                  const aMod = a.name.toLowerCase().includes('moderador') ? -1 : 1
                  const bMod = b.name.toLowerCase().includes('moderador') ? -1 : 1
                  return aMod - bMod
                })
              const panelSlidesToShow = Math.max(1, Math.min(visibleInvitedSlides, mappedSpeakers.length || 1))
              const canSlidePanel = mappedSpeakers.length > panelSlidesToShow

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
                      </>
                    }
                    lead={t.panelBankingLead}
                  />
                  {mappedSpeakers.length > 0 ? (
                    <div className={styles.invitedCarouselWrapper}>
                      <InvitedCarousel
                        speakers={mappedSpeakers}
                        t={t}
                        slidesToShow={panelSlidesToShow}
                        canSlide={canSlidePanel}
                        cardClassName={styles.panelCardCompact}
                      />
                    </div>
                  ) : (
                    <div className={styles.invitedEmptyState}>{t.invitedEmptyState}</div>
                  )}
                </div>
              )
            })()}
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
