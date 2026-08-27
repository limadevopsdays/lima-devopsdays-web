import { useState, useRef, useEffect, useMemo, type DragEvent } from 'react'
import {
  UploadCloud,
  FileSpreadsheet,
  Users,
  Trophy,
  Sparkles,
  Download,
  RotateCcw,
  Search,
  Check,
  Copy,
  Plus,
  Minus,
  Trash2,
  Medal,
  CheckCircle2,
} from 'lucide-react'
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
  duplicates: number
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

const AVATAR_STYLES = [
  'bottts',
  'fun-emoji',
  'adventurer',
  'pixel-art',
  'lorelei',
  'big-smile',
  'notionists',
]

const FALLBACK_EMOJIS = ['🤖', '🚀', '👾', '🎯', '🦄', '🐱', '🦊', '⭐', '⚡', '🎉', '🎩', '🦖']

function getAvatarUrl(seed: string, index: number) {
  const style = AVATAR_STYLES[index % AVATAR_STYLES.length]
  const cleanSeed = encodeURIComponent(seed || `winner-${index}`)
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${cleanSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
}

function getFallbackEmoji(index: number) {
  return FALLBACK_EMOJIS[index % FALLBACK_EMOJIS.length] ?? '🏆'
}

export default function SorteoEntradasPage() {
  const t = useI18n(sorteoEntradasPageI18n)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [winnerCount, setWinnerCount] = useState(2)
  const [dedupeMode, setDedupeMode] = useState<DedupeMode>('auto')
  const [participants, setParticipants] = useState<Participant[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [winners, setWinners] = useState<Participant[]>([])
  const [countdown, setCountdown] = useState('')
  const [shufflingName, setShufflingName] = useState('')
  const [loadSummary, setLoadSummary] = useState<LoadSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [avatarErrors, setAvatarErrors] = useState<Record<string, boolean>>({})

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Confetti Particle Engine
  const triggerConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      r: number
      color: string
      tilt: number
      tiltAngle: number
      tiltAngleInc: number
      vx: number
      vy: number
      opacity: number
    }> = []

    const colors = ['#744cf5', '#ff7a1a', '#65c64c', '#38bdf8', '#fbbf24', '#ec4899']

    for (let i = 0; i < 150; i += 1) {
      particles.push({
        x: canvas.width / 2 + (Math.random() * 400 - 200),
        y: canvas.height / 3 + (Math.random() * 200 - 100),
        r: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)] ?? '#744cf5',
        tilt: Math.random() * 10 - 10,
        tiltAngle: Math.random() * Math.PI,
        tiltAngleInc: Math.random() * 0.1 + 0.05,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 16,
        opacity: 1,
      })
    }

    let animationFrameId: number
    let frame = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let stillAlive = false
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.35 // gravity
        p.vx *= 0.98 // friction
        p.tiltAngle += p.tiltAngleInc
        p.tilt = Math.sin(p.tiltAngle) * 12

        if (frame > 60) {
          p.opacity -= 0.015
        }

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          stillAlive = true
          ctx.beginPath()
          ctx.lineWidth = p.r
          ctx.strokeStyle = p.color
          ctx.globalAlpha = Math.max(0, p.opacity)
          ctx.moveTo(p.x + p.tilt + p.r / 2, p.y)
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2)
          ctx.stroke()
        }
      }

      ctx.globalAlpha = 1
      frame += 1

      if (stillAlive && frame < 200) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }

  const handleProcessCsvText = (text: string) => {
    try {
      setIsLoading(true)
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
      let duplicatesCount = 0

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
          duplicatesCount += 1
          continue
        }

        seen.add(key)
        nextParticipants.push(participant)
      }

      setParticipants(nextParticipants)
      setWinners([])
      setCountdown('')
      setShufflingName('')
      setLoadSummary({
        totalRows: rows.length - 1,
        uniqueParticipants: nextParticipants.length,
        duplicates: duplicatesCount,
      })

      if (winnerCount > nextParticipants.length) {
        setWinnerCount(Math.max(1, nextParticipants.length))
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : t.invalidCsvAlert
      window.alert(message)
      setParticipants([])
      setWinners([])
      setCountdown('')
      setShufflingName('')
      setLoadSummary(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProcessCsv = async () => {
    if (!selectedFile) {
      window.alert(t.fileRequiredAlert)
      return
    }

    const text = await selectedFile.text()
    handleProcessCsvText(text)
  }

  const handleLoadSample = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/sample-participantes-sorteo.csv')
      if (res.ok) {
        const text = await res.text()
        const file = new File([text], 'sample-participantes-sorteo.csv', { type: 'text/csv' })
        setSelectedFile(file)
        handleProcessCsvText(text)
      } else {
        // Embedded sample fallback
        const sampleText = `nombre,apellido,correo
Carlos,Pérez,carlos.perez@example.com
María,Gómez,maria.gomez@example.com
Juan,Rodríguez,juan.rodriguez@example.com
Ana,Torres,ana.torres@example.com
Luis,Mendoza,luis.mendoza@example.com
Sofía,Flores,sofia.flores@example.com
Diego,Vargas,diego.vargas@example.com
Lucía,Castillo,lucia.castillo@example.com
Mateo,Reyes,mateo.reyes@example.com
Valeria,Ramos,valeria.ramos@example.com`
        const file = new File([sampleText], 'sample-participantes-sorteo.csv', { type: 'text/csv' })
        setSelectedFile(file)
        handleProcessCsvText(sampleText)
      }
    } catch {
      window.alert('No se pudo cargar el archivo de prueba.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    const files = event.dataTransfer.files
    if (files.length > 0 && files[0]) {
      const file = files[0]
      if (file.name.toLowerCase().endsWith('.csv')) {
        setSelectedFile(file)
      } else {
        window.alert('Por favor selecciona un archivo con extensión .csv')
      }
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

    // Roulette shuffle effect
    const shuffleInterval = setInterval(() => {
      const randomP = participants[Math.floor(Math.random() * participants.length)]
      if (randomP) {
        setShufflingName(randomP.name)
      }
    }, 80)

    for (const step of ['3', '2', '1', '🎉']) {
      setCountdown(step)
      await wait(step === '🎉' ? 600 : 700)
    }

    clearInterval(shuffleInterval)
    setShufflingName('')

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
    triggerConfetti()
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

  const handleCopyWinner = (winner: Participant, index: number) => {
    const text = `${winner.name} ${winner.email ? `(${winner.email})` : ''}`
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return participants
    const q = searchQuery.toLowerCase()
    return participants.filter(
      (p) => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q),
    )
  }, [participants, searchQuery])

  const step1Done = participants.length > 0
  const step2Done = participants.length > 0
  const step3Done = winners.length > 0

  return (
    <section className={styles.page}>
      <canvas ref={canvasRef} className={styles.confettiCanvas} />

      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            {t.badge}
          </div>
          <h1 className={styles.title}>
            DevOpsDays <span className={styles.titleGradient}>Lima 2026</span>
          </h1>
          <p className={styles.lead}>{t.lead}</p>

          {/* Stepper */}
          <div className={styles.stepper}>
            <div
              className={`${styles.stepItem} ${!step1Done ? styles.stepActive : styles.stepDone}`}
            >
              <span className={styles.stepNumber}>
                {step1Done ? <Check size={13} /> : '1'}
              </span>
              <span>1. Cargar CSV</span>
            </div>
            <span className={styles.stepDivider}>→</span>
            <div
              className={`${styles.stepItem} ${
                step1Done && !step3Done ? styles.stepActive : step3Done ? styles.stepDone : ''
              }`}
            >
              <span className={styles.stepNumber}>
                {step3Done ? <Check size={13} /> : '2'}
              </span>
              <span>2. Verificar ({participants.length})</span>
            </div>
            <span className={styles.stepDivider}>→</span>
            <div className={`${styles.stepItem} ${step3Done ? styles.stepActive : ''}`}>
              <span className={styles.stepNumber}>3</span>
              <span>3. Ganadores {winners.length > 0 ? `(${winners.length})` : ''}</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className={styles.grid}>
          {/* Card 1: Upload */}
          <article className={`${styles.card} ${styles.cardUpload}`}>
            <div className={styles.cardHeader}>
              <UploadCloud className={styles.cardIcon} size={24} />
              <h2>{t.stepUploadTitle}</h2>
            </div>
            <p className={styles.hint}>{t.stepUploadHint}</p>

            {/* Dropzone */}
            {!selectedFile ? (
              <div
                className={`${styles.dropzone} ${isDragOver ? styles.dropzoneActive : ''}`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  className={styles.hiddenFileInput}
                  type="file"
                  accept=".csv"
                  onChange={(event) => {
                    setSelectedFile(event.target.files?.[0] ?? null)
                  }}
                />
                <FileSpreadsheet className={styles.dropzoneIcon} size={36} />
                <div className={styles.dropzoneText}>
                  <strong>{isDragOver ? t.dropzoneActive : t.dropzoneTitle}</strong>
                  <span>{t.dropzoneSubtitle}</span>
                </div>
              </div>
            ) : (
              <div className={styles.fileBadge}>
                <div className={styles.fileBadgeInfo}>
                  <FileSpreadsheet size={24} color="#2563eb" />
                  <div>
                    <div className={styles.fileName}>{selectedFile.name}</div>
                    <div className={styles.fileSize}>
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.sampleButton}
                  onClick={() => {
                    setSelectedFile(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  title="Quitar archivo"
                >
                  <Trash2 size={16} color="#ef4444" />
                </button>
              </div>
            )}

            <div className={styles.sampleActions}>
              <button
                type="button"
                className={styles.sampleButton}
                onClick={handleLoadSample}
              >
                ⚡ {t.loadSampleButton}
              </button>
            </div>

            {/* Controls */}
            <div className={styles.controlsGrid}>
              <div className={styles.controlField}>
                <label className={styles.fieldLabel}>{t.winnerCountLabel}</label>
                <div className={styles.stepperInput}>
                  <button
                    type="button"
                    className={styles.stepperBtn}
                    onClick={() => setWinnerCount((prev) => Math.max(1, prev - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    className={styles.stepperValue}
                    type="number"
                    min="1"
                    value={winnerCount}
                    onChange={(event) => {
                      setWinnerCount(Math.max(1, Number(event.target.value)))
                    }}
                  />
                  <button
                    type="button"
                    className={styles.stepperBtn}
                    onClick={() => setWinnerCount((prev) => prev + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className={styles.presetChips}>
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`${styles.presetChip} ${
                        winnerCount === num ? styles.presetChipActive : ''
                      }`}
                      onClick={() => setWinnerCount(num)}
                    >
                      {num} {num === 1 ? 'ganador' : 'ganadores'}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.controlField}>
                <label className={styles.fieldLabel}>{t.dedupeLabel}</label>
                <select
                  className={styles.selectInput}
                  value={dedupeMode}
                  onChange={(event) => {
                    setDedupeMode(event.target.value as DedupeMode)
                  }}
                >
                  <option value="auto">{t.dedupeAuto}</option>
                  <option value="name">{t.dedupeName}</option>
                  <option value="email">{t.dedupeEmail}</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              className={`${styles.button} ${styles.loadButton}`}
              onClick={handleProcessCsv}
              disabled={isLoading || !selectedFile}
              data-track-name="procesar_csv_sorteo_entradas"
            >
              {isLoading ? (
                t.processingButton
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  {t.processButton}
                </>
              )}
            </button>
          </article>

          {/* Card 2: Participants List */}
          <article className={`${styles.card} ${styles.cardParticipants}`}>
            <div className={styles.cardHeader}>
              <Users className={styles.cardIcon} size={24} />
              <h2>{t.stepValidTitle}</h2>
            </div>

            {loadSummary ? (
              <div className={styles.statsContainer}>
                <div className={styles.statPill}>
                  <span className={styles.statPillLabel}>{t.statsRead}</span>
                  <span className={styles.statPillValue}>{loadSummary.totalRows}</span>
                </div>
                <div className={styles.statPill}>
                  <span className={styles.statPillLabel}>{t.statsValid}</span>
                  <span
                    className={`${styles.statPillValue} ${styles.statPillValueHighlight}`}
                  >
                    {loadSummary.uniqueParticipants}
                  </span>
                </div>
                <div className={styles.statPill}>
                  <span className={styles.statPillLabel}>{t.statsDuplicates}</span>
                  <span className={styles.statPillValue}>{loadSummary.duplicates}</span>
                </div>
              </div>
            ) : null}

            {participants.length > 0 ? (
              <div className={styles.searchBox}>
                <Search className={styles.searchIcon} size={16} />
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            ) : null}

            <div className={styles.tableWrapper}>
              {participants.length === 0 ? (
                <div className={styles.emptyState}>{t.emptyState}</div>
              ) : filteredParticipants.length === 0 ? (
                <div className={styles.emptyState}>{t.noResultsFound}</div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ width: '45px' }}>{t.tableIndex}</th>
                      <th>{t.tableParticipant}</th>
                      <th>{t.tableEmail}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((participant, index) => {
                      const initials = participant.name
                        .split(' ')
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()

                      return (
                        <tr key={`${participant.email}-${participant.name}-${index}`}>
                          <td>{index + 1}</td>
                          <td>
                            <div className={styles.participantCell}>
                              <img
                                src={getAvatarUrl(participant.name || participant.email, index)}
                                alt={participant.name}
                                className={styles.tableAvatarImg}
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none'
                                }}
                              />
                              <strong>{participant.name}</strong>
                            </div>
                          </td>
                          <td>{participant.email || '-'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </article>

          {/* Card 3: Draw Card */}
          <article className={`${styles.card} ${styles.cardDraw}`}>
            <div className={styles.drawHero}>
              <div className={styles.cardHeader} style={{ justifyContent: 'center' }}>
                <Trophy className={styles.cardIcon} size={28} color="#ff7a1a" />
                <h2>{t.stepDrawTitle}</h2>
              </div>
              <p className={styles.hint}>{t.drawHint}</p>

              {/* Roulette / Countdown Banner */}
              {isDrawing && (
                <div className={styles.rouletteBanner}>
                  {countdown && countdown !== '🎉' ? (
                    <div className={styles.countdownDisplay}>{countdown}</div>
                  ) : countdown === '🎉' ? (
                    <div className={styles.countdownDisplay}>🎉</div>
                  ) : (
                    <div className={styles.rouletteName}>{shufflingName || '...'}</div>
                  )}
                </div>
              )}

              {!isDrawing && winners.length === 0 && (
                <div className={styles.drawButtonContainer}>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.bigDrawButton}`}
                    onClick={handleDraw}
                    disabled={!participants.length || isDrawing}
                    data-track-name="sortear_entradas"
                  >
                    <Sparkles size={22} />
                    {t.drawButton}
                  </button>
                </div>
              )}
            </div>

            {/* Winners Section */}
            {winners.length > 0 && !isDrawing && (
              <div className={styles.winnersSection}>
                <h3 className={styles.winnersTitle}>
                  <Trophy size={26} color="#f59e0b" />
                  ¡Ganadores del Sorteo!
                  <Sparkles size={24} color="#744cf5" />
                </h3>

                <div className={styles.winnersGrid}>
                  {winners.map((winner, index) => {
                    const isGold = index === 0

                    return (
                      <div
                        key={`${winner.email}-${winner.name}-${index}`}
                        className={`${styles.winnerCard} ${
                          isGold ? styles.winnerCardGold : ''
                        }`}
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className={styles.winnerHeader}>
                          <span className={styles.winnerRank}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}{' '}
                            {t.winnerLabel} #{index + 1}
                          </span>
                          {index === 0 && <Medal size={20} color="#f59e0b" />}
                        </div>

                        <div className={styles.winnerBody}>
                          <div className={styles.winnerAvatarWrapper}>
                            {!avatarErrors[`winner-${index}`] ? (
                              <img
                                src={getAvatarUrl(`${winner.name}-${winner.email}`, index)}
                                alt={winner.name}
                                className={styles.winnerAvatarImg}
                                loading="lazy"
                                onError={() => {
                                  setAvatarErrors((prev) => ({
                                    ...prev,
                                    [`winner-${index}`]: true,
                                  }))
                                }}
                              />
                            ) : (
                              <div className={styles.winnerAvatarFallback}>
                                {getFallbackEmoji(index)}
                              </div>
                            )}
                          </div>
                          <div className={styles.winnerInfo}>
                            <div className={styles.winnerName} title={winner.name}>
                              {winner.name}
                            </div>
                            <div
                              className={styles.winnerEmail}
                              title={winner.email || t.noEmail}
                            >
                              {winner.email || t.noEmail}
                            </div>
                          </div>
                        </div>

                        <div className={styles.winnerFooter}>
                          <button
                            type="button"
                            className={styles.copyBtn}
                            onClick={() => handleCopyWinner(winner, index)}
                          >
                            {copiedIndex === index ? (
                              <>
                                <Check size={14} color="#16a34a" />
                                {t.copiedAlert}
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                {t.copyButton}
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className={styles.actionsRow}>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.downloadButton}`}
                    onClick={handleDownload}
                    data-track-name="descargar_resultado_sorteo_entradas"
                  >
                    <Download size={18} />
                    {t.downloadButton}
                  </button>

                  <button
                    type="button"
                    className={`${styles.button} ${styles.redrawButton}`}
                    onClick={handleDraw}
                    data-track-name="reintentar_sorteo_entradas"
                  >
                    <RotateCcw size={18} />
                    {t.redrawButton}
                  </button>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
