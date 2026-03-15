// ─── Mock content mirroring the real site's data structure ───────────────────

export const siteContent = {
  eventName: 'DevOpsDays Lima',
  year: '2026',
  ticketsUrl: 'https://tickets.devopsdays.pe/',
  registrationUrl: 'https://tickets.devopsdays.pe/',
  sponsorContactEmail: 'sponsors@devopsdays.pe',
  linkedin: 'https://www.linkedin.com/company/devops-days-lima/',
  instagram: 'https://www.instagram.com/devopsdayslima/',
}

// ─── Speakers ─────────────────────────────────────────────────────────────────
export const cfpOpen = true
export const speakersVisible = true

export const speakers = [
  {
    name: 'Valeria Condori',
    role: 'Staff SRE · Google Cloud',
    country: '🇵🇪',
    imageSrc: 'https://images.unsplash.com/photo-1712174766230-cb7304feaafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=300&fit=crop',
    linkedin: 'https://linkedin.com',
    format: 'Keynote',
  },
  {
    name: 'Diego Bernales',
    role: 'Platform Lead · Mercado Libre',
    country: '🇦🇷',
    imageSrc: 'https://images.unsplash.com/photo-1668368961546-e3a06f1cd0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=300&fit=crop',
    linkedin: 'https://linkedin.com',
    format: 'Charla',
  },
  {
    name: 'Luciana Rios',
    role: 'DevSecOps Eng. · Nubank',
    country: '🇧🇷',
    imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=300&fit=crop',
    linkedin: 'https://linkedin.com',
    format: 'Workshop',
  },
  {
    name: 'Andrés Tapia',
    role: 'Cloud Architect · AWS',
    country: '🇵🇪',
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=300&fit=crop',
    linkedin: 'https://linkedin.com',
    format: 'Charla',
  },
  {
    name: 'Fernanda Castro',
    role: 'Head of Eng. · Rappi',
    country: '🇨🇴',
    imageSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=300&fit=crop',
    linkedin: 'https://linkedin.com',
    format: 'Keynote',
  },
  {
    name: 'Carlos Mendoza',
    role: 'FinOps Lead · Falabella',
    country: '🇵🇪',
    imageSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=300&fit=crop',
    linkedin: 'https://linkedin.com',
    format: 'Ignite',
  },
]

export const cfpTopics = [
  { id: '1', icon: '🚀', label: 'CI/CD & Automatización' },
  { id: '2', icon: '☁️', label: 'Cloud & Platform Eng.' },
  { id: '3', icon: '🔒', label: 'DevSecOps' },
  { id: '4', icon: '📊', label: 'Observabilidad & SRE' },
  { id: '5', icon: '🤖', label: 'AI Ops' },
  { id: '6', icon: '🏗️', label: 'IaC & GitOps' },
]

// ─── Schedule ─────────────────────────────────────────────────────────────────
export type SessionType = 'keynote' | 'talk' | 'workshop' | 'openspace' | 'break' | 'ignite'

export interface ScheduleSession {
  time: string
  duration: string
  title: string
  speaker?: string
  type: SessionType
  room?: string
  track?: string
}

export const scheduleDay1: ScheduleSession[] = [
  { time: '08:00', duration: '60 min', title: 'Registro y Bienvenida', type: 'break' },
  { time: '09:00', duration: '50 min', title: 'Keynote: DevOps en la era de la IA', speaker: 'Valeria Condori', type: 'keynote', room: 'Auditorio Principal' },
  { time: '10:00', duration: '30 min', title: 'Pausa / Networking', type: 'break' },
  { time: '10:30', duration: '30 min', title: 'Platform Engineering: IDP en producción', speaker: 'Diego Bernales', type: 'talk', track: 'Track A', room: 'Sala A' },
  { time: '10:30', duration: '30 min', title: 'DevSecOps: shift-left sin dolor', speaker: 'Luciana Rios', type: 'talk', track: 'Track B', room: 'Sala B' },
  { time: '11:10', duration: '30 min', title: 'FinOps: optimizando costos en AWS', speaker: 'Carlos Mendoza', type: 'talk', track: 'Track A', room: 'Sala A' },
  { time: '11:10', duration: '30 min', title: 'Kubernetes multi-tenant en producción', speaker: 'Andrés Tapia', type: 'talk', track: 'Track B', room: 'Sala B' },
  { time: '12:00', duration: '5×5 min', title: 'Ignite Talks', type: 'ignite', room: 'Auditorio Principal' },
  { time: '12:30', duration: '90 min', title: 'Almuerzo + Expo de herramientas', type: 'break' },
  { time: '14:00', duration: '90 min', title: 'Open Spaces — Sesión 1', type: 'openspace', room: 'Área Abierta' },
  { time: '15:40', duration: '30 min', title: 'Pausa', type: 'break' },
  { time: '16:10', duration: '120 min', title: 'Workshop: Terraform + CDK en el mundo real', speaker: 'Andrés Tapia', type: 'workshop', room: 'Sala Taller' },
  { time: '18:30', duration: '', title: 'Cóctel de bienvenida', type: 'break' },
]

export const scheduleDay2: ScheduleSession[] = [
  { time: '09:00', duration: '50 min', title: 'Keynote: Cultura DevOps a escala LATAM', speaker: 'Fernanda Castro', type: 'keynote', room: 'Auditorio Principal' },
  { time: '10:00', duration: '30 min', title: 'Pausa / Networking', type: 'break' },
  { time: '10:30', duration: '30 min', title: 'Observabilidad con OpenTelemetry', speaker: 'Valeria Condori', type: 'talk', track: 'Track A', room: 'Sala A' },
  { time: '10:30', duration: '30 min', title: 'GitOps con ArgoCD + Flux', speaker: 'Diego Bernales', type: 'talk', track: 'Track B', room: 'Sala B' },
  { time: '11:10', duration: '30 min', title: 'AI Ops: modelos en producción con MLflow', type: 'talk', track: 'Track A', room: 'Sala A' },
  { time: '12:00', duration: '5×5 min', title: 'Ignite Talks', type: 'ignite', room: 'Auditorio Principal' },
  { time: '12:30', duration: '90 min', title: 'Almuerzo', type: 'break' },
  { time: '14:00', duration: '90 min', title: 'Open Spaces — Sesión 2', type: 'openspace', room: 'Área Abierta' },
  { time: '15:40', duration: '30 min', title: 'Pausa', type: 'break' },
  { time: '16:10', duration: '45 min', title: 'Panel: El futuro de las plataformas de ingeniería', type: 'talk', room: 'Auditorio Principal' },
  { time: '17:00', duration: '', title: 'Cierre + Retrospectiva comunitaria', type: 'break' },
]

// ─── Venue ────────────────────────────────────────────────────────────────────
export const venue = {
  name: 'Lima Centro de Convenciones',
  address1: 'Av. De la Arqueología 206',
  address2: 'San Borja, Lima, Perú',
  mapsUrl: 'https://www.google.com/maps/place/Centro+de+Convenciones+de+Lima/@-12.0863616,-77.0032052,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c7d2eb58373d:0x670e8ff50b6571e4!8m2!3d-12.0863616!4d-77.0006303!16s%2Fg%2F11cs29ryp2?entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D',
  photos: [
    { src: '/images/venue/venue%201.png', alt: 'Venue DevOpsDays Lima - imagen 1' },
    { src: '/images/venue/venue%202.png', alt: 'Venue DevOpsDays Lima - imagen 2' },
    { src: '/images/venue/venue%203.jpg', alt: 'Venue DevOpsDays Lima - imagen 3' },
  ],
  transit: [
    { 
      type: 'ride' as const, 
      name: 'Uber', 
      stop: 'Coordina claramente tu punto de recojo con el conductor.', 
      url: 'https://www.uber.com/pe/es/' 
    },
    { 
      type: 'metro' as const, 
      name: 'Línea 1 del Metro de Lima', 
      stop: 'Baja en La Cultura y camina unos minutos hasta el venue.', 
      url: 'https://www.lineauno.pe/' 
    },
    { 
      type: 'bus' as const, 
      name: 'Metropolitano', 
      stop: 'Baja en Canadá o Javier Prado y continúa hacia Av. Aviación.', 
      url: 'https://www.metropolitano.com.pe/' 
    },
  ],
  features: [
    { type: 'stat' as const, value: '1,200', label: 'Cap. personas' },
    { type: 'stat' as const, value: '5', label: 'Salas de conferencia' },
    { type: 'flag' as const, available: true, flagText: 'Sí', label: 'WiFi incluido' },
    { type: 'flag' as const, available: false, flagText: 'No', label: 'Estacionamiento' },
    { type: 'flag' as const, available: true, flagText: 'Sí', label: 'Accesibilidad' },
    { type: 'flag' as const, available: true, flagText: 'Sí', label: 'Zona de comida' },
  ],
}

// ─── Sponsors ─────────────────────────────────────────────────────────────────
export const sponsorTiers = [
  { id: 'platinum', label: 'Platinum' },
  { id: 'gold', label: 'Gold' },
  { id: 'silver', label: 'Silver' },
  { id: 'community', label: 'Community' },
]

export const sponsors = [
  {
    tier: 'platinum',
    items: [
      { 
        name: 'Dynatrace', 
        href: 'https://www.dynatrace.com/es-la/',
        logo: '/images/sponsors/platinium/dynatrace.png'
      },
      { 
        name: 'CleverIT', 
        href: 'https://cleveritgroup.com/',
        logo: '/images/sponsors/platinium/cleverit.png'
      },
    ],
  },
]

// ─── Organizers ───────────────────────────────────────────────────────────────
export const organizers = [
  { 
    name: 'Lenard Vega', 
    role: 'IT Engineering Manager', 
    employer: 'Credicorp', 
    linkedin: 'https://www.linkedin.com/in/lenardvega/', 
    github: 'https://github.com/lvega-root', 
    twitter: '', 
    imageSrc: 'figma:asset/9f9f6b3a5cf8384b38244a2dfa191a76b322e3d1.png'
  },
  { 
    name: 'Diana Uriol', 
    role: 'Agile Team Facilitator', 
    employer: 'Interbank', 
    linkedin: 'https://www.linkedin.com/in/diana-uriol-more-88a62848/', 
    github: '', 
    twitter: '', 
    imageSrc: 'figma:asset/1f5e769131d49f64e2afcb674b4c6a5e531c6ecd.png'
  },
  { 
    name: 'Danilo Briceño', 
    role: 'CXO', 
    employer: 'EKIS Cyber', 
    linkedin: 'https://www.linkedin.com/in/danbreu/', 
    github: 'https://github.com/dan-breu', 
    twitter: 'https://x.com/dan_breu', 
    imageSrc: 'figma:asset/83f2741818c8accc09bb32a6b3cfda8a3965b3d8.png'
  },
  { 
    name: 'Gino Leon', 
    role: 'Agile Chapter Lead', 
    employer: 'Pacifico Seguros', 
    linkedin: 'https://www.linkedin.com/in/gino-leon-0217a23b/', 
    github: '', 
    twitter: '', 
    imageSrc: 'figma:asset/b2e59a4e4dbea43d1724427fc47effcef67aec5c.png'
  },
  { 
    name: 'Fredy Hernandez', 
    role: 'DevOps Engineer', 
    employer: 'Tyba', 
    linkedin: 'https://www.linkedin.com/in/fredy-hernandez-huaricallo/', 
    github: '', 
    twitter: '', 
    imageSrc: 'figma:asset/0a49abff0d6ec3888baeb1f4f51e4eaa1524b948.png'
  },
  { 
    name: 'Ronald Requena', 
    role: 'CTO', 
    employer: 'Rumbo', 
    linkedin: 'https://www.linkedin.com/in/rcronald/', 
    github: '', 
    twitter: '', 
    imageSrc: 'figma:asset/aabacc67b78c0926f048406ce8d5fd6b9acbc9f3.png'
  },
  { 
    name: 'Jhonnatan Correa', 
    role: 'Cybersecurity Specialist', 
    employer: 'SOAINT', 
    linkedin: 'https://www.linkedin.com/in/jhonnatancorrea/', 
    github: 'https://github.com/jhoncorrea', 
    twitter: '', 
    imageSrc: 'figma:asset/c4df53d83c0eea1e6ed500b5569c4460b8f78f02.png'
  },
  { 
    name: 'Stefani Sánchez', 
    role: 'Software Engineer', 
    employer: 'Santander Consumer', 
    linkedin: 'https://www.linkedin.com/in/stefani-janet-s%C3%A1nchez-asto/', 
    github: '', 
    twitter: '', 
    imageSrc: 'figma:asset/52386429bb05a37a006ada2a68d32b92182b4be9.png'
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faq = [
  { 
    q: '¿Qué es DevOpsDays Lima y para quién está dirigido?', 
    a: 'DevOpsDays Lima es una conferencia comunitaria de dos días para **Ingenieros de Software, Arquitectos, Líderes Técnicos, Ingenieros DevOps, Ingenieros de seguridad, CTOs y CIOs**. El evento reúne a la comunidad alrededor de **charlas, talleres, open spaces y networking** para compartir experiencias reales y mejores prácticas sobre cómo construir, operar y evolucionar software.' 
  },
  { 
    q: '¿Cuándo y dónde se realiza el evento?', 
    a: 'DevOpsDays Lima 2026 se realizará el **27 y 28 de agosto de 2026**, desde las **08:00 AM**, en el **Lima Centro de Convenciones (LCC)**, ubicado en **Av. De la Arqueología 206, San Borja, Lima, Perú**.' 
  },
  { 
    q: '¿Cómo puedo registrarme? ¿Cuánto cuestan los tickets?', 
    a: 'Puedes registrarte desde la sección de tickets en la web o directamente en **https://tickets.devopsdays.pe/**. Actualmente contamos con dos modalidades de entrada: **General y VIP**. El inicio de venta está programado para el **23 de marzo de 2026**. Si tu equipo necesita más tickets o una coordinación especial, puedes escribirnos a **tickets@devopsdays.pe**.' 
  },
  { 
    q: '¿Qué tipo de formato tiene el evento?', 
    a: 'El evento combina distintos formatos de participación, incluyendo **keynotes, charlas, talleres y open spaces**. La programación también contempla espacios de networking y sesiones comunitarias orientadas al intercambio de experiencias reales.' 
  },
  { 
    q: '¿Puedo proponer una charla?', 
    a: 'Sí. El **Call for Speakers** está abierto hasta el **30 de mayo de 2026** y las notificaciones se enviarán a partir del **15 de junio de 2026**. Buscamos experiencias reales, aprendizajes aplicados y casos que ayuden a otros equipos a tomar mejores decisiones. Los ejes temáticos actuales son **Platform Engineering & DevOps, Seguridad y Transformación Tecnológica, Liderazgo Moderno y Cultura de Equipos, e IA y Estrategia de Datos**.' 
  },
  { 
    q: '¿Habrá comida y refrigerios?', 
    a: 'Sí. Durante el evento contaremos con **espacios de refrigerio** y atención pensada para acompañar la jornada. Próximamente compartiremos más detalles sobre alimentación y servicios incluidos para cada tipo de entrada.' 
  },
  { 
    q: '¿Cuál es el código de vestimenta?', 
    a: 'No se ha definido un **código de vestimenta formal**. Recomendamos asistir con ropa cómoda, casual o business casual, apropiada para un entorno profesional y dos días de conferencia.' 
  },
  { 
    q: '¿El evento será grabado o tendrá transmisión en vivo?', 
    a: 'La web actual no publica todavía una confirmación sobre **transmisión en vivo o grabación de sesiones**. Recomendamos seguir los canales oficiales para próximas actualizaciones.' 
  },
  { 
    q: '¿Cómo puedo ser sponsor del evento?', 
    a: 'DevOpsDays Lima 2026 cuenta con distintos niveles de sponsorship con beneficios como **visibilidad de marca, stands, pases al evento y acceso a la comunidad técnica de LATAM**. Puedes revisar la sección de sponsors, descargar el brochure o escribir a **sponsors@devopsdays.pe** para iniciar una conversación.' 
  },
  { 
    q: '¿Cómo puedo mantenerme informado y conectarme con la comunidad?', 
    a: 'Puedes seguir los canales oficiales de DevOpsDays Lima para enterarte de novedades sobre speakers, tickets, sponsors y agenda. Hoy nuestros canales activos son **LinkedIn e Instagram**.' 
  },
]
