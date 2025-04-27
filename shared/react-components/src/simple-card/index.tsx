import { ComponentProps, ElementType } from 'react';
import CardSurface from '../card-surface';

export interface SimpleCardProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SimpleCard<T extends ElementType = 'article'>({
  title,
  description,
  className,
  as,
  ...props
}: Readonly<SimpleCardProps & ComponentProps<typeof CardSurface<T>>>) {
  return (
    <CardSurface
      className={`flex flex-col py-4 px-6 gap-12 ${className}`}
      variant="primary"
      as={as ?? "article"}
      {...props}
    >
      <p className="text-4xl text-cyan-base">{title}</p>
      <p>{description}</p>
    </CardSurface>
  );
};

