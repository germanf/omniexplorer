/* eslint no-unused-vars: 0 */

import config from '../../config';
import Logger from '../../utils/log';

const AuthenticationApiCalls = {

  logIn: (data) => {
    Logger.info('POST - Authentication:logIn');
    Logger.info(data);

    const { email, password } = data;
    let promise;
    if (email !== 'explorer@omni.foundation' || password !== '12345') {
      // Get error when the email or password are wrong
      promise = new Promise((resolve, reject) => setTimeout(() => reject({
        status: 400,
        success: false,
        message: 'The email or password is incorrect'
      }), config.requestTime));
    } else {
      // return user data
      promise = new Promise(resolve => setTimeout(() => resolve({
        data: {
          status: 400,
          success: false,
          message: 'Welcome',
          data: {
            token: '1ksfjalkj14kj21lkasfwopq',
            email,
            name: 'Explorer',
            lastName: 'Omni'
          }
        }
      }), config.requestTime));
    }
    return promise;
  },

  signUp: (data) => {
    Logger.info('POST - Authentication:signUp');
    Logger.info(data);

    const {
      name,
      lastName,
      email,
      password
    } = data;

    let promise;
    if (email === 'user@email.com') {
      // Get error when the email is on the database
      promise = new Promise((resolve, reject) => setTimeout(() => reject({
        status: 400,
        success: false,
        message: 'We found some errors',
        errors: [
          { field: 'email', value: 'Email already exist' }
        ]
      }), config.requestTime));
    } else if (password.length <= 4) {
      // Get error when the password is short
      promise = new Promise((resolve, reject) => setTimeout(() => reject({
        status: 400,
        success: false,
        message: 'We found some errors',
        errors: [
          { field: 'password', value: 'Password too short' }
        ]
      }), config.requestTime));
    } else if (name === 'Sebastian Azagra') {
      // Get error when the password is short
      promise = new Promise((resolve, reject) => setTimeout(() => reject({
        status: 400,
        success: false,
        message: 'We found some errors',
        errors: [
          { field: 'name', value: 'This name is taken' }
        ]
      }), config.requestTime));
    } else {
      // return user data
      promise = new Promise(resolve => setTimeout(() => resolve({
        data: {
          status: 200,
          success: true,
          message: 'Your user has been successfully created'
        }
      }), config.requestTime));
    }
    return promise;
  },


  forgotPassword: (data) => {
    Logger.info('POST - Authentication:forgotPassword');
    Logger.info(data);

    const { email } = data;
    let promise;
    if (email === 'damian@gmail.com') {
      // Get error when the email does not exist
      promise = new Promise((resolve, reject) => setTimeout(() => reject({
        status: 400,
        success: false,
        message: 'We found some errors',
        errors:
        [
          { field: 'email', value: 'Email does not exist' }
        ]
      }), config.requestTime));
    } else {
      // return user data
      promise = new Promise(resolve => setTimeout(() => resolve({
        data: {
          status: 200,
          success: true,
          message: 'We have sent you an email with instructions to reset your password'
        }
      }), config.requestTime));
    }
    return promise;
  },

  resetPassword: (data) => {
    Logger.info('POST - Authentication:forgotPassword');
    Logger.info(data);
    const { token, password } = data;
    let promise;
    if (password === '12345') {
      // Get error when the password is short
      promise = new Promise((resolve, reject) => setTimeout(() => reject({
        status: 400,
        success: false,
        message: 'We found some errors',
        errors: [
          { field: 'password', value: 'Password too short' }
        ]
      }), config.requestTime));
    } else if (token === 'abcd') {
      // Get error when the email does not exist
      promise = new Promise((resolve, reject) => setTimeout(() => reject({
        status: 400,
        success: false,
        message: 'The token is invalid or has been expired'
      }), config.requestTime));
    } else {
      // return user data
      promise = new Promise(resolve => setTimeout(() => resolve({
        data: {
          status: 200,
          success: true,
          message: 'Your password has was successfully reset'
        }
      }), config.requestTime));
    }
    return promise;
  }


};

export default AuthenticationApiCalls;
