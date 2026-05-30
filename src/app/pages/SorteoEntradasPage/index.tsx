import { useState } from 'react'
import { useI18n } from '../../i18n'
import { sorteoEntradasPageI18n } from './i18n'
import styles from './index.module.css'

type Participant = {
  name: string
  email: string
}

type DedupeMode = 'auto' | 'name' | 'email'
type LoadSummary = {
  totalRows: number
  uniqueParticipants: number
}

function parseCSV(text: string) {
  const rows: string[][] = []
  let row: string[] = []
  let value = ''
  let insideQuotes = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const next = text[index + 1]

    if (char === '"' && insideQuotes && next === '"') {
      value += '"'
      index += 1
    } else if (char === '"') {
      insideQuotes = !insideQuotes
    } else if (char === ',' && !insideQuotes) {
      row.push(value.trim())
      value = ''
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (value || row.length) {
        row.push(value.trim())
        rows.push(row)
        row = []
        value = ''
      }

      if (char === '\r' && next === '\n') {
        index += 1
      }
    } else {
      value += char
    }
  }

  if (value || row.length) {
    row.push(value.trim())
    rows.push(row)
  }

  return rows
}

function normalizeHeader(header: string) {
  return header
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function findColumn(headers: string[], candidates: string[]) {
  const normalized = headers.map(normalizeHeader)

  for (const candidate of candidates) {
    const candidateIndex = normalized.indexOf(candidate)
    if (candidateIndex !== -1) {
      return candidateIndex
    }
  }

  return -1
}

function secureRandomIndex(max: number) {
  if (window.crypto?.getRandomValues) {
    const values = new Uint32Array(1)
    window.crypto.getRandomValues(values)
    return values[0] % max
  }

  return Math.floor(Math.random() * max)
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function buildParticipantKey(participant: Participant, dedupeMode: DedupeMode) {
  if (dedupeMode === 'email') {
    return participant.email.toLowerCase().trim()
  }

  if (dedupeMode === 'name') {
    return participant.name.toLowerCase().trim()
  }

  return participant.email ? participant.email.toLowerCase().trim() : participant.name.toLowerCase().trim()
}

export default function SorteoEntradasPage() {
  const t = useI18n(sorteoEntradasPageI18n)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [winnerCount, setWinnerCount] = useState(2)
  const [dedupeMode, setDedupeMode] = useState<DedupeMode>('auto')
  const [participants, setParticipants] = useState<Participant[]>([])
  const [winners, setWinners] = useState<Participant[]>([])
  const [countdown, setCountdown] = useState('')
  const [loadSummary, setLoadSummary] = useState<LoadSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleProcessCsv = async () => {
    if (!selectedFile) {
      window.alert(t.fileRequiredAlert)
      return
    }

    try {
      setIsLoading(true)
      const text = await selectedFile.text()
      const rows = parseCSV(text).filter((row) => row.some((cell) => cell.trim() !== ''))

      if (rows.length < 2) {
        throw new Error(t.invalidCsvAlert)
      }

      const headers = rows[0] ?? []
      const nameIndex = findColumn(headers, [
        'nombre',
        'nombres',
        'nombre completo',
        'name',
        'full name',
        'fullname',
        'participante',
        'asistente',
      ])
      const lastNameIndex = findColumn(headers, ['apellido', 'apellidos', 'lastname', 'last name'])
      const emailIndex = findColumn(headers, ['correo', 'correo electronico', 'email', 'e-mail', 'mail'])

      if (nameIndex === -1) {
        throw new Error(t.missingNameAlert)
      }

      const seen = new Set<string>()
      const nextParticipants: Participant[] = []

      for (let index = 1; index < rows.length; index += 1) {
        const currentRow = rows[index] ?? []
        const firstName = currentRow[nameIndex] ?? ''
        const lastName = lastNameIndex !== -1 ? (currentRow[lastNameIndex] ?? '') : ''
        const email = emailIndex !== -1 ? (currentRow[emailIndex] ?? '') : ''
        const name = `${firstName} ${lastName}`.replace(/\s+/g, ' ').trim()

        if (!name) {
          continue
        }

        const participant = { name, email }
        const key = buildParticipantKey(participant, dedupeMode)

        if (!key || seen.has(key)) {
          continue
        }

        seen.add(key)
        nextParticipants.push(participant)
      }

      setParticipants(nextParticipants)
      setWinners([])
      setCountdown('')
      setLoadSummary({
        totalRows: rows.length - 1,
        uniqueParticipants: nextParticipants.length,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : t.invalidCsvAlert
      window.alert(message)
      setParticipants([])
      setWinners([])
      setCountdown('')
      setLoadSummary(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDraw = async () => {
    if (!participants.length) {
      window.alert(t.missingParticipantsAlert)
      return
    }

    if (winnerCount < 1 || winnerCount > participants.length) {
      window.alert(t.invalidWinnerCountAlert)
      return
    }

    setIsDrawing(true)
    setWinners([])

    for (const step of ['3', '2', '1', '🎉']) {
      setCountdown(step)
      await wait(step === '🎉' ? 500 : 700)
    }

    const pool = [...participants]
    const nextWinners: Participant[] = []

    for (let index = 0; index < winnerCount; index += 1) {
      const winnerIndex = secureRandomIndex(pool.length)
      const [winner] = pool.splice(winnerIndex, 1)

      if (winner) {
        nextWinners.push(winner)
      }
    }

    setWinners(nextWinners)
    setCountdown('')
    setIsDrawing(false)
  }

  const handleDownload = () => {
    const now = new Date().toISOString()
    const csv = [
      t.csvHeader,
      ...winners.map((winner, index) => {
        const escapedName = winner.name.replaceAll('"', '""')
        const escapedEmail = winner.email.replaceAll('"', '""')
        return `${index + 1},"${escapedName}","${escapedEmail}",${now}`
      }),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = t.downloadFilename
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <span className={styles.badge}>● {t.badge}</span>
          <h1 className={styles.title}>
            DevOpsDays
            <br />
            <span>Lima 2026</span>
          </h1>
          <p className={styles.lead}>{t.lead}</p>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h2>{t.stepUploadTitle}</h2>
            <p className={styles.hint}>{t.stepUploadHint}</p>

            <label className={styles.fileField}>
              <span className={styles.fieldLabel}>{t.fileInputLabel}</span>
              <input
                className={styles.fileInput}
                type="file"
                accept=".csv"
                onChange={(event) => {
                  setSelectedFile(event.target.files?.[0] ?? null)
                }}
              />
            </label>

            <div className={styles.controls}>
              <label className={styles.field}>
                <span>{t.winnerCountLabel}</span>
                <input
                  type="number"
                  min="1"
                  value={winnerCount}
                  onChange={(event) => {
                    setWinnerCount(Number(event.target.value))
                  }}
                />
              </label>

              <label className={styles.field}>
                <span>{t.dedupeLabel}</span>
                <select
                  value={dedupeMode}
                  onChange={(event) => {
                    setDedupeMode(event.target.value as DedupeMode)
                  }}
                >
                  <option value="auto">{t.dedupeAuto}</option>
                  <option value="name">{t.dedupeName}</option>
                  <option value="email">{t.dedupeEmail}</option>
                </select>
              </label>
            </div>

            <button
              type="button"
              className={`${styles.button} ${styles.loadButton}`}
              onClick={handleProcessCsv}
              disabled={isLoading}
              data-track-name="procesar_csv_sorteo_entradas"
            >
              {isLoading ? t.processingButton : t.processButton}
            </button>
          </article>

          <article className={styles.card}>
            <h2>{t.stepValidTitle}</h2>
            <div className={styles.stats}>
              {loadSummary ? (
                <>
                  {t.statsRead}: <strong>{loadSummary.totalRows}</strong> | {t.statsValid}:{' '}
                  <strong>{loadSummary.uniqueParticipants}</strong>
                </>
              ) : (
                t.emptyState
              )}
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t.tableIndex}</th>
                    <th>{t.tableParticipant}</th>
                    <th>{t.tableEmail}</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant, index) => (
                    <tr key={`${participant.email}-${participant.name}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{participant.name}</td>
                      <td>{participant.email || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className={`${styles.card} ${styles.drawCard}`}>
            <h2>{t.stepDrawTitle}</h2>
            <p className={styles.hint}>{t.drawHint}</p>

            <button
              type="button"
              className={styles.button}
              onClick={handleDraw}
              disabled={!participants.length || isDrawing}
              data-track-name="sortear_entradas"
            >
              {isDrawing ? t.drawingButton : t.drawButton}
            </button>

            <div className={styles.countdown} aria-live="polite">
              {countdown}
            </div>

            <div className={styles.winners}>
              {winners.map((winner, index) => (
                <div key={`${winner.email}-${winner.name}-${index}`} className={styles.winner}>
                  <strong>
                    {t.winnerLabel} {index + 1}: {winner.name}
                  </strong>
                  <span>{winner.email || t.noEmail}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.button} ${styles.downloadButton}`}
              onClick={handleDownload}
              disabled={!winners.length || isDrawing}
              data-track-name="descargar_resultado_sorteo_entradas"
            >
              {t.downloadButton}
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}
