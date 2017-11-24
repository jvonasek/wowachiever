import React from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';

import { getCriteriaQuantityOccurence } from '../utils';

import ProgressBar from './ProgressBar';

const CriterionProgressBar = ({
  id,
  max,
  quantity,
  metaCriteria,
}) => {
  const progress = {
    value: 0,
    max,
  };

  if (id === 0) {
    // sometimes the criterion ID is 0 which means we have to look
    // into meta criteria for real quantity count
    progress.value = getCriteriaQuantityOccurence(metaCriteria);
  } else {
    progress.value = quantity;
  }

  // clamp the value to max possible value
  progress.value = clamp(progress.value, progress.max);

  const color = progress.value === progress.max ? 'success' : 'primary';

  return <ProgressBar color={color} {...progress} />;
};

CriterionProgressBar.defaultProps = {
  max: 1,
  quantity: 0,
  metaCriteria: [],
};

CriterionProgressBar.propTypes = {
  id: PropTypes.number.isRequired,
  max: PropTypes.number,
  quantity: PropTypes.number,
  metaCriteria: PropTypes.arrayOf(PropTypes.object),
};

export default CriterionProgressBar;
