import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const RequestErrors = ({ errors }) => (
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

RequestErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default RequestErrors;
