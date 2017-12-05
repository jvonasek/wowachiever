// @flow
import React from 'react';
import kebabCase from 'lodash/kebabCase';
import classnames from 'classnames';
import { Row, Col } from 'reactstrap';

import { splitInHalf, clampToMax } from '../utils';

import CriterionProgressBar from './CriterionProgressBar';

import type { Criterion } from '../types';

type Props = {
  criteria: Array<Criterion>,
  visibleCriteria: Array<Object>,
};

/**
 * Single criterion item in the criteria list
 * @param {Array} criterion
 * @param {Array.<Object>} metaCriteria
 */
const renderCriterion = (criterion: Criterion, criteria: Array<Criterion>) => (
  <li
    key={`${criterion.id}_${kebabCase(criterion.description)}`}
    className={classnames({
      'text-success': criterion.quantity >= criterion.max,
      'text-muted': criterion.quantity < criterion.max || !criterion.quantity,
      small: true,
    })}
  >
    <strong>
      {(criterion.asset && typeof criterion.asset.title === 'string') ?
        criterion.asset.title : criterion.description
      }
      {' '}
      {criterion.max > 1 && `(${clampToMax(criterion.quantity, criterion.max)}/${criterion.max})`}
    </strong>
    {criterion.progressBar &&
      <CriterionProgressBar {...criterion} criteria={criteria} />
    }
  </li>
);

const CriteriaList = ({
  criteria,
  visibleCriteria,
}: Props) => visibleCriteria.length > 0 && (
  <Row>
    {splitInHalf(visibleCriteria).map((list, index) => (
      <Col key={`col-${index.toString()}`}>
        <ul className="list-unstyled">
          {list.map((criterion: Criterion) => renderCriterion(criterion, criteria))}
        </ul>
      </Col>
    ))}
  </Row>
);

CriteriaList.defaultProps = {
  criteria: [],
  visibleCriteria: [],
};

export default CriteriaList;
