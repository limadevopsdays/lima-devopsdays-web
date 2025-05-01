import { PAGE_DATA_BY_SLUG_FACTORY } from '@/context/factories';
import SectionBuilder from '@/components/SectionBuilder';
import { container } from '@/context/index';

export function generateStaticParams() {
  const paths = [
    { slug: [] },
  ];

  return paths;
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];

  const pageDataBySlugFactory = container.get<(slug: string[]) => Promise<any>>(PAGE_DATA_BY_SLUG_FACTORY);
  const sections = await pageDataBySlugFactory(!slug.length ? ["home"] : slug);

  return (
    <SectionBuilder sections={sections} />
  );
}