// @flow
import React from 'react';
import type { Node } from 'react';
import { Circle } from 'rc-progress';
import classnames from 'classnames';

import { calculatePercent, getHslColorByPercent } from '../utils';

type Props = {
  children: Node,
  className: string,
  color: ?string,
  dynamicColor: boolean,
  height: ?number,
  hiddenLabel: boolean,
  max?: ?number,
  type: 'line' | 'circle',
  value: number,
};

const ProgressBar = ({
  children,
  className,
  color,
  dynamicColor,
  height,
  hiddenLabel,
  max,
  type,
  value,
}: Props) => {
  const percent: number = value && max ? calculatePercent(value, max) : value;

  if (type === 'circle') {
    const circleClassName = classnames('progress-bar-circle', className);
    return (
      <div className={circleClassName}>
        <Circle
          percent={percent}
          strokeWidth="10"
          strokeColor={color || '#3498DB'}
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

  const barStyle = {
    width: `${percent}%`,
    backgroundColor: (dynamicColor ? getHslColorByPercent(percent) : undefined) || color,
  };

  const progressClassName = classnames('progress', className);
  const barClassName = classnames('progress-bar', {
    'bg-info': typeof barStyle.backgroundColor === 'undefined',
  });

  return (
    <div className={progressClassName} style={height && { height }}>
      <div
        style={barStyle}
        className={barClassName}
        role="progressbar"
      />
      {!hiddenLabel && (
        <div className="progress-value text-center text-stroke text-white">
          {children || (max ? `${value} / ${max}` : value)}
        </div>
      )}
    </div>
  );
};

ProgressBar.defaultProps = {
  children: null,
  className: '',
  color: undefined,
  dynamicColor: false,
  height: null,
  hiddenLabel: false,
  max: null,
  type: 'line',
  value: 0,
};

export default ProgressBar;
