// @flow
import React from 'react';
import kebabCase from 'lodash/kebabCase';
import classnames from 'classnames';
import { Row, Col } from 'reactstrap';

import { splitInHalf, clampToMax } from '../utils';

import CriterionProgressBar from './CriterionProgressBar';

import type { Criterion } from '../types';

type Props = {
  achievementComplete: boolean,
  criteria: Array<Criterion>,
  visibleCriteria: Array<Object>,
};

/**
 * Single criterion item in the criteria list
 * @param {Array} criterion
 * @param {Array.<Object>} metaCriteria
 */
const renderCriterion = (
  achievementComplete: boolean,
  criterion: Criterion,
  criteria: Array<Criterion>,
) => {
  const criterionComplete = criterion.quantity >= criterion.max;
  const criterionIncomplete = criterion.quantity < criterion.max || !criterion.quantity;
  const criterionCompleteOnDiffChar = achievementComplete && criterionIncomplete;

  const critTitle = criterionCompleteOnDiffChar ? 'Completed on different character' : null;
  return (
    <li
      key={`${criterion.id}_${kebabCase(criterion.description)}`}
      className={classnames('small', {
        'text-success': criterionComplete,
        'text-success-muted': criterionCompleteOnDiffChar,
        'text-muted': criterionIncomplete && !criterionCompleteOnDiffChar,
      })}
    >
      {criterion.progressBar && criterion.type !== 8 ?
        <CriterionProgressBar {...criterion} criteria={criteria} />
        :
        <strong title={critTitle}>
          {(criterion.asset && typeof criterion.asset.title === 'string') ?
            criterion.asset.title : criterion.description
          }
          {' '}
          {criterion.max > 1 && `(${clampToMax(criterion.quantity, criterion.max)}/${criterion.max})`}
        </strong>
      }
    </li>
  );
};

const CriteriaList = ({
  achievementComplete,
  criteria,
  visibleCriteria,
  ...rest
}: Props) => visibleCriteria.length > 0 && (
  <div {...rest}>
    <Row>
      {splitInHalf(visibleCriteria).map((list, index) => (
        <Col key={`col-${index.toString()}`}>
          <ul className="list-unstyled m-0">
            {list.map((criterion: Criterion) =>
              renderCriterion(achievementComplete, criterion, criteria))}
          </ul>
        </Col>
      ))}
    </Row>
  </div>
);

CriteriaList.defaultProps = {
  criteria: [],
  visibleCriteria: [],
};

export default CriteriaList;
