import { html } from 'lit-html/lib/lit-extended';
import createHeader from '../header';
import createCounter from '../counter';
import cxs from 'cxs';
import headful from 'headful';

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
  const header = createHeader();
  const counter = createCounter(update);

  return {
    model: () => Object.assign({}, counter.model()),

    view: model => {
      return html`
      ${header.view}
      <div className=${view}>
        ${counter.view(model)}
      </div>
    `;
    }
  };
};

export default createApp;
