import { componentRegistry } from "@/globals/componentRegistry.codegen";
import container from "@/globals/container";
import { ContainerIdentifiers } from "@/globals/identifiers";

import { IContentData } from "@/services/IContentData";
import { fetchToPublic } from "@/utils/fetchToPublic";

const isDev = process.env.NODE_ENV === "development";

//TODO: refactor this file because it is too big and has too many concerns

export async function generateStaticParams() {
  const paths = [
    { slug: [] }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function processAssetsRecursively(item: any): Promise<void> {
  if (!item || typeof item !== 'object') {
    return;
  }

  if (Array.isArray(item)) {
    for (const element of item) {
      await processAssetsRecursively(element);
    }
    return;
  }

  if (item?.sys?.type === "Asset" && item?.fields?.file?.url) {
    const originalUrl = item.fields.file.url;

    if (originalUrl.startsWith('/remote/')) {
      return;
    }

    const processedUrl = await fetchToPublic(item.fields.file.url);

    if (processedUrl) {
      item.fields.file.url = processedUrl;
    }
    return;
  }

  const entries = Object.entries(item);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, value] of entries) {
    if (value && typeof value === 'object') {
      await processAssetsRecursively(value);
    }
  }
}


//TODO: would it be wrong if we fetch the photos in transformers instead?
//the main concern is if we are doing server side redering, that would mean
//copying the file to the server but  the relative path to public may be broken?
//we need to investigate the timing in which this function is called vs
//the trasnformers in different settings (export and standalone)

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];

  const contentDataService = container
    .get<IContentData>(ContainerIdentifiers.IContentData)

  const sections = await contentDataService.getSectionsBySlug({
    slug: slug.join("/") || "/",
    meta:{
      include: 4,
    }
  });

  //TODO: could we do this with a  Promise.all?
  for (const section of sections) {
    await processAssetsRecursively(section);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sections?.map((section: any) => {
    //TODO: the sections.sys.contentType.sys.id is too specific to the data source, revaluate this
    // as an alternative, I am thinking on levering another function to get the component name
    // the problem is that the component name is not always the same as the content type
    // and the data from the data source could enter in many different formats
    const sectionType = section.sys.contentType.sys.id;

    const Component = componentRegistry
      .getComponent(sectionType);

    if (!Component) return null;

     //TODO: the sections.fields is too specific to the data source, revaluate this
    return <Component
      key={section.sys.id}
      {...section.fields}
    />;
  });
}
