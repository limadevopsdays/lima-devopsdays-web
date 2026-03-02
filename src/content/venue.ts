import { useI18n } from '../i18n/useI18n'
import type { TranslationKey } from '../i18n/translations'

export const venueMapsUrl =
  'https://www.google.com/maps?q=Av.%20De%20la%20Arqueolog%C3%ADa%20206%2C%20San%20Borja%2C%20Lima%2C%20Per%C3%BA'

const transitRoutes: Array<{
  type: 'metro' | 'bus'
  nameKey: TranslationKey
  stopKey: TranslationKey
  url: string
}> = [
  {
    type: 'metro',
    nameKey: 'venue.transit.metro.name',
    stopKey: 'venue.transit.metro.stop',
    url: 'https://www.lineauno.pe/estaciones/',
  },
  {
    type: 'bus',
    nameKey: 'venue.transit.bus.name',
    stopKey: 'venue.transit.bus.stop',
    url: 'https://corredorrojo.pe/servicio-201/',
  },
]

type FeatureDef =
  | { type: 'stat'; valueKey: TranslationKey; labelKey: TranslationKey }
  | { type: 'flag'; available: boolean; labelKey: TranslationKey }

const featureDefs: FeatureDef[] = [
  { type: 'stat', valueKey: 'venue.stats.capacity.value', labelKey: 'venue.feature.capacity.label' },
  { type: 'stat', valueKey: 'venue.stats.rooms.value', labelKey: 'venue.feature.rooms.label' },
  { type: 'flag', available: true, labelKey: 'venue.feature.wifi.label' },
  { type: 'flag', available: false, labelKey: 'venue.feature.parking.label' },
]

interface VenuePhoto {
  src: string
  altKey: TranslationKey
  featured?: boolean
}

const venuePhotos: VenuePhoto[] = [
  {
    src: '/assets/images/venue/lcc-aerial-building-exterior.jpg',
    altKey: 'venue.gallery.alt.aerial',
    featured: true,
  },
  {
    src: '/assets/images/venue/lcc-main-hall-colorful-ceiling.jpg',
    altKey: 'venue.gallery.alt.mainHall',
  },
  {
    src: '/assets/images/venue/lcc-lobby-naciones-corridor.jpg',
    altKey: 'venue.gallery.alt.lobby',
  },
  {
    src: '/assets/images/venue/lcc-exterior-facade-evening.jpg',
    altKey: 'venue.gallery.alt.exterior',
  },
  {
    src: '/assets/images/venue/lcc-rooftop-terrace-night.jpg',
    altKey: 'venue.gallery.alt.terrace',
  },
]

export function useVenueStrings() {
  const { t } = useI18n()
  return {
    eyebrow: t('venue.eyebrow'),
    title: t('venue.title'),
    lead: t('venue.lead'),
    mapLabel: `${t('venue.visualLabel')}: ${t('venue.card.addressLine1')}, ${t('venue.card.addressLine2')}`,
    gallery: {
      label: t('venue.gallery.label'),
      prev: t('venue.gallery.prev'),
      next: t('venue.gallery.next'),
      close: t('venue.gallery.close'),
      open: t('venue.gallery.open'),
    },
    photos: venuePhotos.map((p) => ({ src: p.src, alt: t(p.altKey) })),
    features: featureDefs.map((f) =>
      f.type === 'stat'
        ? ({ type: 'stat' as const, value: t(f.valueKey), label: t(f.labelKey) })
        : ({ type: 'flag' as const, available: f.available, label: t(f.labelKey), flagText: f.available ? t('venue.feature.yes') : t('venue.feature.no') })
    ),
    address1: t('venue.card.addressLine1'),
    address2: t('venue.card.addressLine2'),
    cta: {
      copy: t('venue.cta.copy'),
      copied: t('venue.cta.copied'),
      maps: t('venue.cta.maps'),
    },
    transit: {
      label: t('venue.transit.label'),
      routes: transitRoutes.map(({ type, nameKey, stopKey, url }) => ({
        type,
        name: t(nameKey),
        stop: t(stopKey),
        url,
      })),
    },
  }
}
