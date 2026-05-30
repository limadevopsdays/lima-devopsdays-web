import type { Locale } from '../../i18n'

type SorteoEntradasPageI18n = {
  badge: string
  lead: string
  stepUploadTitle: string
  stepUploadHint: string
  stepValidTitle: string
  stepDrawTitle: string
  drawHint: string
  fileRequiredAlert: string
  invalidCsvAlert: string
  missingNameAlert: string
  missingParticipantsAlert: string
  invalidWinnerCountAlert: string
  emptyState: string
  statsRead: string
  statsValid: string
  fileInputLabel: string
  winnerCountLabel: string
  dedupeLabel: string
  dedupeAuto: string
  dedupeName: string
  dedupeEmail: string
  processButton: string
  processingButton: string
  drawButton: string
  drawingButton: string
  downloadButton: string
  tableIndex: string
  tableParticipant: string
  tableEmail: string
  winnerLabel: string
  noEmail: string
  downloadFilename: string
  csvHeader: string
}

export const sorteoEntradasPageI18n: Record<Locale, SorteoEntradasPageI18n> = {
  es: {
    badge: 'Sorteo oficial',
    lead: 'Sorteo por 2 entradas para las personas que se registraron en el Global Azure.',
    stepUploadTitle: '1. Cargar participantes',
    stepUploadHint:
      'El CSV debe tener al menos una columna llamada nombre. También puede incluir correo.',
    stepValidTitle: '2. Participantes válidos',
    stepDrawTitle: '3. Realizar sorteo',
    drawHint: 'Se usa aleatoriedad criptográfica del navegador cuando está disponible.',
    fileRequiredAlert: 'Primero selecciona un archivo CSV.',
    invalidCsvAlert: 'El CSV no tiene suficientes filas.',
    missingNameAlert: 'No encontré una columna de nombre. Usa una columna llamada nombre.',
    missingParticipantsAlert: 'Primero carga participantes.',
    invalidWinnerCountAlert: 'El número de ganadores no es válido.',
    emptyState: 'Aún no se cargó ningún archivo.',
    statsRead: 'Registros leídos',
    statsValid: 'Participantes válidos únicos',
    fileInputLabel: 'Archivo CSV',
    winnerCountLabel: 'Número de ganadores:',
    dedupeLabel: 'Excluir duplicados por:',
    dedupeAuto: 'Automático: correo si existe, si no nombre',
    dedupeName: 'Nombre',
    dedupeEmail: 'Correo',
    processButton: 'Procesar CSV',
    processingButton: 'Procesando...',
    drawButton: 'Sortear ahora',
    drawingButton: 'Sorteando...',
    downloadButton: 'Descargar resultado CSV',
    tableIndex: '#',
    tableParticipant: 'Participante',
    tableEmail: 'Correo',
    winnerLabel: 'Ganador',
    noEmail: 'Sin correo registrado',
    downloadFilename: 'ganadores-devopsdays-lima.csv',
    csvHeader: 'puesto,nombre,correo,fecha_sorteo',
  },
  en: {
    badge: 'Official raffle',
    lead: 'Raffle for 2 tickets for people who registered for Global Azure.',
    stepUploadTitle: '1. Upload participants',
    stepUploadHint: 'The CSV must include at least one column named nombre or name. It may also include email.',
    stepValidTitle: '2. Valid participants',
    stepDrawTitle: '3. Run raffle',
    drawHint: 'Browser cryptographic randomness is used when available.',
    fileRequiredAlert: 'Select a CSV file first.',
    invalidCsvAlert: 'The CSV does not have enough rows.',
    missingNameAlert: 'I could not find a name column. Use a column named nombre or name.',
    missingParticipantsAlert: 'Load participants first.',
    invalidWinnerCountAlert: 'The number of winners is not valid.',
    emptyState: 'No file has been uploaded yet.',
    statsRead: 'Rows read',
    statsValid: 'Unique valid participants',
    fileInputLabel: 'CSV file',
    winnerCountLabel: 'Number of winners:',
    dedupeLabel: 'Remove duplicates by:',
    dedupeAuto: 'Automatic: email if present, otherwise name',
    dedupeName: 'Name',
    dedupeEmail: 'Email',
    processButton: 'Process CSV',
    processingButton: 'Processing...',
    drawButton: 'Draw now',
    drawingButton: 'Drawing...',
    downloadButton: 'Download CSV results',
    tableIndex: '#',
    tableParticipant: 'Participant',
    tableEmail: 'Email',
    winnerLabel: 'Winner',
    noEmail: 'No email registered',
    downloadFilename: 'devopsdays-lima-winners.csv',
    csvHeader: 'position,name,email,draw_date',
  },
}
