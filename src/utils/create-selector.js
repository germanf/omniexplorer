import u from 'updeep';
import { createSelector } from 'reselect';

const create = (...selectors) => createSelector(
  ...selectors,
  (...args) => args.reduce((x, y) => u(y, x))
);

export default create;
