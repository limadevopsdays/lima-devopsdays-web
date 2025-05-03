import { componentRegistry } from "@/globals/componentRegistry.codegen";
import container from "@/globals/container";
import { ContainerIdentifiers } from "@/globals/identifiers";

import { IContentData } from "@/services/IContentData";
import { mkdir, writeFile } from "fs/promises";
import { basename, join } from "node:path";
import { ReactElement } from "react";

const isDev = process.env.NODE_ENV === "development";

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


//TODO: move this to a utils file and use streams
const fetchToPublic = async (url: string) => {
  if (!url) return null;

  const absoluteUrl = url.startsWith("http") ? url : `https:${url}`;
  const response = await fetch(absoluteUrl);
  if (!response.ok) throw new Error(`Failed to fetch asset: ${absoluteUrl}`);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);


  const urlObj = new URL(absoluteUrl);
  const filename = basename(urlObj.pathname);
  const publicDir = join(process.cwd(), "public/remote");
  await mkdir(publicDir, { recursive: true });
  const filePath = join(publicDir, filename);
  await writeFile(filePath, buffer);

  return `/remote/${filename}`;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];

  const contentDataService = container
    .get<IContentData>(ContainerIdentifiers.IContentData)

  const sections = await contentDataService.getSectionsBySlug({
    slug: slug.join("/") || "/",
    include: 4,
  });

  for (const section of sections) {
    await processAssetsRecursively(section);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sections?.map((section: any) => {
    const sectionType = section.sys.contentType.sys.id;
    const container = componentRegistry.get(sectionType);
    const Component: ((props: unknown) => ReactElement) | undefined = container
      ?.get("Component");

    if (!Component) return null;


    return <Component
      key={section.sys.id}
      {...section.fields}
    />;
  });
}
