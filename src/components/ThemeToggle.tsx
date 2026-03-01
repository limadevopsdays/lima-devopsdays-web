import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useI18n } from '../i18n/useI18n'

type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'theme'

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    if (value === 'dark' || value === 'light') return value
    return null
  } catch {
    return null
  }
}

function getDocumentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // ignore
  }
}

export function ThemeToggle() {
  const { t } = useI18n()
  const [theme, setTheme] = useState<Theme>(() => getDocumentTheme())

  useEffect(() => {
    const mql = window.matchMedia?.('(prefers-color-scheme: light)')
    if (!mql) return

    const onChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) return
      const next = event.matches ? 'light' : 'dark'
      document.documentElement.dataset.theme = next
      setTheme(next)
    }

    mql.addEventListener?.('change', onChange)
    return () => {
      mql.removeEventListener?.('change', onChange)
    }
  }, [])

  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
  const label = t('theme.switchTo', { mode: nextTheme === 'light' ? t('theme.mode.light') : t('theme.mode.dark') })

  return (
    <button
      type="button"
      className="themeToggle"
      aria-label={label}
      title={label}
      aria-pressed={theme === 'light'}
      onClick={() => {
        applyTheme(nextTheme)
        setTheme(nextTheme)
      }}
    >
      {nextTheme === 'light' ? (
        <FiSun className="themeToggle__icon" aria-hidden="true" />
      ) : (
        <FiMoon className="themeToggle__icon" aria-hidden="true" />
      )}
    </button>
  )
}
