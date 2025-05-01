import { Container } from 'inversify';
import { registerQueryBuilders } from './queryBuilders';
import { registerAdapters } from './adapters';
import { registerFactories } from './factories';

const container = new Container();

// TODO: This must be changed by Container Modules
registerQueryBuilders(container);
registerAdapters(container);
registerFactories(container);

export { container };