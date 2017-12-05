// @flow
import React from 'react';
import type { Node } from 'react';

import { getHslColorByPercent } from '../utils';

type Props = {
  children: Node,
  percent: number
};

const ColoredPercentageText = ({ percent, children }: Props) => (
  <span style={{ color: getHslColorByPercent(percent) }}>
    {children}
  </span>
);

ColoredPercentageText.defaultProps = {
  percent: 0,
};

export default ColoredPercentageText;
