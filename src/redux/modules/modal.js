
// Initial State
const initialState = {
  message: {
    open: false,
    data: {}
  },
  open: null
};

// Actions
const TOGGLE_MODAL = 'app/modal/TOGGLE_MODAL';


// Reducer
const ModalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        open: action.payload.modal || '',
        [action.payload.modal || state.open]: {
          open: !state[action.payload.modal || state.open].open,
          data: action.payload.data
        }
      };

    default: return state;
  }
};

export default ModalReducer;

// **** Action Creators ***** //

const toggleModal = (modal, data = {}) => ({
  type: TOGGLE_MODAL,
  payload: {
    modal,
    data
  }
});

export const modalActions = {
  handleToggleModal: toggleModal
};
