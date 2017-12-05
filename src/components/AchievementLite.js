// @flow
import React from 'react';
import Check from 'react-icons/lib/fa/check';

import { formatTimestamp } from '../utils';

import ColoredPercentageText from './ColoredPercentageText';
import BattlenetImage from '../containers/BattlenetImage';

type Props = {
  completed: boolean,
  icon: string,
  progress: number,
  progressText: string,
  timestamp: number,
  title: string,
};

const AchievementLite = ({
  completed,
  icon,
  progress,
  timestamp,
  title,
  progressText,
}: Props) => (
  <tbody>
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
);

AchievementLite.defaultProps = {
  completed: false,
  progress: 0,
  progressText: '',
  timestamp: null,
};

export default AchievementLite;
