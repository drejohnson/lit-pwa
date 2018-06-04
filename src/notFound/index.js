import { html } from 'lit-html/lib/lit-extended';

const createNotFound = navigator => _update => {
  return {
    view: _model => html`
      <div>
        <h1>Page Not Found</h1>
      </div>
    `
  };
};

export default createNotFound;
