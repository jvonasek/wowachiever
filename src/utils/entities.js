// @flow
import round from 'lodash/round';
import keyBy from 'lodash/keyBy';
import pick from 'lodash/pick';
import find from 'lodash/find';

import {
  calculatePercent,
  clampToMax,
} from '../utils';

import type { EntityState } from '../reducers/entities';
import type { Id, Criterion, Achievement, Action } from '../types';

const addAsset = (
  criterion: Criterion,
  achievements: Array<Achievement>,
): Object => {
  const achievement = find(achievements, { id: criterion.assetId });
  if (achievement && criterion.type === 'achievement') {
    return { asset: pick(achievement, ['id', 'title', 'icon', 'completed']) };
  }
  return { asset: null };
};

const addProgressToAchievements = (achievements: Array<Achievement>): Array<Achievement> =>
  achievements.map((ach: Achievement): Achievement => {
    // adding progress percentage of each criteria
    const visibleCriteria = ach.visibleCriteria.map((criterion) => ({
      ...criterion,
      ...addAsset(criterion, achievements),
      progress: criterion.quantity ? calculatePercent(
        clampToMax(criterion.quantity, criterion.max),
        criterion.max,
      ) : 0,
    }));

    let progress = 0;

    // progress is 100 when achievement is completed,
    // otherwise, calculate average of criteria progress percentages
    if (ach.completed) {
      progress = 100;
    } else if (visibleCriteria.length) {
      progress = visibleCriteria.reduce((acc, curr) =>
        acc + curr.progress, 0) / visibleCriteria.length;
    }

    return {
      ...ach,
      visibleCriteria,
      progress: round(progress, 1),
    };
  });

const hydrateAchievements = (
  achievements: { [string]: Achievement },
  completedAchievements: { [string]: Achievement },
  characterCriteria: { [string]: Criterion },
) => Object.keys(achievements).map((id) => {
  const ach = achievements[id];
  // merge raw achiev data with completed achievs data
  const achievement = {
    ...ach,
    ...completedAchievements[id],
  };

  // merge raw criteria with character criteria
  const criteria = achievement.criteria.map((criterion: Criterion): Criterion => ({
    ...criterion,
    ...characterCriteria[criterion.id],
  }));


  const visibleCriteria = achievement.visibleCriteria.map((criterion) => ({
    ...criterion,
    ...characterCriteria[criterion.id],
  }));

  // set timestamp and completed properties
  const timestamp = achievement.timestamp || 0;
  const completed = timestamp > 0;

  return {
    ...achievement,
    timestamp,
    completed,
    criteria,
    visibleCriteria,
  };
});


const setCharacterAchievements = (
  state: EntityState,
  action: Action,
): { [Id]: Achievement } => {
  const { achievements } = state;

  const {
    completedAchievements,
    characterCriteria,
  } = action.payload;


  const hydratedAchievements = hydrateAchievements(
    achievements,
    completedAchievements,
    characterCriteria,
  );

  const withProgress = addProgressToAchievements(hydratedAchievements);

  return keyBy(withProgress, 'id');
};

export default setCharacterAchievements;
