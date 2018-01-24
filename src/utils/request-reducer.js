export const getDefaultRequestObject = {
  loading: false,
  response: {
    success: null,
    message: '',
    data: null,
    errors: null
  }
};

export const getResponseObject = (status, response) => {
  switch (status) {
    case 'PENDING':
      return {
        loading: true,
        response: {
          success: null,
          message: '',
          data: null,
          errors: null
        }
      };
    case 'FULFILLED':
      return {
        loading: false,
        response: {
          success: response.data.success || true,
          message: response.data.message || '',
          data: response.data.data,
          errors: null
        }
      };
    case 'REJECTED':
      return {
        loading: false,
        response: {
          success: response.success || false,
          message: response.message || '',
          errors: response.errors || []
        }
      };
    default: return {};
  }
};

export const actionTypes = actionType => [
  actionType,
  `${actionType}_PENDING`,
  `${actionType}_FULFILLED`,
  `${actionType}_REJECTED`
];

const RequestReducer = (state, currentAction = {}, actionType, stateKey) => {
  switch (currentAction.type) {
    case `${actionType}_PENDING`:
      return { ...state, [stateKey]: getResponseObject('PENDING', currentAction.payload) };
    case `${actionType}_FULFILLED`:
      return { ...state, [stateKey]: getResponseObject('FULFILLED', currentAction.payload) };
    case `${actionType}_REJECTED`:
      return { ...state, [stateKey]: getResponseObject('REJECTED', currentAction.payload) };
    default: return state;
  }
};

export default RequestReducer;

