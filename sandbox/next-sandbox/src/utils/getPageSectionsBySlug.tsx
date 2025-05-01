
import React from 'react';
import componentMap from '../components/ServerComponents';

type ContentfulClient = {
  getEntries: (query: any) => Promise<any>;
};

export interface GetPageSectionsBySlugProps {
  client: ContentfulClient;
  slug: string;
  include?: number;
}

export async function getPageSectionsBySlug({
  client,
  slug,
  include = 2
}: GetPageSectionsBySlugProps) {
  const pageRes = await client.getEntries({
    content_type: "page",
    'fields.slug': slug,
    include,
  });

  const [page] = pageRes.items;
  if (!page) return null;

  const sections = page.fields.sections ?? [];

  return sections.map((section: any) => {
    const sectionType = section.sys.contentType.sys.id;
    const Component = componentMap[sectionType];
    if (!Component) return null;

    return <Component key={section.sys.id} {...section.fields} />;
  });
}