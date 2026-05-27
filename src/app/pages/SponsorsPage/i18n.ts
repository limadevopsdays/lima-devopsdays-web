import type { Locale } from '../../i18n'

type MainStatI18n = { title: string; subtitle: string }

type SponsorsPageI18n = {
  introBadgeText: string
  introTitle: string
  introLead: string
  mainStats: readonly [MainStatI18n, MainStatI18n, MainStatI18n]
  contactBadgeText: string
  contactBannerTitle: string
  contactBannerDescriptionPre: string
  contactBannerDescriptionPost: string
  contactPrimaryButton: string
  tableTitle: string
  tableLead: string
  pricingHeaderLabel: string
  tierCoverageLabel: string
  expandAll: string
  collapseAll: string
  includedLabel: string
  notIncludedLabel: string
  categoryCollapseLabel: string
  categoryExpandLabel: string
  collapseLabel: string
  expandLabel: string
  benefitCategories: readonly [string, string, string, string]
  footnote1: string
  footnote2: string
  footnote3: string
  pricingRegularLabel: string
  pricingRegularDetail: string
  pricingEarlyBirdBadge: string
  pricingDiscountedLabel: string
  pricingDiscountedDetail: string
}

export const sponsorsPageI18n: Record<Locale, SponsorsPageI18n> = {
  es: {
    introBadgeText: 'CALL FOR SPONSORS 2026',
    introTitle: 'Impulsa la comunidad DevOpsDays Lima 🚀',
    introLead:
      '💜 Más de 800 profesionales tech, decision makers y líderes de la industria reunidos en dos días de aprendizaje, networking y comunidad. Como sponsor, no solo ganas visibilidad: entras en contacto con talento, equipos técnicos y conversaciones que hoy están moviendo el ecosistema DevOps en LATAM. 🤝 Sponsorships flexibles, pensados para impacto de marca y afinidad real con la comunidad.',
    mainStats: [
      {
        title: 'La comunidad más grande de Perú',
        subtitle: 'Se esperan +800 participantes',
      },
      {
        title: 'Dos días completos de aprendizaje',
        subtitle: 'Charlas + Talleres + Open Spaces + Networking',
      },
      {
        title: 'Regresamos en el 2026',
        subtitle: '2da edición del evento en Lima Centro de Convenciones (LCC)',
      },
    ],
    contactBadgeText: 'CALL FOR SPONSORS DISPONIBLE',
    contactBannerTitle: '¿Listo para ser parte de DevOpsDays Lima 2026?',
    contactBannerDescriptionPre: 'Escríbenos a ',
    contactBannerDescriptionPost:
      ' para revisar sponsorships, activaciones y paquetes alineados a tus objetivos de marca, recruiting y posicionamiento técnico.',
    contactPrimaryButton: 'Contactar al equipo',
    tableTitle: 'Compara los beneficios por nivel',
    tableLead:
      'Revisa el alcance de cada sponsorship y elige la combinación adecuada para tus objetivos de marca, networking y presencia técnica.',
    pricingHeaderLabel: 'BENEFICIOS',
    tierCoverageLabel: 'Beneficios',
    expandAll: 'Expandir todo',
    collapseAll: 'Colapsar todo',
    includedLabel: 'Incluido',
    notIncludedLabel: 'No incluido',
    categoryCollapseLabel: 'Colapsar categoría',
    categoryExpandLabel: 'Expandir categoría',
    collapseLabel: 'Colapsar',
    expandLabel: 'Expandir',
    benefitCategories: ['Presentaciones', 'Acceso a participantes', 'Visibilidad', 'Pases y stands'],
    footnote1:
      '* Los participantes opt-in son aquellos que han confirmado explícitamente recibir comunicaciones sobre el evento.',
    footnote2:
      '** El tamaño del stand Platinum es referencial y puede cambiar según el espacio disponible.',
    footnote3:
      '*** El publicidad destacada incluye un video estilo entrevista de 2 minutos.',
    pricingRegularLabel: 'Precio regular',
    pricingRegularDetail: 'USD - Impuestos no incluidos',
    pricingEarlyBirdBadge: '⏰ EARLY BIRD',
    pricingDiscountedLabel: 'Precio con descuento (20%)',
    pricingDiscountedDetail: 'Hasta el 30 MAR 2026 · USD - Impuestos no incluidos',
  },
  en: {
    introBadgeText: 'CALL FOR SPONSORS 2026',
    introTitle: 'Boost the DevOpsDays Lima community 🚀',
    introLead:
      '💜 More than 800 tech professionals, decision makers and industry leaders gathered for two days of learning, networking and community. As a sponsor, you not only gain visibility: you connect with talent, technical teams and conversations that are moving the DevOps ecosystem in LATAM. 🤝 Flexible sponsorships, designed for brand impact and real affinity with the community.',
    mainStats: [
      {
        title: 'The largest community in Peru',
        subtitle: '+800 participants expected',
      },
      {
        title: 'Two full days of learning',
        subtitle: 'Talks + Workshops + Open Spaces + Networking',
      },
      {
        title: 'Back in 2026',
        subtitle: '2nd edition of the event at Lima Convention Center (LCC)',
      },
    ],
    contactBadgeText: 'CALL FOR SPONSORS AVAILABLE',
    contactBannerTitle: 'Ready to be part of DevOpsDays Lima 2026?',
    contactBannerDescriptionPre: 'Write to us at ',
    contactBannerDescriptionPost:
      ' to review sponsorships, activations and packages aligned with your brand, recruiting and technical positioning goals.',
    contactPrimaryButton: 'Contact the team',
    tableTitle: 'Compare benefits by tier',
    tableLead:
      'Review the scope of each sponsorship and choose the right combination for your brand, networking and technical presence goals.',
    pricingHeaderLabel: 'BENEFITS',
    tierCoverageLabel: 'Benefits',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    includedLabel: 'Included',
    notIncludedLabel: 'Not included',
    categoryCollapseLabel: 'Collapse category',
    categoryExpandLabel: 'Expand category',
    collapseLabel: 'Collapse',
    expandLabel: 'Expand',
    benefitCategories: ['Presentations', 'Participant Access', 'Visibility', 'Passes & Stands'],
    footnote1:
      '* Opt-in attendees are those who have explicitly confirmed to receive communications about the event.',
    footnote2:
      '** The size of the Platinum stand is referential and may change depending on the available space.',
    footnote3:
      '*** Featured advertising includes a 2-minute interview-style video.',
    pricingRegularLabel: 'Regular price',
    pricingRegularDetail: 'USD - Tax not included',
    pricingEarlyBirdBadge: '⏰ EARLY BIRD',
    pricingDiscountedLabel: 'Discounted price (20%)',
    pricingDiscountedDetail: 'Until MAR 30th 2026 · USD - Tax not included',
  },
}
