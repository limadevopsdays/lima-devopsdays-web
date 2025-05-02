import { container, ContainerIdentifiers } from "@/globals/container";
import { IContentData } from "@/services/IContentData";

const isDev = process.env.NODE_ENV === "development";

export async function generateStaticParams() {
  const paths = [
    { slug: [] },
  ];

  if (isDev) return paths;

  const contentDataService = container
    .get<IContentData>(ContainerIdentifiers.IContentData)

  const pages = await contentDataService.getPages();

  return pages;
}

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];


  const contentDataService = container
    .get<IContentData>(ContainerIdentifiers.IContentData)

  const sections = await contentDataService.getSectionsBySlug({
    slug: slug.join("/"),
    include: 2,
  });

  return sections
}
