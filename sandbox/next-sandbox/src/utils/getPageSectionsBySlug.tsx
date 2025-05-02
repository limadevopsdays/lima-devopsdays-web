
import React from 'react';
import componentMap from '../components/ServerComponents';
import { ContentfulClientApi } from 'contentful';


export interface GetPageSectionsBySlugProps {
  client: ContentfulClientApi<undefined>;
  slug: string;
  include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = (page.fields.sections ?? []) as unknown as any[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sections?.map((section: any) => {
    const sectionType = section.sys.contentType.sys.id;
    const Component = componentMap[sectionType];
    if (!Component) return null;

    return <Component key={section.sys.id} {...section.fields} />;
  });
}
