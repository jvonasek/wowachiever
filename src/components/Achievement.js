import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from 'reactstrap';

import config from '../config';

import CriteriaList from './CriteriaList';
import BattlenetImage from '../containers/BattlenetImage';

const { DATE_FORMAT } = config;

// temporary for debugging purposes
const factionIdToText = (factionId) => {
  switch (factionId) {
    case 0: return 'alliance';
    case 1: return 'horde';
    case 2:
    default: return 'all';
  }
};

const Achievement = ({
  accountWide,
  completed,
  criteria,
  factionId,
  description,
  icon,
  id,
  points,
  reward,
  timestamp,
  title,
  visibleCriteria,
}) => (
  <Card className={completed ? 'border-success mb-4' : 'mb-4'}>
    <CardBody>
      <Row>
        <Col sm={1}>
          <BattlenetImage
            className="rounded"
            alt={title}
            resourcePath={`icons/56/${icon}.jpg`}
          />
        </Col>
        <Col sm={11}>
          <CardTitle className="mb-1">{title}</CardTitle>
          <CardText>{description}</CardText>
          <CriteriaList criteria={criteria} visibleCriteria={visibleCriteria} />
        </Col>
      </Row>
    </CardBody>
    <CardFooter>
      <Row>
        <Col>
          <span>id: <strong>{id}</strong></span>{' | '}
          <span>Points: <strong>{points}</strong></span>{' | '}
          <span>Faction: <strong>{factionIdToText(factionId)}</strong></span>{' | '}
          <span>Account wide: <strong>{accountWide ? 'yes' : 'no'}</strong></span>
          {reward && <strong><br />{reward}</strong>}
        </Col>
        <Col className="text-right text-success">
          {timestamp > 0 && <strong>{moment(timestamp).format(DATE_FORMAT)}</strong>}
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

Achievement.defaultProps = {
  accountWide: false,
  completed: false,
  criteria: [],
  points: 0,
  reward: null,
  timestamp: null,
  visibleCriteria: [],
};

Achievement.propTypes = {
  accountWide: PropTypes.bool,
  completed: PropTypes.bool,
  criteria: PropTypes.arrayOf(PropTypes.any),
  factionId: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  points: PropTypes.number,
  reward: PropTypes.string,
  timestamp: PropTypes.number,
  title: PropTypes.string.isRequired,
  visibleCriteria: PropTypes.arrayOf(PropTypes.object),
};

export default Achievement;
