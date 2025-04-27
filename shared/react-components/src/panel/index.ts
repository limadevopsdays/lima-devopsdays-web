import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const Panel = createResponsiveStyled({
  tag: 'div',
  preset: {
    base: ["border py-3 px-6 rounded-md border-border-panel text-white hover:border-border-panel-hover transition-all duration-300 ease-out"],
    variants: {
    },
  }
});

export default Panel;
