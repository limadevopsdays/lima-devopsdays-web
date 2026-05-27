import { Shield, Heart, Users, AlertTriangle, Mail, CheckCircle } from 'lucide-react'
import { SectionHeader } from '../../components/devopsdays/SectionHeader'
import { useI18n } from '../../i18n'
import { codeOfConductPageI18n } from './i18n'
import styles from './index.module.css'

export default function CodeOfConductPage() {
  const t = useI18n(codeOfConductPageI18n)

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitlePrimary}>{t.heroTitlePrimary}</span><br />
            <span className={styles.heroTitleAccent}>{t.heroTitleAccent}</span>
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
            <h2 className={styles.purposeTitle}>{t.purposeTitle}</h2>
            <p className={styles.purposeText}>{t.purposeText1}</p>
            <p className={styles.purposeText}>{t.purposeText2}</p>
          </div>
        </div>
      </section>

      {/* Expected Behavior */}
      <section className={styles.behaviorSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow={t.expectedBehaviorEyebrow}
            title={t.expectedBehaviorTitle}
          />

          <div className={styles.behaviorGrid}>
            {t.expectedBehaviors.map((behavior, idx) => (
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
            eyebrow={t.unacceptableEyebrow}
            title={t.unacceptableTitle}
            lead={t.unacceptableLead}
          />

          <div className={styles.unacceptableGrid}>
            {t.unacceptableBehaviors.map((behavior, idx) => (
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
            eyebrow={t.consequencesEyebrow}
            title={t.consequencesTitle}
          />

          <div className={styles.consequencesGrid}>
            {t.consequences.map((consequence, idx) => (
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
            eyebrow={t.reportingEyebrow}
            title={t.reportingTitle}
          />

          <div className={styles.reportingCard}>
            <Users className={styles.reportingIcon} />

            <h3 className={styles.reportingTitle}>{t.reportingChannelsTitle}</h3>

            <div className={styles.reportingOptions}>
              <div className={styles.reportingOption}>
                <h4 className={styles.optionTitle}>{t.reportingOptions[0].title}</h4>
                <p className={styles.optionText}>{t.reportingOptions[0].text}</p>
              </div>

              <div className={styles.reportingOption}>
                <h4 className={styles.optionTitle}>{t.reportingOptions[1].title}</h4>
                <p className={styles.optionText}>
                  {t.reportingEmailNote}
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
                <h4 className={styles.optionTitle}>{t.reportingOptions[2].title}</h4>
                <p className={styles.optionText}>{t.reportingOptions[2].text}</p>
              </div>
            </div>

            <div className={styles.reportingNote}>
              <Shield className={styles.shieldIcon} />
              <p>
                <strong>{t.reportingConfidentialityNote.split(':')[0]}:</strong>
                {t.reportingConfidentialityNote.slice(t.reportingConfidentialityNote.indexOf(':') + 1)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className={styles.scopeSection}>
        <div className={styles.container}>
          <div className={styles.scopeCard}>
            <h3 className={styles.scopeTitle}>{t.scopeTitle}</h3>
            <p className={styles.scopeText}>{t.scopeText}</p>
            <ul className={styles.scopeList}>
              {t.scopeItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <Mail className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
          <p className={styles.ctaDescription}>{t.ctaDescription}</p>

          <a
            href="mailto:conduct@devopsdays.pe"
            className={styles.ctaButton}
            data-track-name="contactar_cta_code_of_conduct"
          >
            <Mail className="w-5 h-5" />
            conduct@devopsdays.pe
          </a>

          <p className={styles.ctaNote}>
            {t.ctaNote}
            <a
              href="https://www.devopsdays.org/code-of-conduct/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaLink}
              data-track-name="ver_codigo_oficial_cta_code_of_conduct"
            >
              {t.ctaLinkText}
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
