import { Container } from 'inversify';
import { QueryStringBuilder } from './queryBuilders';
import { AdapterFunction } from './adapters';

export const QUERY_FUNCTION_FACTORY = Symbol.for('QueryFunctionFactory');
export const PAGE_DATA_BY_SLUG_FACTORY = Symbol.for('PageDataBySlugFactory');

export const registerFactories = (container: Container) => {
  container.bind<QueryStringBuilder>(QUERY_FUNCTION_FACTORY).toDynamicValue((context) => {
    return (slugSegments: string[]) => {
      const [slug] = slugSegments;

      switch (slug) {
        case 'home':
          return context.get<QueryStringBuilder>('homeQueryStringBuilder')(slugSegments);
        case 'agenda':
          return context.get<QueryStringBuilder>('agendaQueryStringBuilder')(slugSegments);
        case 'sponsors':
          return context.get<QueryStringBuilder>('sponsorsQueryStringBuilder')(slugSegments);
        default:
          return 'defaultQuery';
      }
    };
  });

  container.bind<(slug: string[]) => Promise<any>>(PAGE_DATA_BY_SLUG_FACTORY).toDynamicValue((context) => {
    return async (slug: string[]) => {
      const queryStringBuilderFactory = context.get<QueryStringBuilder>(QUERY_FUNCTION_FACTORY);
      const queryString = queryStringBuilderFactory(slug);

      const spaceId = process.env.CONTENTFUL_SPACE_ID;
      const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

      if (!spaceId || !accessToken) {
        throw new Error('Contentful SPACE_ID or ACCESS_TOKEN is not defined in environment variables.');
      }

      const fetchData = await fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query: queryString }),
      }).then((res) => res.json());

      const adapterKey = `${slug[0]}Adapter`;
      if (container.isBound(adapterKey)) {
        const adapter = context.get<AdapterFunction>(adapterKey);
        return adapter(fetchData);
      }

      return fetchData;
    };
  });
};