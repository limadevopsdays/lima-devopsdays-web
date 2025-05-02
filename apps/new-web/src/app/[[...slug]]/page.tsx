import { container } from "@/globals/container";
import { ContainerIdentifiers } from "@/globals/identifiers";
import { serverComponents } from "@/globals/ServerComponents";
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

  return pages.map((item) => {
    return {
      slug: String(item.fields.slug).split("/").filter(Boolean) ?? [],
    }
  })
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
    slug: slug.join("/") || "/",
    include: 2,
  });


  return sections?.map((section: any) => {
    const sectionType = section.sys.contentType.sys.id;
    const Component = serverComponents[sectionType];
    if (!Component) return null;

    return <Component key={section.sys.id} {...section.fields} />;
  });
}
