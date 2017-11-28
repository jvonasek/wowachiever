import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const FieldValidationMessage = ({
  error,
  touched,
  warning,
}) => {
  if (touched && error) {
    return <Alert className="small" color="danger">{error}</Alert>;
  }

  if (touched && warning) {
    return <Alert className="small" color="warning">{warning}</Alert>;
  }

  return null;
};

FieldValidationMessage.defaultProps = {
  error: '',
  touched: false,
  warning: '',
};

FieldValidationMessage.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
  warning: PropTypes.string,
};

export default FieldValidationMessage;
