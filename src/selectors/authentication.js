import getResponse from './standard-response';
import createSelector from '../utils/create-selector';

const getSignUpResponse = ({ authentication }) => getResponse(authentication, 'signUp');

const getSignInResponse = ({ authentication }) => getResponse(authentication, 'signIn');

const getForgotPasswordResponse = ({ authentication }) => getResponse(authentication, 'forgotPassword');

const getResetPasswordResponse = ({ authentication }) => getResponse(authentication, 'resetPassword');

export default createSelector(
  getSignUpResponse,
  getSignInResponse,
  getForgotPasswordResponse,
  getResetPasswordResponse
);
