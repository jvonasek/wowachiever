// @flow
import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Row, Col } from 'reactstrap';

import { splitInHalf } from '../utils';

import Criterion from './Criterion';

import type { Criterion as C } from '../types';

type Props = {
  criteria: Array<C>,
  visibleCriteria: Array<Object>,
};

const CriteriaList = ({
  criteria,
  visibleCriteria,
  ...rest
}: Props) => visibleCriteria.length > 0 && (
  <div {...rest}>
    <Row>
      {splitInHalf(visibleCriteria).map((list, index) => (
        <Col key={`col-${index.toString()}`}>
          <ul className="list-unstyled m-0">
            {list.map((criterion: C) => (
              <Criterion
                key={`${criterion.id}_${kebabCase(criterion.description)}`}
                criterion={criterion}
                criteria={criteria}
              />
            ))}
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
