import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const Paragraph = createResponsiveStyled({
  tag: 'p',
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
        xl: 'text-xl leading-4'
      }
    }
  },
  defaultProps: {
    weight: 'regular',
    style: 'normal',
    size: 'xl'
  }
});

export default Paragraph;
