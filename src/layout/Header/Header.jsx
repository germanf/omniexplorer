import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { userTypes, authenticationTypes } from '../../types';

import register from '../../utils/redux-register';

const Header = ({ userLogged, user, history, handleLogOut }) => (
  <header>
    <div className="nav-toggle">&#9776;</div>

    <div className="logo">Omniexplorer</div>

    { userLogged ?
      <div className="user-info">
        Welcome {user.name} <span>-</span>
        <a
          href="/logout"
          onClick={(evt) => {
            evt.preventDefault();
            handleLogOut();
          }}
        >LogOut</a>
        <span className="icon-settings">
          <span className="path1" />
          <span className="path2" />
        </span>
      </div>
    :
      <ConnectedRouter history={history}>
        <Route
          render={({ location }) => {
            if (location.pathname === '/login') {
              return (
                <div className="user-info">
                  {'I don\'t have an account '}<Link to="/register">Sign Up</Link>
                </div>
              );
            }
            return (
              <div className="user-info">
                Already have an account? <Link to="/login">Sign In</Link>
              </div>
            );
          }}
        />
      </ConnectedRouter>
    }
  </header>
);

Header.propTypes = {
  userLogged: userTypes.userLogged.isRequired,
  user: userTypes.user.isRequired,
  history: PropTypes.shape({}).isRequired,
  handleLogOut: authenticationTypes.handleLogOut
};

export default register(
  ['userSelector'],
  ['authentication.handleLogOut'],
  Header
);
