// shop page i18n — ES / EN
import type { Locale } from '../../i18n'

type TicketPrice = {
  name: string
  description: string
  price: string
  originalPrice: string
  discount: string
  variant: 'general' | 'vip'
}

type ShopI18n = {
  heroBadge: string
  heroTitleMain: string
  heroTitleHighlight: string
  heroDesc: string
  metaFechaLabel: string
  metaFechaValue: string
  metaLugarLabel: string
  metaLugarValue: string
  heroTicketsCta: string
  heroPrevLabel: string
  heroNextLabel: string
  countdownLabel: string
  countdownDays: string
  countdownHours: string
  countdownMinutes: string
  countdownSeconds: string
  ticketComingSoon: string
  prices: TicketPrice[]
  shopEyebrow: string
  shopBadge: string
  shopTitle: string
  shopDesc: string
  shopCta: string
  shopPrevLabel: string
  shopNextLabel: string
}

export const shopI18n: Record<Locale, ShopI18n> = {
  es: {
    heroBadge: 'LIMA · 2026',
    heroTitleMain: 'Donde DevOps se encuentra con la',
    heroTitleHighlight: 'comunidad',
    heroDesc:
      'El punto de encuentro para Ingenieros de Software, Arquitectos, Líderes Técnicos, Ingenieros DevOps, Ingenieros de seguridad, CTOs y CIOs. Conecta con la comunidad, aprende de casos reales y acelera decisiones que impactan negocio y plataforma.',
    metaFechaLabel: 'Fecha',
    metaFechaValue: '27 – 28 Ago 2026',
    metaLugarLabel: 'Lugar',
    metaLugarValue: 'LCC – Lima',
    heroTicketsCta: 'Comprar entrada →',
    countdownLabel: 'FALTAN',
    countdownDays: 'DÍAS',
    countdownHours: 'HRS',
    countdownMinutes: 'MIN',
    countdownSeconds: 'SEG',
    ticketComingSoon: 'PRÓXIMAMENTE',
    prices: [
      {
        name: 'Acceso General',
        description: 'La puerta de entrada al evento más grande de DevOps en el Perú.',
        price: '$69.90',
        originalPrice: '$99.90',
        discount: '-30%',
        variant: 'general',
      },
      {
        name: 'Acceso VIP',
        description: 'Experiencia premium con beneficios exclusivos en cada momento.',
        price: '$119.90',
        originalPrice: '$149.90',
        discount: '-20%',
        variant: 'vip',
      },
    ],
    shopEyebrow: '/ 100% OFICIAL /',
    shopBadge: 'NUEVO',
    shopTitle: 'Merch Oficial',
    shopDesc: 'Colección exclusiva 2026. Edición limitada.',
    shopCta: 'Explorar tienda',
    shopPrevLabel: 'Anterior producto',
    shopNextLabel: 'Siguiente producto',
  },
  en: {
    heroBadge: 'LIMA · 2026',
    heroTitleMain: 'Where DevOps meets the',
    heroTitleHighlight: 'community',
    heroDesc:
      'The meeting point for Software Engineers, Architects, Technical Leaders, DevOps Engineers, Security Engineers, CTOs and CIOs. Connect with the community, learn from real-world cases and accelerate decisions that impact business and platform.',
    metaFechaLabel: 'Date',
    metaFechaValue: 'Aug 27 – 28, 2026',
    metaLugarLabel: 'Venue',
    metaLugarValue: 'LCC – Lima',
    heroTicketsCta: 'Buy ticket →',
    countdownLabel: 'COUNTDOWN',
    countdownDays: 'DAYS',
    countdownHours: 'HRS',
    countdownMinutes: 'MIN',
    countdownSeconds: 'SEC',
    ticketComingSoon: 'COMING SOON',
    prices: [
      {
        name: 'General Access',
        description: 'The gateway to the largest DevOps event in Peru.',
        price: '$69.90',
        originalPrice: '$99.90',
        discount: '-30%',
        variant: 'general',
      },
      {
        name: 'VIP Access',
        description: 'Premium experience with exclusive benefits at every moment.',
        price: '$119.90',
        originalPrice: '$149.90',
        discount: '-20%',
        variant: 'vip',
      },
    ],
    shopEyebrow: '/ 100% OFFICIAL /',
    shopBadge: 'NEW',
    shopTitle: 'Official Merch',
    shopDesc: 'Exclusive 2026 collection. Limited edition.',
    shopCta: 'Explore store',
    shopPrevLabel: 'Previous product',
    shopNextLabel: 'Next product',
  },
}
