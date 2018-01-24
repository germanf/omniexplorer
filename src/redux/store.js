/* eslint-disable no-underscore-dangle,global-require */

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reduxReset from 'redux-reset';
import { throttle } from 'lodash';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { loadState, saveState } from '../utils/redux-local-state';
import error from './middlewares/error';
import reducers from './reducers';

const getStore = (history) => {
  const persistedState = loadState();
  const middleware = applyMiddleware(error, promise(), thunk, logger(), routerMiddleware(history));
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, persistedState, composeEnhancers(
      middleware,
      reduxReset()  // Will use 'RESET' as default action.type to trigger reset
  ));

  store.subscribe(throttle(() => {
    const st = store.getState();
    saveState({
      user: st.user
    });
  }, 1000));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
};

export default getStore;
