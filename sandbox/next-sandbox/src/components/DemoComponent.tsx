import { container, DEMO_SERVICE } from '../context/container';
import type { IDemoService } from '../context/container';

export default async function DemoComponent() {
  const demoService = container.get<IDemoService>(DEMO_SERVICE);
  const data = await demoService.fetchData();
  return <div>Fetched Data: {data.message}</div>;
}
