/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import getStore from './redux/store';
import Root from './Root';

const history = createHistory();
const store = getStore(history);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const appReloaded = require('./Root').default;
    render(appReloaded);
  });
}
