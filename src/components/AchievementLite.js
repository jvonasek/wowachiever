// @flow
import React from 'react';
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
import BattlenetImage from '../containers/BattlenetImage';

import type { Achievement as A } from '../types';

type Props = A;

const AchievementLite = ({
  completed,
  description,
  icon,
  points,
  progress,
  timestamp,
  title,
}: Props) => (
  <Card className="mb-2">
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
              <strong>{Math.round(progress)}%</strong>
            }
          </ColoredPercentageText>
        </Col>
      </Row>
      <ProgressBar
        className="mt-1"
        value={progress}
        height={2}
        hiddenLabel
        dynamicColor
      />
    </CardBody>
  </Card>
);
/*   <tbody>
    <tr>
      <td>
        <BattlenetImage
          width={26}
          height={26}
          className="rounded"
          alt={title}
          resourcePath={`icons/56/${icon}.jpg`}
        />
      </td>
      <td>
        <ColoredPercentageText percent={progress}>
          <strong>{Math.round(progress)}%</strong>
        </ColoredPercentageText>
      </td>
      <td>{points}pts</td>
      <td><strong>{title}</strong></td>
      <td className="text-right">
        {completed ?
          <span className="text-success" title={`Completed on ${formatTimestamp(timestamp)}`}>
            <Check />
          </span> :
          <ColoredPercentageText percent={progress}>
            <strong>{progressText}</strong>
          </ColoredPercentageText>
        }
      </td>
    </tr>
  </tbody>
); */

AchievementLite.defaultProps = {
  completed: false,
  progress: 0,
  progressText: '',
  timestamp: 0,
};

export default AchievementLite;
