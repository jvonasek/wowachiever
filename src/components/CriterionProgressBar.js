// @flow
import React from 'react';

import {
  getCriteriaQuantityOccurence,
  formatNumberAsWoWCurrency,
  clampToMax,
} from '../utils';

import ProgressBar from './ProgressBar';

type Props = {
  id: number,
  max: number,
  quantity: number,
  criteria: Array<Object>,
  type: string|number,
};

const CriterionProgressBar = ({
  id,
  max,
  quantity,
  criteria,
  type,
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

  return (
    <div>
      <ProgressBar {...progress}>
        {type === 'currency' &&
          <span>
            {formatNumberAsWoWCurrency(progress.value)}
            {' / '}
            {formatNumberAsWoWCurrency(progress.max)}
          </span>
        }
      </ProgressBar>
    </div>
  );
};

export default CriterionProgressBar;
