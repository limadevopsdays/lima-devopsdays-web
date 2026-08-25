import React from 'react'
import { MapPin } from 'lucide-react'
import styles from './index.module.css'
import scheduleData from '../../../data/scheduleData.json'
import scheduleSpeakers from '../../../data/scheduleSpeakers.json'

export interface ScheduleItem {
  id: string
  time: string
  title: string
  speakerText?: string | null
  track?: {
    name: string
    color: string
  }
  room?: {
    name: string
    color: string
  }
  isBreak?: boolean
}

interface TalkRaw {
  code: string
  id: number
  title: string | { en: string; es?: string }
  start: string
  end: string
  room: number | null
  track: number | null
  speakers?: string[]
}

interface SpeakerRaw {
  code: string
  name: string
}

interface TrackRaw {
  id: number
  name: { en: string; es: string }
  color: string
}

interface RoomRaw {
  id: number
  name: { en: string; es?: string }
}

// Helper for formatting speaker names
function formatSpeakerNames(
  talkTitle: string,
  isBreak: boolean | undefined,
  speakerCodes: string[] | undefined,
  speakersMap: Map<string, string>
): string | null {
  if (isBreak || !speakerCodes || speakerCodes.length === 0) return null

  const titleLower = talkTitle.toLowerCase()
  if (titleLower.includes('panel') || titleLower.includes('[ panel ]')) {
    return null
  }

  const formatSingleName = (fullName: string): string => {
    if (!fullName) return ''
    const cleanName = fullName.replace(/\s*-\s*\[.*?\]/g, '').trim()
    const parts = cleanName.split(/\s+/)
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

    if (parts.length <= 2) {
      return parts.map(cap).join(' ')
    }
    if (parts.length === 3) {
      return `${cap(parts[0])} ${cap(parts[1])}`
    }
    // For 4+ parts (e.g. Victor Alonso Lliuya Villagaray -> Victor Lliuya)
    return `${cap(parts[0])} ${cap(parts[2])}`
  }

  const getFirstNameOnly = (fullName: string): string => {
    if (!fullName) return ''
    const cleanName = fullName.replace(/\s*-\s*\[.*?\]/g, '').trim()
    const parts = cleanName.split(/\s+/)
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
    return cap(parts[0])
  }

  const rawNames = speakerCodes
    .map((code) => speakersMap.get(code))
    .filter(Boolean) as string[]

  if (rawNames.length === 0) return null

  if (rawNames.length === 1) {
    return formatSingleName(rawNames[0])
  }

  if (rawNames.length === 2) {
    const sp1 = formatSingleName(rawNames[0])
    const sp2 = getFirstNameOnly(rawNames[1])
    return `${sp1}, ${sp2}`
  }

  const sp1 = formatSingleName(rawNames[0])
  const sp2 = getFirstNameOnly(rawNames[1])
  return `${sp1}, ${sp2}`
}

// ─── Timezone Helper (America/Lima) ──────────────────────────────────────────
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

// ─── Color Maps ─────────────────────────────────────────────────────────────
const ROOM_COLORS: Record<string, string> = {
  'Puruchuco - Principal': '#D92B2B',
  Puruchuco: '#D92B2B',
  Terrace: '#DCA10D',
  Manchay: '#1D64D8',
  Paraiso: '#E05A1B',
  Armatambo: '#D93688',
  'Maranga - Talleres': '#2A9D4E',
  Maranga: '#2A9D4E',
  Marango: '#2A9D4E',
}

const TRACK_COLORS: Record<string, string> = {
  '200': '#2563EB',
  'Platform Engineering & DevOps': '#2563EB',
  '201': '#F97316',
  'Security & Technology Transformation': '#F97316',
  '199': '#14B8A6',
  'Modern Leadership & Culture': '#14B8A6',
  '202': '#A78BFA',
  'Enterprise AI & Data Strategy': '#A78BFA',
  '230': '#475569',
  'Charla relámpago': '#475569',
  'charla relámpago': '#475569',
  'Lightning Talk': '#475569',
}

function MapPinFilled({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3.2" fill="#ffffff" />
    </svg>
  )
}

export interface TimelineMockupScheduleProps {
  date?: string
  startTime?: string
  endTime?: string
}

export function TimelineMockupSchedule({
  date = '2026-08-27',
  startTime = '08:00',
  endTime = '13:00',
}: TimelineMockupScheduleProps = {}) {
  const roomsMap = new Map((scheduleData.rooms as RoomRaw[]).map((r) => [r.id, r]))
  const tracksMap = new Map((scheduleData.tracks as TrackRaw[]).map((tr) => [tr.id, tr]))
  const speakersMap = new Map((scheduleSpeakers as SpeakerRaw[]).map((s) => [s.code, s.name]))

  // Filter talks dynamically by date and time range from scheduleData.json
  const talks = (scheduleData.talks as TalkRaw[]).filter((talk) => {
    if (!talk.start || !talk.start.startsWith(date)) return false
    const startHM = toLimaTimeHM(talk.start)
    return startHM >= startTime && startHM <= endTime
  })

  // Sort chronologically
  talks.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  // Process schedule items with break deduplication
  const scheduleItems: ScheduleItem[] = []
  talks.forEach((talk) => {
    const startHM = toLimaTimeHM(talk.start)
    const roomObj = talk.room ? roomsMap.get(talk.room) : null
    const trackObj = talk.track ? tracksMap.get(talk.track) : null

    const titleStr = typeof talk.title === 'object' ? (talk.title.es || talk.title.en) : talk.title
    const roomName = roomObj ? (roomObj.name.es || roomObj.name.en) : ''
    const trackName = trackObj ? (trackObj.name.es || trackObj.name.en) : ''

    const isBreak =
      !talk.room ||
      talk.track === 229 ||
      titleStr.toLowerCase().includes('almuerzo') ||
      titleStr.toLowerCase().includes('receso') ||
      titleStr.toLowerCase().includes('registro') ||
      titleStr.toLowerCase().includes('bienvenida')

    if (isBreak) {
      const isDup = scheduleItems.some(
        (item) => item.time === startHM && item.title.toLowerCase() === titleStr.toLowerCase()
      )
      if (isDup) return
    }

    // Format short room name for display
    let shortRoom = roomName.replace(' - Principal', '').replace(' - Talleres', '')
    if (shortRoom === 'Maranga') shortRoom = 'Marango'

    const speakerFormatted = formatSpeakerNames(titleStr, isBreak, talk.speakers, speakersMap)

    scheduleItems.push({
      id: talk.code || String(talk.id),
      time: startHM,
      title: titleStr,
      speakerText: speakerFormatted,
      track: trackName
        ? {
            name: trackName,
            color: TRACK_COLORS[trackName] || TRACK_COLORS[String(talk.track)] || '#475569',
          }
        : undefined,
      room: shortRoom
        ? {
            name: shortRoom,
            color: ROOM_COLORS[shortRoom] || ROOM_COLORS[roomName] || '#64748b',
          }
        : undefined,
      isBreak,
    })
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.timelineList}>
        {scheduleItems.map((item, index) => {
          const showTimePill = index === 0 || scheduleItems[index - 1].time !== item.time

          return (
            <div key={item.id} className={styles.timelineRow}>
              {/* Columna 1: Hora (Ancho fijo 70px) */}
              <div className={styles.timeCol}>
                {showTimePill ? (
                  <span className={styles.timePill}>{item.time}</span>
                ) : (
                  <div className={styles.timePlaceholder} />
                )}
              </div>

              {/* Columna 2: Card de Título (Ancho fijo 390px) */}
              <div className={item.isBreak ? `${styles.card} ${styles.cardBreak}` : styles.card}>
                <span className={styles.talkTitle}>{item.title}</span>
                {item.speakerText && (
                  <span className={styles.speakerText}>{item.speakerText}</span>
                )}
              </div>

              {/* Columna 3: Eje Temático (Ancho fijo 220px) */}
              <div className={styles.trackCol}>
                {!item.isBreak && item.track ? (
                  <span
                    className={styles.trackBadge}
                    style={{ backgroundColor: item.track.color }}
                  >
                    {item.track.name}
                  </span>
                ) : (
                  <div className={styles.trackPlaceholder} />
                )}
              </div>

              {/* Columna 4: Sala (Ancho fijo 120px) */}
              <div className={styles.roomCol}>
                {!item.isBreak && item.room ? (
                  <span
                    className={styles.roomTag}
                    style={{ color: item.room.color }}
                  >
                    <MapPinFilled color={item.room.color} size={15} />
                    {item.room.name}
                  </span>
                ) : (
                  <div className={styles.roomPlaceholder} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
