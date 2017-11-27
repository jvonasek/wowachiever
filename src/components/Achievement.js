import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import BattlenetImage from '../containers/BattlenetImage';

// temporary for debugging purposes
const factionIdToText = (factionId) => {
  switch (factionId) {
    case 0: return 'alliance';
    case 1: return 'horde';
    case 2:
    default: return 'all';
  }
};

class Achievement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteriaHidden: true,
    };
  }

  toggleCriteriaPane = () => {
    this.setState({
      criteriaHidden: !this.state.criteriaHidden,
    });
  }

  render() {
    const {
      accountWide,
      completed,
      criteria,
      factionId,
      description,
      icon,
      id,
      points,
      progress,
      reward,
      timestamp,
      title,
      visibleCriteria,
    } = this.props;

    return (
      <Card className={completed ? 'border-success mb-4' : 'mb-4'}>
        <CardBody onClick={this.toggleCriteriaPane}>
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
              <CardTitle className="mb-1">{title}</CardTitle>
              <CardText>{description}</CardText>
              <div style={{ display: this.state.criteriaHidden ? 'none' : 'block' }}>
                <CriteriaList criteria={criteria} visibleCriteria={visibleCriteria} />
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Row>
            <Col sm={8}>
              <span className="text-warning">{progress}%</span>{' | '}
              <span>id: <strong>{id}</strong></span>{' | '}
              <span>Points: <strong>{points}</strong></span>{' | '}
              <span>Faction: <strong>{factionIdToText(factionId)}</strong></span>{' | '}
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
  }
}

Achievement.defaultProps = {
  accountWide: false,
  completed: false,
  criteria: [],
  points: 0,
  progress: 0,
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
  progress: PropTypes.number,
  reward: PropTypes.string,
  timestamp: PropTypes.number,
  title: PropTypes.string.isRequired,
  visibleCriteria: PropTypes.arrayOf(PropTypes.object),
};

export default Achievement;
