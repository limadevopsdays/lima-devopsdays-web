// Catálogo de merch — fuente única de verdad
// Actualiza shopUrl de cada item cuando la tienda asigne URLs individuales

export type MerchItem = {
  id: string
  name: { es: string; en: string }
  image: string
  shopUrl: string
}

export const MERCH_SHOP_URL = 'https://tickets.devopsdays.pe/shop'

export const MERCH_CATALOG: MerchItem[] = [
  {
    id: 'polo-negro',
    name: { es: 'Polo Negro', en: 'Black Tee' },
    image: '/images/merch/polo-negro.png',
    shopUrl: `${MERCH_SHOP_URL}/polo-oficial-del-evento-52`,
  },
  {
    id: 'polo-blanco',
    name: { es: 'Polo Blanco', en: 'White Tee' },
    image: '/images/merch/polo-blanco.png',
    shopUrl: `${MERCH_SHOP_URL}/polo-oficial-del-evento-52`,
  },
  {
    id: 'polo-flow',
    name: { es: 'Polo Programando con Flow', en: 'Programming with Flow Tee' },
    image: '/images/merch/polo-negro-flow.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'polera',
    name: { es: 'Polera', en: 'Hoodie' },
    image: '/images/merch/polera.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'gorra',
    name: { es: 'Gorra', en: 'Cap' },
    image: '/images/merch/gorra.png',
    shopUrl: `${MERCH_SHOP_URL}/gorra-oficial-devopsdays-lima-2026-48`,
  },
  {
    id: 'mochila',
    name: { es: 'Mochila', en: 'Backpack' },
    image: '/images/merch/mochila.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'tomatodo',
    name: { es: 'Tomatodo', en: 'Water Bottle' },
    image: '/images/merch/tomatodo.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'taza',
    name: { es: 'Taza', en: 'Mug' },
    image: '/images/merch/taza.png',
    shopUrl: `${MERCH_SHOP_URL}/taza-oficial-del-evento-devopsdays-lima-2026-51`,
  },
  {
    id: 'mouse-pad',
    name: { es: 'Mouse Pad', en: 'Mouse Pad' },
    image: '/images/merch/mouse-pad.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'notebook',
    name: { es: 'Libreta', en: 'Notebook' },
    image: '/images/merch/notebook.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'lapicero',
    name: { es: 'Lapicero', en: 'Pen' },
    image: '/images/merch/lapicero.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'bolsa',
    name: { es: 'Bolsa', en: 'Tote Bag' },
    image: '/images/merch/bolsa.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'lanyard',
    name: { es: 'Lanyard', en: 'Lanyard' },
    image: '/images/merch/lanyard.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'medias',
    name: { es: 'Medias', en: 'Socks' },
    image: '/images/merch/medias.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'pulsera',
    name: { es: 'Pulsera', en: 'Bracelet' },
    image: '/images/merch/pulsera.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'mascota',
    name: { es: 'Mascota', en: 'Mascot' },
    image: '/images/merch/mascota.png',
    shopUrl: `${MERCH_SHOP_URL}/mascota-oficial-colibri-devopsdays-lima-2026-47`,
  },
  {
    id: 'llavero',
    name: { es: 'Llavero', en: 'Keychain' },
    image: '/images/merch/llavero.png',
    shopUrl: `${MERCH_SHOP_URL}/llavero-colibri-devopsdays-lima-2026-49`,
  },
  {
    id: 'pin-1',
    name: { es: 'Pin Mascota', en: 'Mascot Pin' },
    image: '/images/merch/pin-1.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'pin-2',
    name: { es: 'Pin DevOps', en: 'DevOps Pin' },
    image: '/images/merch/pin-2.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'sticker-1',
    name: { es: 'Stickers Vol. 1', en: 'Stickers Vol. 1' },
    image: '/images/merch/sticker-1.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'sticker-2',
    name: { es: 'Stickers Vol. 2', en: 'Stickers Vol. 2' },
    image: '/images/merch/sticker-2.png',
    shopUrl: `${MERCH_SHOP_URL}`,
  },
  {
    id: 'iman',
    name: { es: 'Imán', en: 'Magnet' },
    image: '/images/merch/imán.png',
    shopUrl: `${MERCH_SHOP_URL}/imanes-oficiales-devopsdays-lima-2026-50`,
  },
]
