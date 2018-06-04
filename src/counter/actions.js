import { over, lensProp, add } from '../utils/fp-libs';

const createActions = update => ({
  increase: amount => _evt => update(over(lensProp('value'))(add(amount)))
});

export default createActions;
