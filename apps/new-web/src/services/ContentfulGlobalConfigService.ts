/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from "inversify";
import { IGlobalConfigWithRaw } from "./IGlobalConfig";
import { ContainerIdentifiers } from "@/globals/identifiers";
import type { ContentfulClientApi } from "contentful";

@injectable()
export class ContentfulGlobalConfigService implements IGlobalConfigWithRaw {

  constructor(
    @inject(ContainerIdentifiers.IContentfulClient)
    private readonly client: ContentfulClientApi<undefined>,
  ){}

  async getGlobalConfig(){
    const globalConfig = await this.client.getEntries({
      content_type: "globalConfig",
      include: 1
    });

    const { items } = globalConfig;

    return items[0];
  }

  async getPaymentExternalLink(): Promise<string> {
    const globalConfig = await this.getGlobalConfig();
    const paymentExternalLink = globalConfig?.fields?.paymentExternalLink;

    if (!paymentExternalLink) {
      throw new Error("Payment external link not found");
    }

    return paymentExternalLink as string;
  }
}

@injectable()
export class CachedGlobalConfigProxy implements IGlobalConfigWithRaw {
  private cache: unknown | null = null;


  constructor(
    @inject(ContentfulGlobalConfigService)
    private readonly target: ContentfulGlobalConfigService
  ) {}

  async getGlobalConfig(): Promise<unknown> {
    if (this.cache) {
      return this.cache;
    }

    this.cache = await this.target.getGlobalConfig();

    return this.cache;
  }

  getPaymentExternalLink(): Promise<string> {
    return this.target.getPaymentExternalLink();
  }
}
