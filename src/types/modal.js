import { PropTypes } from 'react';

export default {
  modal: PropTypes.shape({
    message: PropTypes.shape(),
    open: PropTypes.string
  }),
  handleToggleModal: PropTypes.func
};
