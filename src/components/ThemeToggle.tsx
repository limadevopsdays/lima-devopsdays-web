import { useEffect, useState } from 'react'
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
        <svg
          className="themeToggle__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          className="themeToggle__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  )
}
