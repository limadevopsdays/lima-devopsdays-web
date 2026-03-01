import { FiGlobe } from 'react-icons/fi'
import { useI18n } from '../i18n/useI18n'
import type { Locale } from '../i18n/translations'

function getNextLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en'
}

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n()
  const next = getNextLocale(locale)
  const currentLabel = locale === 'en' ? t('language.en') : t('language.es')
  const nextLabel = next === 'en' ? t('language.en') : t('language.es')
  const label = `${t('header.switchLanguage')}: ${currentLabel} → ${nextLabel}`

  return (
    <button
      type="button"
      className="themeToggle"
      aria-label={label}
      title={label}
      onClick={() => setLocale(next)}
    >
      <FiGlobe className="themeToggle__icon" aria-hidden="true" />
    </button>
  )
}
