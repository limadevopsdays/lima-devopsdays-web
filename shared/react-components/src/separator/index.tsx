import type { ComponentPropsWithoutRef } from 'react';

export interface SeparatorProps extends ComponentPropsWithoutRef<'hr'> {
  readonly direction: 'vertical' | 'horizontal';
}

export default function Separator({ direction, className = '', ...rest }: SeparatorProps) {
  return (
    <hr
      className={
        `${className} border-0 ${direction === 'horizontal' ? 'w-px h-8 bg-white mx-2' : 'h-px w-8 bg-white my-2'}`.trim()
      }
      {...rest}
    />
  );
}
