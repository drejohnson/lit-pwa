import { html } from "lit-html/lib/lit-extended";
import cxs from "cxs";

const button = cxs({
  fontFamily: "Roboto, sans-serif",
  fontSize: ".875rem",
  fontWeight: "500",
  letterSpacing: ".08929em",
  textDecoration: "none",
  textTransform: "uppercase",
  willChange: "transform, opacity",
  display: "inline-flex",
  position: "relative",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  minWidth: "64px",
  height: "36px",
  border: "none",
  outline: "none",
  overflow: "hidden",
  verticalAlign: "middle",
  borderRadius: "2px",
  padding: "0 1rem",
  backgroundColor: "#eeeeee",
  cursor: "pointer"
});

export const createView = actions => model => html`
  <div>
    <h1>
      <span>Counter: </span>
      <span>${model.value}</span>
    </h1>
    <div>
      <button 
        className=${button} 
        onclick="${actions.increase(1)}">
        + Increase
      </button>
      <button 
        className=${button} 
        onclick="${actions.increase(-1)}">
        - Decrease
      </button>
    </div>
  </div>
`;
