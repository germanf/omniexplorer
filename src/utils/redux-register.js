import u from 'updeep';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as selectors from '../selectors';
import { actions } from '../redux/modules';

const getActionsNames = actionsNames => actionsNames.map(action => action.split('.')[1]);

const read = (keys, obj) => keys.map((key) => {
  const nKey = key.split('.');
  let k = key;
  let o = obj;

  if (nKey.length > 1) {
    k = nKey[1];
    o = obj[nKey[0]];
  }

  if (!(k in o)) {
    throw new Error(`Unknown fn: ${k}`);
  }

  return o[k];
});

const zip = (keys, values) => {
  const obj = {};
  for (let index = 0; index < keys.length; index += 1) {
    obj[keys[index]] = values[index];
  }
  return obj;
};

const register = (selectorNames, actionNames, Component) => {
  const stateSelectors = !selectorNames.length ? null : createSelector(
    ...read(selectorNames, selectors),
    (...args) => args.reduce((result, item) => u(item, result))
  );
  return connect(
    stateSelectors,
    dispatch => bindActionCreators(
      zip(
        getActionsNames(actionNames),
        read(actionNames, actions)
      ),
      dispatch
    )
  )(Component);
};

export default register;
