import { MetaReactElementProps } from "@dyesthetics-lab/react-types";
import { ElementType } from "react";

export interface TimePartProps {
  value: number;
  label: string;
}

function formatTwoDigits(value: number) {
  return value.toString().padStart(2, '0');
}

export default function TimePart<T extends ElementType = 'div'>({
  value,
  label,
  as,
  className,
  ...props
}: MetaReactElementProps<T, TimePartProps>) {
  const Component = as ?? 'div';
  const classNames = `flex flex-col items-center ${className ?? ''}`.trim();

  return (
    <Component className={classNames} {...props}>
      <span className="text-xl md:text-2xl">{formatTwoDigits(value)}</span>
      <span className="text-xs md:text-md text-paragraph-tertiary">{label}</span>
    </Component>
  );
}
