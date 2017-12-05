// @flow
import React from 'react';
import type { Node } from 'react';
import { Progress } from 'reactstrap';
import { Circle } from 'rc-progress';

import { calculatePercent } from '../utils';

type Props = {
  children: Node,
  height?: ?number,
  max: number,
  type: 'line' | 'circle',
  value: number,
};

const ProgressBar = ({
  children,
  height,
  max,
  type,
  value,
  ...rest
}: Props) => {
  const percent: number = calculatePercent(value, max);

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
              <span className="h4 d-block mb-0">{value}/{max}</span>
              <span className="h6 d-block">{percent}%</span>
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

export default ProgressBar;
