import React, { Component, PropTypes } from 'react';
import register from '../../utils/redux-register';
import { modalTypes } from '../../types';

class Modal extends Component {

  componentDidMount() {
    if (document && document.body) {
      setTimeout(() => {
        const orig = document.body.className;
        document.body.className = `${orig + (orig ? ' ' : '')}-open-modal`;
      }, 16);
    }
  }

  componentWillUnmount() {
    if (document && document.body) {
      document.body.className = document.body.className.replace(/ ?-open-modal/, '');
    }
  }

  render() {
    return (
      <div className="modal">
        <a
          href="/modal"
          className="close-modal"
          onClick={(evt) => {
            evt.preventDefault();
            this.props.handleToggleModal();
          }}
        >
          <span className="icon-delete" />
        </a>
        {this.props.children}
      </div>
    );
  }
}

Modal.propTypes = {
  handleToggleModal: modalTypes.handleToggleModal.isRequired,
  children: PropTypes.node.isRequired
};

export default register(
  [],
  ['modal.handleToggleModal'],
  Modal
);
