import getResponse from './standard-response';
import createSelector from '../utils/create-selector';

const getUserResponse = ({ user }) => getResponse(user, 'getUser');
const updateUserResponse = ({ user }) => getResponse(user, 'updateUser');

const getUser = ({ user }) => ({
  user: user.data,
  userLogged: user.userLogged
});

export default createSelector(
  getUser,
  getUserResponse,
  updateUserResponse
);
