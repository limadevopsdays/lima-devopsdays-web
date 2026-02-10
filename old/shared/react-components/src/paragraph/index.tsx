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
        "2xl": 'text-2xl leading-8',
        xl: 'text-xl leading-6',
        lg: 'text-lg leading-5',
        md: 'text-base leading-4',
      },
      color: {
        primary: 'text-paragraph-primary',
        secondary: 'text-gray-400',
        tertiary: 'text-paragraph-tertiary',
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
