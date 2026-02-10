import 'reflect-metadata';
import { Container, injectable } from 'inversify';

export interface IDemoService {
  fetchData(): Promise<{ message: string }>;
}

@injectable()
export class DemoService implements IDemoService {
  async fetchData(): Promise<{ message: string }> {
    // Simulate fetching data
    return Promise.resolve({ message: 'Hello from Inversify DemoService!' });
  }
}

export const DEMO_SERVICE = Symbol.for('IDemoService');

const container = new Container();
container.bind<IDemoService>(DEMO_SERVICE).to(DemoService);

export { container };
