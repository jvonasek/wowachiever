import React from 'react';
import PropTypes from 'prop-types';

import FieldValidationMessage from '../components/FieldValidationMessage';

const FieldWithMessage = ({
  input,
  type,
  meta,
  ...rest
}) => (
  <div>
    <input {...input} {...rest}type={type} />
    <FieldValidationMessage {...meta} />
  </div>
);

FieldWithMessage.defaultProps = {
  meta: null,
  type: 'text',
};

FieldWithMessage.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  meta: PropTypes.objectOf(PropTypes.any),
  type: PropTypes.string,
};

export default FieldWithMessage;
