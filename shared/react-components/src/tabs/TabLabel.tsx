import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const TabLabel = createResponsiveStyled({
  tag: 'label',
  preset: {
    base: [
      "cursor-pointer select-none px-1 py-2 rounded-md transition-all duration-300 ease-out",
      "text-xl leading-6"
    ],
    variants: {
      variant: {
        default: [
          "font-normal text-neutral-400",
          "bg-transparent hover:text-white",
        ],
        active: [
          "font-medium text-white",
          "bg-transparent",
        ]
      }
    },
  },
  defaultProps: {
    variant: 'default',
  }
});

export default TabLabel;