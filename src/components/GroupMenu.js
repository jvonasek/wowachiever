import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';

import ProgressBar from '../components/ProgressBar';

const getTotalAchCount = (categories, property) =>
  categories.reduce((acc, curr) => acc + curr[property].length, 0);

const GroupMenu = ({ groupMenuItems, match }) => (
  <Row>
    {groupMenuItems.map(({
      id,
      slug,
      name,
      categories,
    }) => (
      <Col key={id} sm={4}>
        <Card className="mb-4">
          <CardBody>
            <CardTitle className="h5">
              <Link to={`${match.path}${slug}/global`}>{name}</Link>
            </CardTitle>
            <ProgressBar
              value={getTotalAchCount(categories, 'completedAchievements')}
              max={getTotalAchCount(categories, 'achievements')}
            />
          </CardBody>
        </Card>
      </Col>
    ))}
  </Row>
);

GroupMenu.defaultProps = {
  groupMenuItems: [],
  match: null,
};

GroupMenu.propTypes = {
  groupMenuItems: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.objectOf(PropTypes.any),
};

export default GroupMenu;
