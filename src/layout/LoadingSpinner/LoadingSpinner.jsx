import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './LoadingSpinner.scss';

const LoadingSpinner = ({ active }) => (
  <div className={classnames(styles.spinner, active ? styles.active : '')}>
    <svg>
      <circle cx="33" cy="33" r="30" />
    </svg>
  </div>
);

LoadingSpinner.propTypes = {
  active: PropTypes.bool.isRequired
};

export default LoadingSpinner;
