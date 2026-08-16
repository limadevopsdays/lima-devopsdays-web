import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { ChevronDown, ChevronUp, Linkedin } from 'lucide-react'
import { useLocale } from '../../../i18n'
import { getSpeakerAvatarSources, useSpeakerAvatar } from '../../../lib/speakerAvatars'
import { SectionHeader } from '../SectionHeader'
import { CountryFlag } from '../CountryFlag'
import shared from '../SpeakersSection/index.module.css'
import own from './index.module.css'
import scheduleData from '../../../data/scheduleData.json'
import speakersRaw from '../../../data/scheduleSpeakers.json'

// ─── Types ────────────────────────────────────────────────────────────────────
interface ScheduleSpeaker {
  code: string
  name: string
  avatar: string | null
  avatar_thumbnail_default?: string | null
  avatar_thumbnail_tiny?: string | null
  topic: string | null
  trackName: string | null
  trackNameEn: string | null
  trackColor: string
  hasTalk: boolean
  // Enriched from speaker detail page
  biography: string | null
  company: string | null
  jobTitle: string | null
  location: string | null
  linkedin: string | null
}

interface ScheduleSpeakersSectionProps {
  as?: 'section' | 'div'
  id?: string
}

interface ScheduleDataSpeaker {
  code: string
  avatar: string | null
  avatar_thumbnail_default?: string | null
  avatar_thumbnail_tiny?: string | null
}

const localScheduleSpeakerAvatars: Record<string, string> = {
  TCZJWH: new URL('../../../data/avatars/TCZJWH.jpeg', import.meta.url).href,
  '9NFQKT': new URL('../../../data/avatars/9NFQKT.jpg', import.meta.url).href,
}

const scheduleSpeakerAvatars = new Map(
  ((scheduleData as { speakers?: ScheduleDataSpeaker[] }).speakers || []).map((speaker) => [
    speaker.code,
    speaker,
  ])
)

export const cfpScheduleSpeakers = (speakersRaw as ScheduleSpeaker[]).map((speaker) => {
  const avatarData = scheduleSpeakerAvatars.get(speaker.code)

  return {
    ...speaker,
    avatar: localScheduleSpeakerAvatars[speaker.code] ?? speaker.avatar,
    avatar_thumbnail_default: speaker.avatar_thumbnail_default ?? avatarData?.avatar_thumbnail_default ?? null,
    avatar_thumbnail_tiny: speaker.avatar_thumbnail_tiny ?? avatarData?.avatar_thumbnail_tiny ?? null,
  }
})
// ─── Codes by category for exact set subtraction ─────────────────────────────
export const KEYNOTE_SPEAKER_CODES = new Set([
  'QWYREB', // Marc Hornbeek
  'UAJUW3', // Erik Zaadi
  '3ZZHPR', // William Matos
  'TAKGE7', // Xavier René-Corail
  'GUHE88', // Ricardo Martins
  'XRQVPJ', // Yury Nino
])

export const INVITED_SPEAKER_CODES = new Set([
  '8DKRD9', // Victor Alvarez
  'EYSBV7', // Andrea Griffiths
  'D9X8KE', // Juan David Arguello Plata
  'KHCU7C', // Esmira Bayramova
  '9PEJRF', // Jimmy Florez
  'UMXQWV', // Carlos Gallardo
  'EAJBEY', // Andre Delgado Ruiz
  'WPAEV9', // Sebastian Rojas
  '8MZQSD', // Angel Nuñez
  'JZ3U7B', // Sebastian Veliz Donoso
  'CGKEK7', // Alexandra Zamora
  '73FPPV', // Emma Flores
  'QBKEFL', // Jefferson Riobueno
  'BPW3K7', // Francisco Lopez Valenzuela
  'Z3NSGG', // Angelo Leva
  'NLKQV9', // Martin Grados
])

export const isPanelSpeaker = (sp: ScheduleSpeaker) =>
  Boolean(sp.topic && sp.topic.trim().startsWith('[ Panel ]'))

export const EXCLUDED_CFP_CODES = new Set([
  ...Array.from(KEYNOTE_SPEAKER_CODES),
  ...Array.from(INVITED_SPEAKER_CODES),
])

export const trackColorMap: Record<string, string> = {
  'Platform Engineering & DevOps': '#2563eb',
  'Security & Technology Transformation': '#f97316',
  'Modern Leadership & Culture': '#14b8a6',
  'Enterprise AI & Data Strategy': '#a78bfa',
}

export function resolveTrackColor(trackNameEn: string | null, fallback: string) {
  if (trackNameEn && trackColorMap[trackNameEn]) {
    return trackColorMap[trackNameEn]
  }

  return fallback
}

// ─── Track options ────────────────────────────────────────────────────────────
function getUniqueTrackOptions(locale: 'es' | 'en') {
  const map = new Map<string, { label: string; color: string }>()
  cfpScheduleSpeakers.forEach((sp) => {
    if (EXCLUDED_CFP_CODES.has(sp.code) || isPanelSpeaker(sp)) return
    const key = sp.trackNameEn || ''
    if (key && !map.has(key)) {
      map.set(key, {
        label: locale === 'es' ? (sp.trackName || sp.trackNameEn || '') : (sp.trackNameEn || ''),
        color: resolveTrackColor(sp.trackNameEn, sp.trackColor),
      })
    }
  })
  return Array.from(map.entries()).map(([key, val]) => ({ key, ...val }))
}

// ─── Compact speaker card ──────────────────────────────────────────────────
export function ScheduleSpeakerCard({ speaker }: { speaker: ScheduleSpeaker }) {
  const avatar = useSpeakerAvatar(getSpeakerAvatarSources(speaker, 'default'))
  const initials = speaker.name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const trackColor = resolveTrackColor(speaker.trackNameEn, speaker.trackColor)

  return (
    <article
      className={`${own.schSpeakerCard} ${shared.invitedCard}`}
      style={{ '--track-color': trackColor } as CSSProperties}
    >
      <div className={shared.invitedCardInner}>
        {/* Avatar */}
        <div className={own.schSpeakerAvatarWrap}>
          {avatar.src ? (
            <img
              src={avatar.src}
              alt={speaker.name}
              className={own.schSpeakerAvatar}
              loading="lazy"
              onError={avatar.handleError}
            />
          ) : (
            <div className={own.schSpeakerAvatarFallback}>{initials}</div>
          )}
          {speaker.location ? (
            <CountryFlag
              country={speaker.location}
              className={shared.invitedCountryFlag}
              svgClassName={shared.countryFlagSvg}
            />
          ) : null}
        </div>

        {/* Info con estructura de invitedMeta */}
        <div className={`${own.schSpeakerInfo} ${shared.invitedMeta}`}>
          {/* Top row: company + linkedin */}
          <div className={shared.invitedTopRow}>
            {speaker.company && (
              <span className={shared.invitedTag}>{speaker.company}</span>
            )}
            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={shared.invitedLinkedin}
                aria-label={`LinkedIn de ${speaker.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className={shared.invitedLinkedinIcon} />
              </a>
            )}
          </div>

          {/* name */}
          <h3 className={shared.invitedMemberName}>{speaker.name}</h3>

          {/* rol */}
          {speaker.jobTitle && (
            <p className={shared.invitedMemberJob}>{speaker.jobTitle}</p>
          )}

          {/* charla + track */}
          {(speaker.topic || speaker.trackName) && (
            <div className={shared.invitedTopicBlock}>
              {speaker.topic && (
                <p className={shared.invitedMemberTalk}>
                  <span>{speaker.topic}</span>
                </p>
              )}

              {speaker.trackName && (
                <p
                  className={shared.invitedTopicHashtag}
                  style={{ '--track-color': trackColor } as CSSProperties}
                >
                  #{speaker.trackName}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}


function getResponsivePageSize() {
  if (typeof window === 'undefined') return 10
  const width = window.innerWidth
  if (width < 640) return 4
  if (width < 1024) return 8
  return 10
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ScheduleSpeakersSection({
  as: Component = 'section',
  id = 'schedule-speakers',
}: ScheduleSpeakersSectionProps) {
  const locale = useLocale() as 'es' | 'en'
  const [activeTrack, setActiveTrack] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(getResponsivePageSize)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    function handleResize() {
      setPageSize(getResponsivePageSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const visibleSpeakers = cfpScheduleSpeakers.filter(
    (speaker) => !EXCLUDED_CFP_CODES.has(speaker.code) && !isPanelSpeaker(speaker)
  )

  const trackOptions = getUniqueTrackOptions(locale)
  const filtered = activeTrack
    ? visibleSpeakers.filter((sp) => sp.trackNameEn === activeTrack)
    : visibleSpeakers

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Reset to page 1 when filter or pageSize changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTrack, pageSize])

  function handleTrackClick(key: string) {
    setActiveTrack((prev) => (prev === key ? null : key))
  }

  return (
    <Component
      id={id}
      className={own.schSpeakersSection}
    >
      <SectionHeader
        className={shared.keynoteTitleHeader}
        title={
          <>
            <span className={shared.keynoteTitleAccent}>CFP</span> Speakers
            <button
              type="button"
              className={shared.panelCollapseBtn}
              onClick={() => setIsCollapsed((v) => !v)}
              aria-expanded={!isCollapsed}
              aria-controls="cfp-speakers-content"
              title={
                isCollapsed
                  ? locale === 'es'
                    ? 'Expandir'
                    : 'Expand'
                  : locale === 'es'
                  ? 'Minimizar'
                  : 'Minimize'
              }
            >
              {isCollapsed ? (
                <ChevronDown className={shared.panelCollapseIcon} />
              ) : (
                <ChevronUp className={shared.panelCollapseIcon} />
              )}
            </button>
          </>
        }
        lead={
          locale === 'es'
            ? `${visibleSpeakers.length} speakers confirmados en el programa.`
            : `${visibleSpeakers.length} confirmed speakers on the program.`
        }
      />

    <div
      id="cfp-speakers-content"
      className={`${own.cfpCollapsible} ${isCollapsed ? own.cfpCollapsed : ''}`}
    >

      <div className={shared.invitedFilters}>
        {trackOptions.map((track) => {
          const isActive = activeTrack === track.key
          const count = visibleSpeakers.filter((sp) => sp.trackNameEn === track.key).length
          return (
            <button
              key={track.key}
              type="button"
              className={`${shared.invitedFilterTab} ${isActive ? shared.invitedFilterTabActive : ''}`}
              style={{ '--track-color': track.color } as CSSProperties}
              onClick={() => handleTrackClick(track.key)}
              aria-pressed={isActive}
            >
              {track.label}
              {isActive && <span className={shared.invitedFilterTabCount}>{count}</span>}
            </button>
          )
        })}
      </div>

      <div className={shared.invitedCarouselWrapper}>
        {paginated.length > 0 ? (
          <div className={own.schSpeakersGrid}>
            {paginated.map((speaker) => (
              <ScheduleSpeakerCard key={speaker.code} speaker={speaker} />
            ))}
          </div>
        ) : (
          <div className={shared.invitedEmptyState}>
            {locale === 'es' ? 'No hay speakers para este filtro.' : 'No speakers for this filter.'}
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className={own.pagination}>
          <button
            type="button"
            className={own.paginationBtn}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label={locale === 'es' ? 'Página anterior' : 'Previous page'}
          >
            ←
          </button>

          <div className={own.paginationPages}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`${own.paginationDot} ${page === currentPage ? own.paginationDotActive : ''}`}
                onClick={() => setCurrentPage(page)}
                aria-label={`${locale === 'es' ? 'Página' : 'Page'} ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={own.paginationBtn}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label={locale === 'es' ? 'Página siguiente' : 'Next page'}
          >
            →
          </button>
        </div>
      )}
      </div>
    </Component>
  )
}
