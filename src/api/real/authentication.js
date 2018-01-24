import Api from '../../utils/request';

const AuthenticationApiCalls = {

  logIn: ({ email, password }) => Api.post('/auth/login', { email, password }),

  signUp: ({ name, email, password }) => Api.post('/user', { name, email, password }, false),

  forgotPassword: ({ email }) => Api.post('/forgot-password', { email }, false),

  resetPassword: ({ token, password }) => Api.post('/reset-password', { token, password }, false)

};

export default AuthenticationApiCalls;
