import { Container } from 'inversify';

export type AdapterFunction = (data: any) => any;

export const registerAdapters = (container: Container) => {
  container.bind<AdapterFunction>('agendaAdapter').toDynamicValue(() => (data: any) => {
    return { ...data, transformed: true };
  });

  container.bind<AdapterFunction>('sponsorsAdapter').toDynamicValue(() => (data: any) => {
    return { ...data, sponsorSpecific: true };
  });

  container.bind<AdapterFunction>('homeAdapter').toDynamicValue(() => (data: any) => {
    const items = data?.data?.homeCollection?.items || [];
    if (items.length === 0) return [];

    const [homeData] = items;
    const sections = Object.keys(homeData).map((key) => ({
      sectionType: key,
      ...homeData[key],
    }));

    return sections;
  });
};