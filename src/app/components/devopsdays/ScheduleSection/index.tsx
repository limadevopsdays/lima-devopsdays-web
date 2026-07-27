import React, { useState } from 'react'
import { Clock, MapPin, Calendar, Filter, Star, X, ExternalLink, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionHeader } from '../SectionHeader'
import { useI18n, useLocale } from '../../../i18n'
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
}

// ─── Parallel columns for rooms on Desktop ────────────────────────────────────
// Sourced from Pretalx IDs in exact visual order shown in screenshot:
const PARALLEL_ROOMS = [
  { id: 286, nameEs: 'Terrace', nameEn: 'Terrace', color: '#cbd5e1' },
  { id: 281, nameEs: 'Sala Principal', nameEn: 'Main Room', color: '#6b51ef' },
  { id: 282, nameEs: 'Sala A', nameEn: 'Room A', color: '#93e279' },
  { id: 284, nameEs: 'Sala C', nameEn: 'Room C', color: '#fb923c' },
  { id: 283, nameEs: 'Sala B', nameEn: 'Room B', color: '#1ebdd1' },
  { id: 285, nameEs: 'Talleres', nameEn: 'Workshops', color: '#10b981' },
]

const TRACK_COLOR_MAP: Record<string, string> = {
  'Platform Engineering & DevOps': '#2563eb',
  'Security & Technology Transformation': '#f97316',
  'Modern Leadership & Culture': '#14b8a6',
  'Enterprise AI & Data Strategy': '#a78bfa',
}

function resolveTrackColor(trackName: string, fallback: string) {
  return TRACK_COLOR_MAP[trackName] || fallback
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

export function ScheduleSection() {
  const t = useI18n(scheduleI18n)
  const locale = useLocale() as 'es' | 'en'

  const [activeDay, setActiveDay] = useState<'day-1' | 'day-2'>('day-1')
  const [selectedTrack, setSelectedTrack] = useState<string>('all')
  const [selectedRooms, setSelectedRooms] = useState<number[]>(() => PARALLEL_ROOMS.map((r) => r.id))
  const [selectedTalk, setSelectedTalk] = useState<any | null>(null)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false)
  const [expandedTimeSlots, setExpandedTimeSlots] = useState<string[]>([])

  // ─── Favorites state (stored in localStorage) ────────────────────────────────
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('schedule-favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      try {
        localStorage.setItem('schedule-favorites', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  // Auto-expand hour blocks containing starred sessions when viewing favorites, reset on other filters
  React.useEffect(() => {
    if (showOnlyFavorites) {
      const favHourBlocks = new Set<string>()
      formattedTalks.forEach((talk) => {
        if (favorites.includes(talk.id) && talk.start) {
          const hourStr = talk.start.split(':')[0] + ':00'
          favHourBlocks.add(hourStr)
        }
      })
      setExpandedTimeSlots(Array.from(favHourBlocks))
    } else {
      setExpandedTimeSlots([])
    }
  }, [activeDay, selectedTrack, showOnlyFavorites, favorites])

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
      const allIds = PARALLEL_ROOMS.map((r) => r.id)
      
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
    setSelectedRooms(PARALLEL_ROOMS.map((r) => r.id))
  }

  // ─── Extract Pretalx mappings ───────────────────────────────────────────────
  const roomsMap = new Map((scheduleData.rooms as RoomRaw[]).map((r) => [r.id, r]))
  const tracksMap = new Map((scheduleData.tracks as TrackRaw[]).map((tr) => [tr.id, tr]))
  const speakersMap = new Map((scheduleData.speakers as SpeakerRaw[]).map((s) => [s.code, s]))

  // ─── Gather unique tracks for filter dropdown ───────────────────────────────
  const tracksList = (scheduleData.tracks as TrackRaw[]).map((tr) => ({
    id: tr.id.toString(),
    name: formatTrackLabel(locale === 'es' ? tr.name.es : tr.name.en),
    color: resolveTrackColor(tr.name.en, tr.color),
  }))

  // ─── Filter talks for the selected active day ───────────────────────────────
  const activeDateStr = activeDay === 'day-1' ? '2026-08-27' : '2026-08-28'
  const rawTalksForDay = (scheduleData.talks as TalkRaw[]).filter(
    (talk) => talk.start && talk.start.startsWith(activeDateStr)
  )

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
    if (trackColor === '#000000' || trackColor === '#000') {
      trackColor = '#64748b' // default slate
    }
    if (trackObj?.name?.en) {
      trackColor = resolveTrackColor(trackObj.name.en, trackColor)
    }

    const speakersList = (talk.speakers || []).map((code) => {
      const sp = speakersMap.get(code)
      return {
        name: sp ? sp.name : code,
        avatar: sp ? sp.avatar : null,
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

  // ─── Filter based on Track and Room selection ──────────────────────────────
  const filteredTalks = formattedTalks.filter((talk) => {
    if (showOnlyFavorites) {
      return favorites.includes(talk.id)
    }

    const matchesTrack = selectedTrack === 'all' || talk.trackId === selectedTrack

    const isFullWidthEvent =
      !talk.roomId ||
      talk.trackId === '229' ||
      talk.title.toLowerCase().includes('almuerzo')

    const matchesRoom = isFullWidthEvent || (talk.roomId && selectedRooms.includes(talk.roomId))

    return matchesTrack && matchesRoom
  })

  // Find rooms that actually contain at least one track-matching event for the active day
  const roomsWithEvents = new Set<number>()
  formattedTalks.forEach((talk) => {
    const matchesTrack = selectedTrack === 'all' || talk.trackId === selectedTrack
    const isBreak =
      !talk.roomId ||
      talk.trackId === '229' ||
      talk.title.toLowerCase().includes('almuerzo') ||
      talk.title.toLowerCase().includes('break') ||
      talk.title.toLowerCase().includes('receso')
      
    if (matchesTrack && talk.roomId && !isBreak) {
      roomsWithEvents.add(talk.roomId)
    }
  })

  // Filtered rooms currently displayed in columns (exclude rooms that contain no talks for this track)
  const activeRoomsList = PARALLEL_ROOMS.filter((room) => {
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
    const defaultStart = timeToMinutes('08:00')
    const defaultEnd = timeToMinutes('18:30')

    if (selectedTrack === 'all') {
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
    <section id="schedule" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          eyebrow={t.eyebrow}
          eyebrowColor="#6b51ef"
          title={t.title}
          lead={t.lead}
        />

        {/* Day Selection Tabs and Favorites Toggle */}
        <div className={styles.tabsContainer} role="tablist">
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
                {locale === 'es' ? `${label}, ${date}` : `${label}, ${date}`}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.tabButtonFav} ${showOnlyFavorites ? styles.tabButtonFavActive : ''}`}
            onClick={() => {
              setShowOnlyFavorites((prev) => {
                const next = !prev
                if (next) {
                  setSelectedTrack('all') // Reset track filters when viewing personal agenda
                }
                return next
              })
            }}
          >
            <Star
              className={`${styles.starIcon} ${showOnlyFavorites ? styles.starIconActive : ''}`}
              size={14}
            />
            <span>{locale === 'es' ? 'Mis Favoritos' : 'My Schedule'}</span>
            {favorites.length > 0 && (
              <span className={styles.favBadge}>{favorites.length}</span>
            )}
          </button>
        </div>

        {/* Filters Bar */}
        <div className={styles.filtersBar}>
          {/* Track Filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>
              <Filter size={14} />
              {locale === 'es' ? 'Filtrar Eje:' : 'Filter Track:'}
            </span>
            <select
              className={styles.filterSelect}
              value={selectedTrack}
              onChange={(e) => {
                setSelectedTrack(e.target.value)
                setShowOnlyFavorites(false) // Deactivate favorites when exploring specific tracks
              }}
            >
              <option value="all">{locale === 'es' ? 'Todos los ejes' : 'All Tracks'}</option>
              {tracksList
                .filter((tr) => tr.id !== '229') // Hide general events track
                .map((track) => (
                  <option key={track.id} value={track.id}>
                    {track.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Rooms Multi-Select Chips */}
          <div className={styles.filterGroupRooms}>
            <span className={styles.filterLabel}>
              <MapPin size={14} />
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
                    {!isRoomActive && (
                      <span
                        className={styles.legendDot}
                        style={{ '--track-color': room.color } as React.CSSProperties}
                      />
                    )}
                    {locale === 'es' ? room.nameEs : room.nameEn}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scrollable Timeline Grid Container */}
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
                  style={{ gridColumn: getRoomColumnIndex(room.id) }}
                >
                  <span className={styles.roomHeaderName}>
                    {locale === 'es' ? room.nameEs : room.nameEn}
                  </span>
                </div>
              ))}

              {/* Time Grid Horizontal Lines */}
              {timeTicks.map((tick) => (
                <div
                  key={`line-${tick.time}`}
                  className={styles.gridRowLine}
                  style={{
                    gridRowStart: tick.row,
                    gridColumn: `1 / ${activeRoomsList.length + 2}`,
                  }}
                />
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
                  {tick.time}
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
                const isFav = favorites.includes(talk.id)

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
                        <div className={styles.breakContent}>
                          <span>{talk.title}</span>
                          <span className={styles.breakDuration}>({talk.duration} min)</span>
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
                    } as React.CSSProperties}
                  >
                    <div
                      className={`${styles.sessionCard} ${selectedTalk?.id === talk.id ? styles.sessionCardActive : ''}`}
                      onClick={() => setSelectedTalk(talk)}
                    >
                      {/* Colored Time block on the Left */}
                      <div className={styles.cardLeftBlock}>
                        <span className={styles.cardLeftTime}>{talk.start}</span>
                        <span className={styles.cardLeftDuration}>{talk.duration}m</span>
                      </div>

                      {/* Right side details block */}
                      <div className={styles.cardRightBlock}>
                        <div className={styles.cardHeaderRow}>
                          <h4 className={styles.cardTitle}>{talk.title}</h4>
                          <button
                            type="button"
                            className="p-0 border-0 bg-transparent cursor-pointer flex-shrink-0"
                            onClick={(e) => toggleFavorite(talk.id, e)}
                            aria-label="Add to favorites"
                          >
                            <Star
                              className={`${styles.starIcon} ${isFav ? styles.starIconActive : ''}`}
                            />
                          </button>
                        </div>

                        {talk.speakersList.length > 0 && (
                          <div className={styles.cardSpeakers}>
                            {talk.speakersList.map((speaker, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 min-w-0 mr-2">
                                {speaker.avatar ? (
                                  <img
                                    src={speaker.avatar}
                                    alt={speaker.name}
                                    className={styles.speakerAvatar}
                                  />
                                ) : (
                                  <div className={`${styles.speakerAvatar} flex items-center justify-center text-[8px] font-bold text-slate-400`}>
                                    {speaker.name.charAt(0)}
                                  </div>
                                )}
                                <span className={styles.speakerName}>{speaker.name}</span>
                              </div>
                            ))}
                          </div>
                        )}

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
                    const isFav = favorites.includes(talk.id)

                    if (isBreak) {
                      return (
                        <div
                          key={talk.id}
                          className={styles.mobileBreakCard}
                          onClick={() => talk.abstract && setSelectedTalk(talk)}
                        >
                          <span className={styles.mobileBreakTitle}>{talk.title}</span>
                          <span className={styles.mobileBreakDuration}>({talk.duration} min)</span>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={talk.id}
                        className={styles.mobileTalkCard}
                        style={{ '--track-color': talk.trackColor } as React.CSSProperties}
                        onClick={() => setSelectedTalk(talk)}
                      >
                        <div className={styles.mobileCardHeader}>
                          {/* Room and Track Badges */}
                          <div className={styles.mobileCardBadges}>
                            {talk.roomName && (
                              <span
                                className={styles.mobileRoomBadge}
                                style={{ '--room-color': PARALLEL_ROOMS.find(r => r.id === talk.roomId)?.color || '#cbd5e1' } as React.CSSProperties}
                              >
                                {talk.roomName}
                              </span>
                            )}
                            {talk.trackName && (
                              <span
                                className={styles.mobileTrackBadge}
                                style={{ '--track-color': talk.trackColor } as React.CSSProperties}
                              >
                                #{talk.trackName}
                              </span>
                            )}
                          </div>

                          {/* Favorite Button */}
                          <button
                            type="button"
                            className={styles.mobileFavBtn}
                            onClick={(e) => toggleFavorite(talk.id, e)}
                            aria-label="Add to favorites"
                          >
                            <Star
                              className={`${styles.starIcon} ${isFav ? styles.starIconActive : ''}`}
                              size={16}
                            />
                          </button>
                        </div>

                        <h4 className={styles.mobileTalkTitle}>{talk.title}</h4>

                        {talk.speakersList.length > 0 && (
                          <div className={styles.mobileSpeakersList}>
                            {talk.speakersList.map((speaker, idx) => (
                              <div key={idx} className={styles.mobileSpeaker}>
                                {speaker.avatar ? (
                                  <img
                                    src={speaker.avatar}
                                    alt={speaker.name}
                                    className={styles.mobileSpeakerAvatar}
                                  />
                                ) : (
                                  <div className={styles.mobileSpeakerAvatarPlaceholder}>
                                    {speaker.name.charAt(0)}
                                  </div>
                                )}
                                <span className={styles.mobileSpeakerName}>{speaker.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className={styles.mobileCardFooter}>
                          <span className={styles.mobileDurationText}>
                            <Clock size={12} />
                            {talk.duration} min ({talk.start} - {talk.end})
                          </span>
                        </div>
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

        {/* Tracks Color Legend */}
        <div className={styles.legend}>
          {tracksList
            .filter((tr) => tr.id !== '229')
            .map((track) => (
              <div key={track.id} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{ '--track-color': track.color } as React.CSSProperties}
                />
                {track.name}
              </div>
            ))}
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
                      onClick={(e) => toggleFavorite(selectedTalk.id, e)}
                      aria-label="Add to favorites"
                      style={{ color: favorites.includes(selectedTalk.id) ? '#f59e0b' : '#94a3b8' }}
                    >
                      <Star
                        className={`${styles.starIcon} ${favorites.includes(selectedTalk.id) ? styles.starIconActive : ''}`}
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
                        {speaker.avatar ? (
                          <img
                            src={speaker.avatar}
                            alt={speaker.name}
                            className={styles.modalSpeakerAvatar}
                          />
                        ) : (
                          <div className={`${styles.modalSpeakerAvatar} flex items-center justify-center text-[12px] font-bold text-slate-400`}>
                            {speaker.name.charAt(0)}
                          </div>
                        )}
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
