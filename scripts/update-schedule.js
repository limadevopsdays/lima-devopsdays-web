import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const URL = 'https://talks.devopsdays.org/devopsdays-lima-2026/schedule/widgets/schedule.json'
const DEST = path.resolve(__dirname, '../src/app/data/scheduleData.json')
const SPEAKERS_DEST = path.resolve(__dirname, '../src/app/data/scheduleSpeakers.json')
const EXCLUDED_SPEAKER_NAMES = new Set([
  // Keynotes
  'Marc Hornbeek',
  'Xavier René-Corail',
  'Zohar Einy',
  'Ricardo Martins',
  'Yury Niño',
  'William Matos',
  // Invited speakers
  'Jimmy Florez',
  'Juan Arguello',
  'Andrea Griffiths',
  'Angel Nuñez',
  'Emma Flores',
  'Sebastian Rojas',
  'Francisco Lopez',
  'Francisco Lopez Valenzuela',
  'Ricardo Amarilla',
  'Angelo Leva',
  'Carlos Gallardo',
  'Victor Alvarez',
  'Martin Grados',
  'Andre Delgado Ruiz',
  'Sebastian Veliz',
  'Jefferson Riobueno',
  'Alexandra Zamora',
  'Esmira Bayramova',
].map(normalizeName))

function normalizeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function formatLocalizedField(value, locale) {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    return value[locale] || value.en || value.es || null
  }
  return null
}

function buildScheduleSpeakers(parsed) {
  const speakers = Array.isArray(parsed.speakers) ? parsed.speakers : []
  const talks = Array.isArray(parsed.talks) ? parsed.talks : []
  const tracks = Array.isArray(parsed.tracks) ? parsed.tracks : []

  const trackMap = new Map(
    tracks.map((track) => [
      String(track.id),
      {
        trackName: formatLocalizedField(track.name, 'es'),
        trackNameEn: formatLocalizedField(track.name, 'en'),
        trackColor: track.color || '#6b51ef',
      },
    ])
  )

  const speakerMap = new Map(
    speakers.map((speaker) => [
      speaker.code,
      {
        code: speaker.code,
        name: speaker.name,
        avatar: speaker.avatar ?? null,
      },
    ])
  )

  const derivedSpeakers = []
  const seenCodes = new Set()

  talks.forEach((talk) => {
    const speakerCodes = Array.isArray(talk.speakers) ? talk.speakers : []
    const track = talk.track ? trackMap.get(String(talk.track)) : null

    speakerCodes.forEach((code) => {
      if (seenCodes.has(code)) return

      const speaker = speakerMap.get(code)
      if (!speaker) return
      if (EXCLUDED_SPEAKER_NAMES.has(normalizeName(speaker.name))) return

      derivedSpeakers.push({
        code: speaker.code,
        name: speaker.name,
        avatar: speaker.avatar,
        topic: formatLocalizedField(talk.title, 'es') || formatLocalizedField(talk.title, 'en'),
        trackName: track?.trackName || null,
        trackNameEn: track?.trackNameEn || null,
        trackColor: track?.trackColor || '#6b51ef',
        hasTalk: true,
      })

      seenCodes.add(code)
    })
  })

  return derivedSpeakers
}

console.log('Fetching latest schedule data from Pretalx API...')

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
}

const req = https.get(URL, options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to fetch schedule data: Status code ${res.statusCode}`)
    process.exit(1)
  }

  let body = ''
  res.on('data', (chunk) => {
    body += chunk
  })

  res.on('end', () => {
    try {
      // Validate it's a valid JSON response
      const parsed = JSON.parse(body)
      const scheduleSpeakers = buildScheduleSpeakers(parsed)

      // Ensure destination directory exists
      fs.mkdirSync(path.dirname(DEST), { recursive: true })

      // Write JSON to file
      fs.writeFileSync(DEST, JSON.stringify(parsed, null, 2), 'utf-8')
      fs.writeFileSync(SPEAKERS_DEST, JSON.stringify(scheduleSpeakers, null, 2), 'utf-8')
      console.log(`Successfully updated schedule data! Saved to: ${DEST}`)
      console.log(`Successfully updated schedule speakers! Saved to: ${SPEAKERS_DEST}`)
      console.log(`- Talks count: ${parsed.talks?.length || 0}`)
      console.log(`- Rooms count: ${parsed.rooms?.length || 0}`)
      console.log(`- Tracks count: ${parsed.tracks?.length || 0}`)
      console.log(`- CFP speakers count: ${scheduleSpeakers.length || 0}`)
    } catch (err) {
      console.error('Error parsing or saving schedule data JSON:', err.message)
      process.exit(1)
    }
  })
})

req.on('error', (err) => {
  console.error('Network error fetching schedule data:', err.message)
  process.exit(1)
})
