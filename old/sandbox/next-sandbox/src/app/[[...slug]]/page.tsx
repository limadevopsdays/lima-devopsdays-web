import { getPageSectionsBySlug } from '@/utils/getPageSectionsBySlug';

import { createClient } from "contentful"

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
})

const isDev = process.env.NODE_ENV === "development";

export async function generateStaticParams() {
  const paths = [
    { slug: [] },
  ];

  if (isDev) return paths;

  const pages = await client.getEntries({
    content_type: "page",
  })

  const { items } = pages

  return items.map((item) => {
    return {
      slug: String(item.fields.slug).split("/").filter(Boolean) ?? [],
    }
  })
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];

  const sections = await getPageSectionsBySlug({
    client,
    slug: slug.join("/"),
    include: 2,
  });

  return sections
}
