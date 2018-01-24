import React from 'react';
import { userTypes } from '../../types';

const UserProfilePage = ({ user }) => (
  <div>
    <h1>User Profile</h1>
    <div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Last Name:</strong> {user.lastName}
      </div>
    </div>
  </div>
);

UserProfilePage.propTypes = {
  user: userTypes.user.isRequired
};

export default UserProfilePage;
