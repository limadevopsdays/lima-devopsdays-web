import { Home, Search, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { useI18n } from '../../i18n'
import { notFoundPageI18n } from './i18n'
import styles from './index.module.css'

export default function NotFoundPage() {
  const t = useI18n(notFoundPageI18n)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.errorCode}>404</div>

        <h1 className={styles.title}>{t.title}</h1>

        <p className={styles.description}>{t.description}</p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton} data-track-name="volver_inicio_actions_not_found">
            <Home className="w-5 h-5" />
            {t.backToHome}
          </Link>

          <Link to="/tickets" className={styles.secondaryButton} data-track-name="ver_tickets_actions_not_found">
            <Search className="w-5 h-5" />
            {t.viewTickets}
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className={styles.backButton}
          data-track-name="volver_atras_actions_not_found"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.goBack}
        </button>
      </div>
    </div>
  )
}
