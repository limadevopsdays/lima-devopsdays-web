import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SCHEDULE_URL = 'https://talks.devopsdays.org/devopsdays-lima-2026/schedule/widgets/schedule.json'
const SPEAKER_PAGE_BASE = 'https://talks.devopsdays.org/devopsdays-lima-2026/speaker/'
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

/** Simple GET returning raw body string */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    }
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        return
      }
      let body = ''
      res.on('data', (chunk) => { body += chunk })
      res.on('end', () => resolve(body))
    }).on('error', reject)
  })
}

/**
 * Scrapes a speaker's HTML page and extracts:
 *   biography, company, jobTitle, location, linkedin
 */
function parseSpeakerPage(html) {
  const result = {
    biography: null,
    company: null,
    jobTitle: null,
    location: null,
    linkedin: null,
  }

  // Biography — content inside .speaker-bio
  const bioMatch = html.match(/<div class=speaker-bio>([\s\S]*?)<\/div>/)
  if (bioMatch) {
    result.biography = bioMatch[1]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<p>/gi, '')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  // Inline answers — Company, Job Title, Location
  const answerBlocks = [...html.matchAll(/<div class=inline-answer>([\s\S]*?)<\/div>/g)]
  for (const block of answerBlocks) {
    const inner = block[1]
    const questionMatch = inner.match(/<span class=question>(.*?)<\/span>/)
    const answerMatch = inner.match(/<span class=answer>\s*<p>([\s\S]*?)<\/p>/)
    if (!questionMatch || !answerMatch) continue
    const question = questionMatch[1].replace(/:$/, '').trim().toLowerCase()
    const answer = answerMatch[1].replace(/<[^>]+>/g, '').trim()
    if (question === 'company') result.company = answer
    else if (question === 'job title') result.jobTitle = answer
    else if (question === 'location') {
      result.location = /lima/i.test(answer) || /^peru$/i.test(answer.trim()) ? 'Perú' : answer
    }
  }

  // LinkedIn — redirect URL containing linkedin.com
  const linkedinMatch = html.match(/href="\/redirect\/\?url=([^"]*linkedin\.com[^"]*)"/)
  if (linkedinMatch) {
    try {
      result.linkedin = decodeURIComponent(linkedinMatch[1]).split(':u')[0]
    } catch {
      result.linkedin = null
    }
  }

  return result
}

/** Fetch & parse a single speaker page, returns enriched fields or nulls on error */
async function fetchSpeakerDetails(code) {
  const url = `${SPEAKER_PAGE_BASE}${code}/`
  try {
    const html = await fetchUrl(url)
    return parseSpeakerPage(html)
  } catch (err) {
    console.warn(`  ⚠ Could not fetch speaker ${code}: ${err.message}`)
    return { biography: null, company: null, jobTitle: null, location: null, linkedin: null }
  }
}

// ─── Build speaker list from schedule JSON ───────────────────────────────────

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
        avatar_thumbnail_default: speaker.avatar_thumbnail_default ?? null,
        avatar_thumbnail_tiny: speaker.avatar_thumbnail_tiny ?? null,
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
        avatar_thumbnail_default: speaker.avatar_thumbnail_default ?? null,
        avatar_thumbnail_tiny: speaker.avatar_thumbnail_tiny ?? null,
        topic: formatLocalizedField(talk.title, 'es') || formatLocalizedField(talk.title, 'en'),
        trackName: track?.trackName || null,
        trackNameEn: track?.trackNameEn || null,
        trackColor: track?.trackColor || '#6b51ef',
        hasTalk: true,
        // Enriched fields — will be filled in next step
        biography: null,
        company: null,
        jobTitle: null,
        location: null,
        linkedin: null,
      })

      seenCodes.add(code)
    })
  })

  return derivedSpeakers
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Fetching latest schedule data from Pretalx API...')

  // 1. Fetch the main schedule JSON
  const body = await fetchUrl(SCHEDULE_URL)
  const parsed = JSON.parse(body)
  const scheduleSpeakers = buildScheduleSpeakers(parsed)

  // 2. Enrich each speaker with data from their individual page (parallel, max 5 at a time)
  console.log(`Fetching details for ${scheduleSpeakers.length} speakers...`)
  const CONCURRENCY = 5
  for (let i = 0; i < scheduleSpeakers.length; i += CONCURRENCY) {
    const batch = scheduleSpeakers.slice(i, i + CONCURRENCY)
    const results = await Promise.all(batch.map((sp) => fetchSpeakerDetails(sp.code)))
    results.forEach((details, idx) => {
      Object.assign(batch[idx], details)
    })
    process.stdout.write(`  ${Math.min(i + CONCURRENCY, scheduleSpeakers.length)}/${scheduleSpeakers.length} done\r`)
  }
  console.log('')

  // 3. Save files
  fs.mkdirSync(path.dirname(DEST), { recursive: true })
  fs.writeFileSync(DEST, JSON.stringify(parsed, null, 2), 'utf-8')
  fs.writeFileSync(SPEAKERS_DEST, JSON.stringify(scheduleSpeakers, null, 2), 'utf-8')

  console.log(`Successfully updated schedule data! Saved to: ${DEST}`)
  console.log(`Successfully updated schedule speakers! Saved to: ${SPEAKERS_DEST}`)
  console.log(`- Talks count: ${parsed.talks?.length || 0}`)
  console.log(`- Rooms count: ${parsed.rooms?.length || 0}`)
  console.log(`- Tracks count: ${parsed.tracks?.length || 0}`)
  console.log(`- CFP speakers count: ${scheduleSpeakers.length}`)
}

main().catch((err) => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
