import React from 'react'

export function PdfIcon({
  className,
  size = 16,
}: {
  className?: string
  size?: number
}) {
  return (
    <img
      src="/images/pdf.png"
      alt="PDF"
      width={size}
      height={size}
      className={className}
      loading="lazy"
      decoding="async"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'inline-block',
      }}
    />
  )
}
