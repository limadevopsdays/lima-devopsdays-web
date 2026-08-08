import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { ChevronDown, ChevronUp, Linkedin } from 'lucide-react'
import { useLocale } from '../../../i18n'
import { getSpeakerAvatarSources, useSpeakerAvatar } from '../../../lib/speakerAvatars'
import { SectionHeader } from '../SectionHeader'
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
const excludedSpeakerNames = new Set(['Sebastian Veliz Donoso', 'William Matos'])
const isPanelSpeaker = (sp: ScheduleSpeaker) => Boolean(sp.topic && sp.topic.trim().startsWith('[ Panel ]'))
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
    if (excludedSpeakerNames.has(sp.name) || isPanelSpeaker(sp)) return
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

// ─── Compact card ─────────────────────────────────────────────────────────────
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
      className={own.schSpeakerCard}
      style={{ '--track-color': trackColor } as CSSProperties}
    >
      {/* Top row: company + linkedin */}
      <div className={own.schSpeakerTopRow}>
        {speaker.company && (
          <span className={own.schSpeakerCompany}>{speaker.company}</span>
        )}
        {speaker.linkedin && (
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={own.schSpeakerLinkedin}
            aria-label={`LinkedIn de ${speaker.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className={own.schSpeakerLinkedinIcon} />
          </a>
        )}
      </div>

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
      </div>

      {/* Info */}
      <div className={own.schSpeakerInfo}>
        {/* name */}
        <h3 className={own.schSpeakerName}>{speaker.name}</h3>

        {/* rol */}
        {speaker.jobTitle && (
          <p className={own.schSpeakerRole}>{speaker.jobTitle}</p>
        )}

        {/* charla */}
        {speaker.topic && (
          <p className={own.schSpeakerTopic}>{speaker.topic}</p>
        )}

        {/* eje temático */}
        {speaker.trackName && (
          <span
            className={`${own.schSpeakerTrackBadge} ${shared.keynoteTopicHashtag}`}
            style={{ '--track-color': trackColor } as CSSProperties}
          >
            #{speaker.trackName}
          </span>
        )}
      </div>
    </article>
  )
}


const PAGE_SIZE = 8

// ─── Main component ───────────────────────────────────────────────────────────
export function ScheduleSpeakersSection({
  as: Component = 'section',
  id = 'schedule-speakers',
}: ScheduleSpeakersSectionProps) {
  const locale = useLocale() as 'es' | 'en'
  const [activeTrack, setActiveTrack] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const visibleSpeakers = cfpScheduleSpeakers.filter(
    (speaker) => !excludedSpeakerNames.has(speaker.name) && !isPanelSpeaker(speaker)
  )

  const trackOptions = getUniqueTrackOptions(locale)
  const filtered = activeTrack
    ? visibleSpeakers.filter((sp) => sp.trackNameEn === activeTrack)
    : visibleSpeakers

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTrack])

  function handleTrackClick(key: string) {
    setActiveTrack((prev) => (prev === key ? null : key))
  }

  return (
    <Component
      id={id}
      className={own.schSpeakersSection}
    >
      <div className={own.cfpHeaderRow}>
      <SectionHeader
        className={shared.keynoteTitleHeader}
        title={<><span className={shared.keynoteTitleAccent}>CFP</span> Speakers</>}
        lead={
          locale === 'es'
            ? `${visibleSpeakers.length} speakers confirmados en el programa.`
            : `${visibleSpeakers.length} confirmed speakers on the program.`
        }
      />
      <button
        type="button"
        className={own.cfpCollapseBtn}
        onClick={() => setIsCollapsed((v) => !v)}
        aria-expanded={!isCollapsed}
        aria-controls="cfp-speakers-content"
        title={isCollapsed
          ? (locale === 'es' ? 'Expandir' : 'Expand')
          : (locale === 'es' ? 'Minimizar' : 'Minimize')}
      >
        {isCollapsed
          ? <ChevronDown className={own.cfpCollapseIcon} />
          : <ChevronUp className={own.cfpCollapseIcon} />}
        <span className={own.cfpCollapseBtnLabel}>
          {isCollapsed
            ? (locale === 'es' ? 'Expandir' : 'Expand')
            : (locale === 'es' ? 'Minimizar' : 'Minimize')}
        </span>
      </button>
    </div>

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
