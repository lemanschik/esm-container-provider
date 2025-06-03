import { PluginExample, pluginExample } from '@inversifyjs/plugin-example';
import { Container } from 'inversify';

const container: Container = new Container();

container.register(PluginExample);

container[pluginExample]();
