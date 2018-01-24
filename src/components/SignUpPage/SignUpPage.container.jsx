import React, { PropTypes } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import register from '../../utils/redux-register';
import { authenticationTypes } from '../../types';
import SignUpPage from './SignUpPage';

const SignUpPageContainer = ({ history, match, handleSignUp, signUpResponse }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        path={match.path}
        exact
        render={() => (
          <SignUpPage
            handleSignUp={data => handleSignUp(data)}
            signUpResponse={signUpResponse}
          />
        )}
      />
      <Route
        path={`${match.path}/success`}
        render={() => (
          <p>An activation email has been spent to your nominated email account</p>
        )}
      />
    </Switch>
  </ConnectedRouter>
);

SignUpPageContainer.propTypes = {
  handleSignUp: authenticationTypes.handleSignUp.isRequired,
  signUpResponse: authenticationTypes.signUpResponse.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default register(
  ['authenticationSelector'],
  ['authentication.handleSignUp'],
  SignUpPageContainer
);
