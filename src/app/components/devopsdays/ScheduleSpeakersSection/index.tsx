import { useState } from 'react'
import type { CSSProperties } from 'react'
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

const scheduleSpeakerAvatars = new Map(
  ((scheduleData as { speakers?: ScheduleDataSpeaker[] }).speakers || []).map((speaker) => [
    speaker.code,
    speaker,
  ])
)

const speakers = (speakersRaw as ScheduleSpeaker[]).map((speaker) => {
  const avatarData = scheduleSpeakerAvatars.get(speaker.code)

  return {
    ...speaker,
    avatar_thumbnail_default: speaker.avatar_thumbnail_default ?? avatarData?.avatar_thumbnail_default ?? null,
    avatar_thumbnail_tiny: speaker.avatar_thumbnail_tiny ?? avatarData?.avatar_thumbnail_tiny ?? null,
  }
})
const excludedSpeakerNames = new Set(['Sebastian Veliz Donoso', 'William Matos'])
const trackColorMap: Record<string, string> = {
  'Platform Engineering & DevOps': '#2563eb',
  'Security & Technology Transformation': '#f97316',
  'Modern Leadership & Culture': '#14b8a6',
  'Enterprise AI & Data Strategy': '#a78bfa',
}

function resolveTrackColor(trackNameEn: string | null, fallback: string) {
  if (trackNameEn && trackColorMap[trackNameEn]) {
    return trackColorMap[trackNameEn]
  }

  return fallback
}

// ─── Track options ────────────────────────────────────────────────────────────
function getUniqueTrackOptions(locale: 'es' | 'en') {
  const map = new Map<string, { label: string; color: string }>()
  speakers.forEach((sp) => {
    if (excludedSpeakerNames.has(sp.name)) return
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
function ScheduleSpeakerCard({ speaker }: { speaker: ScheduleSpeaker }) {
  const avatar = useSpeakerAvatar(getSpeakerAvatarSources(speaker, 'default'))
  const initials = speaker.name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <article
      className={own.schSpeakerCard}
      style={{ '--track-color': resolveTrackColor(speaker.trackNameEn, speaker.trackColor) } as CSSProperties}
    >
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
        <h3 className={own.schSpeakerName}>{speaker.name}</h3>
        {speaker.trackName && (
          <span
            className={`${own.schSpeakerTrackBadge} ${shared.keynoteTopicHashtag}`}
            style={{ '--track-color': resolveTrackColor(speaker.trackNameEn, speaker.trackColor) } as CSSProperties}
          >
            #{speaker.trackName}
          </span>
        )}
        {speaker.topic && (
          <p className={own.schSpeakerTopic}>{speaker.topic}</p>
        )}
      </div>
    </article>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ScheduleSpeakersSection({
  as: Component = 'section',
  id = 'schedule-speakers',
}: ScheduleSpeakersSectionProps) {
  const locale = useLocale() as 'es' | 'en'
  const [activeTrack, setActiveTrack] = useState<string | null>(null)
  const visibleSpeakers = speakers.filter((speaker) => !excludedSpeakerNames.has(speaker.name))

  const trackOptions = getUniqueTrackOptions(locale)
  const filtered = activeTrack
    ? visibleSpeakers.filter((sp) => sp.trackNameEn === activeTrack)
    : visibleSpeakers

  return (
    <Component
      id={id}
      className={own.schSpeakersSection}
    >
      <SectionHeader
        className={shared.keynoteTitleHeader}
        title={<><span className={shared.keynoteTitleAccent}>CFP</span> Speakers</>}
        lead={
          locale === 'es'
            ? `${visibleSpeakers.length} speakers confirmados en el programa.`
            : `${visibleSpeakers.length} confirmed speakers on the program.`
        }
      />

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
              onClick={() => setActiveTrack(isActive ? null : track.key)}
              aria-pressed={isActive}
            >
              {track.label}
              {isActive && <span className={shared.invitedFilterTabCount}>{count}</span>}
            </button>
          )
        })}
      </div>

      <div className={shared.invitedCarouselWrapper}>
        {filtered.length > 0 ? (
          <div className={own.schSpeakersGrid}>
            {filtered.map((speaker) => (
              <ScheduleSpeakerCard key={speaker.code} speaker={speaker} />
            ))}
          </div>
        ) : (
          <div className={shared.invitedEmptyState}>
            {locale === 'es' ? 'No hay speakers para este filtro.' : 'No speakers for this filter.'}
          </div>
        )}
      </div>
    </Component>
  )
}
