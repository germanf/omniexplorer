/* eslint camelcase: 0, no-unused-vars:0 */

import Logger from '../../utils/log';
import config from '../../config';
import { getToken } from '../auth_token';

const UserApiCalls = {

  getUser: () => {
    Logger.info('GET - User:getUser');
    let promise;
    if (!getToken()) {
      // Get error when the token is not saved in the localStorage
      promise = new Promise((resolve, reject) => setTimeout(() => reject({
        status: 400,
        success: false,
        message: 'You are not logged In'
      }), config.requestTime));
    } else {
      // return user data
      promise = new Promise(resolve => setTimeout(() => resolve({
        data: {
          status: 200,
          success: true,
          message: 'User data retrieved',
          data: {
            email: 'user@email.com',
            name: 'Omni',
            lastName: 'Explorer'
          }
        }
      }), config.requestTime));
    }
    return promise;
  },

  updateUser: (data) => {
    Logger.info('PUT - User:updateUser');
    Logger.info(data);
    let promise;
    if (!data.id) {
      // Get error when the id is missing
      promise = new Promise((resolve, reject) => setTimeout(() => reject({
        status: 400,
        success: false,
        message: 'The id is missing'
      }), config.requestTime));
    } else {
      // return user data
      promise = new Promise(resolve => setTimeout(() => resolve({
        data: {
          status: 200,
          success: true,
          message: 'User updated'
        }
      }), config.requestTime));
    }
    return promise;
  }

};

export default UserApiCalls;
