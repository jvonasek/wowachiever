// @flow
import React from 'react';

import { formatTimestamp } from '../utils';

type Props = {
  timestamp: number,
  format?: string,
};

const DateText = ({
  timestamp,
  format,
}: Props) => timestamp > 0 && (
  <span>{formatTimestamp(timestamp, format)}</span>
);

DateText.defaultProps = {
  timestamp: 0,
  format: undefined,
};

export default DateText;
