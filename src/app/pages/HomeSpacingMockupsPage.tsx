import styles from './HomeSpacingMockupsPage.module.css'

const mockups = [
  {
    id: 'actual',
    title: 'Opcion A: Actual',
    description: 'Sin espaciado adicional entre About, Sponsors y Tickets.',
    src: '/?spacingMockup=actual#about',
  },
  {
    id: 'balanced',
    title: 'Opcion B: Balanceada',
    description: 'Agrega 1.5rem extra entre About -> Sponsors y Sponsors -> Tickets.',
    src: '/?spacingMockup=balanced#about',
  },
  {
    id: 'relaxed',
    title: 'Opcion C: Aire Generoso',
    description: 'Agrega 3rem extra entre las tres secciones para una separacion mas marcada.',
    src: '/?spacingMockup=relaxed#about',
  },
]

export default function HomeSpacingMockupsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Mockups de espaciado</p>
          <h1 className={styles.title}>About, Sponsors y Tickets</h1>
          <p className={styles.lead}>
            Compara tres ritmos verticales del home usando los componentes reales. Cada preview abre anclado en la seccion About.
          </p>
        </div>

        <div className={styles.grid}>
          {mockups.map((mockup) => (
            <section key={mockup.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>{mockup.title}</h2>
                  <p className={styles.cardDescription}>{mockup.description}</p>
                </div>
                <a className={styles.openLink} href={mockup.src} target="_blank" rel="noreferrer">
                  Abrir sola
                </a>
              </div>

              <div className={styles.previewFrame}>
                <iframe
                  title={mockup.title}
                  src={mockup.src}
                  className={styles.iframe}
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
