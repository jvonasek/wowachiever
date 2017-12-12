// @flow
import React from 'react';
import { Alert } from 'reactstrap';

type Props = {
  errors: Array<string>
};

const RequestErrors = ({ errors }: Props) => errors.length > 0 && (
  <div>
    {errors.map((error, index) => (
      <Alert key={index.toString()} className="mt-2" color="danger">
        {error}
      </Alert>
    ))}
  </div>
);

RequestErrors.defaultProps = {
  errors: [],
};

export default RequestErrors;
