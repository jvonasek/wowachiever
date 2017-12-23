// @flow
import React from 'react';
import defer from 'lodash/defer';

import Achievement from './Achievement';
import AchievementLite from './AchievementLite';

import { refreshWowheadLinks } from '../utils';

import type { Achievement as A, ViewTypes } from '../types';

type Props = {
  achievements: Array<A>,
  viewType: ViewTypes,
};

class AchievementList extends React.Component<Props> {
  static defaultProps = {
    achievements: [],
    viewType: 'full',
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewType !== prevProps.viewType) {
      defer(refreshWowheadLinks);
    }
  }

  render() {
    const { achievements, viewType } = this.props;
    if (!achievements.length) {
      return null;
    }

    if (viewType === 'compact') {
      return achievements.map((achievement) => (
        <AchievementLite key={achievement.id} {...achievement} />
      ));
    }

    return achievements.map((achievement) => (
      <Achievement key={achievement.id} {...achievement} />
    ));
  }
}

export default AchievementList;
