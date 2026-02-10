import { SVGProps } from "react"
const PersonalPlaceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={36}
      height={36}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#D9D9D9" d="M0 0h36v36H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#1C1B1F"
        d="M9.75 29.25V9.029c0-.633.222-1.17.665-1.614a2.197 2.197 0 0 1 1.614-.665h10.915a2.679 2.679 0 0 1 2.222 1.16l2.826 4.038c.322.477.482.994.482 1.552s-.16 1.075-.482 1.552l-2.826 4.038a2.68 2.68 0 0 1-2.221 1.16H12v9c0 .32-.108.587-.323.802a1.088 1.088 0 0 1-.802.323c-.32 0-.586-.108-.802-.323a1.088 1.088 0 0 1-.323-.802ZM12 18h11.005a.434.434 0 0 0 .375-.202l2.697-4.038a.478.478 0 0 0 .072-.26.478.478 0 0 0-.072-.26L23.38 9.203a.488.488 0 0 0-.166-.151.433.433 0 0 0-.21-.051H12v9Z"
      />
    </g>
  </svg>
)
export default PersonalPlaceIcon
