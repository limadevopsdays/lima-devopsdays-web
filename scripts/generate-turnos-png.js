import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SCHEDULE_DATA_PATH = path.resolve(__dirname, '../src/app/data/scheduleData.json')
const SPEAKERS_DATA_PATH = path.resolve(__dirname, '../src/app/data/scheduleSpeakers.json')
const OUTPUT_DIR = path.resolve(__dirname, '../dist/turnos')
const LOGO_PATH = path.resolve(__dirname, '../public/images/brand/logotipo.png')

function getBase64Image(filePath) {
  if (!fs.existsSync(filePath)) return ''
  const ext = path.extname(filePath).replace('.', '') || 'png'
  const bitmap = fs.readFileSync(filePath)
  return `data:image/${ext};base64,${bitmap.toString('base64')}`
}

const ROOM_MAP = {
  286: { name: 'Terrace', color: '#DCA10D' },
  281: { name: 'Puruchuco - Principal', color: '#D92B2B' },
  282: { name: 'Manchay', color: '#1D64D8' },
  284: { name: 'Paraiso', color: '#E05A1B' },
  283: { name: 'Armatambo', color: '#D93688' },
  285: { name: 'Maranga - Talleres', color: '#2A9D4E' },
}

const TRACK_MAP = {
  200: { name: 'Platform Engineering & DevOps', color: '#2563eb' },
  201: { name: 'Security & Technology Transformation', color: '#f97316' },
  199: { name: 'Modern Leadership & Culture', color: '#14b8a6' },
  202: { name: 'Enterprise AI & Data Strategy', color: '#a78bfa' },
  230: { name: 'Charla Relámpago', color: '#64748b' },
  229: { name: 'General', color: '#8b5cf6' },
}

function toLimaTimeHM(isoStr) {
  if (!isoStr) return ''
  const date = new Date(isoStr)
  return date.toLocaleTimeString('en-US', {
    timeZone: 'America/Lima',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
}

function toLimaDateStr(isoStr) {
  if (!isoStr) return ''
  const date = new Date(isoStr)
  const formatted = date.toLocaleDateString('es-PE', {
    timeZone: 'America/Lima',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

function formatTitle(title) {
  if (!title) return 'Sin título'
  if (typeof title === 'string') return title
  return title.es || title.en || 'Sin título'
}

function generateHtmlCard(talk, speakersMap, logoBase64) {
  const title = formatTitle(talk.title)
  const startTime = toLimaTimeHM(talk.start)
  const endTime = toLimaTimeHM(talk.end)
  const dateStr = toLimaDateStr(talk.start)

  const roomInfo = ROOM_MAP[talk.room] || { name: 'Auditorio', color: '#3b82f6' }
  const trackInfo = (talk.track && TRACK_MAP[talk.track])
    ? TRACK_MAP[talk.track]
    : { name: talk.slot_type === 'break' ? 'Receso' : 'General', color: '#8b5cf6' }

  const talkSpeakers = (talk.speakers || [])
    .map((code) => speakersMap.get(code))
    .filter(Boolean)

  const speakersHtml = talkSpeakers.length > 0
    ? talkSpeakers
        .map((sp) => {
          const avatarUrl = sp.avatar || sp.avatar_thumbnail_default || ''
          const companyInfo = [sp.jobTitle, sp.company].filter(Boolean).join(' • ')
          const locationInfo = sp.location ? `📍 ${sp.location}` : ''

          return `
            <div class="speaker-card">
              ${
                avatarUrl
                  ? `<img class="speaker-avatar" src="${avatarUrl}" alt="${sp.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                     <div class="speaker-avatar-fallback" style="display:none;">${sp.name.charAt(0)}</div>`
                  : `<div class="speaker-avatar-fallback">${sp.name.charAt(0)}</div>`
              }
              <div class="speaker-info">
                <div class="speaker-name">${sp.name}</div>
                ${companyInfo ? `<div class="speaker-role">${companyInfo}</div>` : ''}
                ${locationInfo ? `<div class="speaker-location">${locationInfo}</div>` : ''}
              </div>
            </div>
          `
        })
        .join('')
    : ''

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Poppins:wght@400;500;600;700;800&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1200px;
      height: 630px;
      background-color: #0b0f19;
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.18) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.18) 0%, transparent 40%),
        linear-gradient(to bottom, #070a12, #0d1322);
      font-family: 'Poppins', sans-serif;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 44px 48px;
      position: relative;
      overflow: hidden;
    }

    body::before {
      content: '';
      position: absolute;
      inset: 0;
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      pointer-events: none;
    }

    .top-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, ${trackInfo.color}, ${roomInfo.color}, #a78bfa);
      box-shadow: 0 0 20px ${trackInfo.color};
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .brand img {
      height: 52px;
      object-fit: contain;
    }

    .event-badge {
      font-family: 'Orbitron', sans-serif;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #94a3b8;
      text-transform: uppercase;
    }

    .badges {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .badge {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .badge-room {
      background: rgba(255, 255, 255, 0.07);
      border: 1.5px solid ${roomInfo.color};
      color: #ffffff;
    }

    .badge-room::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${roomInfo.color};
      box-shadow: 0 0 8px ${roomInfo.color};
    }

    .badge-track {
      background: ${trackInfo.color}22;
      border: 1.5px solid ${trackInfo.color};
      color: #ffffff;
    }

    .main-content {
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 8px;
    }

    .time-container {
      display: flex;
      align-items: center;
      gap: 14px;
      color: #38bdf8;
      font-weight: 700;
      font-size: 18px;
    }

    .time-tag {
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 6px 16px;
      border-radius: 8px;
      font-family: 'Orbitron', sans-serif;
    }

    .talk-title {
      font-size: ${title.length > 80 ? '30px' : title.length > 50 ? '36px' : '42px'};
      font-weight: 800;
      line-height: 1.25;
      color: #f8fafc;
      letter-spacing: -0.5px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    .speakers-container {
      z-index: 2;
      display: flex;
      gap: 20px;
      align-items: center;
      flex-wrap: wrap;
      min-height: 70px;
    }

    .speaker-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 10px 22px 10px 12px;
      border-radius: 50px;
      backdrop-filter: blur(10px);
    }

    .speaker-avatar {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid ${trackInfo.color};
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }

    .speaker-avatar-fallback {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${trackInfo.color}, #3b82f6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 22px;
      color: #ffffff;
      border: 2px solid #ffffff;
    }

    .speaker-info {
      display: flex;
      flex-direction: column;
    }

    .speaker-name {
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
    }

    .speaker-role {
      font-size: 13px;
      color: #94a3b8;
      font-weight: 500;
    }

    .speaker-location {
      font-size: 12px;
      color: #cbd5e1;
    }

    .footer {
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 16px;
      font-size: 14px;
      color: #64748b;
    }

    .hashtag {
      font-family: 'Orbitron', sans-serif;
      font-weight: 700;
      color: #a855f7;
    }
  </style>
</head>
<body>
  <div class="top-glow"></div>

  <div class="header">
    <div class="brand">
      ${logoBase64 ? `<img src="${logoBase64}" alt="DevOpsDays Lima 2026" />` : `<div class="event-badge">DEVOPSDAYS LIMA 2026</div>`}
    </div>
    <div class="badges">
      <div class="badge badge-room">${roomInfo.name}</div>
      <div class="badge badge-track">${trackInfo.name}</div>
    </div>
  </div>

  <div class="main-content">
    <div class="time-container">
      <div class="time-tag">⏰ ${startTime} - ${endTime}</div>
      <div>📅 ${dateStr}</div>
    </div>
    <div class="talk-title">${title}</div>
  </div>

  <div class="speakers-container">
    ${speakersHtml}
  </div>

  <div class="footer">
    <div class="hashtag">#DevOpsDaysLima2026</div>
    <div>devopsdays.org/lima</div>
  </div>
</body>
</html>
  `
}

async function main() {
  console.log('🚀 Script de generación de PNG para cada turno iniciado...')

  if (!fs.existsSync(SCHEDULE_DATA_PATH)) {
    throw new Error(`No se encontró el archivo de agenda en: ${SCHEDULE_DATA_PATH}`)
  }

  const rawSchedule = JSON.parse(fs.readFileSync(SCHEDULE_DATA_PATH, 'utf-8'))
  const rawSpeakers = fs.existsSync(SPEAKERS_DATA_PATH)
    ? JSON.parse(fs.readFileSync(SPEAKERS_DATA_PATH, 'utf-8'))
    : []

  const speakersMap = new Map()
  rawSpeakers.forEach((sp) => speakersMap.set(sp.code, sp))
  if (Array.isArray(rawSchedule.speakers)) {
    rawSchedule.speakers.forEach((sp) => {
      if (!speakersMap.has(sp.code)) {
        speakersMap.set(sp.code, sp)
      }
    })
  }

  const logoBase64 = getBase64Image(LOGO_PATH)

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  // Deduplicate identical break slots across multiple rooms if desired, or keep unique talk items
  const rawTalks = Array.isArray(rawSchedule.talks) ? rawSchedule.talks : []
  const seenBreaks = new Set()
  const talks = rawTalks.filter((talk) => {
    if (talk.slot_type === 'break' || formatTitle(talk.title).toLowerCase() === 'receso') {
      const key = `${talk.start}_${talk.end}_${formatTitle(talk.title)}`
      if (seenBreaks.has(key)) return false
      seenBreaks.add(key)
    }
    return true
  })

  console.log(`📋 Se procesarán ${talks.length} turnos (de ${rawTalks.length} total)`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 })

  let count = 0
  for (let i = 0; i < talks.length; i++) {
    const talk = talks[i]
    const code = talk.code || `break-${talk.id || i}`
    const fileName = `turno-${String(i + 1).padStart(2, '0')}-${code}.png`
    const filePath = path.join(OUTPUT_DIR, fileName)

    const htmlContent = generateHtmlCard(talk, speakersMap, logoBase64)
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

    // Wait short time for any font or avatar rendering
    await new Promise((resolve) => setTimeout(resolve, 150))

    await page.screenshot({
      path: filePath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    })

    count++
    const titleStr = formatTitle(talk.title)
    console.log(`  [${count}/${talks.length}] ✅ Generado: ${fileName} ("${titleStr.slice(0, 35)}...")`)
  }

  await browser.close()
  console.log(`\n🎉 ¡Finalizado con éxito! Se generaron ${count} imágenes PNG en: ${OUTPUT_DIR}`)
}

main().catch((err) => {
  console.error('❌ Error ejecutando el script:', err)
  process.exit(1)
})
