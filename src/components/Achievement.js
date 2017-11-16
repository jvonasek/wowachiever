import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
} from 'reactstrap';

import config from '../config';

const { DATE_FORMAT } = config;

const Achievement = ({
  completed,
  description,
  points,
  timestamp,
  title,
}) => (
  <Col sm={6} md={4} lg={3}>
    <Card className="mb-4">
      <CardHeader className={completed ? 'text-white bg-success' : ''}>
        {completed
          ? <span>COMPLETED {timestamp && moment(timestamp).format(DATE_FORMAT)}</span>
          : <span>IN PROGRESS</span>
        }
      </CardHeader>
      <CardBody>
        <CardTitle className="text-truncate">{title}</CardTitle>
        <CardSubtitle className="text-truncate mb-2">{description}</CardSubtitle>
        <CardText>Points: <strong>{points}</strong></CardText>
      </CardBody>
    </Card>
  </Col>
);

Achievement.defaultProps = {
  completed: false,
  points: 0,
  timestamp: null,
};

Achievement.propTypes = {
  completed: PropTypes.bool,
  description: PropTypes.string.isRequired,
  points: PropTypes.number,
  timestamp: PropTypes.number,
  title: PropTypes.string.isRequired,
};

export default Achievement;
