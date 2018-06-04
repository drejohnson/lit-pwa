import { html } from 'lit-html/lib/lit-extended';
import cxs from 'cxs';

const createLink = navigator => {
  return {
    view: (id, label) => html`
      <a 
      onclick=${e => {
        e.preventDefault();
        navigator.navigateTo(id);
      }}
      href=${navigator.getLink(id)}>${label}</a>
    `
  };
};

export default createLink;
