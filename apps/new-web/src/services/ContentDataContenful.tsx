/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ContentfulClientApi } from "contentful";
import { GetPagesSectionOptions, IContentData } from "./IContentData";
import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "@/globals/identifiers";



@injectable()
export class ContentDataContenful implements IContentData {
  private pagesCache: any[] | null = null;

  constructor(
    @inject(ContainerIdentifiers.IContentfulClient)
    private readonly client: ContentfulClientApi<undefined>
  ) { }

  async getSectionsBySlug({
    slug,
    meta = { include: 2 }
  }: GetPagesSectionOptions<{
    include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  }>): Promise<any[]> {

    const sectionsData = await this.client.getEntries({
      content_type: "page",
      'fields.slug': slug,
      include: meta.include,
    });

    const { items } = sectionsData;
    const [currentPageData] = items;

    return currentPageData?.fields?.sections as any[] ?? [];
  }

  async getPages(): Promise<any[]> {
    if (this.pagesCache) {
      return Promise.resolve(this.pagesCache);
    }

    const pages = await this.client.getEntries({
      content_type: "page",
      include: 1
    });

    const { items } = pages;
    this.pagesCache = items;

    return items;
  }

}
