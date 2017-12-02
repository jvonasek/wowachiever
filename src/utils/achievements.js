import clamp from 'lodash/clamp';
import round from 'lodash/round';
import has from 'lodash/has';
import keyBy from 'lodash/keyBy';
import numeral from 'numeral';

import { calculatePercent, getTotalPropertySum, getRealCriteriaQuantity } from '../utils';

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
    // adding progress percentage of each criteria
    const visibleCriteria = ach.visibleCriteria.map((criterion) => ({
      ...criterion,
      progress: criterion.quantity ? calculatePercent(
        clamp(criterion.quantity, criterion.max),
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

    // if criteria int't present, status text should be 0/1 or 1/1
    // based on achievement completion
    // Otherwise, determine total quantity from visible criteria
    const totalQuantity = ach.completed && visibleCriteria.length === 0
      ? 1
      : getRealCriteriaQuantity(visibleCriteria);

    // max is always 1 if criteria isn't present
    const totalMax = visibleCriteria.length
      ? getTotalPropertySum(visibleCriteria, 'max')
      : 1;

    const progressText = `${numeral(clamp(totalQuantity, totalMax)).format('0a')}/${numeral(totalMax).format('0a')}`;

    return {
      ...ach,
      visibleCriteria,
      progressText,
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

    // new property visibleCriteria comes from WoW client
    // exported with a custom addon
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
