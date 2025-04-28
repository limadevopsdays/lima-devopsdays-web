import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const AgendaRow = createResponsiveStyled({
  tag: 'div',
  preset: {
    base: [
      "grid grid-cols-[auto_1fr] py-4 pl-2 w-full border-b border-surface-border gap-[100px]",
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