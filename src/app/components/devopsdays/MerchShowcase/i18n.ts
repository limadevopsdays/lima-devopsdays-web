import type { Locale } from '../../../i18n'

type MerchShowcaseI18n = {
  eyebrow: string
  title: string
  description: string
  ctaText: string
  closeLabel: string
  prevLabel: string
  nextLabel: string
  viewLabel: string
  storeLabel: string
}

export const merchShowcaseI18n: Record<Locale, MerchShowcaseI18n> = {
  es: {
    eyebrow: '/ EDICIÓN LIMITADA 2026 /',
    title: 'Toda la Colección',
    description: 'Haz clic en cualquier producto para verlo en la tienda.',
    ctaText: 'Ir a la tienda oficial',
    closeLabel: 'Cerrar',
    prevLabel: 'Anterior',
    nextLabel: 'Siguiente',
    viewLabel: 'Ver en tienda →',
    storeLabel: 'Ver en tienda',
  },
  en: {
    eyebrow: '/ LIMITED EDITION 2026 /',
    title: 'Full Collection',
    description: 'Click any product to view it in the store.',
    ctaText: 'Go to official store',
    closeLabel: 'Close',
    prevLabel: 'Previous',
    nextLabel: 'Next',
    viewLabel: 'View in store →',
    storeLabel: 'View in store',
  },
}
