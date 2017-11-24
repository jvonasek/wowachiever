import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import classnames from 'classnames';
import { Row, Col } from 'reactstrap';

import { splitInHalf } from '../utils';

import CriterionProgressBar from './CriterionProgressBar';

/**
 * Single criterion item in the criteria list
 * @param {Array} criterion
 * @param {Array.<Object>} metaCriteria
 */
const renderCriterion = (criterion, metaCriteria) => (
  <li
    key={`${criterion.id}_${kebabCase(criterion.description)}`}
    className={classnames({
      'text-success': criterion.quantity >= criterion.max,
      'text-muted': criterion.quantity < criterion.max || !criterion.quantity,
      small: true,
    })}
  >
    <strong>{criterion.asset ? criterion.asset.title : criterion.description}</strong>
    {criterion.progressBar &&
      <CriterionProgressBar {...criterion} metaCriteria={metaCriteria} />
    }
  </li>
);

const CriteriaList = ({
  criteria,
  metaCriteria,
}) => criteria.length > 0 && (
  <Row>
    {splitInHalf(criteria).map((list, index) => (
      <Col key={`col-${index.toString()}`}>
        <ul className="list-unstyled">
          {list.map((criterion) => renderCriterion(criterion, metaCriteria))}
        </ul>
      </Col>
    ))}
  </Row>
);

CriteriaList.defaultProps = {
  criteria: [],
  metaCriteria: [],
};

CriteriaList.propTypes = {
  criteria: PropTypes.arrayOf(PropTypes.object),
  metaCriteria: PropTypes.arrayOf(PropTypes.object),
};

export default CriteriaList;
