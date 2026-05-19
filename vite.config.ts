import { defineConfig } from 'vite'
import path from 'path'
import { copyFile } from 'fs/promises'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const figmaAssetPlugin = () => ({
  name: 'figma-asset-fallback',
  enforce: 'pre' as const,
  resolveId(id: string) {
    if (id.startsWith('figma:asset/')) {
      return `\0${id}`
    }
    return null
  },
  load(id: string) {
    if (!id.startsWith('\0figma:asset/')) {
      return null
    }

    const assetName = id.replace('\0figma:asset/', '')
    const label = assetName.slice(0, 8).toUpperCase()
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1d4ed8" />
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#bg)" />
        <circle cx="960" cy="180" r="120" fill="#22d3ee" opacity="0.18" />
        <circle cx="180" cy="620" r="160" fill="#f59e0b" opacity="0.18" />
        <text x="80" y="380" fill="#e2e8f0" font-size="54" font-family="Arial, sans-serif" font-weight="700">
          DevOpsDays Lima
        </text>
        <text x="80" y="450" fill="#93c5fd" font-size="32" font-family="Arial, sans-serif">
          Missing Figma asset placeholder
        </text>
        <text x="80" y="510" fill="#cbd5e1" font-size="28" font-family="Arial, sans-serif">
          ${label}
        </text>
      </svg>
    `.trim()
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

    return `export default ${JSON.stringify(dataUrl)}`
  },
})

const spaPagesFallbackPlugin = () => {
  let root = process.cwd()
  let outDir = 'dist'

  return {
    name: 'spa-pages-fallback',
    apply: 'build' as const,
    configResolved(config: { root: string; build: { outDir: string } }) {
      root = config.root
      outDir = config.build.outDir
    },
    async closeBundle() {
      const distDir = path.resolve(root, outDir)
      const indexPath = path.join(distDir, 'index.html')
      const fallbackPath = path.join(distDir, '404.html')

      await copyFile(indexPath, fallbackPath)
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
    spaPagesFallbackPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
