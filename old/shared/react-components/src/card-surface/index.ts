import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const CardSurface = createResponsiveStyled({
  tag: 'div',
  preset: {
    base: ["rounded-lg", "text-white"],
    variants: {
      variant: {
        primary: "bg-gray-4",
        secondary: "bg-gray-5",
      },
    },
  },
  defaultProps: {
    variant: 'primary'
  }
});

export default CardSurface;
