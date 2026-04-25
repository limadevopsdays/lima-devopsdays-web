import { useMemo, useState } from 'react'
import styles from './SorteoEntradasPage.module.css'

type Participant = {
  name: string
  email: string
}

type DedupeMode = 'auto' | 'name' | 'email'

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

async function readFileAsText(file: File) {
  return await file.text()
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

function formatRows(rows: string[][], dedupeMode: DedupeMode) {
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
    throw new Error('No encontré una columna de nombre. Usa una columna llamada nombre.')
  }

  const seen = new Set<string>()
  const formatted: Participant[] = []

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
    formatted.push(participant)
  }

  return {
    emailIndex,
    participants: formatted,
    totalRows: rows.length - 1,
  }
}

function downloadWinnersCsv(winners: Participant[]) {
  const now = new Date().toISOString()
  const csv = [
    'puesto,nombre,correo,fecha_sorteo',
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
  link.download = 'ganadores-devopsdays-lima.csv'
  link.click()
  URL.revokeObjectURL(url)
}

export default function SorteoEntradasPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [winnerCount, setWinnerCount] = useState(2)
  const [dedupeMode, setDedupeMode] = useState<DedupeMode>('auto')
  const [participants, setParticipants] = useState<Participant[]>([])
  const [winners, setWinners] = useState<Participant[]>([])
  const [countdown, setCountdown] = useState('')
  const [loadMessage, setLoadMessage] = useState('Aún no se cargó ningún archivo.')
  const [isLoading, setIsLoading] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)

  const canDraw = participants.length > 0 && !isDrawing
  const canDownload = winners.length > 0 && !isDrawing

  const winnerSummary = useMemo(() => {
    return winners.map((winner, index) => ({
      ...winner,
      position: index + 1,
    }))
  }, [winners])

  const handleProcessCsv = async () => {
    if (!selectedFile) {
      window.alert('Primero selecciona un archivo CSV.')
      return
    }

    try {
      setIsLoading(true)
      const text = await readFileAsText(selectedFile)
      const rows = parseCSV(text).filter((row) => row.some((cell) => cell.trim() !== ''))

      if (rows.length < 2) {
        throw new Error('El CSV no tiene suficientes filas.')
      }

      const result = formatRows(rows, dedupeMode)
      setParticipants(result.participants)
      setWinners([])
      setCountdown('')
      setLoadMessage(
        `Registros leídos: ${result.totalRows} | Participantes válidos únicos: ${result.participants.length}`,
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo procesar el archivo.'
      window.alert(message)
      setParticipants([])
      setWinners([])
      setCountdown('')
      setLoadMessage('Aún no se cargó ningún archivo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDraw = async () => {
    if (!participants.length) {
      window.alert('Primero carga participantes.')
      return
    }

    if (winnerCount < 1 || winnerCount > participants.length) {
      window.alert('El número de ganadores no es válido.')
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

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <span className={styles.badge}>● Sorteo oficial</span>
          <h1 className={styles.title}>
            DevOpsDays
            <br />
            <span>Lima 2026</span>
          </h1>
          <p className={styles.lead}>
            Sorteo por 2 entradas para los que se registraron en el Global Azure.
          </p>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h2>1. Cargar participantes</h2>
            <p className={styles.hint}>
              El CSV debe tener al menos una columna llamada <strong>nombre</strong>. También
              puede incluir <strong>correo</strong>.
            </p>

            <input
              className={styles.fileInput}
              type="file"
              accept=".csv"
              onChange={(event) => {
                setSelectedFile(event.target.files?.[0] ?? null)
              }}
            />

            <div className={styles.controls}>
              <label className={styles.field}>
                <span>Número de ganadores:</span>
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
                <span>Excluir duplicados por:</span>
                <select
                  value={dedupeMode}
                  onChange={(event) => {
                    setDedupeMode(event.target.value as DedupeMode)
                  }}
                >
                  <option value="auto">Automático: correo si existe, si no nombre</option>
                  <option value="name">Nombre</option>
                  <option value="email">Correo</option>
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
              {isLoading ? 'Procesando...' : 'Procesar CSV'}
            </button>
          </article>

          <article className={styles.card}>
            <h2>2. Participantes válidos</h2>
            <div className={styles.stats}>{loadMessage}</div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Participante</th>
                    <th>Correo</th>
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
            <h2>3. Realizar sorteo</h2>
            <p className={styles.hint}>
              Se usa aleatoriedad criptográfica del navegador cuando está disponible.
            </p>

            <button
              type="button"
              className={styles.button}
              onClick={handleDraw}
              disabled={!canDraw}
              data-track-name="sortear_entradas"
            >
              {isDrawing ? 'Sorteando...' : 'Sortear ahora'}
            </button>

            <div className={styles.countdown} aria-live="polite">
              {countdown}
            </div>

            <div className={styles.winners}>
              {winnerSummary.map((winner) => (
                <div key={`${winner.email}-${winner.name}-${winner.position}`} className={styles.winner}>
                  <strong>
                    Ganador {winner.position}: {winner.name}
                  </strong>
                  <span>{winner.email || 'Sin correo registrado'}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.button} ${styles.downloadButton}`}
              onClick={() => {
                downloadWinnersCsv(winners)
              }}
              disabled={!canDownload}
              data-track-name="descargar_resultado_sorteo_entradas"
            >
              Descargar resultado CSV
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}
