// Initial State
const initialState = {
  loading: false
};

// Actions
const SHOW_LOADING = 'app/layout/SHOW_LOADING';
const HIDE_LOADING = 'app/layout/HIDE_LOADING';

// Reducer
const LayoutReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, loading: true };
    case HIDE_LOADING:
      return { ...state, loading: false };
    default: return state;
  }
};

export default LayoutReducer;

/**
 * Show Loading Action
 */
const showLoading = show => ({
  type: show ? SHOW_LOADING : HIDE_LOADING
});

export const layoutActions = {
  showLoading
};
