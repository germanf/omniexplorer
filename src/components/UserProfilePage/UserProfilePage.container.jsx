import React from 'react';
import register from '../../utils/redux-register';
import UserProfilePage from './UserProfilePage';
import { userTypes } from '../../types';

const UserProfilePageContainer = ({ user }) => (
  <UserProfilePage user={user} />
);

UserProfilePageContainer.propTypes = {
  user: userTypes.user.isRequired
};

export default register(
  ['userSelector'],
  [],
  UserProfilePageContainer
);
