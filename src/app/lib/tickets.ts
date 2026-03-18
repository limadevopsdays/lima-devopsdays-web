export const TICKET_SALE_START_ISO = '2026-03-23T00:00:00-05:00'
export const TICKET_SALE_START_LABEL = '23 de marzo de 2026'

export function isTicketSaleOpen(now = new Date()) {
  return now.getTime() >= new Date(TICKET_SALE_START_ISO).getTime()
}
