import { ReactNode } from "react";
import SponsorPricingTable from "../../sponsor-pricing-table";
import { iconsByName } from "../SponsorPricingSection";
import Paragraph from "../../paragraph";
import Subtitle from "../../subtitle";
import Button from "../../button";

export interface SponsorTableSectionProps {
  title: string;
  description: ReactNode;
  mediaKitLinks?: Link[];
}

export interface Link {
  text: string;
  href: string;
  iconName?: string;
  isHidden?: boolean;
}

export default function SponsorTableSection({
  title,
  description,
  mediaKitLinks
}: Readonly<SponsorTableSectionProps>) {
  return (
    <section className="bg-gray-4">
      <div className="flex flex-col container-custom py-16 px-4 items-center">
        <div className='flex flex-col items-center gap-8 mb-12'>
          <Subtitle size='lg'>{title}</Subtitle>
          <Paragraph as="div" size="xl" >
            {description}
          </Paragraph>
        </div>

        <SponsorPricingTable />

        <div className='flex gap-3 mt-6'>
          {
            mediaKitLinks?.map(({ href, text, iconName, isHidden }, index) => {
              const Icon = iconName ? iconsByName[iconName] : null

              return (
                <Button
                  key={index}
                  as='a'
                  href={href}
                  hidden={isHidden}
                  className='flex items-center justify-center sm:whitespace-nowrap flex-1 gap-2'
                  variant='tertiary'>
                  {text}
                  {Icon && <Icon />}
                </Button>
              )
            })
          }

        </div>
      </div>
    </section>
  )
}