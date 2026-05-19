import mixpanel from 'mixpanel-browser'

const fallbackToken = '327a31dfffa0425ec3883edce917cf30'
const token = import.meta.env.VITE_MIXPANEL_TOKEN || fallbackToken

let initialized = false
let lastTrackedPath: string | null = null

export function initMixpanel() {
  if (initialized || !token) {
    return
  }

  mixpanel.init(token, {
    autocapture: {
      click: false,
      pageview: false,
    },
    record_sessions_percent: 100,
    record_heatmap_data: true,
    debug: import.meta.env.DEV,
  })

  initialized = true
}

export function trackPageView(path: string) {
  if (!initialized || !path || lastTrackedPath === path) {
    return
  }

  mixpanel.track_pageview({
    page: path,
    path,
  })

  lastTrackedPath = path
}

function normalizeText(value: string | null | undefined) {
  return value?.replace(/\s+/g, ' ').trim() || ''
}

function getElementLabel(element: HTMLElement) {
  const ariaLabel = normalizeText(element.getAttribute('aria-label'))
  const title = normalizeText(element.getAttribute('title'))
  const text = normalizeText(element.textContent)

  return ariaLabel || title || text || 'unlabeled'
}

function isButtonLikeLink(element: HTMLAnchorElement) {
  const className = typeof element.className === 'string' ? element.className.toLowerCase() : ''
  const role = element.getAttribute('role')
  const ariaLabel = normalizeText(element.getAttribute('aria-label'))
  const dataTrackName = normalizeText(element.getAttribute('data-track-name'))

  return (
    role === 'button' ||
    className.includes('button') ||
    className.includes('btn') ||
    className.includes('cta') ||
    Boolean(ariaLabel) ||
    Boolean(dataTrackName)
  )
}

export function getTrackableButtonTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null
  }

  const element = target.closest('button, input[type="button"], input[type="submit"], input[type="reset"], a, [role="button"]')

  if (!(element instanceof HTMLElement)) {
    return null
  }

  if (element.dataset.trackIgnore === 'true' || element.getAttribute('aria-hidden') === 'true') {
    return null
  }

  if (element instanceof HTMLAnchorElement && !isButtonLikeLink(element)) {
    return null
  }

  return element
}

export function trackButtonClick(element: HTMLElement) {
  if (!initialized) {
    return
  }

  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const destination =
    element instanceof HTMLAnchorElement
      ? element.href
      : element.getAttribute('data-track-destination') || undefined

  mixpanel.track('Button Click', {
    button_name: normalizeText(element.getAttribute('data-track-name')) || undefined,
    button_label: getElementLabel(element),
    button_type: element.tagName.toLowerCase(),
    button_id: element.id || undefined,
    button_classes: typeof element.className === 'string' ? element.className : undefined,
    current_path: currentPath,
    destination,
  })
}

export { mixpanel }
