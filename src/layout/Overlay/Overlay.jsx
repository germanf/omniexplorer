import React, { PropTypes } from 'react';

const Overlay = ({ children }) => (
  <div className="overlay">{children}</div>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired
};

export default Overlay;
