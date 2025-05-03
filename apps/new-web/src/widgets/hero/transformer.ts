import { ContainerIdentifiers } from '@/globals/identifiers';
import { IGlobalConfig } from '@/services/IGlobalConfig';
import { ResolutionContext } from 'inversify'
import { HeroSectionProps } from 'react-components/sections/Hero';

interface RawProps {
  title: string;
  date: string;
  placeText: string;
  ctaText: string;
  ctaUrl: string;
  logo:{
    fields: {
      title: string;
      file: {
        url: string;
      }
    }
  }
}

export default async function transform(
  rawProps: RawProps,
  ctx: ResolutionContext
): Promise<HeroSectionProps>{
  const  getGlobalConfig = ctx.get<IGlobalConfig>(ContainerIdentifiers.IGlobalConfig)

  const externalPaymentLink = await getGlobalConfig.getPaymentExternalLink();

  const { logo, ...rest } = rawProps;

  return {
    ...rest,
    imgURL: logo.fields.file.url,
    logoTitle: logo.fields.title,
    ctaHref: externalPaymentLink,
  }
}
