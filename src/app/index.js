import { html } from 'lit-html/lib/lit-extended';
import { createNavigator } from '../navigator';
import createHeader from '../header';
import createCounter from '../counter';
import createHome from '../home';
import createAbout from '../about';
import createNotFound from '../notFound';
import cxs from 'cxs';
import headful from 'headful';

import { HomePage, AboutPage, NotFoundPage } from '../constants';

headful({
  title: 'Lit-Html Meiosis Example',
  description: 'Experimenting with lit-html and the meiosis pattern',
  image: 'images/manifest/icon-192x192.png',
  lang: 'en'
});

const view = cxs({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: '1rem'
});

const createApp = update => {
  const navigator = createNavigator(update);
  const counter = createCounter(update);

  navigator.register([
    { key: HomePage, component: createHome(navigator)(update), route: '/' },
    {
      key: AboutPage,
      component: createAbout(navigator)(update),
      route: '/about'
    },
    {
      key: NotFoundPage,
      component: createNotFound(navigator)(update),
      route: '{*x}',
      defaultTypes: { x: 'stringarray' },
      trackTypes: false
    }
  ]);

  navigator.start();

  const header = createHeader(navigator)(update);

  return {
    navigator,

    model: () => Object.assign({}, counter.model()),

    view: model => {
      const component = navigator.getComponent(model.pageId);
      return html`
      ${header.view()}
      <div className=${view}>
        ${component.view(model)}
      </div>
    `;
    }
  };
};

export default createApp;
