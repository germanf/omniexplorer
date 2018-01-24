import React, { PropTypes } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { modalTypes } from '../types';
import { userIsAuthenticated } from '../api/auth_token';

import routes from '../Routes';
import register from '../utils/redux-register';

import LoadingSpinner from './LoadingSpinner';
import Header from './Header';
import Overlay from './Overlay';
import MessageModal from '../components/Modal/MessageModal';

import '../assets/scss/main.scss';

const Layout = ({ userLogged, modal, loading, history }) => (
  <ConnectedRouter history={history}>
    <div className="root">
      <div className="wrap">
        <Header history={history} />
        <Switch>
          {routes.filter(r => r.path === '/login').map(route => (
            <Route
              path={route.path}
              key={route.path}
              render={props => (userLogged ? (
                <Redirect
                  to={{
                    pathname: '/',
                    state: { from: props.location }
                  }}
                />
              ) : (
                <div className="container">
                  <route.component {...props} />
                </div>
              ))}
            />
          ))}
          {routes.filter(r => r.path !== '/login').map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              render={props => ((!route.secure || (route.secure && userIsAuthenticated())) ? (
                <div className="container">
                  <route.component {...props} />
                </div>
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }}
                />
              ))}
            />
          ))}
        </Switch>
      </div>

      <Overlay>
        { modal.message.open && <MessageModal data={modal.message.data} /> }
      </Overlay>

      <LoadingSpinner active={loading} />

    </div>
  </ConnectedRouter>
);

Layout.propTypes = {
  userLogged: React.PropTypes.bool.isRequired,
  modal: modalTypes.modal.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired
};

export default register(
  ['userSelector', 'modalSelector', 'layoutSelector'],
  [],
  Layout
);
