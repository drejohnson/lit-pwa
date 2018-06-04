import { html } from 'lit-html/lib/lit-extended';

const createAbout = navigator => _update => {
  return {
    view: _model => html`
      <div>
        <h1>About</h1>
      </div>
    `
  };
};

export default createAbout;
