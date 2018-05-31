import { createActions } from "./actions";
import { createView } from "./view";

export const createCounter = update => ({
  model: () => ({
    value: 0
  }),

  view: createView(createActions(update))
});
