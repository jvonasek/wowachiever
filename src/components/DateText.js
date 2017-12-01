import React from 'react';
import PropTypes from 'prop-types';

import { formatTimestamp } from '../utils';

const DateText = ({
  timestamp,
  format,
}) => timestamp > 0 && (
  <span>{formatTimestamp(timestamp, format)}</span>
);

DateText.defaultProps = {
  format: undefined,
};

DateText.propTypes = {
  format: PropTypes.string,
  timestamp: PropTypes.number.isRequired,
};

export default DateText;
