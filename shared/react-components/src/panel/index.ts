import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const Panel = createResponsiveStyled({
  tag: 'div',
  preset: {
    base: [
      "border py-3 px-6 rounded-md border-surface-border",
      "text-white hover:border-surface-border-hover transition-all duration-300 ease-out",
      "bg-surface-background-primary",
    ],
    variants: {
    },
  }
});

export default Panel;
