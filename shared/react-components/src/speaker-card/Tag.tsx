import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const Tag = createResponsiveStyled({
  tag: 'span',
  preset: {
    base: ["inline-block", "rounded-md", "px-3", "text-sm leading-[30px]", "bg-cyan-base"],
    variants: {
    }
  }
});

export default Tag;
