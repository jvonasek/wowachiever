import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import config from '../config';

const { DATE_FORMAT } = config;

const DateText = ({
  timestamp,
  format,
}) => timestamp > 0 && (
  <span>{moment(timestamp).format(format)}</span>
);

DateText.defaultProps = {
  format: DATE_FORMAT,
};

DateText.propTypes = {
  format: PropTypes.string,
  timestamp: PropTypes.number.isRequired,
};

export default DateText;
