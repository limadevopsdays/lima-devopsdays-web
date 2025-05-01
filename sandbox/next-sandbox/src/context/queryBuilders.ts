import { Container } from 'inversify';

export type QueryStringBuilder = (slug: string[]) => string;

export const registerQueryBuilders = (container: Container) => {
  container.bind<QueryStringBuilder>('agendaQueryStringBuilder').toDynamicValue(() => (slug: string[]) => {
    return `query { agenda(slug: "${slug.join('/')}\") { content } }`;
  });

  container.bind<QueryStringBuilder>('sponsorsQueryStringBuilder').toDynamicValue(() => (slug: string[]) => {
    return `query { sponsors(slug: "${slug.join('/')}\") { content } }`;
  });

  // TODO: This query must builded dynamically using instropection
  container.bind<QueryStringBuilder>('homeQueryStringBuilder').toDynamicValue(() => (slug: string[]) => {
    return `query {
      homeCollection(where: { slug: "/" }) {
        items {
          header {
            __typename
            logoText
            navItems
          }
          hero {
            __typename
            logo {
              title
              url
            }
            title
            placeText
            date
            ctaText
            ctaHref
          }
        }
      }
    }`;
  });
};