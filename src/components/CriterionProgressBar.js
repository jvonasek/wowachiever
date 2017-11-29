import React from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';

import {
  getCriteriaQuantityOccurence,
  formatNumberAsWoWCurrency,
} from '../utils';

import ProgressBar from './ProgressBar';

const CriterionProgressBar = ({
  id,
  max,
  quantity,
  criteria,
  format,
}) => {
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
  progress.value = clamp(progress.value, progress.max);

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

CriterionProgressBar.propTypes = {
  format: PropTypes.string,
  id: PropTypes.number.isRequired,
  max: PropTypes.number,
  quantity: PropTypes.number,
  criteria: PropTypes.arrayOf(PropTypes.object),
};

export default CriterionProgressBar;
