import { html } from 'lit-html/lib/lit-extended';
import { createNavigator } from '../navigator';
import createHeader from '../header';
import createCounter from '../counter';
// import createHome from '../home';
// import createAbout from '../about';
// import createNotFound from '../notFound';
import cxs from 'cxs';
import headful from 'headful';

import loadable from '../loadable';
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

  const createHome = loadable('home').then(v => v(navigator)(update));
  const createAbout = loadable('about').then(v => v(navigator)(update));
  const createNotFound = loadable('notFound').then(v => v(navigator)(update));

  navigator.register([
    {
      key: HomePage,
      component: createHome,
      route: '/'
    },
    {
      key: AboutPage,
      component: createAbout,
      route: '/about'
    },
    {
      key: NotFoundPage,
      component: createNotFound,
      route: '{*x}',
      defaultTypes: { x: 'stringarray' },
      trackTypes: false
    }
  ]);

  navigator.start();

  return {
    navigator,

    model: () => Object.assign({}, createCounter(update).model()),

    view: model => {
      const header = createHeader(navigator)(update);
      const component = navigator.getComponent(model.pageId);
      const view = component.then(c => c.view(model));
      return html`
      ${header.view()}
      <div className=${view}>
        ${view}
      </div>
    `;
    }
  };
};

export default createApp;
