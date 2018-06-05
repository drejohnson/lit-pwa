import { html } from 'lit-html/lib/lit-extended';
import loadable from '../loadable';

const createHome = navigator => update => {
  const counter = loadable('counter').then(v => v(update));
  return {
    view: model => html`
      <div>
        <h1>Home</h1>
        ${counter.then(c => c.view(model))}
      </div>
    `
  };
};

export default createHome;
