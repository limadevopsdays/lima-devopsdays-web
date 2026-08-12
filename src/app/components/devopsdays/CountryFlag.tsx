import {
  AR,
  BR,
  CA,
  CL,
  CO,
  EC,
  ES,
  IL,
  MX,
  PE,
  PY,
  US,
} from 'country-flag-icons/react/3x2'
import type { SVGProps } from 'react'

const FLAGS_BY_COUNTRY = {
  Argentina: AR,
  Brasil: BR,
  Brazil: BR,
  'Canadá': CA,
  Canada: CA,
  Chile: CL,
  Colombia: CO,
  Ecuador: EC,
  'España': ES,
  Spain: ES,
  Israel: IL,
  'México': MX,
  Mexico: MX,
  Paraguay: PY,
  'Perú': PE,
  Peru: PE,
  'Estados Unidos': US,
  'United States': US,
} as const

type CountryName = keyof typeof FLAGS_BY_COUNTRY

type CountryFlagProps = {
  country: string
  className: string
  svgClassName: string
}

export function CountryFlag({ country, className, svgClassName }: CountryFlagProps) {
  const Flag = FLAGS_BY_COUNTRY[country as CountryName] as ((props: SVGProps<SVGSVGElement>) => JSX.Element) | undefined

  if (!Flag) {
    return null
  }

  return (
    <span className={className} aria-label={country} role="img">
      <Flag className={svgClassName} aria-hidden="true" focusable="false" />
    </span>
  )
}
