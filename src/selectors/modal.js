import createSelector from '../utils/create-selector';

import get from './get';

export default createSelector(
  get('modal')
);
