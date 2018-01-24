import React, { PropTypes } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import register from '../../utils/redux-register';
import { authenticationTypes } from '../../types';
import ResetPasswordPage from './ResetPasswordPage';

const ForgotPasswordPageContainer = ({
  history, match, handleResetPassword, resetPasswordResponse
}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        path={match.path}
        exact
        render={() => (
          <ResetPasswordPage
            handleResetPassword={data => handleResetPassword({
              token: match.params.token,
              password: data.password
            })}
            serverErrors={resetPasswordResponse.serverErrors}
          />
        )}
      />
      <Route
        path={`${match.path}/success`}
        exact
        render={() => (
          <p>Thank you. We have sent you an email to reset your password!</p>
        )}
      />
    </Switch>
  </ConnectedRouter>
);

ForgotPasswordPageContainer.propTypes = {
  handleResetPassword: authenticationTypes.handleResetPassword.isRequired,
  resetPasswordResponse: authenticationTypes.resetPasswordResponse.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default register(
  ['authenticationSelector'],
  ['authentication.handleResetPassword'],
  ForgotPasswordPageContainer
);
