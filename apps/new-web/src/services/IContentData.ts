/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GetPagesSectionOptions {
  slug: string;
  include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}


export interface IContentData {
  getSectionsBySlug(options: GetPagesSectionOptions): Promise<any[]>;
  getPages(): Promise<any[]>;
}
