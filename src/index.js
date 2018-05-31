import flyd from "flyd";
import { render } from "lit-html/lib/lit-extended";

import { createApp } from "./app";

const update = flyd.stream();
const app = createApp(update);
const models = flyd.scan(
  (model, modelUpdate) => modelUpdate(model),
  app.model(),
  update
);

const element = document.getElementById("app");
models.map(model => render(app.view(model), element));
