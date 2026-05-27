import type { Locale } from '../../../i18n'

type SponsorsI18n = {
  eyebrow: string
  title: string
  lead: string
  emptyPlatinum: string
  emptyTier: (label: string) => string
  emptyDescription: string
  socialProofBadge: string
  socialProofTitle: string
  socialProofDescription: string
  ctaBadge: string
  ctaTitle: string
  ctaDescription: string
  ctaTiersLabel: string
  ctaButton: string
  brochureEs: string
  brochureEn: string
  altSocialProof: string
  ariaLogoSponsor: (name: string) => string
}

export const sponsorsI18n: Record<Locale, SponsorsI18n> = {
  es: {
    eyebrow: 'Sponsors',
    title: 'Nuestros Sponsors 2026',
    lead: 'Nuestros sponsors hacen posible una experiencia de alto nivel para la comunidad DevOps de LATAM, conectando marcas, líderes técnicos y equipos que están moviendo la industria.',
    emptyPlatinum: 'Pronto anunciaremos a nuestro Platinum Sponsor',
    emptyTier: (label) => `Pronto anunciaremos sponsors ${label}`,
    emptyDescription: 'Mantente atento a nuestros canales para conocer las marcas que se sumarán a DevOpsDays Lima 2026.',
    socialProofBadge: 'Edición 2025',
    socialProofTitle: 'Únete a estas empresas líderes',
    socialProofDescription: 'En DevOpsDays Lima 2025 trabajamos con marcas que entienden el valor de invertir en comunidad, talento y posicionamiento técnico. Tu empresa puede sumarse a esa conversación en 2026.',
    ctaBadge: 'CALL FOR SPONSORS DISPONIBLE',
    ctaTitle: '¿Listo para ser parte de DevOpsDays Lima 2026?',
    ctaDescription: 'Escríbenos a sponsors@devopsdays.pe para revisar opciones de sponsorship, activaciones de marca y paquetes alineados a tus objetivos comerciales y de comunidad.',
    ctaTiersLabel: 'Niveles Disponibles',
    ctaButton: 'Call for Sponsors',
    brochureEs: 'Brochure (ES)',
    brochureEn: 'Brochure (EN)',
    altSocialProof: 'Sponsors y asistentes en DevOpsDays Lima',
    ariaLogoSponsor: (name) => `Logo ${name}`,
  },
  en: {
    eyebrow: 'Sponsors',
    title: 'Our 2026 Sponsors',
    lead: 'Our sponsors make a world-class experience possible for the LATAM DevOps community, connecting brands, technical leaders, and teams driving the industry forward.',
    emptyPlatinum: 'Our Platinum Sponsor will be announced soon',
    emptyTier: (label) => `${label} sponsors coming soon`,
    emptyDescription: 'Stay tuned to our channels to find out which brands will be joining DevOpsDays Lima 2026.',
    socialProofBadge: '2025 Edition',
    socialProofTitle: 'Join these leading companies',
    socialProofDescription: 'At DevOpsDays Lima 2025 we partnered with brands that understand the value of investing in community, talent, and technical positioning. Your company can be part of that conversation in 2026.',
    ctaBadge: 'CALL FOR SPONSORS OPEN',
    ctaTitle: 'Ready to be part of DevOpsDays Lima 2026?',
    ctaDescription: 'Write to sponsors@devopsdays.pe to review sponsorship options, brand activations, and packages aligned to your commercial and community goals.',
    ctaTiersLabel: 'Available Tiers',
    ctaButton: 'Call for Sponsors',
    brochureEs: 'Brochure (ES)',
    brochureEn: 'Brochure (EN)',
    altSocialProof: 'Sponsors and attendees at DevOpsDays Lima',
    ariaLogoSponsor: (name) => `${name} logo`,
  },
}
