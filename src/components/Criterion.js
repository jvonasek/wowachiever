// @flow
import React from 'react';
import classnames from 'classnames';

import { clampToMax } from '../utils';

import CriterionProgressBar from './CriterionProgressBar';
import WowheadLink from './WowheadLink';
import CompletionIcon from './CompletionIcon';

import BattlenetImage from '../containers/BattlenetImage';

import type { Criterion as C } from '../types';

type Props = {
  criterion: C,
  criteria: Array<C>,
};

const getCriterionContent = (criterion, criteria) => {
  if (criterion.progressBar && criterion.type !== 'achievement') {
    return <CriterionProgressBar {...criterion} criteria={criteria} />;
  }

  if (['item', 'npc'].includes(criterion.type) && criterion.assetId) {
    return (
      <WowheadLink type={criterion.type} id={criterion.assetId}>
        {criterion.description}
      </WowheadLink>
    );
  }

  if (criterion.type === 'achievement' && criterion.asset) {
    const { title, icon } = criterion.asset;
    return (
      <strong className="d-flex align-items-center text-truncate">
        <BattlenetImage
          width={18}
          height={18}
          className="rounded mr-1 border border-secondary"
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
  const criterionComplete = (criterion.quantity >= criterion.max)
    || (criterion.asset && criterion.asset.completed);

  const criterionIncomplete = criterion.quantity < criterion.max || !criterion.quantity;
  return (
    <li
      className={classnames('small my-1', {
        'text-success': criterionComplete,
        'text-muted': criterionIncomplete,
        'd-flex align-items-center text-truncate': !criterion.progressBar,
      })}
    >
      {!criterion.progressBar &&
        <CompletionIcon isComplete={criterionComplete} className="mr-1" />}
      {getCriterionContent(criterion, criteria)}
    </li>
  );
};

Criterion.defaultProps = {
  criteria: [],
  visibleCriteria: [],
};

export default Criterion;
