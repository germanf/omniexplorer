import { PropTypes } from 'react';
import formType from './form';

const authFormResponse = PropTypes.shape({
  message: formType.message.isRequired,
  serverErrors: formType.serverErrors.isRequired,
  success: PropTypes.bool
});

export default {
  // Requests States
  signInResponse: authFormResponse,
  signUpResponse: authFormResponse,
  forgotPasswordResponse: authFormResponse,
  resetPasswordResponse: authFormResponse,
  // Actions
  handleResetPassword: PropTypes.func,
  handleSignUp: PropTypes.func,
  handleForgotPassword: PropTypes.func,
  handleLogIn: PropTypes.func,
  handleLogOut: PropTypes.func
};
