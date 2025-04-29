import { ComponentProps, ElementType, ReactNode } from "react";
import CardSurface from "../card-surface";
import { InfoStack } from "../info-stack";

export interface InfoStackGroupItem {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export interface InfoStackGroupProps {
  title: string;
  items: InfoStackGroupItem[];
}

export default function InfoStackGroup<T extends ElementType = 'div'>({
  title,
  items,
  className,
  cardSurfaceProps
}: Readonly<InfoStackGroupProps> & ComponentProps<typeof CardSurface<T>>) {
  return (
    <CardSurface
      className={"p-9 ".concat(className ?? '')}
      {...cardSurfaceProps}
    >
      <h3 className="text-subtitle-primary text-4xl mb-8">
        {title}
      </h3>
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        {items.map((item) => (
          <InfoStack
            className="flex-1"
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </CardSurface>
  );
}
