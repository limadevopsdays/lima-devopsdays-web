import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const URL = 'https://talks.devopsdays.org/devopsdays-lima-2026/schedule/widgets/schedule.json'
const DEST = path.resolve(__dirname, '../src/app/data/scheduleData.json')

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

      // Ensure destination directory exists
      fs.mkdirSync(path.dirname(DEST), { recursive: true })

      // Write JSON to file
      fs.writeFileSync(DEST, JSON.stringify(parsed, null, 2), 'utf-8')
      console.log(`Successfully updated schedule data! Saved to: ${DEST}`)
      console.log(`- Talks count: ${parsed.talks?.length || 0}`)
      console.log(`- Rooms count: ${parsed.rooms?.length || 0}`)
      console.log(`- Tracks count: ${parsed.tracks?.length || 0}`)
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
