import React, { useState } from 'react'
import { Clock, MapPin, Calendar, Search, Star, X, ExternalLink, ChevronDown, Tag } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionHeader } from '../SectionHeader'
import { useI18n, useLocale } from '../../../i18n'
import { getSpeakerAvatarSources, useSpeakerAvatar } from '../../../lib/speakerAvatars'
import { scheduleI18n } from './i18n'
import styles from './index.module.css'
import scheduleData from '../../../data/scheduleData.json'

// ─── TypeScript Types matching Pretalx JSON ───────────────────────────────────
interface TalkRaw {
  code: string
  id: number
  title: string | { en: string; es?: string }
  abstract: string | { en: string; es?: string } | null
  speakers: string[]
  track: number | null
  start: string
  end: string
  room: number | null
  duration: number
  content_locale: string
}

interface TrackRaw {
  id: number
  name: {
    en: string
    es: string
  }
  description: Record<string, string>
  color: string
}

interface RoomRaw {
  id: number
  name: {
    en: string
    es?: string
  }
  description: Record<string, string>
}

interface SpeakerRaw {
  code: string
  name: string
  avatar: string | null
  avatar_thumbnail_default?: string | null
  avatar_thumbnail_tiny?: string | null
}

interface TalkSpeaker {
  name: string
  avatar: string | null
  avatar_thumbnail_default?: string | null
  avatar_thumbnail_tiny?: string | null
}

function TalkSpeakerAvatar({
  speaker,
  className,
  fallbackClassName,
}: {
  speaker: TalkSpeaker
  className: string
  fallbackClassName: string
}) {
  const avatar = useSpeakerAvatar(getSpeakerAvatarSources(speaker, 'small'))

  if (avatar.src) {
    return (
      <img
        src={avatar.src}
        alt={speaker.name}
        className={className}
        onError={avatar.handleError}
      />
    )
  }

  return (
    <div className={fallbackClassName}>
      {speaker.name.charAt(0)}
    </div>
  )
}

// ─── Parallel columns for rooms on Desktop ────────────────────────────────────
// Sourced from Pretalx IDs in exact visual order shown in screenshot:
const PARALLEL_ROOMS = [
  { id: 286, nameEs: 'Terrace', nameEn: 'Terrace', color: '#DCA10D' },
  { id: 281, nameEs: 'Puruchuco - Principal', nameEn: 'Puruchuco - Principal', color: '#D92B2B' },
  { id: 282, nameEs: 'Manchay', nameEn: 'Manchay', color: '#1D64D8' },
  { id: 284, nameEs: 'Paraiso', nameEn: 'Paraiso', color: '#E05A1B' },
  { id: 283, nameEs: 'Armatambo', nameEn: 'Armatambo', color: '#D93688' },
  { id: 285, nameEs: 'Maranga - Talleres', nameEn: 'Maranga - Workshop', color: '#2A9D4E' },
]

const TRACK_COLOR_MAP: Record<string, string> = {
  '200': '#2563eb', // Platform Engineering & DevOps
  '201': '#f97316', // Security & Technology Transformation
  '199': '#14b8a6', // Modern Leadership & Culture
  '202': '#a78bfa', // Enterprise AI & Data Strategy
  '230': '#475569', // Lightning Talk / Charla Relámpago (ID 230)
  'Platform Engineering & DevOps': '#2563eb',
  'Security & Technology Transformation': '#f97316',
  'Modern Leadership & Culture': '#14b8a6',
  'Enterprise AI & Data Strategy': '#a78bfa',
  'Charla Relámpago': '#475569',
  'Charla relámpago': '#475569',
  'Lightning Talk': '#475569',
  'Lightning talk': '#475569',
  'lightning talk': '#475569',
  'charla relámpago': '#475569',
}

function formatTrackLabel(trackName: string) {
  if (trackName.toLowerCase() === 'charla relámpago') {
    return 'Charla Relámpago'
  }

  if (trackName.toLowerCase() === 'lightning talk') {
    return 'Lightning Talk'
  }

  return trackName
}

function resolveTrackColor(
  trackNameOrId: string | number | undefined,
  fallback: string,
  customTrackColors?: Record<string, string>
) {
  if (!trackNameOrId) return fallback
  const key = String(trackNameOrId).trim()
  if (customTrackColors && customTrackColors[key]) return customTrackColors[key]
  return TRACK_COLOR_MAP[key] || TRACK_COLOR_MAP[key.toLowerCase()] || fallback
}

// Extract HH:MM (using timezone-aware parsing in America/Lima)
export const toLimaTimeHM = (isoStr: string) => {
  if (!isoStr) return ''
  const date = new Date(isoStr)
  return date.toLocaleTimeString('en-US', {
    timeZone: 'America/Lima',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
}

export interface ScheduleSectionProps {
  fixedDay?: 'day-1' | 'day-2'
  hideDayToggle?: boolean
  minTime?: string
  maxTime?: string
  titleText?: string
  subtitleText?: string
  customRoomColors?: Record<number | string, string>
  customTrackColors?: Record<string, string>
  themeColors?: {
    containerBg?: string
    navyBg?: string
    purpleAccent?: string
    textLight?: string
  }
}

export function ScheduleSection({
  fixedDay,
  hideDayToggle = false,
  minTime,
  maxTime,
  titleText,
  subtitleText,
  customRoomColors,
  customTrackColors,
  themeColors,
}: ScheduleSectionProps = {}) {
  const t = useI18n(scheduleI18n)
  const locale = useLocale() as 'es' | 'en'

  const activeParallelRooms = React.useMemo(() => {
    return PARALLEL_ROOMS.map((r) => ({
      ...r,
      color: (customRoomColors && customRoomColors[r.id]) || r.color,
    }))
  }, [customRoomColors])

  const [activeDay, setActiveDay] = useState<'day-1' | 'day-2'>(fixedDay || 'day-1')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedRooms, setSelectedRooms] = useState<number[]>(() => activeParallelRooms.map((r) => r.id))
  const [selectedTracks, setSelectedTracks] = useState<string[]>(() =>
    (scheduleData.tracks as TrackRaw[])
      .filter((tr) => tr.id !== 229)
      .map((tr) => tr.id.toString())
  )
  const [selectedTalk, setSelectedTalk] = useState<any | null>(null)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false)
  const [expandedTimeSlots, setExpandedTimeSlots] = useState<string[]>([])

  // Helper to resolve an ID or Code to the canonical talk code or ID in current scheduleData
  const resolveFavoriteKey = (favKey: string | number): string | number => {
    const keyStr = String(favKey)
    const allTalks = scheduleData.talks as TalkRaw[]
    const talkByCode = allTalks.find((t) => t.code === keyStr || t.code === favKey)
    if (talkByCode && talkByCode.code) {
      return talkByCode.code
    }
    const talkById = allTalks.find((t) => t.id === Number(favKey) || t.id === favKey)
    if (talkById) {
      return talkById.code || talkById.id
    }
    return favKey
  }

  // ─── Favorites state (stored in localStorage by immutable Pretalx code) ──────
  const [favorites, setFavorites] = useState<(string | number)[]>(() => {
    try {
      if (typeof window === 'undefined') return []
      const saved = localStorage.getItem('schedule-favorites')
      if (!saved) return []
      const parsed = JSON.parse(saved)
      if (!Array.isArray(parsed)) return []

      const allCurrentTalks = scheduleData.talks as TalkRaw[]
      const currentCodes = new Set(allCurrentTalks.map((t) => t.code).filter(Boolean))
      const currentIds = new Set(allCurrentTalks.map((t) => t.id))

      const migrated = parsed
        .map((key) => resolveFavoriteKey(key))
        .filter((key) => currentCodes.has(String(key)) || currentIds.has(Number(key)))

      const unique = Array.from(new Set(migrated))
      if (JSON.stringify(parsed) !== JSON.stringify(unique)) {
        localStorage.setItem('schedule-favorites', JSON.stringify(unique))
      }
      return unique
    } catch {
      return []
    }
  })

  const toggleFavorite = (favKey: string | number, e: React.MouseEvent) => {
    e.stopPropagation()
    const canonicalKey = resolveFavoriteKey(favKey)
    setFavorites((prev) => {
      const next = prev.includes(canonicalKey)
        ? prev.filter((x) => x !== canonicalKey)
        : [...prev, canonicalKey]
      try {
        localStorage.setItem('schedule-favorites', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const isTalkFav = (talk: any) => {
    if (!talk) return false
    return (
      (talk.code && favorites.includes(talk.code)) ||
      favorites.includes(talk.id)
    )
  }

  // Auto-expand hour blocks containing starred sessions when viewing favorites, reset on other filters
  React.useEffect(() => {
    if (showOnlyFavorites) {
      const favHourBlocks = new Set<string>()
      formattedTalks.forEach((talk) => {
        if (isTalkFav(talk) && talk.start) {
          const hourStr = talk.start.split(':')[0] + ':00'
          favHourBlocks.add(hourStr)
        }
      })
      setExpandedTimeSlots(Array.from(favHourBlocks))
    } else {
      setExpandedTimeSlots([])
    }
  }, [activeDay, searchQuery, showOnlyFavorites, favorites])

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    window.dispatchEvent(
      new CustomEvent('devopsdays:music-player-visibility', {
        detail: { hidden: Boolean(selectedTalk) },
      })
    )

    return () => {
      window.dispatchEvent(
        new CustomEvent('devopsdays:music-player-visibility', {
          detail: { hidden: false },
        })
      )
    }
  }, [selectedTalk])

  // Room multi-select click handlers
  const handleRoomChipClick = (roomId: number) => {
    setSelectedRooms((prev) => {
      const allIds = activeParallelRooms.map((r) => r.id)
      
      // If all rooms are currently selected, isolate only the clicked one (focus state)
      if (prev.length === allIds.length) {
        return [roomId]
      }
      
      // Otherwise, toggle it
      if (prev.includes(roomId)) {
        const next = prev.filter((id) => id !== roomId)
        return next.length === 0 ? allIds : next // Reset to all rooms if none are selected
      } else {
        const next = [...prev, roomId]
        return next.length === allIds.length ? allIds : next
      }
    })
  }

  // Add to Calendar Link Helpers
  const getGoogleCalendarUrl = (talk: any) => {
    if (!talk) return ''
    const formatUtcDate = (isoStr: string) => {
      if (!isoStr) return ''
      const date = new Date(isoStr)
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    const text = encodeURIComponent(talk.title)
    const dates = `${formatUtcDate(talk.startRaw)}/${formatUtcDate(talk.endRaw)}`
    const details = encodeURIComponent(talk.abstract || '')
    const location = encodeURIComponent(talk.roomName || '')
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`
  }

  const getIcsDataUri = (talk: any) => {
    if (!talk) return ''
    const formatUtcDate = (isoStr: string) => {
      if (!isoStr) return ''
      const date = new Date(isoStr)
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DevOpsDays Lima//2026//EN',
      'BEGIN:VEVENT',
      `UID:${talk.id}@devopsdays.pe`,
      `DTSTART:${formatUtcDate(talk.startRaw)}`,
      `DTEND:${formatUtcDate(talk.endRaw)}`,
      `SUMMARY:${talk.title}`,
      `DESCRIPTION:${(talk.abstract || '').replace(/\n/g, '\\n')}`,
      `LOCATION:${talk.roomName || ''}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ]

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsLines.join('\n'))}`
  }

  const handleAllRoomsClick = () => {
    setSelectedRooms(activeParallelRooms.map((r) => r.id))
  }

  // ─── Extract Pretalx mappings ───────────────────────────────────────────────
  const roomsMap = new Map((scheduleData.rooms as RoomRaw[]).map((r) => [r.id, r]))
  const tracksMap = new Map((scheduleData.tracks as TrackRaw[]).map((tr) => [tr.id, tr]))
  const speakersMap = new Map((scheduleData.speakers as SpeakerRaw[]).map((s) => [s.code, s]))

  // ─── Gather unique tracks for filter dropdown ───────────────────────────────
  const tracksList = (scheduleData.tracks as TrackRaw[])
    .filter((tr) => tr.id !== 229 && tr.id.toString() !== '229')
    .map((tr) => ({
      id: tr.id.toString(),
      name: formatTrackLabel(locale === 'es' ? tr.name.es : tr.name.en),
      color: resolveTrackColor(tr.name.en, tr.color, customTrackColors),
    }))

  // ─── Filter talks for the selected active day ───────────────────────────────
  const activeDateStr = activeDay === 'day-1' ? '2026-08-27' : '2026-08-28'
  const otherDateStr = activeDay === 'day-1' ? '2026-08-28' : '2026-08-27'
  
  const rawTalksForDay = (scheduleData.talks as TalkRaw[]).filter((talk) => {
    if (!talk.start || !talk.start.startsWith(activeDateStr)) return false
    if (minTime || maxTime) {
      const startHM = toLimaTimeHM(talk.start)
      if (minTime && startHM < minTime) return false
      if (maxTime && startHM >= maxTime) return false
    }
    return true
  })

  const otherDayFavCount = (scheduleData.talks as TalkRaw[]).filter(
    (talk) => talk.start && talk.start.startsWith(otherDateStr) && isTalkFav(talk)
  ).length

  // ─── Parse and format each session ──────────────────────────────────────────
  const formattedTalks = rawTalksForDay.map((talk) => {
    const roomObj = talk.room ? roomsMap.get(talk.room) : null
    const trackObj = talk.track ? tracksMap.get(talk.track) : null

    const roomName = roomObj
      ? locale === 'es'
        ? roomObj.name.es || roomObj.name.en
        : roomObj.name.en
      : ''

    const trackName = trackObj
      ? locale === 'es'
        ? trackObj.name.es || trackObj.name.en
        : trackObj.name.en
      : ''

    // Normalize track colors for UI contrast
    let trackColor = trackObj?.color || '#6b51ef'
    if (talk.track) {
      trackColor = resolveTrackColor(talk.track, trackColor, customTrackColors)
    }
    if (trackObj?.name?.en) {
      trackColor = resolveTrackColor(trackObj.name.en, trackColor, customTrackColors)
    }
    if (trackObj?.name?.es) {
      trackColor = resolveTrackColor(trackObj.name.es, trackColor, customTrackColors)
    }

    const speakersList = (talk.speakers || []).map((code) => {
      const sp = speakersMap.get(code)
      return {
        name: sp ? sp.name : code,
        avatar: sp ? sp.avatar : null,
        avatar_thumbnail_default: sp ? sp.avatar_thumbnail_default : null,
        avatar_thumbnail_tiny: sp ? sp.avatar_thumbnail_tiny : null,
      }
    })

    // Extract HH:MM (using timezone-aware parsing in America/Lima)
    const toLimaTimeHM = (isoStr: string) => {
      if (!isoStr) return ''
      const date = new Date(isoStr)
      return date.toLocaleTimeString('en-US', {
        timeZone: 'America/Lima',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    const startHM = toLimaTimeHM(talk.start)
    const endHM = toLimaTimeHM(talk.end)

    // Localize title and abstract if they are objects
    const titleStr =
      talk.title && typeof talk.title === 'object'
        ? (locale === 'es' ? (talk.title.es || talk.title.en) : talk.title.en)
        : talk.title || ''

    const abstractStr =
      talk.abstract && typeof talk.abstract === 'object'
        ? (locale === 'es' ? (talk.abstract.es || talk.abstract.en) : talk.abstract.en)
        : talk.abstract || ''

    // Always compute the duration directly from the start/end timestamps if they exist to prevent database format mismatches
    let durationVal = talk.duration
    if (talk.start && talk.end) {
      const diffMs = new Date(talk.end).getTime() - new Date(talk.start).getTime()
      durationVal = Math.max(0, Math.round(diffMs / (60 * 1000)))
    }

    return {
      id: talk.id,
      code: talk.code,
      title: titleStr,
      abstract: abstractStr,
      start: startHM,
      end: endHM,
      duration: durationVal,
      roomName,
      roomId: talk.room,
      trackName,
      trackColor,
      trackId: talk.track ? talk.track.toString() : null,
      speakersList,
      startRaw: talk.start,
      endRaw: talk.end,
    }
  })

  // Normalize text for flexible searching (accents, lowercase, trim)
  const normalizeText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()

  const rawQuery = searchQuery.trim()
  const cleanQuery = rawQuery.startsWith('#') ? rawQuery.slice(1) : rawQuery
  const normalizedQuery = normalizeText(cleanQuery)

  const isTalkMatchingQuery = (talk: typeof formattedTalks[0]) => {
    if (!normalizedQuery) return true

    // 1. Check speaker names
    const matchesSpeaker = talk.speakersList.some((sp) =>
      normalizeText(sp.name).includes(normalizedQuery)
    )

    // 2. Check track name (matching both with and without leading '#')
    const normalizedTrack = talk.trackName ? normalizeText(talk.trackName) : ''
    const matchesTrack = Boolean(normalizedTrack && normalizedTrack.includes(normalizedQuery))

    return matchesSpeaker || matchesTrack
  }

  // Track multi-select click handlers
  const handleTrackChipClick = (trackId: string) => {
    const allTrackIds = tracksList.map((tr) => tr.id)
    setSelectedTracks((prev) => {
      if (prev.length === allTrackIds.length) {
        return [trackId]
      }
      if (prev.includes(trackId)) {
        const next = prev.filter((id) => id !== trackId)
        return next.length === 0 ? allTrackIds : next
      } else {
        const next = [...prev, trackId]
        return next.length === allTrackIds.length ? allTrackIds : next
      }
    })
  }

  const handleAllTracksClick = () => {
    setSelectedTracks(tracksList.map((tr) => tr.id))
  }

  // ─── Filter based on Search Query, Favorites, Room and Track selection ──────────────
  const filteredTalks = formattedTalks.filter((talk) => {
    if (showOnlyFavorites) {
      return isTalkFav(talk)
    }

    const matchesSearch = isTalkMatchingQuery(talk)

    const isFullWidthEvent =
      !talk.roomId ||
      talk.trackId === '229' ||
      talk.title.toLowerCase().includes('almuerzo')

    const matchesRoom = isFullWidthEvent || (talk.roomId && selectedRooms.includes(talk.roomId))
    const matchesTrack = isFullWidthEvent || !talk.trackId || selectedTracks.includes(talk.trackId)

    return matchesSearch && matchesRoom && matchesTrack
  })

  // Find rooms that actually contain at least one search-matching event for the active day
  const roomsWithEvents = new Set<number>()
  formattedTalks.forEach((talk) => {
    const matchesSearch = isTalkMatchingQuery(talk)
    const isBreak =
      !talk.roomId ||
      talk.trackId === '229' ||
      talk.title.toLowerCase().includes('almuerzo') ||
      talk.title.toLowerCase().includes('break') ||
      talk.title.toLowerCase().includes('receso')
      
    if (matchesSearch && talk.roomId && !isBreak) {
      roomsWithEvents.add(talk.roomId)
    }
  })

  // Filtered rooms currently displayed in columns (exclude rooms that contain no talks for this track)
  const activeRoomsList = activeParallelRooms.filter((room) => {
    if (showOnlyFavorites) {
      // Only include rooms that contain at least one starred session on this day
      return filteredTalks.some((talk) => talk.roomId === room.id)
    }
    return selectedRooms.includes(room.id) && roomsWithEvents.has(room.id)
  })

  // ─── Column positioning helper ──────────────────────────────────────────────
  const getRoomColumnIndex = (roomId: number | null) => {
    if (!roomId) return 2 // Default to column 2 (Terrace)
    const idx = activeRoomsList.findIndex((r) => r.id === roomId)
    return idx !== -1 ? idx + 2 : 2 // Column 1 is Time, index 0 matches column 2
  }

  // ─── Time to Minutes grid mapping helpers ────────────────────────────────────
  const timeToMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number)
    return h * 60 + m
  }

  // Calculate dynamic boundaries to collapse empty slots when filtering by track (edge)
  const getDynamicBoundaries = () => {
    const defaultStart = minTime ? timeToMinutes(minTime) : timeToMinutes('08:00')
    const defaultEnd = maxTime ? timeToMinutes(maxTime) : timeToMinutes('18:30')

    if (!searchQuery) {
      return { startMinutes: defaultStart, endMinutes: defaultEnd }
    }

    // Filter only non-break, track-specific talks to determine boundary
    const trackTalks = filteredTalks.filter(
      (t) => t.roomId && t.trackId && t.trackId !== '229'
    )

    if (trackTalks.length === 0) {
      return { startMinutes: defaultStart, endMinutes: defaultEnd }
    }

    const startMins = trackTalks.map((t) => timeToMinutes(t.start))
    const endMins = trackTalks.map((t) => timeToMinutes(t.end))

    const minStart = Math.min(...startMins)
    const maxEnd = Math.max(...endMins)

    // Round minStart down and maxEnd up to clean 30-minute intervals
    const startMinutes = Math.max(defaultStart, Math.floor(minStart / 30) * 30)
    const endMinutes = Math.min(defaultEnd, Math.ceil(maxEnd / 30) * 30)

    return { startMinutes, endMinutes }
  }

  const { startMinutes, endMinutes } = getDynamicBoundaries()
  const SLOT_DURATION = 5 // 5 minutes per grid row

  // Filter talks that fall within the boundaries
  const displayedTalks = filteredTalks.filter((talk) => {
    const talkStart = timeToMinutes(talk.start)
    const talkEnd = timeToMinutes(talk.end)
    return talkStart >= startMinutes && talkEnd <= endMinutes
  })

  // Group displayed talks by hour block (e.g. "11:00") for the mobile chronological layout (deduplicating identical concurrent breaks)
  const groupedTalksByTime: { time: string; talks: typeof displayedTalks }[] = []
  const sortedDisplayedTalks = [...displayedTalks].sort(
    (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
  )
  sortedDisplayedTalks.forEach((talk) => {
    if (!talk.start) return
    const hourStr = talk.start.split(':')[0] + ':00'

    let group = groupedTalksByTime.find((g) => g.time === hourStr)
    if (!group) {
      group = { time: hourStr, talks: [] }
      groupedTalksByTime.push(group)
    }

    const isBreak =
      !talk.roomId ||
      talk.trackId === '229' ||
      talk.title.toLowerCase().includes('almuerzo') ||
      talk.title.toLowerCase().includes('break') ||
      talk.title.toLowerCase().includes('receso')

    if (isBreak) {
      const hasDuplicate = group.talks.some(
        (t) =>
          t.title.toLowerCase() === talk.title.toLowerCase() &&
          t.start === talk.start &&
          t.end === talk.end
      )
      if (hasDuplicate) return
    }

    group.talks.push(talk)
  })

  // ─── Non-linear Row Mapping for Collapsible time gaps ────────────────────────
  // Gather all unique start/end minutes of displayed talks
  const uniqueMinutesSet = new Set<number>()
  if (displayedTalks.length > 0) {
    displayedTalks.forEach((talk) => {
      uniqueMinutesSet.add(timeToMinutes(talk.start))
      uniqueMinutesSet.add(timeToMinutes(talk.end))
    })
  } else {
    uniqueMinutesSet.add(startMinutes)
    uniqueMinutesSet.add(endMinutes)
  }

  const sortedMinutes = Array.from(uniqueMinutesSet).sort((a, b) => a - b)

  // Generate intervals and determine if they should collapse
  interface IntervalDetails {
    start: number
    end: number
    duration: number
    isGap: boolean
    isCollapsed: boolean
  }

  const intervals: IntervalDetails[] = []
  for (let i = 0; i < sortedMinutes.length - 1; i++) {
    const startMin = sortedMinutes[i]
    const endMin = sortedMinutes[i + 1]
    const duration = endMin - startMin

    // An interval is a gap if no displayed event spans during it
    const isGap = !displayedTalks.some((talk) => {
      const talkStart = timeToMinutes(talk.start)
      const talkEnd = timeToMinutes(talk.end)
      return talkStart < endMin && talkEnd > startMin
    })

    // Collapse gaps greater than 60 minutes
    const isCollapsed = isGap && duration > 60

    intervals.push({ start: startMin, end: endMin, duration, isGap, isCollapsed })
  }

  // Build the Map from minutes to grid row indices
  const rowMap = new Map<number, number>()
  let currentGridRow = 2 // Row 1 is Room headers

  if (sortedMinutes.length > 0) {
    rowMap.set(sortedMinutes[0], currentGridRow)
  }

  intervals.forEach((interval) => {
    if (interval.isCollapsed) {
      currentGridRow += 1 // 1 slot for gap indicator
    } else {
      const slots = Math.max(1, Math.round(interval.duration / SLOT_DURATION))
      currentGridRow += slots
    }
    rowMap.set(interval.end, currentGridRow)
  })

  const totalGridRows = currentGridRow - 2

  const getRowSpan = (startTime: string, endTime: string) => {
    const start = timeToMinutes(startTime)
    const end = timeToMinutes(endTime)
    
    const startRow = rowMap.get(start) || 2
    const endRow = rowMap.get(end) || startRow + 1
    
    return {
      gridRowStart: startRow,
      gridRowEnd: endRow,
    }
  }

  // Generate time ticks for the grid timeline column
  const timeTicks = sortedMinutes.map((min) => {
    const h = Math.floor(min / 60)
    const m = min % 60
    const hourStr = h.toString().padStart(2, '0')
    const minStr = m.toString().padStart(2, '0')
    const timeStr = `${hourStr}:${minStr}`
    
    return {
      time: timeStr,
      row: rowMap.get(min) || 2,
    }
  })

  const days = [
    { key: 'day-1' as const, label: t.day1Label, date: t.day1Date },
    { key: 'day-2' as const, label: t.day2Label, date: t.day2Date },
  ]

  return (
    <section
      id="schedule"
      className={styles.section}
      style={
        themeColors
          ? {
              backgroundColor: themeColors.containerBg || '#020002',
              color: themeColors.textLight || '#F2F2F2',
            }
          : undefined
      }
    >
      <div className={styles.container}>
        <SectionHeader
          eyebrow={t.eyebrow}
          eyebrowColor={themeColors?.purpleAccent || '#6b51ef'}
          title={
            titleText ? (
              titleText
            ) : t.title.includes('2026') ? (
              <>
                {t.title.split('2026')[0]}
                <span className={styles.titleYear}>2026</span>
                {t.title.split('2026')[1]}
              </>
            ) : (
              t.title
            )
          }
          lead={subtitleText || t.lead}
        />

        {/* Day Selection Tabs and Favorites Toggle */}
        <div className={styles.tabsContainer} role="tablist">
          {!hideDayToggle && (
            <div className={styles.dayTabs}>
              {days.map(({ key, label, date }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeDay === key}
                  onClick={() => {
                    setActiveDay(key)
                  }}
                  className={`${styles.tabButton} ${activeDay === key ? styles.tabButtonActive : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <div className={styles.favContainer}>
            <button
              type="button"
              className={`${styles.tabButtonFav} ${showOnlyFavorites ? styles.tabButtonFavActive : ''}`}
              onClick={() => {
                setShowOnlyFavorites((prev) => {
                  const next = !prev
                  if (next) {
                    setSearchQuery('') // Reset search query when viewing personal agenda
                  }
                  return next
                })
              }}
            >
              <Star className={styles.tabStarIcon} fill="#f59e0b" color="#f59e0b" size={16} aria-hidden />
              <span>{locale === 'es' ? 'Mis Favoritos' : 'My Schedule'}</span>
              {favorites.length > 0 && (
                <span className={styles.favBadge}>{favorites.length}</span>
              )}
            </button>

            {showOnlyFavorites && (
              <span className={styles.favNote}>
                {otherDayFavCount > 0
                  ? locale === 'es'
                    ? `(Tienes ${otherDayFavCount} favoritos el ${activeDay === 'day-1' ? t.day2Date : t.day1Date})`
                    : `(${otherDayFavCount} favorites on ${activeDay === 'day-1' ? t.day2Date : t.day1Date})`
                  : locale === 'es'
                    ? '(Mostrando tus favoritos de este día)'
                    : '(Showing your favorites for this day)'}
              </span>
            )}
          </div>
        </div>

        {/* Filters Bar */}
        <div className={styles.filtersBar}>
          {/* Search Input Filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>
              <Search size={14} className={styles.mapPinIcon} />
              {locale === 'es' ? 'Buscar:' : 'Search:'}
            </span>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder={
                  locale === 'es'
                    ? 'Buscar por eje temático o speaker...'
                    : 'Search by track or speaker...'
                }
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowOnlyFavorites(false)
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.searchClearButton}
                  onClick={() => setSearchQuery('')}
                  aria-label={locale === 'es' ? 'Limpiar búsqueda' : 'Clear search'}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>



          {/* Rooms Multi-Select Chips */}
          <div className={styles.filterGroupRooms}>
            <span className={styles.filterLabel}>
              <MapPin size={14} className={styles.mapPinIcon} />
              {locale === 'es' ? 'Salas Activas:' : 'Active Rooms:'}
            </span>
            <div className={styles.chipsContainer}>
              <button
                type="button"
                className={`${styles.chip} ${selectedRooms.length === PARALLEL_ROOMS.length ? styles.chipActive : ''}`}
                style={{ '--track-color': 'var(--color-purple)' } as React.CSSProperties}
                onClick={handleAllRoomsClick}
              >
                {locale === 'es' ? 'Todas' : 'All'}
              </button>
              {PARALLEL_ROOMS.map((room) => {
                const isRoomActive = selectedRooms.includes(room.id)
                const hasEvents = roomsWithEvents.has(room.id)
                return (
                  <button
                    key={room.id}
                    type="button"
                    disabled={!hasEvents}
                    className={`${styles.chip} ${isRoomActive ? styles.chipActive : ''} ${!hasEvents ? styles.chipDisabled : ''}`}
                    style={{ '--track-color': room.color } as React.CSSProperties}
                    onClick={() => handleRoomChipClick(room.id)}
                  >
                    {locale === 'es' ? room.nameEs : room.nameEn}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Selected Date Indicator */}
        <div className={styles.activeDayHeader}>
          <h3 className={styles.activeDayTitle}>
            {activeDay === 'day-1'
              ? locale === 'es' ? 'Jueves, 27 de Agosto' : 'Thursday, August 27'
              : locale === 'es' ? 'Viernes, 28 de Agosto' : 'Friday, August 28'}
          </h3>
        </div>

        {/* Scrollable Timeline Grid Container */}
        <div className={styles.board}>
          {displayedTalks.length > 0 ? (
            <div
              className={styles.scheduleGrid}
              style={{
                gridTemplateColumns: `80px repeat(${activeRoomsList.length}, minmax(170px, 1fr))`,
                gridTemplateRows: `auto repeat(${totalGridRows}, minmax(8px, auto))`,
                minWidth: `${80 + activeRoomsList.length * 170}px`,
              }}
            >
              {/* Header Column Spacers (Rooms) */}
              <div className={styles.roomHeader} style={{ gridColumn: 1, borderBottom: 'none' }} />
              {activeRoomsList.map((room) => (
                <div
                  key={room.id}
                  className={styles.roomHeader}
                  style={
                    {
                      gridColumn: getRoomColumnIndex(room.id),
                      '--room-color': room.color,
                    } as React.CSSProperties
                  }
                >
                  <span className={styles.roomHeaderName}>
                    {locale === 'es' ? room.nameEs : room.nameEn}
                  </span>
                </div>
              ))}



              {/* Time Column Labels */}
              {timeTicks.map((tick) => (
                <div
                  key={`tick-${tick.time}`}
                  className={styles.gridTimeTick}
                  style={{
                    gridRowStart: tick.row,
                    gridColumn: 1,
                  }}
                >
                  <Clock size={12} className={styles.gridTimeTickIcon} />
                  <span>{tick.time}</span>
                </div>
              ))}

              {/* Collapsed Gaps Indicators */}
              {intervals
                .filter((interval) => interval.isCollapsed)
                .map((interval, idx) => {
                  const startRow = rowMap.get(interval.start) || 2
                  const endRow = rowMap.get(interval.end) || startRow + 1
                  const durationHours = Math.floor(interval.duration / 60)
                  const durationMins = interval.duration % 60
                  
                  const timeText =
                    locale === 'es'
                      ? `${durationHours > 0 ? `${durationHours}h ` : ''}${durationMins}m sin eventos`
                      : `${durationHours > 0 ? `${durationHours}h ` : ''}${durationMins}m with no events`

                  return (
                    <div
                      key={`gap-${idx}`}
                      className={styles.collapsedGapCell}
                      style={{
                        gridRowStart: startRow,
                        gridRowEnd: endRow,
                        gridColumnStart: 2,
                        gridColumnEnd: activeRoomsList.length + 2,
                      }}
                    >
                      <div className={styles.collapsedGapContent}>
                        <span className={styles.collapsedGapText}>{timeText}</span>
                      </div>
                    </div>
                  )
                })}

              {/* Talk Cards and Break Cells */}
              {displayedTalks.map((talk) => {
                const rowSpan = getRowSpan(talk.start, talk.end)

                const isBreakType =
                  !talk.roomId ||
                  talk.trackId === '229' ||
                  talk.title.toLowerCase().includes('almuerzo') ||
                  talk.title.toLowerCase().includes('break') ||
                  talk.title.toLowerCase().includes('receso')

                const isFullWidth =
                  !talk.roomId ||
                  talk.trackId === '229' ||
                  talk.title.toLowerCase().includes('almuerzo')

                const colStart = isFullWidth ? 2 : getRoomColumnIndex(talk.roomId)
                const colEnd = isFullWidth ? activeRoomsList.length + 2 : colStart + 1
                const isFav = isTalkFav(talk)

                if (isBreakType) {
                  return (
                    <div
                      key={talk.id}
                      className={styles.cardCellWrapper}
                      style={{
                        gridRowStart: rowSpan.gridRowStart,
                        gridRowEnd: rowSpan.gridRowEnd,
                        gridColumnStart: colStart,
                        gridColumnEnd: colEnd,
                        zIndex: 2,
                      }}
                    >
                      <div
                        className={styles.sessionCardBreak}
                        onClick={() => talk.abstract && setSelectedTalk(talk)}
                      >
                        <div className={styles.breakTopHeader}>
                          <span className={styles.breakDurationSpan}>
                            {talk.duration}min
                          </span>
                        </div>
                        <div className={styles.breakTitle}>
                          {talk.title}
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <div
                    key={talk.id}
                    className={styles.cardCellWrapper}
                    style={{
                      gridRowStart: rowSpan.gridRowStart,
                      gridRowEnd: rowSpan.gridRowEnd,
                      gridColumnStart: colStart,
                      gridColumnEnd: colEnd,
                      zIndex: 4,
                      '--track-color': talk.trackColor,
                      '--room-color': PARALLEL_ROOMS.find((r) => r.id === talk.roomId)?.color || '#6b51ef',
                    } as React.CSSProperties}
                  >
                    <div
                      className={`${styles.sessionCard} ${selectedTalk?.id === talk.id ? styles.sessionCardActive : ''}`}
                      onClick={() => setSelectedTalk(talk)}
                    >
                      {/* Top Header: Time (Left) & Room Name (Right) */}
                      <div className={styles.cardTopHeader}>
                        <span className={styles.cardDurationSpan}>
                          {talk.duration}min - {talk.start}
                        </span>
                        {talk.roomName && (
                          <span className={styles.cardRoomTag}>
                            <MapPin size={10} className={styles.cardRoomPinIcon} />
                            <span className={styles.cardRoomText}>{talk.roomName}</span>
                          </span>
                        )}
                        <button
                          type="button"
                          className={styles.cardFavButton}
                          onClick={(e) => toggleFavorite(talk.code || talk.id, e)}
                          aria-label="Add to favorites"
                        >
                          <Star
                            className={`${styles.starIcon} ${isFav ? styles.starIconActive : ''}`}
                          />
                        </button>
                      </div>

                      {/* Main Talk Title */}
                      <h4 className={styles.cardTitle}>{talk.title}</h4>

                      {/* Speakers List */}
                      {talk.speakersList.length > 0 && (
                        <div className={styles.cardSpeakers}>
                          {talk.speakersList.map((speaker, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 min-w-0 mr-2">
                              <TalkSpeakerAvatar
                                speaker={speaker}
                                className={styles.speakerAvatar}
                                fallbackClassName={`${styles.speakerAvatar} flex items-center justify-center text-[8px] font-bold text-slate-400`}
                              />
                              <span className={styles.speakerName}>{speaker.name}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bottom Track Tag */}
                      {talk.trackName && (
                        <span
                          className={styles.trackText}
                          style={{ '--track-color': talk.trackColor } as React.CSSProperties}
                        >
                          #{talk.trackName}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              {locale === 'es'
                ? 'No se encontraron sesiones para los filtros seleccionados.'
                : 'No sessions found matching the selected filters.'}
            </div>
          )}
        </div>

        {/* Chronological Timeline Feed (Mobile) */}
        <div className={styles.boardMobile}>
          {displayedTalks.length > 0 ? (
            groupedTalksByTime.map((group) => (
              <div key={group.time} className={styles.mobileTimeGroup}>
                {/* Sticky Time Header (Collapsible) */}
                <div
                  className={styles.mobileTimeHeader}
                  onClick={() => {
                    setExpandedTimeSlots((prev) =>
                      prev.includes(group.time)
                        ? prev.filter((t) => t !== group.time)
                        : [...prev, group.time]
                    )
                  }}
                  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div className="flex items-center gap-1.5 flex-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{group.time}</span>
                    {!expandedTimeSlots.includes(group.time) && (
                      <span className="text-[10px] text-slate-400 font-semibold lowercase ml-1">
                        ({group.talks.length} {group.talks.length === 1 ? (locale === 'es' ? 'evento' : 'event') : (locale === 'es' ? 'eventos' : 'events')})
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200 text-slate-400"
                    style={{
                      transform: expandedTimeSlots.includes(group.time) ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </div>

                {/* Cards List for this time slot */}
                <div
                  className={styles.mobileCardsList}
                  style={{
                    display: expandedTimeSlots.includes(group.time) ? 'flex' : 'none'
                  }}
                >
                  {group.talks.map((talk) => {
                    const isBreak =
                      !talk.roomId ||
                      talk.trackId === '229' ||
                      talk.title.toLowerCase().includes('almuerzo') ||
                      talk.title.toLowerCase().includes('break') ||
                      talk.title.toLowerCase().includes('receso')
                    const isFav = isTalkFav(talk)

                    if (isBreak) {
                      return (
                        <div
                          key={talk.id}
                          className={styles.mobileBreakCard}
                          onClick={() => talk.abstract && setSelectedTalk(talk)}
                        >
                          <span className={styles.mobileBreakTitle}>{talk.title}</span>
                          <span className={styles.mobileBreakDuration}>{talk.duration}min</span>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={talk.id}
                        className={styles.sessionCard}
                        style={{
                          '--track-color': talk.trackColor,
                          '--room-color': PARALLEL_ROOMS.find((r) => r.id === talk.roomId)?.color || '#6b51ef',
                        } as React.CSSProperties}
                        onClick={() => setSelectedTalk(talk)}
                      >
                        {/* Top Header: Time (Left), Room (Right), Favorite */}
                        <div className={styles.cardTopHeader}>
                          <span className={styles.cardDurationSpan}>
                            {talk.duration}min - {talk.start}
                          </span>
                          {talk.roomName && (
                            <span className={styles.cardRoomTag}>
                              <MapPin size={10} className={styles.cardRoomPinIcon} />
                              <span className={styles.cardRoomText}>{talk.roomName}</span>
                            </span>
                          )}
                          <button
                            type="button"
                            className={styles.cardFavButton}
                            onClick={(e) => toggleFavorite(talk.code || talk.id, e)}
                            aria-label="Add to favorites"
                          >
                            <Star
                              className={`${styles.starIcon} ${isFav ? styles.starIconActive : ''}`}
                            />
                          </button>
                        </div>

                        {/* Title */}
                        <h4 className={styles.cardTitle}>{talk.title}</h4>

                        {/* Speakers */}
                        {talk.speakersList.length > 0 && (
                          <div className={styles.cardSpeakers}>
                            {talk.speakersList.map((speaker, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 min-w-0 mr-2">
                                <TalkSpeakerAvatar
                                  speaker={speaker}
                                  className={styles.speakerAvatar}
                                  fallbackClassName={`${styles.speakerAvatar} flex items-center justify-center text-[8px] font-bold text-slate-400`}
                                />
                                <span className={styles.speakerName}>{speaker.name}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Track Hashtag */}
                        {talk.trackName && (
                          <span
                            className={styles.trackText}
                            style={{ '--track-color': talk.trackColor } as React.CSSProperties}
                          >
                            #{talk.trackName}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              {locale === 'es'
                ? 'No se encontraron sesiones para los filtros seleccionados.'
                : 'No sessions found matching the selected filters.'}
            </div>
          )}
        </div>


      </div>

      {/* Slide-over details modal overlay */}
      <AnimatePresence>
        {selectedTalk && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={() => setSelectedTalk(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div className={styles.modalTitleGroup}>
                  {selectedTalk.trackName && (
                    <span
                      className={styles.modalTrackPill}
                      style={{ '--track-color': selectedTalk.trackColor } as React.CSSProperties}
                    >
                      #{selectedTalk.trackName}
                    </span>
                  )}
                  <h3 className={styles.modalTitle}>{selectedTalk.title}</h3>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!(
                    !selectedTalk.roomId ||
                    selectedTalk.trackId === '229' ||
                    selectedTalk.title.toLowerCase().includes('almuerzo') ||
                    selectedTalk.title.toLowerCase().includes('break') ||
                    selectedTalk.title.toLowerCase().includes('receso')
                  ) && (
                    <button
                      type="button"
                      className="p-1.5 border-0 bg-transparent cursor-pointer transition-colors flex items-center justify-center"
                      onClick={(e) => toggleFavorite(selectedTalk.code || selectedTalk.id, e)}
                      aria-label="Add to favorites"
                      style={{ color: isTalkFav(selectedTalk) ? '#f59e0b' : '#94a3b8' }}
                    >
                      <Star
                        className={`${styles.starIcon} ${isTalkFav(selectedTalk) ? styles.starIconActive : ''}`}
                        size={20}
                      />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedTalk(null)}
                    className={styles.modalCloseButton}
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className={styles.modalMetaList}>
                <div className={styles.modalMetaItem}>
                  <Clock className={styles.modalMetaIcon} />
                  <span>
                    {selectedTalk.start} - {selectedTalk.end} ({selectedTalk.duration} min)
                  </span>
                </div>
                {selectedTalk.roomName && (
                  <div className={styles.modalMetaItem}>
                    <MapPin className={styles.modalMetaIcon} />
                    <span>{selectedTalk.roomName}</span>
                  </div>
                )}
                {selectedTalk.code && (
                  <a
                    href={`https://talks.devopsdays.org/devopsdays-lima-2026/talk/${selectedTalk.code}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalMetaLink}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{locale === 'es' ? 'Ver más' : 'See more'}</span>
                  </a>
                )}
              </div>

              {/* Add to Calendar Export Buttons */}
              <div className={styles.calendarActions}>
                <a
                  href={getGoogleCalendarUrl(selectedTalk)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.calendarButton}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Google Calendar</span>
                </a>
                <a
                  href={getIcsDataUri(selectedTalk)}
                  download={`${selectedTalk.code || 'talk'}.ics`}
                  className={styles.calendarButton}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>iCal / Outlook (.ics)</span>
                </a>
              </div>

              {selectedTalk.abstract && (
                <div className={styles.modalAbstract}>
                  {selectedTalk.abstract}
                </div>
              )}

              {selectedTalk.speakersList.length > 0 && (
                <div className={styles.modalSpeakersSection}>
                  <h4 className={styles.modalSpeakersTitle}>
                    {locale === 'es' ? 'Speakers' : 'Speakers'}
                  </h4>
                  <div className={styles.modalSpeakersList}>
                    {selectedTalk.speakersList.map((speaker: any, idx: number) => (
                      <div key={idx} className={styles.modalSpeakerCard}>
                        <TalkSpeakerAvatar
                          speaker={speaker}
                          className={styles.modalSpeakerAvatar}
                          fallbackClassName={`${styles.modalSpeakerAvatar} flex items-center justify-center text-[12px] font-bold text-slate-400`}
                        />
                        <span className={styles.modalSpeakerName}>{speaker.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
