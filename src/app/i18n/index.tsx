import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Locale = 'es' | 'en'

const STORAGE_KEY = 'locale'
const FALLBACK: Locale = 'es'

function detectLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : FALLBACK
}

const LocaleContext = createContext<Locale>(FALLBACK)
const SetLocaleContext = createContext<(locale: Locale) => void>(() => {})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  return (
    <LocaleContext.Provider value={locale}>
      <SetLocaleContext.Provider value={setLocaleState}>
        {children}
      </SetLocaleContext.Provider>
    </LocaleContext.Provider>
  )
}

export function useLocale(): Locale {
  return useContext(LocaleContext)
}

export function useSetLocale(): (locale: Locale) => void {
  return useContext(SetLocaleContext)
}

/** Hook que recibe un objeto de traducciones { es, en } y devuelve el del locale activo. */
export function useI18n<T>(dict: Record<Locale, T>): T {
  return dict[useLocale()]
}
