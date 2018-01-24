import React, { PropTypes } from 'react';
import Modal from '../../../layout/Modal';

const MessageModal = ({ data }) => (
  <Modal>
    <h3 className="space-bottom">{data.title}</h3>
    <p>{data.description}</p>
  </Modal>
);

MessageModal.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

MessageModal.defaultProps = {
  data: {}
};

export default MessageModal;
