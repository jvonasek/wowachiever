// @flow
import React from 'react';
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

import type { Group } from '../types';

type Props = {
  classColor: string,
  menuItems: Array<Group>,
  path: string,
};

const GroupMenu = ({ classColor, menuItems, path }: Props) => (
  <Row>
    {menuItems.map(({
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
              <Link to={`${path}/achievements/${slug}/global`}>{name}</Link>
            </CardTitle>
            <div className="pl-5 pr-5 pl-sm-4 pr-sm-4">
              <ProgressBar
                type="circle"
                value={getTotalPropertyLength(categories, 'completedAchievements')}
                max={getTotalPropertyLength(categories, 'achievements')}
                color={classColor}
              >
                {isLegacy &&
                  <div className="h3">
                    {getTotalPropertyLength(categories, 'completedAchievements')}
                  </div>}
              </ProgressBar>
            </div>
          </CardBody>
          <Link to={`${path}/achievements/${slug}/global`} className="full-cover-link" />
        </Card>
      </Col>
    ))}
  </Row>
);

GroupMenu.defaultProps = {
  menuItems: [],
};

export default GroupMenu;
