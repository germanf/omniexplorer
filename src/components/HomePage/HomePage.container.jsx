import React from 'react';
import { userTypes } from '../../types';
import register from '../../utils/redux-register';
import HomePage from './HomePage';

const HomePageContainer = ({ user, userLogged }) => (
  <HomePage user={user} userLogged={userLogged} />
);

HomePageContainer.propTypes = {
  user: userTypes.user,
  userLogged: userTypes.userLogged.isRequired
};

export default register(
  ['userSelector'],
  [],
  HomePageContainer
);

