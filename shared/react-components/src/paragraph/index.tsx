import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const Paragraph = createResponsiveStyled({
  tag: 'p',
  preset: {
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
        xl: 'text-xl leading-4',
        lg: 'text-lg leading-6',
        md: 'text-base leading-5',
      },
      color: {
        primary: 'text-paragraph-primary',
        secondary: 'text-gray-400',
        highlight: 'text-paragraph-enphasis-primary',
      }
    }
  },
  defaultProps: {
    weight: 'regular',
    style: 'normal',
    size: 'md',
    color: 'primary'
  }
});

export default Paragraph;
