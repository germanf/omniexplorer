/**
 * Create the store with dynamic reducers
 */
/* eslint-disable no-console */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import DevTools from 'utils/devTools';
// import socketMiddleware from 'components/SocketClient/SocketMiddleware';
import { GLOBAL_ON_SAGA_ERROR } from 'constants.js';
import createReducer from './reducers';

let dispatchFn;

const sagaMiddleware = createSagaMiddleware({
  // eslint-disable-next-line no-unused-vars
  onError: (e, sagaStack) => {
    // And let's modify this one just for clarity on screen shots
    console.log('Global saga error handler', e);
    dispatchFn({ type: GLOBAL_ON_SAGA_ERROR, error: e });
  },
});

export default function configureStore(
  initialState = {},
  socketClient,
  history,
) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  // https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
  const middlewares = [
    sagaMiddleware,
    /* socketMiddleware(socketClient), */ routerMiddleware(history),
  ];
  // https://github.com/itaylor/redux-socket.io
  // const middlewares = [sagaMiddleware, createSocketIoMiddleware(socketClient, 'ws://127.0.0.1:60020'), routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // Import DevTools, only for dev environment
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    enhancers.push(DevTools.instrument());
  }

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    isDev &&
    typeof window === 'object' &&
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  // dispatch
  let { dispatch } = store;
  const middlewareAPI = {
    getState: store.getState,
    dispatch: action => dispatch(action),
  };
  dispatch = compose(sagaMiddleware(middlewareAPI))(store.dispatch);
  dispatchFn = dispatch;

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return {
    ...store,
    dispatch,
  };
}
