import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

const ProgressBar = ({
  height,
  value,
  max,
  ...rest
}) => (
  <Progress
    color="info"
    style={height && { height }}
    value={value}
    max={max}
    {...rest}
  >
    {value > 0 && `${value} / ${max}`}
  </Progress>
);

ProgressBar.defaultProps = {
  height: null,
  max: 1,
  value: 0,
};

ProgressBar.propTypes = {
  height: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
};

export default ProgressBar;
