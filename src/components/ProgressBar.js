import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import { Circle } from 'rc-progress';

import { calculatePercent } from '../utils';

const ProgressBar = ({
  height,
  value,
  max,
  type,
  children,
  ...rest
}) => {
  const percent = calculatePercent(value, max);

  if (type === 'circle') {
    return (
      <div className="progress-bar-circle">
        <Circle
          percent={percent}
          strokeWidth="10"
          strokeColor="#3498DB"
          trailWidth="10"
          strokeLinecap="butt"
          trailColor="#555"
        />
        <div className="progress-bar-label">
          { children || (
            <div className="mt-2">
              <span className="h3 d-block mb-0">{percent}%</span>
              <span className="h6 d-block">{value}/{max}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
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
};

ProgressBar.defaultProps = {
  children: null,
  height: null,
  max: 1,
  type: 'line',
  value: 0,
};

ProgressBar.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  max: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.number,
};

export default ProgressBar;
