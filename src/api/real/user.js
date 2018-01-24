import Api from '../../utils/request';

const UserApiCalls = {

  getUser: () => Api.get('/users/details', true),

  updateUser: userData => Api.put('/users/me', userData, true)

};

export default UserApiCalls;
