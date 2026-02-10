
import type { ElementType } from "react";
import type { MetaReactElementProps } from "@dyesthetics-lab/react-types";

export type InfoStackProps<T extends ElementType = "div"> = MetaReactElementProps<
  T,
  {
    icon?: React.ReactNode;
    title: string;
    description?: string;
  }
>;


export function InfoStack<T extends ElementType = "div">({
  as,
  icon,
  title,
  description,
  className = "",
  ...rest
}: InfoStackProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={
        "flex flex-col items-start gap-2 bg-transparent "
        .concat(className)
      }
      {...rest}
    >
      {icon && <span>{icon}</span>}
      <p className="text-subtitle-primary text-xl">{title}</p>
      {description && <p className="text-md text-white/80">{description}</p>}
    </Component>
  );
}
