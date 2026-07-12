import styles from './index.module.css'

const galleryImages = [
  '/images/about/about-1.jpg',
  '/images/about/about-2.jpg',
  '/images/about/about-3.jpg',
  '/images/about/about-4.jpg',
]

export function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      {/* Gallery Image Row */}
      <div className={styles.imageRowContainer}>
        <div className={styles.imageRowGrid}>
          {galleryImages.map((image, idx) => (
            <div key={idx} className={styles.imageRowItem}>
              <img
                src={image}
                alt={`DevOpsDays Lima gallery ${idx + 1}`}
                className={styles.imageRowImg}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
