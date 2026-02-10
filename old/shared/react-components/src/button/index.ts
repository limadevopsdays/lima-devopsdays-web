import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const Button = createResponsiveStyled({
  tag: 'button',
  preset: {
    base: [
      "py-2 px-4 rounded-md font-normal transition-all duration-300 ease-out cursor-pointer",
      "border border-transparent"
    ],
    variants: {
      variant: {
        primary: [
          "bg-button-background-primary text-button-foreground-primary",
          "hover:bg-button-background-primary-hover"
        ],
        secondary: [
          "bg-button-background-secondary text-button-foreground-secondary border-button-border-secondary",
          "hover:bg-button-background-secondary-hover"
        ],
        tertiary: [
          "bg-button-background-tertiary text-button-foreground-tertiary border-button-border-tertiary",
          "hover:bg-button-background-tertiary-hover"
        ],
        text: [
          "text-button-foreground-secondary",
          "hover:bg-button-background-secondary-hover"
        ],
        silveGray: [
          "bg-gray-1 text-button-foreground-primary",
          "hover:bg-button-background-primary-hover"
        ]
      },
      width: {
        maxContent: ["w-max"],
      },
      size: {
        small: ["text-sm py-1 px-2"],
        medium: ["text-base py-2 px-4"],
        large: ["text-lg py-3 px-6"]
      },
      disabled: {
        true: [
          "cursor-not-allowed pointer-events-none opacity-80"
        ],
        false: []
      }
    },
  }
});

export default Button;
