import { ReactNode } from 'react';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import Button from '../../button';
import SponsorTierCard from '../../sponsor-tier-card';
import SponsorTierCardHeader from '../../sponsor-tier-card/SponsorTierCardHeader';
import SponsorTierCardBody from '../../sponsor-tier-card/SponsorTierCardBody';
import DownloadIcon from '../../icons/Download';
import { defaultParser } from '../../utils';

export interface SponsorTier {
  name: string;
  description: string;
  price: string;
  benefits: string[];
  tier: 'bronze' | 'silver' | 'gold';
}

export interface Link {
  text: string;
  href: string;
  iconName?: string;
  isHidden?: boolean;
}

export interface SponsorPricingSectionProps {
  title: string;
  description: ReactNode;
  pricingTiers: SponsorTier[];
  ctaText: string;
  ctaHref: string;
  mediaKitLinks: Link[];
}

const iconsByName: Record<string, typeof DownloadIcon> = {
  "Download": DownloadIcon
}

export default function SponsorPricingSection({
  title,
  description,
  pricingTiers,
  ctaText,
  ctaHref,
  mediaKitLinks
}: SponsorPricingSectionProps) {
  return (
    <section className='bg-gray-4'>
      <div className='flex flex-col container-custom py-16 px-4 items-center'>
        <div className='flex flex-col items-center gap-8 mb-12'>
          <Subtitle size='lg'>{title}</Subtitle>
          <Paragraph className='text-center' size="xl" >
            {typeof description === 'string' ? defaultParser.parse(description) : description}
          </Paragraph>
        </div>

        <div className='flex flex-col md:flex-row items-stretch gap-6 w-full mb-6'>
          {pricingTiers.map((tier) => (
            <SponsorTierCard key={tier.name} >
              <SponsorTierCardHeader tier={tier.tier}>
                <Subtitle size='sm'>{tier.name}</Subtitle>
                <Paragraph size='md'>{tier.description}</Paragraph>
                <Subtitle size='lg' className='mt-3'>{tier.price}</Subtitle>
              </SponsorTierCardHeader>
              <SponsorTierCardBody tier={tier.tier}>
                <ul className='list-disc list-inside'>
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex}>{benefit}</li>
                  ))}
                </ul>
              </SponsorTierCardBody>
            </SponsorTierCard>
          ))}
        </div>

        <div className='flex flex-col gap-2 md:flex-row md:gap-0 justify-between w-full'>
          <div className='flex gap-3'>
            {
              mediaKitLinks.map(({ href, text, iconName, isHidden }, index) => {
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
          <Button className='text-center' as="a" href={ctaHref} size="large" variant='primary'>{ctaText}</Button>
        </div>
      </div>
    </section>
  );
}