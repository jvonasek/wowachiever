import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import clamp from 'lodash/clamp';
import classnames from 'classnames';
import { Row, Col } from 'reactstrap';

import { splitInHalf } from '../utils';

import CriterionProgressBar from './CriterionProgressBar';

/**
 * Single criterion item in the criteria list
 * @param {Array} criterion
 * @param {Array.<Object>} metaCriteria
 */
const renderCriterion = (criterion, criteria) => (
  <li
    key={`${criterion.id}_${kebabCase(criterion.description)}`}
    className={classnames({
      'text-success': criterion.quantity >= criterion.max,
      'text-muted': criterion.quantity < criterion.max || !criterion.quantity,
      small: true,
    })}
  >
    <strong>
      {criterion.asset ? criterion.asset.title : criterion.description}
      {' '}
      {criterion.max > 1 && `(${clamp(criterion.quantity, criterion.max)}/${criterion.max})`}
    </strong>
    {criterion.progressBar &&
      <CriterionProgressBar {...criterion} criteria={criteria} />
    }
  </li>
);

const CriteriaList = ({
  criteria,
  visibleCriteria,
}) => visibleCriteria.length > 0 && (
  <Row>
    {splitInHalf(visibleCriteria).map((list, index) => (
      <Col key={`col-${index.toString()}`}>
        <ul className="list-unstyled">
          {list.map((criterion) => renderCriterion(criterion, criteria))}
        </ul>
      </Col>
    ))}
  </Row>
);

CriteriaList.defaultProps = {
  criteria: [],
  visibleCriteria: [],
};

CriteriaList.propTypes = {
  criteria: PropTypes.arrayOf(PropTypes.object),
  visibleCriteria: PropTypes.arrayOf(PropTypes.object),
};

export default CriteriaList;
