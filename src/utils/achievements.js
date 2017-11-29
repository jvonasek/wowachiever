import clamp from 'lodash/clamp';
import round from 'lodash/round';
import has from 'lodash/has';
import keyBy from 'lodash/keyBy';

import { calculatePercent } from '../utils';

const addSpecialPropertyByType = (criterion, achievements) => {
  switch (criterion.type) {
    // meta achievement
    case 8:
      return {
        asset: achievements[criterion.assetId],
      };
    // currency
    case 62:
    case 67:
      return {
        format: 'currency',
      };
    default:
      return {};
  }
};

const addProgressToAchievements = (achievements) =>
  achievements.map((ach) => {
    const visibleCriteria = ach.visibleCriteria.map((crit) => ({
      ...crit,
      progress: crit.quantity ? calculatePercent(
        clamp(crit.quantity, crit.max),
        crit.max,
      ) : 0,
    }));

    let progress = 0;

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

const updateAchievements = (
  state,
  action,
) => {
  const {
    achievements,
    criteria: allCriteria,
  } = state;

  const {
    completedAchievements,
    characterCriteria,
  } = action.payload;

  const hydratedAchievements = Object.values(achievements).map((ach) => {
    const { id } = ach;
    // merge raw achiev data with completed achievs data
    const achievement = {
      ...ach,
      ...completedAchievements[id],
    };

    // merge raw criteria with character criteria
    const criteria = achievement.criteria.map((criterion) => ({
      ...criterion,
      ...characterCriteria[criterion.id],
    }));

    // new property visibleCriteria comes criteria exported from WoW client
    const visibleCriteria = has(allCriteria[id], 'criteria') ?
      allCriteria[id].criteria.map((criterion) => ({
        ...criterion,
        ...characterCriteria[criterion.id],
        ...addSpecialPropertyByType(criterion, achievements),
      })) : [];

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

  return keyBy(addProgressToAchievements(hydratedAchievements), 'id');
};

export default updateAchievements;
