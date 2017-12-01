import React from 'react';
import PropTypes from 'prop-types';

import { getHslColorByPercent } from '../utils';

const ColoredPercentageText = ({ percent, children }) => (
  <span style={{ color: getHslColorByPercent(percent) }}>
    {children}
  </span>
);

ColoredPercentageText.defaultProps = {
  percent: 0,
};

ColoredPercentageText.propTypes = {
  children: PropTypes.node.isRequired,
  percent: PropTypes.number,
};

export default ColoredPercentageText;
