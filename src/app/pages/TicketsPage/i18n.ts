import type { Locale } from '../../i18n'

type TicketsPageI18n = {
  badgeText: string
  introTitle: string
  introDescription: string
  ctaButton: string
  ctaSaleStartedLabel: string
  ctaSaleStartsLabel: string
  ctaTeamNote: string
  groupDiscountsEyebrow: string
  groupDiscountsTitle: string
  groupDiscountsLead: string
  tableHeaderTier: string
  tableHeaderQuantity: string
  tableHeaderDiscount: string
  tableHeaderRegular: string
  benefitsTitle: string
  benefitsLead: string
  tierSwitchAriaLabel: string
  tierLabelGeneral: string
  tierLabelVip: string
  tierCoverageLabel: string
  expandAll: string
  collapseAll: string
  categoryCollapseLabel: string
  categoryExpandLabel: string
  collapseLabel: string
  expandLabel: string
  benefitsHeaderLabel: string
  includedLabel: string
  notIncludedLabel: string
  groupDiscountNames: readonly [string, string, string, string, string, string, string, string]
  benefitCategoryTitles: readonly [string, string, string, string, string]
  benefitItemNames: readonly [
    readonly [string, string, string, string, string],
    readonly [string, string, string],
    readonly [string, string, string],
    readonly [string, string],
    readonly [string, string, string, string, string],
  ]
}

export const ticketsPageI18n: Record<Locale, TicketsPageI18n> = {
  es: {
    badgeText: 'TICKETS 2026',
    introTitle: '¡Tus tickets para DevOpsDays Lima 2026!',
    introDescription:
      'Dos modalidades pensadas para distintos niveles de acceso y networking. Ambos tickets te conectan con la comunidad DevOps. El ticket VIP amplía la experiencia con beneficios premium.',
    ctaButton: 'Comprar tickets',
    ctaSaleStartedLabel: 'Venta iniciada: ',
    ctaSaleStartsLabel: 'Inicio de venta: ',
    ctaTeamNote:
      'Si tu equipo necesita más tickets o una coordinación especial, puedes escribirnos a tickets@devopsdays.pe.',
    groupDiscountsEyebrow: 'Tickets',
    groupDiscountsTitle: 'Descuentos grupales y patrocinadores',
    groupDiscountsLead:
      'Si vienes con tu equipo o participas como sponsor, aquí puedes revisar los precios por tramo para General y VIP.',
    tableHeaderTier: 'TRAMO',
    tableHeaderQuantity: 'CANTIDAD',
    tableHeaderDiscount: 'DSCTO.',
    tableHeaderRegular: 'REGULAR',
    benefitsTitle: 'Compara beneficios General vs VIP',
    benefitsLead:
      'Compara el alcance de cada ticket y elige la experiencia que mejor se ajuste a tu objetivo: asistir, conectar o vivir el evento con beneficios ampliados.',
    tierSwitchAriaLabel: 'Selecciona tipo de ticket',
    tierLabelGeneral: 'General',
    tierLabelVip: 'VIP',
    tierCoverageLabel: 'Beneficios',
    expandAll: 'Expandir todo',
    collapseAll: 'Colapsar todo',
    categoryCollapseLabel: 'Colapsar categoría',
    categoryExpandLabel: 'Expandir categoría',
    collapseLabel: 'Colapsar',
    expandLabel: 'Expandir',
    benefitsHeaderLabel: 'BENEFICIOS',
    includedLabel: 'Incluido',
    notIncludedLabel: 'No incluido',
    groupDiscountNames: [
      'Tramo 1 — Build',
      'Tramo 2 — Deploy',
      'Tramo 3 — Release',
      'Tramo 4 — Scale',
      'Sponsor Platinum',
      'Sponsor Gold',
      'Sponsor Silver',
      'Sponsor Bronze',
    ],
    benefitCategoryTitles: [
      'ACCESO AL EVENTO',
      'KIT DEL ASISTENTE',
      'ALIMENTACIÓN',
      'CONTENIDO Y CERTIFICACIÓN',
      'EXPERIENCIA VIP EXCLUSIVA',
    ],
    benefitItemNames: [
      [
        'Acceso completo por dos días',
        'Acceso a todas las Keynotes',
        'Área de Networking',
        'Showroom de Patrocinadores',
        'Audífonos de traducción simultánea',
      ],
      [
        'Lanyard y fotocheck oficial del evento',
        'Kit de bienvenida DevOpsDays',
        'Kit de bienvenida exclusivo',
      ],
      [
        'Coffee breaks — ambos días',
        'Coffee break exclusivo en zona VIP',
        'Almuerzo con Networking — ambos días',
      ],
      [
        'Material digital de todas las sesiones',
        'Certificado digital de asistencia',
      ],
      [
        'Priority Pass — registro y acceso prioritario',
        'Espacio de trabajo VIP',
        'Asientos reservados en filas preferenciales',
        'Internet exclusivo para asistentes VIP',
        'Asistencia personalizada durante el evento',
      ],
    ],
  },
  en: {
    badgeText: 'TICKETS 2026',
    introTitle: 'Your tickets for DevOpsDays Lima 2026!',
    introDescription:
      'Two options designed for different access and networking levels. Both tickets connect you with the DevOps community. The VIP ticket expands the experience with premium benefits.',
    ctaButton: 'Buy tickets',
    ctaSaleStartedLabel: 'Sale started: ',
    ctaSaleStartsLabel: 'Sale starts: ',
    ctaTeamNote:
      'If your team needs more tickets or special coordination, you can reach us at tickets@devopsdays.pe.',
    groupDiscountsEyebrow: 'Tickets',
    groupDiscountsTitle: 'Group discounts and sponsors',
    groupDiscountsLead:
      'If you are coming with your team or participating as a sponsor, here you can review the prices by tier for General and VIP.',
    tableHeaderTier: 'TIER',
    tableHeaderQuantity: 'QUANTITY',
    tableHeaderDiscount: 'DISC.',
    tableHeaderRegular: 'REGULAR',
    benefitsTitle: 'Compare General vs VIP benefits',
    benefitsLead:
      'Compare the scope of each ticket and choose the experience that best fits your goal: attend, connect or experience the event with expanded benefits.',
    tierSwitchAriaLabel: 'Select ticket type',
    tierLabelGeneral: 'General',
    tierLabelVip: 'VIP',
    tierCoverageLabel: 'Benefits',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    categoryCollapseLabel: 'Collapse category',
    categoryExpandLabel: 'Expand category',
    collapseLabel: 'Collapse',
    expandLabel: 'Expand',
    benefitsHeaderLabel: 'BENEFITS',
    includedLabel: 'Included',
    notIncludedLabel: 'Not included',
    groupDiscountNames: [
      'Tier 1 — Build',
      'Tier 2 — Deploy',
      'Tier 3 — Release',
      'Tier 4 — Scale',
      'Sponsor Platinum',
      'Sponsor Gold',
      'Sponsor Silver',
      'Sponsor Bronze',
    ],
    benefitCategoryTitles: [
      'EVENT ACCESS',
      'ATTENDEE KIT',
      'FOOD & BEVERAGES',
      'CONTENT & CERTIFICATION',
      'EXCLUSIVE VIP EXPERIENCE',
    ],
    benefitItemNames: [
      [
        'Two-day full access',
        'Access to all Keynotes',
        'Networking Area',
        'Sponsors Showroom',
        'Simultaneous translation headphones',
      ],
      [
        'Official event lanyard and badge',
        'DevOpsDays welcome kit',
        'Exclusive welcome kit',
      ],
      [
        'Coffee breaks — both days',
        'Exclusive coffee break in VIP zone',
        'Lunch with Networking — both days',
      ],
      [
        'Digital material for all sessions',
        'Digital attendance certificate',
      ],
      [
        'Priority Pass — priority registration and access',
        'VIP workspace',
        'Reserved seats in front rows',
        'Exclusive WiFi for VIP attendees',
        'Personalized assistance throughout the event',
      ],
    ],
  },
}
