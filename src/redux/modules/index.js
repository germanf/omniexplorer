import { routerReducer as router } from 'react-router-redux';
import user, { userActions } from './user';
import authentication, { authenticationActions } from './authentication';
import layout, { layoutActions } from './layout';
import modal, { modalActions } from './modal';

const actions = {
  user: userActions,
  authentication: authenticationActions,
  layout: layoutActions,
  modal: modalActions
};

const reducers = {
  user,
  authentication,
  modal,
  layout,
  router
};

export { reducers, actions };
