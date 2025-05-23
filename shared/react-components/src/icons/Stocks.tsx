import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={25}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#D9D9D9" d="M.5 0h24v24H.5z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#161719"
        d="m20.702 8.82-4.898 4.872c-.538.532-1.189.8-1.952.803a2.627 2.627 0 0 1-1.942-.793l-1.175-1.175a1.178 1.178 0 0 0-.878-.357 1.23 1.23 0 0 0-.878.357l-4.6 4.6a.725.725 0 0 1-.522.213.707.707 0 0 1-.532-.213.718.718 0 0 1-.217-.527c0-.206.072-.382.217-.527l4.6-4.6a2.687 2.687 0 0 1 1.947-.803 2.638 2.638 0 0 1 1.947.803l1.15 1.15c.252.251.549.375.89.372.343-.003.64-.127.891-.372l4.883-4.873h-2.18a.726.726 0 0 1-.536-.215.726.726 0 0 1-.215-.535c0-.213.072-.391.215-.535a.726.726 0 0 1 .535-.215h3.846c.258 0 .473.086.645.259a.875.875 0 0 1 .26.645V11a.726.726 0 0 1-.216.534.725.725 0 0 1-.535.216.726.726 0 0 1-.535-.216.726.726 0 0 1-.215-.534V8.82Z"
      />
    </g>
  </svg>
)
export default SvgComponent
