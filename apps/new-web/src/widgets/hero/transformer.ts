import { ContainerIdentifiers } from '@/globals/identifiers';
import { IGlobalConfig } from '@/services/IGlobalConfig';
import { ResolutionContext } from 'inversify'
import { HeroSectionProps } from 'react-components/sections/Hero';

interface RawProps {
  title: string;
  date: string;
  placeText: string;
  ctaText: string;
  ctaHref: string;
  logo: {
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
): Promise<HeroSectionProps> {
  const getGlobalConfig = ctx.get<IGlobalConfig>(ContainerIdentifiers.IGlobalConfig)
  const globalConfig = await getGlobalConfig.getGlobalConfig()
  const { paymentExternalLink, name } = globalConfig.fields;

  const { logo, ...rest } = rawProps;

  return {
    ...rest,
    imgURL: logo.fields.file.url,
    logoTitle: logo.fields.title,
    ctaText: rest.ctaText ?? name,
    ctaHref: rest.ctaHref ?? paymentExternalLink,
  }
}
