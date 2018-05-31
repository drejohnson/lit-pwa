import { html } from "lit-html/lib/lit-extended";
import cxs from "cxs";

export const createView = _model => {
  const header = cxs({
    height: "60px",
    padding: "0 1rem",
    backgroundColor: "#eeeeee",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  });
  return html`
  <header className=${header}>
    <h1>App</h1>
  </header>
`;
};
