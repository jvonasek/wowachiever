// @flow
import React from 'react';

import Achievement from './Achievement';
import AchievementLite from './AchievementLite';

import type { Achievement as A, ViewTypes } from '../types';

type Props = {
  achievements: Array<A>,
  viewType: ViewTypes,
};

const AchievementList = ({ achievements, viewType }: Props) => {
  if (!achievements.length) {
    return <span className="h5">Looks like there is nothing here...</span>;
  }

  if (viewType === 'compact') {
    return achievements.map((achievement) => (
      <AchievementLite key={achievement.id} {...achievement} />
    ));
  }

  return achievements.map((achievement) => (
    <Achievement key={achievement.id} {...achievement} />
  ));
};


AchievementList.defaultProps = {
  achievements: [],
  viewType: 'full',
};

export default AchievementList;
