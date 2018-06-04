import flyd from 'flyd';
import { render } from 'lit-html/lib/lit-extended';

import createApp from './app';
import { HomePage } from './constants';

const update = flyd.stream();
const app = createApp(update);
const models = flyd.scan(
  (model, modelUpdate) => modelUpdate(model),
  Object.assign({}, { pageId: HomePage }, app.model()),
  update
);

const element = document.getElementById('app');
models.map(model => render(app.view(model), element));
