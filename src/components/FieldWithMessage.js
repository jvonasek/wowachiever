// @flow
import React from 'react';

import FieldValidationMessage from '../components/FieldValidationMessage';

type Props = {
  input: Object,
  meta: Object,
  type: string,
};

const FieldWithMessage = ({
  input,
  type,
  meta,
  ...rest
}: Props) => (
  <div>
    <input {...input} {...rest}type={type} />
    <FieldValidationMessage {...meta} />
  </div>
);

FieldWithMessage.defaultProps = {
  meta: null,
  type: 'text',
};

export default FieldWithMessage;
