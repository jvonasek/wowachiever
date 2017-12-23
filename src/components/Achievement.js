// @flow
import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from 'reactstrap';

import CriteriaList from './CriteriaList';
import DateText from './DateText';
import ColoredPercentageText from './ColoredPercentageText';
import BattlenetImage from '../containers/BattlenetImage';

import type { Achievement as A } from '../types';

type Props = A;

const Achievement = ({
  accountWide,
  completed,
  criteria,
  description,
  icon,
  id,
  points,
  progress,
  reward,
  timestamp,
  title,
  visibleCriteria,
}: Props) => (
  <Card className={completed ? 'border-success mb-4' : 'mb-4'}>
    <CardBody>
      <Row>
        <Col sm={1} className="text-center">
          <BattlenetImage
            width={56}
            height={56}
            className="rounded"
            alt={title}
            resourcePath={`icons/56/${icon}.jpg`}
          />
        </Col>
        <Col sm={11}>
          <CardTitle className="mb-1"><strong>{title}</strong></CardTitle>
          <CardText>{description}</CardText>
          <CriteriaList
            criteria={criteria}
            visibleCriteria={visibleCriteria}
          />
        </Col>
      </Row>
    </CardBody>
    <CardFooter>
      <Row>
        <Col sm={8}>
          <ColoredPercentageText percent={progress}>{progress}%</ColoredPercentageText>{' | '}
          <span>id: <strong>{id}</strong></span>{' | '}
          <span>Points: <strong>{points}</strong></span>{' | '}
          <span>Account wide: <strong>{accountWide ? 'yes' : 'no'}</strong></span>
          {reward && <strong><br />{reward}</strong>}
        </Col>
        <Col sm={4} className="text-right text-success">
          <DateText timestamp={timestamp} />
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
  progress: 0,
  progressText: null,
  reward: null,
  timestamp: 0,
  visibleCriteria: [],
};

export default Achievement;
