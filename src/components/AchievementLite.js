// @flow
import React, { Component } from 'react';
import Check from 'react-icons/lib/fa/check';
import {
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';

import { formatTimestamp } from '../utils';

import ColoredPercentageText from './ColoredPercentageText';
import ProgressBar from './ProgressBar';
import CriteriaList from './CriteriaList';
import BattlenetImage from '../containers/BattlenetImage';

import type { Achievement as A } from '../types';

type Props = A;

type OwnState = {
  criteriaPaneHidden: boolean
};

class AchievementLite extends Component<Props, OwnState> {
  static defaultProps = {
    completed: false,
    progress: 0,
    progressText: '',
    timestamp: 0,
  }

  state = {
    criteriaPaneHidden: true,
  }

  toggleCriteriaPane = (): void => {
    if (this.props.visibleCriteria.length > 0) {
      this.setState({
        criteriaPaneHidden: !this.state.criteriaPaneHidden,
      });
    }
  }

  render() {
    const {
      completed,
      criteria,
      description,
      icon,
      points,
      progress,
      timestamp,
      title,
      visibleCriteria,
    } = this.props;

    return (
      <Card className="mb-2" onClick={this.toggleCriteriaPane}>
        <CardBody className="p-2">
          <Row className="d-flex align-items-center">
            <Col sm={10} className="d-flex align-items-center">
              <div className="position-relative">
                <BattlenetImage
                  width={42}
                  height={42}
                  className="rounded mr-2"
                  alt={title}
                  resourcePath={`icons/56/${icon}.jpg`}
                />
                {points > 0 &&
                  <div className="position-absolute position-bottom-left">
                    <strong className="text-stroke p-1">{points}</strong>
                  </div>
                }
              </div>
              <div className="w-100">
                <div><strong className="text-truncate">{title}</strong></div>
                <div className="text-muted text-truncate">{description}</div>
              </div>
            </Col>
            <Col sm={2} className="text-right">
              <ColoredPercentageText percent={progress}>
                {completed ?
                  <span title={formatTimestamp(timestamp)}><Check /></span> :
                  <strong>{Math.floor(progress)}%</strong>
                }
              </ColoredPercentageText>
            </Col>
          </Row>
          <div hidden={this.state.criteriaPaneHidden}>
            <CriteriaList
              achievementComplete={completed}
              criteria={criteria}
              visibleCriteria={visibleCriteria}
              className="mt-2"
            />
          </div>
          <div hidden={!this.state.criteriaPaneHidden}>
            <ProgressBar
              className="mt-1"
              value={progress}
              height={2}
              hiddenLabel
              dynamicColor
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default AchievementLite;
