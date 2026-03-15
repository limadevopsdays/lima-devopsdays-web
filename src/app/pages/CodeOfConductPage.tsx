import { Shield, Heart, Users, AlertTriangle, Mail, CheckCircle } from 'lucide-react'
import { SectionHeader } from '../components/devopsdays/SectionHeader'
import styles from './CodeOfConductPage.module.css'

const EXPECTED_BEHAVIORS = [
  'Ser respetuoso con diferentes opiniones, puntos de vista y experiencias',
  'Dar y aceptar críticas constructivas de manera profesional',
  'Demostrar empatía y amabilidad hacia los demás participantes',
  'Ser considerado con el tiempo y espacio de los demás',
  'Usar lenguaje inclusivo y profesional en todo momento',
  'Respetar los límites y privacidad de otros asistentes'
]

const UNACCEPTABLE_BEHAVIORS = [
  'Acoso o intimidación de cualquier tipo, ya sea verbal, física o virtual',
  'Comentarios ofensivos relacionados con género, orientación sexual, raza, religión o discapacidad',
  'Atención sexual no deseada, comentarios inapropiados o avances no solicitados',
  'Interrupción deliberada de charlas, presentaciones u otros eventos',
  'Publicación de información privada de otros sin permiso explícito',
  'Conducta que pueda considerarse inapropiada en un entorno profesional'
]

const CONSEQUENCES = [
  {
    level: 'Advertencia Verbal',
    description: 'Primera instancia de comportamiento inapropiado menor. Se proporciona orientación clara sobre el comportamiento esperado.'
  },
  {
    level: 'Advertencia Formal',
    description: 'Comportamiento repetitivo o de mayor gravedad. Se documenta y comunica formalmente al infractor.'
  },
  {
    level: 'Expulsión Temporal',
    description: 'Comportamiento grave o repetitivo. Expulsión del evento actual y prohibición de asistir a eventos futuros por un período determinado.'
  },
  {
    level: 'Expulsión Permanente',
    description: 'Violación grave o repetida del código. Prohibición permanente de todos los eventos DevOpsDays Lima.'
  }
]

export default function CodeOfConductPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitlePrimary}>Construyendo una comunidad</span><br />
            <span className={styles.heroTitleAccent}>segura e inclusiva</span>
          </h1>
        </div>
      </section>

      {/* Purpose */}
      <section className={styles.purposeSection}>
        <div className={styles.container}>
          <div className={styles.purposeCard}>
            <div className={styles.purposeIcon}>
              <Heart size={40} />
            </div>
            <h2 className={styles.purposeTitle}>Nuestro Propósito</h2>
            <p className={styles.purposeText}>
              Este Código de Conducta describe las expectativas para todos aquellos que participan 
              en DevOpsDays Lima, ya sea como asistentes, speakers, sponsors, organizadores o 
              voluntarios. Nuestro objetivo es crear un ambiente donde todos se sientan bienvenidos, 
              seguros y capaces de participar plenamente.
            </p>
            <p className={styles.purposeText}>
              No toleramos el acoso en ninguna forma. Los participantes que violen estas reglas 
              pueden ser sancionados o expulsados del evento a discreción de los organizadores.
            </p>
          </div>
        </div>
      </section>

      {/* Expected Behavior */}
      <section className={styles.behaviorSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Comportamiento Esperado"
            title="Lo que esperamos de nuestra comunidad"
          />

          <div className={styles.behaviorGrid}>
            {EXPECTED_BEHAVIORS.map((behavior, idx) => (
              <div key={idx} className={styles.behaviorCard}>
                <CheckCircle className={styles.behaviorIcon} />
                <p className={styles.behaviorText}>{behavior}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unacceptable Behavior */}
      <section className={styles.unacceptableSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Comportamiento Inaceptable"
            title="Lo que no toleramos"
            lead="Los siguientes comportamientos son considerados acoso y son inaceptables en nuestros eventos"
          />

          <div className={styles.unacceptableGrid}>
            {UNACCEPTABLE_BEHAVIORS.map((behavior, idx) => (
              <div key={idx} className={styles.unacceptableCard}>
                <AlertTriangle className={styles.unacceptableIcon} />
                <p className={styles.unacceptableText}>{behavior}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consequences */}
      <section className={styles.consequencesSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Consecuencias"
            title="Qué pasa si se viola el código"
          />

          <div className={styles.consequencesGrid}>
            {CONSEQUENCES.map((consequence, idx) => (
              <div key={idx} className={styles.consequenceCard}>
                <div className={styles.consequenceLevel}>{idx + 1}</div>
                <h3 className={styles.consequenceTitle}>{consequence.level}</h3>
                <p className={styles.consequenceDescription}>{consequence.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className={styles.reportingSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Cómo Reportar"
            title="¿Presenciaste o experimentaste acoso?"
          />

          <div className={styles.reportingCard}>
            <Users className={styles.reportingIcon} />
            
            <h3 className={styles.reportingTitle}>Canales de Reporte</h3>
            
            <div className={styles.reportingOptions}>
              <div className={styles.reportingOption}>
                <h4 className={styles.optionTitle}>En el Evento</h4>
                <p className={styles.optionText}>
                  Busca a cualquier miembro del equipo organizador (identificados con credenciales especiales) 
                  o acércate al Registration Desk.
                </p>
              </div>

              <div className={styles.reportingOption}>
                <h4 className={styles.optionTitle}>Por Email</h4>
                <p className={styles.optionText}>
                  Envía un reporte confidencial a:{' '}
                  <a
                    href="mailto:conduct@devopsdays.pe"
                    className={styles.emailLink}
                    data-track-name="contactar_email_reporting_code_of_conduct"
                  >
                    conduct@devopsdays.pe
                  </a>
                </p>
              </div>

              <div className={styles.reportingOption}>
                <h4 className={styles.optionTitle}>Anónimo</h4>
                <p className={styles.optionText}>
                  Si prefieres reportar de forma anónima, puedes usar nuestro formulario web 
                  que no requiere identificación personal.
                </p>
              </div>
            </div>

            <div className={styles.reportingNote}>
              <Shield className={styles.shieldIcon} />
              <p>
                <strong>Confidencialidad garantizada:</strong> Todos los reportes serán tratados con 
                estricta confidencialidad. Solo se compartirá la información necesaria para investigar 
                y resolver el incidente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className={styles.scopeSection}>
        <div className={styles.container}>
          <div className={styles.scopeCard}>
            <h3 className={styles.scopeTitle}>Alcance del Código</h3>
            <p className={styles.scopeText}>
              Este Código de Conducta aplica a todos los espacios relacionados con DevOpsDays Lima, 
              incluyendo:
            </p>
            <ul className={styles.scopeList}>
              <li>El evento principal (charlas, workshops, open spaces)</li>
              <li>Eventos sociales oficiales (cenas, after-parties)</li>
              <li>Canales de comunicación online (Slack, Discord, redes sociales)</li>
              <li>Comunicaciones uno-a-uno relacionadas con el evento</li>
              <li>Interacciones en áreas públicas cuando representas al evento</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <Mail className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>¿Preguntas sobre el Código de Conducta?</h2>
          <p className={styles.ctaDescription}>
            Estamos aquí para ayudar. Si tienes dudas o necesitas aclaraciones, no dudes en contactarnos.
          </p>
          
          <a
            href="mailto:conduct@devopsdays.pe"
            className={styles.ctaButton}
            data-track-name="contactar_cta_code_of_conduct"
          >
            <Mail className="w-5 h-5" />
            conduct@devopsdays.pe
          </a>

          <p className={styles.ctaNote}>
            Este código se basa en el{' '}
            <a 
              href="https://www.devopsdays.org/code-of-conduct/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaLink}
              data-track-name="ver_codigo_oficial_cta_code_of_conduct"
            >
              Código de Conducta oficial de DevOpsDays
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
