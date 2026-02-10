import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext, type Params, type I18nContextValue } from './I18nContext'
import { translations, type Locale, type TranslationKey } from './translations'

const LOCALE_STORAGE_KEY = 'locale'

function guessLocale(): Locale {
  const stored = (() => {
    try {
      const value = localStorage.getItem(LOCALE_STORAGE_KEY)
      return value === 'en' || value === 'es' ? value : null
    } catch {
      return null
    }
  })()

  if (stored) return stored
  if (navigator.language.toLowerCase().startsWith('es')) return 'es'
  return 'en'
}

function format(template: string, params?: Params) {
  if (!params) return template
  return template.replaceAll(/\{(\w+)\}/g, (match, key: string) => {
    const value = params[key]
    return value === undefined ? match : String(value)
  })
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => guessLocale())

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      // ignore
    }
  }, [locale])

  const t = useCallback(
    (key: TranslationKey, params?: Params) => {
      const template = translations[locale][key] ?? translations.en[key]
      return format(template, params)
    },
    [locale],
  )

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t }), [locale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

