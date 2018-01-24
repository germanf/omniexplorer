import React from 'react';
import { userTypes } from '../../types';
import { userIsAuthenticated } from '../../api/auth_token';

const HomePage = ({
  user,
  userLogged
}) => (
  <div>
    Welcome { userLogged ? `Back ${user.name} ${user.lastName}` : 'to the Omniexplorer' }
  </div>
);

HomePage.propTypes = {
  user: userTypes.user,
  userLogged: userTypes.userLogged.isRequired
};

export default HomePage;
