import { push } from 'react-router-redux';
import { userActions } from './user';
import { modalActions } from './modal';
import { layoutActions } from './layout';
import Api from '../../api';
import { storeToken, clearToken, clearState } from '../../api/auth_token';
import RequestReducer, { getDefaultRequestObject, actionTypes } from '../../utils/request-reducer';

const { AuthenticationApiCalls } = Api;

// Initial State
const initialState = {
  signInRequest: getDefaultRequestObject,
  signUpRequest: getDefaultRequestObject,
  forgotPasswordRequest: getDefaultRequestObject,
  resetPasswordRequest: getDefaultRequestObject
};

// Actions
const LOGIN = 'app/authentication/LOGIN';
const SIGNUP = 'app/authentication/SIGNUP';
const FORGOT_PASSWORD = 'app/authentication/FORGOT_PASSORD';
const RESET_PASSWORD = 'app/authentication/RESET_PASSORD';


// Reducer
const AuthenticationReducer = (state = initialState, action = {}) => {
  if (actionTypes(LOGIN).includes(action.type)) {
    return RequestReducer(state, action, LOGIN, 'signInRequest');
  }

  if (actionTypes(SIGNUP).includes(action.type)) {
    return RequestReducer(state, action, SIGNUP, 'signUpRequest');
  }

  if (actionTypes(FORGOT_PASSWORD).includes(action.type)) {
    return RequestReducer(state, action, FORGOT_PASSWORD, 'forgotPasswordRequest');
  }

  if (actionTypes(RESET_PASSWORD).includes(action.type)) {
    return RequestReducer(state, action, RESET_PASSWORD, 'resetPasswordRequest');
  }

  return state;
};

export default AuthenticationReducer;


// **** Action Creators ***** //

/**
 * Login Action
 * @param {Object} containing { email, password }
 */
const logIn = ({
  email,
  password
}) => (dispatch) => {
  dispatch(layoutActions.showLoading(true));
  dispatch({
    type: LOGIN,
    payload: AuthenticationApiCalls.logIn({ email, password })
  })
  .then((response) => {
    const responseValue = response.value.data;
    // remove token from object
    const { token, ...userData } = responseValue.data;
    // store token in localStorage
    storeToken(token);
    // set User Data
    dispatch(userActions.handleSetUserData(userData));
    // set user logged
    dispatch(userActions.handleSetUserLogged(true));
    // Done!
    dispatch(layoutActions.showLoading(false));
  })
  .catch((response) => {
    dispatch(layoutActions.showLoading(false));
    dispatch(modalActions.handleToggleModal('message', {
      title: 'Error Found',
      description: response.message
    }));
    return response.errors;
  });
};

/**
 * LogOut Action
 */
const logOut = () => (dispatch) => {
  clearToken();
  clearState();
  dispatch({ type: 'RESET' });
};

/**
 * SignUp Action
 * @param {Object} containing { name, email, password }
 */
const signUp = ({
  name,
  email,
  password
}) => (dispatch) => {
  dispatch(layoutActions.showLoading(true));
  dispatch({
    type: SIGNUP,
    payload: AuthenticationApiCalls.signUp({ name, email, password })
  })
  .then((response) => {
    dispatch(layoutActions.showLoading(false));
    dispatch(push('/register/success'));
    return response;
  })
  .catch((response) => {
    dispatch(layoutActions.showLoading(false));
    dispatch(modalActions.handleToggleModal('message', {
      title: 'Error Found',
      description: response.message
    }));
    return response.errors;
  });
};

/**
 * Forgot Password Action
 * @param {Object} containing { email }
 */
const forgotPassword = ({
  email
}) => (dispatch) => {
  dispatch(layoutActions.showLoading(true));
  dispatch({
    type: FORGOT_PASSWORD,
    payload: AuthenticationApiCalls.forgotPassword({ email })
  })
  .then((response) => {
    dispatch(layoutActions.showLoading(false));
    dispatch(push('/forgot-password/success'));
    return response;
  })
  .catch((response) => {
    dispatch(layoutActions.showLoading(false));
    return response.errors;
  });
};

/**
 * Reset Password Action
 * @param {Object} containing { token, password }
 */
const resetPassword = ({
  token,
  password
}) => (dispatch) => {
  dispatch(layoutActions.showLoading(true));
  dispatch({
    type: RESET_PASSWORD,
    payload: AuthenticationApiCalls.resetPassword({ token, password })
  })
  .then((response) => {
    dispatch(layoutActions.showLoading(false));
    dispatch(push(`/reset-password/${token}/success`));
    return response;
  })
  .catch((response) => {
    dispatch(layoutActions.showLoading(false));
    return response.errors;
  });
};

export const authenticationActions = {
  handleLogIn: logIn,
  handleSignUp: signUp,
  handleLogOut: logOut,
  handleForgotPassword: forgotPassword,
  handleResetPassword: resetPassword
};
