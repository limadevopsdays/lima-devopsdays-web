import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const AgendaRow = createResponsiveStyled({
  tag: 'div',
  preset: {
    base: [
      "grid md:grid-cols-[auto_1fr] py-4 pl-2 w-full border-b border-surface-border gap-2 md:gap-[100px]",
    ],
    variants: {
      variant: {
        primary: [
          "bg-surface-background-primary",
        ],
        secondary: [
          "bg-gray-3",
        ]
      }
    },
  },
  defaultProps: {
    variant: 'primary',
  }
});

export default AgendaRow;