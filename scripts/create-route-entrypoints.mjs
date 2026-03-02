import fs from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve(process.cwd(), 'dist')
const indexPath = path.join(distDir, 'index.html')

const routes = ['sponsors', 'speakers']

async function fileExists(filePath) {
  try {
    await fs.stat(filePath)
    return true
  } catch {
    return false
  }
}

async function main() {
  if (!(await fileExists(indexPath))) {
    throw new Error(`Missing ${indexPath}. Run 'vite build' first.`)
  }

  const indexHtml = await fs.readFile(indexPath, 'utf8')

  await Promise.all(
    routes.map(async (route) => {
      const routeDir = path.join(distDir, route)
      await fs.mkdir(routeDir, { recursive: true })
      await fs.writeFile(path.join(routeDir, 'index.html'), indexHtml, 'utf8')
    }),
  )
}

await main()
