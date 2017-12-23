import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import IncompleteAchievements from '../containers/IncompleteAchievements';
import RecentAchievements from '../containers/RecentAchievements';

import withWowhead from '../hocs/withWowhead';

type Props = {
  characterUrl: string,
};

const IncompleteAndRecentOverview = ({ characterUrl }: Props) => (
  <Row>
    <Col sm={6}>
      <h3 className="mb-4">Nearly finished</h3>
      <IncompleteAchievements />
      <Link className="btn btn-secondary btn-block" to={`${characterUrl}/incomplete`}>Show more</Link>
    </Col>
    <Col sm={6}>
      <h3 className="mb-4">Recent</h3>
      <RecentAchievements />
    </Col>
  </Row>
);

export default withWowhead(IncompleteAndRecentOverview);
