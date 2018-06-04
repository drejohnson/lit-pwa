import { html } from 'lit-html/lib/lit-extended';
import cxs from 'cxs';

import createLink from '../link';
import { HomePage, AboutPage, NotFoundPage } from '../constants';

const header = cxs({
  height: '60px',
  padding: '0 1rem',
  backgroundColor: '#eeeeee',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});

const nav = cxs({
  ' > a': {
    color: '#111',
    textDecoration: 'none'
  }
});

const alignStart = cxs({
  display: 'inline-flex',
  flex: '1',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'flex-start',
  order: '-1'
});

const alignEnd = cxs({
  display: 'inline-flex',
  flex: '1 1 auto',
  flexDirection: 'row',
  alignItems: 'end',
  justifyContent: 'flex-end',
  order: '1'
});

const createHeader = navigator => _update => {
  const link = createLink(navigator);
  return {
    view: _model => html`
      <header className=${header}>
        <section className=${alignStart}>
          <h1>App</h1>
        </section>
        <section className=${alignEnd}>
          <nav className=${nav}>
            ${link.view(HomePage, 'Home')}
            ${link.view(AboutPage, 'About')}
          </nav>
        </section>
      </header>
    `
  };
};

export default createHeader;
