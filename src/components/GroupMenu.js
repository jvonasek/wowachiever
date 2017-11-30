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

import { getTotalPropertyLength } from '../utils';

import ProgressBar from '../components/ProgressBar';

const GroupMenu = ({ groupMenuItems, match }) => (
  <Row>
    {groupMenuItems.map(({
      id,
      slug,
      name,
      isLegacy,
      categories,
    }) => (
      <Col key={id} xs={12} sm={6} md={4} xl={3}>
        <Card className="mb-4 group-menu-card">
          <CardBody className="pt-0">
            <CardTitle
              className="group-menu-item-title d-flex align-items-center justify-content-center"
            >
              <Link to={`${match.path}${slug}/global`}>{name}</Link>
            </CardTitle>
            <div className="pl-5 pr-5 pl-sm-4 pr-sm-4">
              <ProgressBar
                type="circle"
                label={ isLegacy ? (
                  <div className="h3">
                    {getTotalPropertyLength(categories, 'completedAchievements')}
                  </div>
                ) : null}
                value={getTotalPropertyLength(categories, 'completedAchievements')}
                max={getTotalPropertyLength(categories, 'achievements')}
              />
            </div>
          </CardBody>
          <Link to={`${match.path}${slug}/global`} className="full-cover-link" />
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
