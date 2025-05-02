/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentfulClientApi } from "contentful";
import { GetPagesSectionOptions, IContentData } from "./IContentData";
import { injectable } from "inversify";


@injectable()
export class ContentDataContenful implements IContentData {
  private pagesCache: any[] | null = null;

  constructor(private readonly client: ContentfulClientApi<undefined>) {
  }

  async getSectionsBySlug({
    slug,
    include = 2
  }: GetPagesSectionOptions): Promise<any[]> {
    if(this.pagesCache){
      return Promise.resolve(this.pagesCache);
    }

    const pages = await this.client.getEntries({
      content_type: "page",
      'fields.slug': slug,
      include,
    });

    const { items } = pages;
    this.pagesCache = items;

    return items;
  }

  async getPages(): Promise<any[]> {
    if(this.pagesCache){
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
