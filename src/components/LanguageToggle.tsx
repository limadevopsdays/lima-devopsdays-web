import { useI18n } from '../i18n/useI18n'
import type { Locale } from '../i18n/translations'

function getNextLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en'
}

const TOGGLE_CLASS =
  'w-[42px] h-[42px] rounded-full bg-site-surface border border-site-border-strong cursor-pointer inline-flex items-center justify-center text-site-icon transition-[transform,background,border-color,color,box-shadow] duration-[120ms] ease hover:text-site-text hover:border-site-border-stronger hover:shadow-[0_0_0_1px_rgba(var(--site-accent-2-rgb),0.18)] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-focus)]'

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n()
  const next = getNextLocale(locale)
  const currentLabel = locale === 'en' ? t('language.en') : t('language.es')
  const nextLabel = next === 'en' ? t('language.en') : t('language.es')
  const label = `${t('header.switchLanguage')}: ${currentLabel} → ${nextLabel}`

  return (
    <button
      type="button"
      className={TOGGLE_CLASS}
      aria-label={label}
      title={label}
      onClick={() => setLocale(next)}
    >
      <svg className="block" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 1 0 10 10A10.012 10.012 0 0 0 12 2Zm7.93 9h-3.01a15.92 15.92 0 0 0-1.35-6.02A8.02 8.02 0 0 1 19.93 11ZM12 4c1.08 0 2.68 2.45 3.35 7H8.65C9.32 6.45 10.92 4 12 4Zm-3.57.98A15.92 15.92 0 0 0 7.08 11H4.07a8.02 8.02 0 0 1 4.36-6.02ZM4.07 13h3.01a15.92 15.92 0 0 0 1.35 6.02A8.02 8.02 0 0 1 4.07 13ZM12 20c-1.08 0-2.68-2.45-3.35-7h6.7c-.67 4.55-2.27 7-3.35 7Zm3.57-.98A15.92 15.92 0 0 0 16.92 13h3.01a8.02 8.02 0 0 1-4.36 6.02Z"
        />
      </svg>
    </button>
  )
}
