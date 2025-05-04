/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GetPagesSectionOptions<T> {
  slug: string;
  meta?: T
}


export interface IContentData {
  getSectionsBySlug(options: GetPagesSectionOptions<any>): Promise<any[]>;
  getPages(): Promise<any[]>;
}
