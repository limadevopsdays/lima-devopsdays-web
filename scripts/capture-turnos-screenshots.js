import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DIST_DIR = path.resolve(__dirname, '../dist')
const OUTPUT_DIR = path.resolve(__dirname, '../dist/screenshots')
const ROOT_SCREENSHOT_PATH = path.resolve(__dirname, '../screenshot_schedule.png')

const PORT = 4173

const ROUTES_TO_CAPTURE = [
  { path: '/schedule-27-am', filename: 'schedule-27-am.png', name: 'Cronograma 27 Mañana' },
  { path: '/schedule-27-pm', filename: 'schedule-27-pm.png', name: 'Cronograma 27 Tarde' },
  { path: '/schedule-28-am', filename: 'schedule-28-am.png', name: 'Cronograma 28 Mañana' },
  { path: '/schedule-28-pm', filename: 'schedule-28-pm.png', name: 'Cronograma 28 Tarde' },
]

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf',
}

function startStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let safePath = path.normalize(req.url.split('?')[0]).replace(/^(\.\.[\/\\])+/, '')
      let filePath = path.join(DIST_DIR, safePath)

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST_DIR, 'index.html')
      }

      const ext = path.extname(filePath).toLowerCase()
      const contentType = MIME_TYPES[ext] || 'application/octet-stream'

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500)
          res.end(`Server Error: ${err.code}`)
        } else {
          res.writeHead(200, { 'Content-Type': contentType })
          res.end(content, 'utf-8')
        }
      })
    })

    server.listen(PORT, () => {
      console.log(`🌐 Servidor estático iniciado en http://localhost:${PORT}`)
      resolve(server)
    })
  })
}

async function main() {
  console.log('📸 Iniciando captura de pantalla Retina (@2x) sin cortes...\n')

  if (!fs.existsSync(DIST_DIR) || !fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    console.log('📦 Construyendo el proyecto (vite build)...')
    await new Promise((resolve, reject) => {
      const child = spawn('npm', ['run', 'build'], { stdio: 'inherit', shell: true })
      child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`Build error: ${code}`))))
    })
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const server = await startStaticServer()

  const args = process.argv.slice(2)
  const scaleArg = args.find((a) => a.startsWith('--scale='))
  const deviceScaleFactor = scaleArg ? parseFloat(scaleArg.split('=')[1]) : 2

  console.log(`🔍 Configuración Retina: Scale Factor = ${deviceScaleFactor}x\n`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()

  // Large viewport so no elements or scrollbars clip
  await page.setViewport({
    width: 1600,
    height: 1400,
    deviceScaleFactor: deviceScaleFactor,
  })

  for (let i = 0; i < ROUTES_TO_CAPTURE.length; i++) {
    const route = ROUTES_TO_CAPTURE[i]
    const targetUrl = `http://localhost:${PORT}${route.path}`
    const outputPath = path.join(OUTPUT_DIR, route.filename)

    console.log(`⏳ Cargando [${i + 1}/${ROUTES_TO_CAPTURE.length}] ${route.name} (${targetUrl})...`)

    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Ensure timeline is fully scrolled to left and overflow is visible
    await page.evaluate(() => {
      const wrapper = document.querySelector('[class*="wrapper"]')
      if (wrapper) wrapper.scrollLeft = 0
    })

    // Measure exact bounding box of the entire timeline list content
    const bounds = await page.evaluate(() => {
      const timePills = Array.from(document.querySelectorAll('[class*="timePill"]'))
      const timeCols = Array.from(document.querySelectorAll('[class*="timeCol"]'))
      const rows = Array.from(document.querySelectorAll('[class*="timelineRow"]'))
      const wrapper = document.querySelector('[class*="wrapper"]')

      if (rows.length === 0) return null

      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity

      // Measure left boundary from timePill and timeCol elements
      timePills.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.left < minX) minX = r.left
      })
      timeCols.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.left < minX) minX = r.left
      })

      // Measure top & bottom boundary from timeline rows
      rows.forEach((row) => {
        const r = row.getBoundingClientRect()
        if (r.height > 0) {
          if (r.top < minY) minY = r.top
          if (r.bottom > maxY) maxY = r.bottom
        }

        // Measure right boundary from all active row children
        const children = Array.from(row.children)
        children.forEach((child) => {
          const cr = child.getBoundingClientRect()
          if (cr.width > 0 && cr.height > 2) {
            if (cr.right > maxX) maxX = cr.right
          }
        })
      })

      if (wrapper) {
        const wr = wrapper.getBoundingClientRect()
        if (wr.left < minX) minX = wr.left
      }

      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      }
    })

    const PADDING_LEFT = 24
    const PADDING_RIGHT = 24
    const PADDING_TOP = 24
    const PADDING_BOTTOM = 24

    if (bounds) {
      const clipX = Math.max(0, Math.floor(bounds.x - PADDING_LEFT))
      const clipY = Math.max(0, Math.floor(bounds.y - PADDING_TOP))
      const clipWidth = Math.ceil(bounds.width + PADDING_LEFT + PADDING_RIGHT)
      const clipHeight = Math.ceil(bounds.height + PADDING_TOP + PADDING_BOTTOM)

      await page.setViewport({
        width: Math.max(1600, clipX + clipWidth + 100),
        height: Math.max(1200, clipY + clipHeight + 100),
        deviceScaleFactor: deviceScaleFactor,
      })

      await page.screenshot({
        path: outputPath,
        clip: {
          x: clipX,
          y: clipY,
          width: clipWidth,
          height: clipHeight,
        },
      })
    } else {
      await page.screenshot({ path: outputPath, fullPage: true })
    }

    console.log(`  ✅ Captura perfecta guardada: ${outputPath}`)

    if (route.path === '/schedule-27-am') {
      fs.copyFileSync(outputPath, ROOT_SCREENSHOT_PATH)
      console.log(`  📌 Copia actualizada en la raíz: ${ROOT_SCREENSHOT_PATH}`)
    }
  }

  await browser.close()
  server.close()

  console.log(`\n🎉 Capturas Retina sin cortes completadas en: ${OUTPUT_DIR}`)
}

main().catch((err) => {
  console.error('❌ Error realizando la captura Retina:', err)
  process.exit(1)
})
