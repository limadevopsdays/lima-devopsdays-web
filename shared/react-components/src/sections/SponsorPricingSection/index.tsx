import { ReactNode } from 'react';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import Button from '../../button';
import SponsorTierCard from '../../sponsor-tier-card';
import SponsorTierCardHeader from '../../sponsor-tier-card/SponsorTierCardHeader';
import SponsorTierCardBody from '../../sponsor-tier-card/SponsorTierCardBody';
import DownloadIcon from '../../icons/Download';

export interface SponsorTier {
  name: string;
  description: ReactNode;
  price: string;
  benefits: string[];
  tier: 'bronze' | 'silver' | 'gold' | 'violet' | 'silveGray';
  ctaText?: string;
  ctaHref?: string;
  showCta?: boolean;
  disableCta?: boolean;
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
  enterpriseContactMe?: ReactNode;
  pricingTiers: SponsorTier[];
  ctaText?: string;
  ctaHref?: string;
  showCta?: boolean;
  disableCta?: boolean;
  mediaKitLinks?: Link[];
}

export const iconsByName: Record<string, typeof DownloadIcon> = {
  "Download": DownloadIcon
}

export default function SponsorPricingSection({
  title,
  description,
  pricingTiers,
  ctaText,
  ctaHref,
  showCta,
  disableCta,
  mediaKitLinks,
  enterpriseContactMe,
}: Readonly<SponsorPricingSectionProps>) {
  return (
    <section className='bg-gray-4'>
      <div className='flex flex-col container-custom py-16 px-4 items-center'>
        <div className='flex flex-col items-center gap-8 mb-12'>
          <Subtitle size='lg'>{title}</Subtitle>
          <Paragraph as="div" size="xl" >
            {description}
          </Paragraph>
        </div>

        <div className='flex flex-col md:flex-row items-stretch justify-center gap-6 w-full mb-6'>
          {pricingTiers.map(({
            name, benefits, description, price,
            tier, ctaHref, ctaText, showCta, disableCta
          }) => {
            return (
              <SponsorTierCard key={name} >
                <SponsorTierCardHeader tier={tier}>
                  <Subtitle size='sm'>{name}</Subtitle>
                  <Paragraph size='md'>{description}</Paragraph>
                  <Subtitle size='lg' className='mt-3'>{price}</Subtitle>
                </SponsorTierCardHeader>
                <SponsorTierCardBody className='flex flex-col justify-between gap-6' tier={tier}>
                  <ul className='list-disc list-inside'>
                    {benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex}>{benefit}</li>
                    ))}
                  </ul>

                  {showCta && (
                    <Button className='text-center' variant={disableCta ? "silveGray" : "primary"} size="large" as="a" href={ctaHref} disabled={disableCta as any}>
                      {ctaText}
                    </Button>
                  )}
                </SponsorTierCardBody>
              </SponsorTierCard>
            )
          })}
        </div>

        <div className={`flex flex-col gap-2 md:flex-row md:gap-0 w-full items-center ${!mediaKitLinks?.length ? 'justify-center' : 'justify-between'}`}>
          <div className='flex gap-3'>
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
          {showCta && (
            <Button disabled={disableCta as any} className='text-center w-fit' as="a" href={ctaHref} size="large" variant='primary'>{ctaText}</Button>
          )}
        </div>
       {enterpriseContactMe && <p className='text-center text-white'>{enterpriseContactMe}</p>}
      </div>
    </section>
  );
}
