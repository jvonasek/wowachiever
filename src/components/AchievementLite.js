import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Check from 'react-icons/lib/fa/check';

import { formatTimestamp } from '../utils';

import ColoredPercentageText from './ColoredPercentageText';
import BattlenetImage from '../containers/BattlenetImage';

class AchievementLite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteriaPaneHidden: true,
    };
  }

  toggleCriteriaPane = () => {
    this.setState({
      criteriaPaneHidden: !this.state.criteriaPaneHidden,
    });
  }

  render() {
    const {
      completed,
      icon,
      progress,
      timestamp,
      title,
      progressText,
    } = this.props;

    return (
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
  }
}

AchievementLite.defaultProps = {
  completed: false,
  progress: 0,
  progressText: '',
  timestamp: null,
};

AchievementLite.propTypes = {
  completed: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  progress: PropTypes.number,
  progressText: PropTypes.string,
  timestamp: PropTypes.number,
  title: PropTypes.string.isRequired,
};

export default AchievementLite;
