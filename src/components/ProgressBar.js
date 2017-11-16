import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

const ProgressBar = ({
  current,
  max,
  height,
}) => (
  <Progress
    style={{ height }}
    value={current}
    max={max}
  />
);

ProgressBar.defaultProps = {
  current: 0,
  height: 20,
  max: 1,
};

ProgressBar.propTypes = {
  current: PropTypes.number,
  height: PropTypes.number,
  max: PropTypes.number,
};

export default ProgressBar;
