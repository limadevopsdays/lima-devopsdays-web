import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const AgendaRow = createResponsiveStyled({
  tag: 'div',
  preset: {
    base: [
      "flex py-4 pl-2 w-full border-b border-surface-border gap-[100px]",
    ],
    variants: {
      variant: {
        primary: [
          "bg-surface-background-primary",
        ],
        secondary: [
          "bg-surface-background-secondary",
        ]
      }
    },
  },
  defaultProps: {
    variant: 'primary',
  }
});

export default AgendaRow;