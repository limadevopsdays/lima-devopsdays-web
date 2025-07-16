/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GetPagesSectionOptions<T> {
  slug: string;
  meta?: T
}

export interface GetModalsOptions<T> {
  meta?: T
}

export interface IContentData {
  getSectionsBySlug(options: GetPagesSectionOptions<any>): Promise<any[]>;
  getPages(): Promise<any[]>;
  getModals(options?: GetModalsOptions<any>): Promise<any[]>;
}
