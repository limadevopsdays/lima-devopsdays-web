import type { Locale } from '../../i18n'

export type SorteoEntradasPageI18n = {
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
  statsDuplicates: string
  fileInputLabel: string
  dropzoneTitle: string
  dropzoneSubtitle: string
  dropzoneActive: string
  loadSampleButton: string
  changeFileButton: string
  winnerCountLabel: string
  dedupeLabel: string
  dedupeAuto: string
  dedupeName: string
  dedupeEmail: string
  processButton: string
  processingButton: string
  drawButton: string
  drawingButton: string
  redrawButton: string
  downloadButton: string
  tableIndex: string
  tableParticipant: string
  tableEmail: string
  searchPlaceholder: string
  noResultsFound: string
  winnerLabel: string
  noEmail: string
  downloadFilename: string
  csvHeader: string
  copiedAlert: string
  copyButton: string
}

export const sorteoEntradasPageI18n: Record<Locale, SorteoEntradasPageI18n> = {
  es: {
    badge: 'Sorteo oficial',
    lead: '🎉 Sorteo Día 1, 27 ago 🎟️✨',
    stepUploadTitle: '1. Cargar participantes',
    stepUploadHint:
      'Sube tu archivo CSV con al menos una columna de nombre. También puedes incluir apellido y correo.',
    stepValidTitle: '2. Participantes válidos',
    stepDrawTitle: '3. Realizar sorteo',
    drawHint: 'Generación aleatoria criptográfica segura en tiempo real con animación de ruleta.',
    fileRequiredAlert: 'Primero selecciona o arrastra un archivo CSV.',
    invalidCsvAlert: 'El archivo CSV no contiene suficientes filas válidas.',
    missingNameAlert: 'No se encontró la columna de nombre. Asegúrate de incluir una columna llamada "nombre" o "name".',
    missingParticipantsAlert: 'Carga y procesa un archivo de participantes primero.',
    invalidWinnerCountAlert: 'El número de ganadores debe ser entre 1 y la cantidad de participantes disponibles.',
    emptyState: 'Aún no has procesado participantes. Carga un archivo CSV para comenzar.',
    statsRead: 'Filas leídas',
    statsValid: 'Participantes válidos',
    statsDuplicates: 'Duplicados filtrados',
    fileInputLabel: 'Archivo CSV',
    dropzoneTitle: 'Arrastra tu archivo CSV aquí',
    dropzoneSubtitle: 'o haz clic para explorar en tu computadora (.csv)',
    dropzoneActive: '¡Suelta el archivo aquí!',
    loadSampleButton: 'Cargar CSV de prueba',
    changeFileButton: 'Cambiar archivo',
    winnerCountLabel: 'Cantidad de ganadores',
    dedupeLabel: 'Criterio de duplicados',
    dedupeAuto: 'Automático (correo si existe, sino nombre)',
    dedupeName: 'Solo por Nombre',
    dedupeEmail: 'Solo por Correo',
    processButton: 'Procesar archivo CSV',
    processingButton: 'Procesando participantes...',
    drawButton: '¡Sortear ahora!',
    drawingButton: 'Sorteando ganadores...',
    redrawButton: 'Sortear nuevamente',
    downloadButton: 'Descargar resultados (.CSV)',
    tableIndex: '#',
    tableParticipant: 'Participante',
    tableEmail: 'Correo electrónico',
    searchPlaceholder: 'Buscar participante por nombre o correo...',
    noResultsFound: 'No se encontraron participantes que coincidan con la búsqueda.',
    winnerLabel: 'Ganador',
    noEmail: 'Sin correo registrado',
    downloadFilename: 'ganadores-devopsdays-lima.csv',
    csvHeader: 'puesto,nombre,correo,fecha_sorteo',
    copiedAlert: '¡Copiado al portapapeles!',
    copyButton: 'Copiar',
  },
  en: {
    badge: 'Official raffle',
    lead: '🎉 Day 1 Raffle, Aug 27 🎟️✨',
    stepUploadTitle: '1. Upload participants',
    stepUploadHint: 'Upload your CSV file with at least a name column. You may also include lastname and email.',
    stepValidTitle: '2. Valid participants',
    stepDrawTitle: '3. Run raffle',
    drawHint: 'Real-time cryptographic random generation with live wheel animation.',
    fileRequiredAlert: 'Please select or drop a CSV file first.',
    invalidCsvAlert: 'The CSV file does not contain enough valid rows.',
    missingNameAlert: 'Could not find a name column. Make sure your CSV includes a "nombre" or "name" column.',
    missingParticipantsAlert: 'Please upload and process participants first.',
    invalidWinnerCountAlert: 'Number of winners must be between 1 and total available participants.',
    emptyState: 'No participants processed yet. Upload a CSV file to get started.',
    statsRead: 'Rows read',
    statsValid: 'Valid participants',
    statsDuplicates: 'Duplicates filtered',
    fileInputLabel: 'CSV file',
    dropzoneTitle: 'Drop your CSV file here',
    dropzoneSubtitle: 'or click to browse from your device (.csv)',
    dropzoneActive: 'Drop your file right here!',
    loadSampleButton: 'Load sample CSV',
    changeFileButton: 'Change file',
    winnerCountLabel: 'Number of winners',
    dedupeLabel: 'Deduplication mode',
    dedupeAuto: 'Automatic (email if present, otherwise name)',
    dedupeName: 'By Name only',
    dedupeEmail: 'By Email only',
    processButton: 'Process CSV file',
    processingButton: 'Processing participants...',
    drawButton: 'Draw winners now!',
    drawingButton: 'Drawing winners...',
    redrawButton: 'Draw again',
    downloadButton: 'Download results (.CSV)',
    tableIndex: '#',
    tableParticipant: 'Participant',
    tableEmail: 'Email address',
    searchPlaceholder: 'Search participant by name or email...',
    noResultsFound: 'No participants found matching your search.',
    winnerLabel: 'Winner',
    noEmail: 'No email registered',
    downloadFilename: 'devopsdays-lima-winners.csv',
    csvHeader: 'position,name,email,draw_date',
    copiedAlert: 'Copied to clipboard!',
    copyButton: 'Copy',
  },
}
