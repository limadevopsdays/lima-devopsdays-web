import React from "react";
import ServerComponents from "./ServerComponents";

interface Section {
  sectionType: string;
  [key: string]: any;
}

interface SectionBuilderProps {
  sections: Section[];
}

export default function SectionBuilder({ sections }: SectionBuilderProps) {
  return (
    <>
      {sections.map((section, index) => {
        const Component = ServerComponents[section.sectionType];

        if (!Component) {
          console.warn(`No component found for section type: ${section.sectionType}`);
          return null;
        }

        return <Component key={index} {...section} />;
      })}
    </>
  );
}