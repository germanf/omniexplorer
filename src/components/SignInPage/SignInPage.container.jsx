import React from 'react';
import register from '../../utils/redux-register';
import SignInPage from './SignInPage';
import { authenticationTypes } from '../../types';

const SignInPageContainer = ({ handleLogIn, signInResponse }) => (
  <SignInPage handleLogIn={handleLogIn} signInResponse={signInResponse} />
);

SignInPageContainer.propTypes = {
  handleLogIn: authenticationTypes.handleLogIn.isRequired,
  signInResponse: authenticationTypes.signInResponse.isRequired
};

export default register(
  ['authenticationSelector'],
  ['authentication.handleLogIn'],
  SignInPageContainer
);

