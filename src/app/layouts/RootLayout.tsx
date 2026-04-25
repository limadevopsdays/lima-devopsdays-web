import { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { ChevronUp } from 'lucide-react'
import { NavbarSection } from '../components/devopsdays/NavbarSection'
import { FooterSection } from '../components/devopsdays/FooterSection'
import { getTrackableButtonTarget, trackButtonClick, trackPageView } from '../lib/mixpanel'
import styles from './RootLayout.module.css'

const SITE_URL = 'https://devopsdays.pe'

const routeSeo: Record<
  string,
  {
    title: string
    description: string
    canonicalPath: string
    robots?: string
  }
> = {
  '/': {
    title: 'DevOpsDays Lima 2026 | 27 y 28 de agosto en Lima',
    description:
      'DevOpsDays Lima 2026 - Conecta con expertos internacionales, aprende las ultimas tendencias DevOps y transforma tu carrera. 27-28 de agosto 2026 · Centro de Convenciones, Lima, Peru.',
    canonicalPath: '/',
    robots: 'index,follow,max-image-preview:large',
  },
  '/tickets': {
    title: 'Tickets | DevOpsDays Lima 2026',
    description:
      'Compra tus tickets para DevOpsDays Lima 2026 y elige la modalidad que mejor se ajuste a tu experiencia durante el evento.',
    canonicalPath: '/tickets',
    robots: 'index,follow,max-image-preview:large',
  },
  '/sorteo-entradas': {
    title: 'Sorteo de entradas | DevOpsDays Lima 2026',
    description:
      'Carga un CSV de participantes y ejecuta el sorteo de entradas de DevOpsDays Lima 2026 con validación básica y selección aleatoria.',
    canonicalPath: '/sorteo-entradas',
    robots: 'noindex,follow',
  },
  '/speakers': {
    title: 'Speakers | DevOpsDays Lima 2026',
    description:
      'Conoce a los speakers de DevOpsDays Lima 2026 y revisa la convocatoria para compartir experiencias reales con la comunidad.',
    canonicalPath: '/speakers',
    robots: 'index,follow,max-image-preview:large',
  },
  '/sponsors': {
    title: 'Sponsors | DevOpsDays Lima 2026',
    description:
      'Revisa las oportunidades de sponsorship de DevOpsDays Lima 2026 y descarga el brochure oficial para marcas y partners.',
    canonicalPath: '/sponsors',
    robots: 'index,follow,max-image-preview:large',
  },
  '/code-of-conduct': {
    title: 'Code of Conduct | DevOpsDays Lima 2026',
    description:
      'Consulta el codigo de conducta oficial de DevOpsDays Lima 2026 para asistentes, speakers, sponsors y organizadores.',
    canonicalPath: '/code-of-conduct',
    robots: 'index,follow,max-image-preview:large',
  },
}

function ScrollToTop() {
  const location = useLocation()

  useLayoutEffect(() => {
    if (location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  return null
}

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`

    trackPageView(path)
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const element = getTrackableButtonTarget(event.target)

      if (!element) {
        return
      }

      trackButtonClick(element)
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  return null
}

function SeoTracker() {
  const location = useLocation()

  useEffect(() => {
    const seo = routeSeo[location.pathname] ?? {
      title: 'Pagina no encontrada | DevOpsDays Lima 2026',
      description: 'La pagina que buscas no existe o fue movida dentro de DevOpsDays Lima 2026.',
      canonicalPath: location.pathname,
      robots: 'noindex,follow',
    }

    document.title = seo.title

    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector(selector)
      if (element) {
        element.setAttribute('content', content)
      }
    }

    const canonicalHref = `${SITE_URL}${seo.canonicalPath}`
    const canonicalTag = document.querySelector('link[rel="canonical"]')
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonicalHref)
    }

    setMeta('meta[name="title"]', seo.title)
    setMeta('meta[name="description"]', seo.description)
    setMeta('meta[name="robots"]', seo.robots ?? 'index,follow,max-image-preview:large')
    setMeta('meta[property="og:title"]', seo.title)
    setMeta('meta[property="og:description"]', seo.description)
    setMeta('meta[property="og:url"]', canonicalHref)
    setMeta('meta[property="twitter:title"]', seo.title)
    setMeta('meta[property="twitter:description"]', seo.description)
    setMeta('meta[property="twitter:url"]', canonicalHref)
  }, [location.pathname])

  return null
}

function FloatingScrollTopButton() {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const aboutSection = document.getElementById('about')

      if (!aboutSection) {
        setIsVisible(false)
        return
      }

      const aboutTop = aboutSection.getBoundingClientRect().top + window.scrollY
      setIsVisible(window.scrollY >= aboutTop)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [location.pathname, location.hash])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`${styles.scrollTopButton} ${isVisible ? styles.scrollTopButtonVisible : ''}`.trim()}
      onClick={handleClick}
      aria-label="Volver arriba"
      data-track-name="scroll_top_floating"
      tabIndex={isVisible ? 0 : -1}
    >
      <ChevronUp className={styles.scrollTopIcon} />
    </button>
  )
}

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <SeoTracker />
      <FloatingScrollTopButton />
      <NavbarSection />
      <main id="main-content">
        <Outlet />
      </main>
      <FooterSection />
    </>
  )
}
