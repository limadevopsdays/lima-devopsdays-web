import type { Locale } from '../../../i18n'

type TransportItem = { type: 'metro' | 'bus' | 'taxi' | 'walk'; name: string; stop: string; url?: string }
type Place = { name: string; desc: string; district: string; area: string; transport: TransportItem[] }

type TurismI18n = {
  eyebrow: string
  title: string
  lead: string
  ariaPlace: (name: string) => string
  ariaPrev: string
  ariaNext: string
  ariaClose: string
  howToArrive: string
  videoTitle: string
  imageMachuPicchuAlt: string
  mpBadge: string
  mpTitle: string
  mpDesc: string
  mpLink: string
  places: Place[]
}

export const turismI18n: Record<Locale, TurismI18n> = {
  es: {
    eyebrow: 'Turismo',
    title: 'Descubre Lima',
    lead: 'Más allá del evento, Lima te espera. Historia milenaria, gastronomía de clase mundial y barrios vibrantes frente al Pacífico.',
    ariaPlace: (name) => `Ver información de ${name}`,
    ariaPrev: 'Anterior',
    ariaNext: 'Siguiente',
    ariaClose: 'Cerrar',
    howToArrive: 'Cómo llegar',
    videoTitle: 'Video de fondo - Marca Perú',
    imageMachuPicchuAlt: 'Machu Picchu',
    mpBadge: 'Cusco · A 1h 20min en avión desde Lima',
    mpTitle: 'Machu Picchu',
    mpDesc: 'Aprovecha tu viaje a Perú y visita la ciudadela inca más famosa del mundo. Una de las 7 maravillas del mundo moderno que no puedes dejar de ver.',
    mpLink: 'Planifica tu visita →',
    places: [
      {
        name: 'Plaza de Armas',
        desc: 'El corazón histórico de Lima, rodeado de edificios coloniales y la Catedral de Lima.',
        district: 'Cercado de Lima',
        area: 'hero',
        transport: [
          { type: 'metro', name: 'Línea 1 del Metro', stop: 'Estación Grau · 10 min caminando' },
          { type: 'bus', name: 'Metropolitano', stop: 'Estación Jr. de la Unión', url: 'https://www.metropolitano.com.pe/' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 20 (~$5) desde Miraflores' },
        ],
      },
      {
        name: 'Barranco',
        desc: 'El barrio bohemio de Lima, lleno de arte, música, restaurantes y el icónico Puente de los Suspiros.',
        district: 'Barranco',
        area: 'barranco',
        transport: [
          { type: 'bus', name: 'Metropolitano', stop: 'Estación Bulevar Barranco', url: 'https://www.metropolitano.com.pe/' },
          { type: 'bus', name: 'Bus', stop: 'Líneas 36 y 38 por Av. Grau' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 12 (~$3) desde Miraflores' },
        ],
      },
      {
        name: 'Larcomar',
        desc: 'Centro comercial y de entretenimiento construido sobre el acantilado de Miraflores con vista al Pacífico.',
        district: 'Miraflores',
        area: 'larcomar',
        transport: [
          { type: 'bus', name: 'Metropolitano', stop: 'Estación Ricardo Palma · 5 min caminando', url: 'https://www.metropolitano.com.pe/' },
          { type: 'walk', name: 'A pie', stop: '20 min desde Óvalo Miraflores por el malecón' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 10 (~$3) desde Miraflores' },
        ],
      },
      {
        name: 'Barrio Chino',
        desc: 'El barrio chino más grande de Sudamérica. La calle Capón es famosa por sus restaurantes chifa y tiendas asiáticas.',
        district: 'Cercado de Lima',
        area: 'chinatown',
        transport: [
          { type: 'metro', name: 'Línea 1 del Metro', stop: 'Estación Grau · 5 min caminando' },
          { type: 'bus', name: 'Metropolitano', stop: 'Estación Jr. de la Unión', url: 'https://www.metropolitano.com.pe/' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 20 (~$5) desde Miraflores' },
        ],
      },
      {
        name: 'Parque del Amor',
        desc: 'Parque a orillas del acantilado de Miraflores con esculturas, mosaicos coloridos y vistas al Océano Pacífico.',
        district: 'Miraflores',
        area: 'amor',
        transport: [
          { type: 'bus', name: 'Metropolitano', stop: 'Estación Óvalo Miraflores · 10 min caminando', url: 'https://www.metropolitano.com.pe/' },
          { type: 'walk', name: 'A pie', stop: '5 min desde Larcomar por el malecón' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 8 (~$2) desde Miraflores' },
        ],
      },
      {
        name: 'Parque de las Aguas',
        desc: 'El complejo de fuentes más grande del mundo según el Guinness. Espectáculo nocturno de luces y agua.',
        district: 'Cercado de Lima',
        area: 'aguas',
        transport: [
          { type: 'bus', name: 'Metropolitano', stop: 'Estación 28 de Julio · 10 min caminando', url: 'https://www.metropolitano.com.pe/' },
          { type: 'bus', name: 'Bus', stop: 'Av. Brasil, varias líneas' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 12 (~$3) desde Miraflores' },
        ],
      },
      {
        name: 'Centro Histórico',
        desc: 'Patrimonio de la Humanidad UNESCO. Iglesias barrocas, conventos coloniales y la arquitectura virreinal mejor conservada de América.',
        district: 'Cercado de Lima',
        area: 'centro',
        transport: [
          { type: 'metro', name: 'Línea 1 del Metro', stop: 'Estaciones Grau o Colmena' },
          { type: 'bus', name: 'Metropolitano', stop: 'Múltiples paradas en el centro', url: 'https://www.metropolitano.com.pe/' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 20 (~$5) desde Miraflores' },
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Tourism',
    title: 'Discover Lima',
    lead: 'Beyond the event, Lima awaits you. Millenary history, world-class gastronomy, and vibrant neighborhoods along the Pacific.',
    ariaPlace: (name) => `View information about ${name}`,
    ariaPrev: 'Previous',
    ariaNext: 'Next',
    ariaClose: 'Close',
    howToArrive: 'How to get there',
    videoTitle: 'Background video - Marca Perú',
    imageMachuPicchuAlt: 'Machu Picchu',
    mpBadge: 'Cusco · 1h 20min flight from Lima',
    mpTitle: 'Machu Picchu',
    mpDesc: 'Make the most of your trip to Peru and visit the most famous Inca citadel in the world. One of the 7 wonders of the modern world you cannot miss.',
    mpLink: 'Plan your visit →',
    places: [
      {
        name: 'Plaza de Armas',
        desc: "Lima's historic heart, surrounded by colonial buildings and the Lima Cathedral.",
        district: 'Cercado de Lima',
        area: 'hero',
        transport: [
          { type: 'metro', name: 'Metro Line 1', stop: 'Grau Station · 10 min walk' },
          { type: 'bus', name: 'Metropolitano', stop: 'Jr. de la Unión Station', url: 'https://www.metropolitano.com.pe/' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 20 (~$5) from Miraflores' },
        ],
      },
      {
        name: 'Barranco',
        desc: "Lima's bohemian neighborhood, full of art, music, restaurants, and the iconic Bridge of Sighs.",
        district: 'Barranco',
        area: 'barranco',
        transport: [
          { type: 'bus', name: 'Metropolitano', stop: 'Bulevar Barranco Station', url: 'https://www.metropolitano.com.pe/' },
          { type: 'bus', name: 'Bus', stop: 'Lines 36 and 38 via Av. Grau' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 12 (~$3) from Miraflores' },
        ],
      },
      {
        name: 'Larcomar',
        desc: 'Shopping and entertainment center built on the Miraflores cliffside with Pacific Ocean views.',
        district: 'Miraflores',
        area: 'larcomar',
        transport: [
          { type: 'bus', name: 'Metropolitano', stop: 'Ricardo Palma Station · 5 min walk', url: 'https://www.metropolitano.com.pe/' },
          { type: 'walk', name: 'On foot', stop: '20 min from Óvalo Miraflores along the boardwalk' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 10 (~$3) from Miraflores' },
        ],
      },
      {
        name: 'Chinatown',
        desc: "South America's largest Chinatown. Capón Street is famous for its chifa restaurants and Asian shops.",
        district: 'Cercado de Lima',
        area: 'chinatown',
        transport: [
          { type: 'metro', name: 'Metro Line 1', stop: 'Grau Station · 5 min walk' },
          { type: 'bus', name: 'Metropolitano', stop: 'Jr. de la Unión Station', url: 'https://www.metropolitano.com.pe/' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 20 (~$5) from Miraflores' },
        ],
      },
      {
        name: 'Parque del Amor',
        desc: 'Park on the edge of the Miraflores cliffs with sculptures, colorful mosaics, and views of the Pacific Ocean.',
        district: 'Miraflores',
        area: 'amor',
        transport: [
          { type: 'bus', name: 'Metropolitano', stop: 'Óvalo Miraflores Station · 10 min walk', url: 'https://www.metropolitano.com.pe/' },
          { type: 'walk', name: 'On foot', stop: '5 min from Larcomar along the boardwalk' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 8 (~$2) from Miraflores' },
        ],
      },
      {
        name: 'Magic Water Circuit',
        desc: "The world's largest fountain complex according to Guinness. Nightly light and water show.",
        district: 'Cercado de Lima',
        area: 'aguas',
        transport: [
          { type: 'bus', name: 'Metropolitano', stop: '28 de Julio Station · 10 min walk', url: 'https://www.metropolitano.com.pe/' },
          { type: 'bus', name: 'Bus', stop: 'Av. Brasil, multiple lines' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 12 (~$3) from Miraflores' },
        ],
      },
      {
        name: 'Historic Center',
        desc: 'UNESCO World Heritage Site. Baroque churches, colonial convents, and the best-preserved viceregal architecture in the Americas.',
        district: 'Cercado de Lima',
        area: 'centro',
        transport: [
          { type: 'metro', name: 'Metro Line 1', stop: 'Grau or Colmena stations' },
          { type: 'bus', name: 'Metropolitano', stop: 'Multiple stops in the center', url: 'https://www.metropolitano.com.pe/' },
          { type: 'taxi', name: 'Taxi / Uber', stop: '~S/ 20 (~$5) from Miraflores' },
        ],
      },
    ],
  },
}
