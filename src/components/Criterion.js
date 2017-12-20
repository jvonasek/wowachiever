// @flow
import React from 'react';
import classnames from 'classnames';

import { clampToMax } from '../utils';

import CriterionProgressBar from './CriterionProgressBar';
import BattlenetImage from '../containers/BattlenetImage';

import type { Criterion as C } from '../types';

type Props = {
  criterion: C,
  criteria: Array<C>,
};

const getCriterionContent = (criterion, criteria) => {
  if (criterion.progressBar && criterion.type !== 8) {
    return <CriterionProgressBar {...criterion} criteria={criteria} />;
  }

  if (criterion.type === 8 && criterion.asset) {
    const { title, icon } = criterion.asset;
    return (
      <strong className="d-flex align-items-start">
        <BattlenetImage
          width={22}
          height={22}
          className="rounded mr-2"
          alt={title}
          resourcePath={`icons/56/${icon}.jpg`}
        />
        {title}
      </strong>
    );
  }

  return (
    <strong>
      {criterion.description}
      {' '}
      {criterion.max > 1 && `(${clampToMax(criterion.quantity, criterion.max)}/${criterion.max})`}
    </strong>
  );
};

const Criterion = ({
  criterion,
  criteria,
}: Props) => {
  const criterionComplete = criterion.quantity >= criterion.max;
  const criterionIncomplete = criterion.quantity < criterion.max || !criterion.quantity;

  return (
    <li
      className={classnames('small my-1', {
        'text-success': criterionComplete,
        'text-muted': criterionIncomplete,
      })}
    >
      {getCriterionContent(criterion, criteria)}
    </li>
  );
};

Criterion.defaultProps = {
  criteria: [],
  visibleCriteria: [],
};

export default Criterion;
