// @flow
import React from 'react';

import {
  getCriteriaQuantityOccurence,
  formatNumberAsWoWCurrency,
  clampToMax,
} from '../utils';

import ProgressBar from './ProgressBar';

type Props = {
  format: string,
  id: number,
  max: number,
  quantity: number,
  criteria: Array<Object>,
};

const CriterionProgressBar = ({
  id,
  max,
  quantity,
  criteria,
  format,
}: Props) => {
  const progress = {
    value: 0,
    max,
  };

  if (id === 0) {
    // sometimes the criterion ID is 0 which means we have to look
    // into original criteria for real quantity count
    progress.value = getCriteriaQuantityOccurence(criteria);
  } else {
    progress.value = quantity;
  }

  // clamp the value to max possible value
  progress.value = clampToMax(progress.value, progress.max);

  const color = progress.value === progress.max ? 'success' : 'info';

  return (
    <div>
      {format === 'currency' &&
        <span>
          {formatNumberAsWoWCurrency(progress.value)} / {formatNumberAsWoWCurrency(progress.max)}
        </span>
      }
      <ProgressBar color={color} {...progress} />
    </div>
  );
};

CriterionProgressBar.defaultProps = {
  format: null,
  max: 1,
  quantity: 0,
  criteria: [],
};

export default CriterionProgressBar;
