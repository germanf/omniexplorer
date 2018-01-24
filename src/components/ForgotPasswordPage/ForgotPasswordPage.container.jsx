import React, { PropTypes } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import register from '../../utils/redux-register';
import { authenticationTypes } from '../../types';
import ForgotPasswordPage from './ForgotPasswordPage';

const ForgotPasswordPageContainer = ({
  history, match, handleForgotPassword, forgotPasswordResponse
}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        path={match.path}
        exact
        render={() => (
          <ForgotPasswordPage
            handleForgotPassword={data => handleForgotPassword(data)}
            serverErrors={forgotPasswordResponse.serverErrors}
          />
        )}
      />
      <Route
        path={`${match.path}/success`}
        render={() => (
          <p>Thank you. We have sent you an email to reset your password!</p>
        )}
      />
    </Switch>
  </ConnectedRouter>
);

ForgotPasswordPageContainer.propTypes = {
  handleForgotPassword: authenticationTypes.handleForgotPassword.isRequired,
  forgotPasswordResponse: authenticationTypes.forgotPasswordResponse.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default register(
  ['authenticationSelector'],
  ['authentication.handleForgotPassword'],
  ForgotPasswordPageContainer
);
