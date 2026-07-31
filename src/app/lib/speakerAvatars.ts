import { useEffect, useMemo, useState } from 'react'

type AvatarVariant = 'small' | 'default'

export interface SpeakerAvatarRecord {
  avatar: string | null
  avatar_thumbnail_default?: string | null
  avatar_thumbnail_tiny?: string | null
}

function dedupeAvatarSources(sources: Array<string | null | undefined>) {
  const seen = new Set<string>()

  return sources.filter((source): source is string => {
    if (!source || seen.has(source)) {
      return false
    }

    seen.add(source)
    return true
  })
}

export function getSpeakerAvatarSources(
  speaker: SpeakerAvatarRecord | null | undefined,
  variant: AvatarVariant = 'default'
) {
  if (!speaker) {
    return []
  }

  if (variant === 'small') {
    return dedupeAvatarSources([
      speaker.avatar_thumbnail_tiny,
      speaker.avatar_thumbnail_default,
      speaker.avatar,
    ])
  }

  return dedupeAvatarSources([
    speaker.avatar_thumbnail_default,
    speaker.avatar,
    speaker.avatar_thumbnail_tiny,
  ])
}

export function useSpeakerAvatar(sources: Array<string | null | undefined>) {
  const sourceKey = sources.join('|')
  const resolvedSources = useMemo(() => dedupeAvatarSources(sources), [sourceKey])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)

  useEffect(() => {
    setActiveIndex(0)
    setLoadedSrc(null)
  }, [sourceKey])

  useEffect(() => {
    const candidate = resolvedSources[activeIndex] ?? null

    if (!candidate) {
      setLoadedSrc(null)
      return
    }

    let cancelled = false
    const image = new window.Image()

    image.onload = () => {
      if (!cancelled) {
        setLoadedSrc(candidate)
      }
    }

    image.onerror = () => {
      if (!cancelled) {
        setLoadedSrc(null)
        setActiveIndex((current) => current + 1)
      }
    }

    image.src = candidate

    return () => {
      cancelled = true
    }
  }, [activeIndex, resolvedSources])

  return {
    src: loadedSrc,
    hasSource: resolvedSources.length > 0,
    handleError: () => {
      setLoadedSrc(null)
      setActiveIndex((current) => current + 1)
    },
    isExhausted: resolvedSources.length === 0 || activeIndex >= resolvedSources.length,
  }
}
