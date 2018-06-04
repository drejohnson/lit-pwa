import { html } from 'lit-html/lib/lit-extended';
import loadable from '../utils/loadable';
import createCounter from '../counter';

const createHome = navigator => update => {
  const counter = createCounter(update);
  return {
    model: () => Object.assign({}, counter.model()),
    view: model => html`
      <div>
        <h1>Home</h1>
        ${counter.view(model)}
      </div>
    `
  };
};

export default createHome;
