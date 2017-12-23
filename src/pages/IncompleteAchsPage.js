// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';

import IncompleteAchievements from '../containers/IncompleteAchievements';

import withWowhead from '../hocs/withWowhead';

const IncompleteAchsPage = () => (
  <Row className="justify-content-lg-center">
    <Col lg={8}>
      <h2 className="mb-4">Nearly finished</h2>
      <IncompleteAchievements limit={50} />
    </Col>
  </Row>
);

export default withWowhead(IncompleteAchsPage);
