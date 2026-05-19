import { Home, Search, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.errorCode}>404</div>
        
        <h1 className={styles.title}>Página no encontrada</h1>
        
        <p className={styles.description}>
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton} data-track-name="volver_inicio_actions_not_found">
            <Home className="w-5 h-5" />
            Volver al Inicio
          </Link>
          
          <Link to="/tickets" className={styles.secondaryButton} data-track-name="ver_tickets_actions_not_found">
            <Search className="w-5 h-5" />
            Ver Tickets
          </Link>
        </div>

        <button 
          onClick={() => window.history.back()}
          className={styles.backButton}
          data-track-name="volver_atras_actions_not_found"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver atrás
        </button>
      </div>
    </div>
  )
}
