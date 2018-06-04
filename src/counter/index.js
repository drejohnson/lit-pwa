import createActions from './actions';
import createView from './view';

const createCounter = update => ({
  model: () => ({
    value: 0
  }),

  view: createView(createActions(update))
});

export default createCounter;
