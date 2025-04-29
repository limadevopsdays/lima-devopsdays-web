import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const className = "text-2xl"

const Subtitle = createResponsiveStyled({
  tag: 'h3',
  preset: {
    base: ["text-white"],
    variants: {
      weight: {
        thin: 'font-thin',
        light: 'font-light',
        regular: 'font-normal',
        medium: 'font-medium',
        bold: 'font-bold',
        black: 'font-black',
      },
      style: {
        italic: 'italic',
        normal: 'not-italic',
      },
      size: {
        lg: 'text-4xl leading-10',
        md: 'text-3xl leading-8',
        sm: 'text-2xl leading-[30px]',
      }
    }
  }
});

export default Subtitle;