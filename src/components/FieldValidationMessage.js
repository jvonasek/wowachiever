// @flow
import React from 'react';
import { Alert } from 'reactstrap';

type Props = {
  error: string,
  touched: boolean,
  warning: string,
};

const FieldValidationMessage = ({
  error,
  touched,
  warning,
}: Props) => {
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

export default FieldValidationMessage;
