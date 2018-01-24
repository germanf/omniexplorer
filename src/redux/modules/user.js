import Api from '../../api';
import RequestReducer, { getDefaultRequestObject, actionTypes } from '../../utils/request-reducer';
import { layoutActions } from './layout';

const { UserApiCalls } = Api;

// Initial State
const initialState = {
  getUserRequest: getDefaultRequestObject,
  updateUserRequest: getDefaultRequestObject,
  data: {
    email: '',
    name: '',
    lastName: ''
  },
  userLogged: false
};

// Actions
const SET_USER_DATA = 'app/user/SET_USER_DATA';
const GET_USER = 'app/user/GET_USER';
const UPDATE_USER = 'app/user/UPDATE_USER';
const SET_USER_LOGGED = 'app/user/SET_USER_LOGGED';

// Reducer
const UserReducer = (state = initialState, action = {}) => {
  if (actionTypes(GET_USER).includes(action.type)) {
    return RequestReducer(state, action, GET_USER, 'getUserRequest');
  }

  if (actionTypes(UPDATE_USER).includes(action.type)) {
    return RequestReducer(state, action, UPDATE_USER, 'updateUserRequest');
  }

  if (actionTypes(SET_USER_DATA).includes(action.type)) {
    return {
      ...state,
      data: action.payload.data
    };
  }

  if (actionTypes(SET_USER_LOGGED).includes(action.type)) {
    return {
      ...state,
      userLogged: true
    };
  }

  return state;
};

export default UserReducer;

// **** Action Creators ***** //

/**
 * Set User Data Action
 * @param {Object} containing userData
 */
const setUserData = userData => ({
  type: SET_USER_DATA,
  payload: {
    data: userData
  }
});

/**
 * Get User Action
 */
const getUser = () => (dispatch) => {
  dispatch(layoutActions.showLoading(true));
  dispatch({
    type: GET_USER,
    payload: UserApiCalls.getUser()
  })
  .then((response) => {
    dispatch(layoutActions.showLoading(false));
    dispatch(setUserData(response.value.data));
  })
  .catch((response) => {
    dispatch(layoutActions.showLoading(false));
    return response.errors;
  });
};

/**
 * UPDATE User Action
 */
const updateUser = userData => (dispatch) => {
  dispatch(layoutActions.showLoading(true));
  dispatch({
    type: UPDATE_USER,
    payload: UserApiCalls.updateUser(userData)
  })
  .then(() => {
    dispatch(layoutActions.showLoading(false));
    dispatch(setUserData(userData));
  })
  .catch((response) => {
    dispatch(layoutActions.showLoading(false));
    return response.errors;
  });
};

/**
 * Set User Logged Action
 */
const setUserLogged = () => ({
  type: SET_USER_LOGGED
});


export const userActions = {
  handleSetUserData: setUserData,
  handleGetUser: getUser,
  handleUpdateUser: updateUser,
  handleSetUserLogged: setUserLogged
};
