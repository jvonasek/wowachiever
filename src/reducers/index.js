import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { reducer as form } from 'redux-form';

import entities, * as fromEntities from './entities';
import ui, * as fromUi from './ui';

const rootReducer = combineReducers({
  entities,
  ui,
  form,
});

export default rootReducer;

/**
 * Creates url string from provided router params
 *
 * @param  {Object} params
 *
 * @return {String}
 */
const createCatUrlFromParams = ({ group, category }) =>
  (category ? `${group}/${category}` : group);

/**
 * Returns single achievement with timestamp
 *
 * @param  {Object} achievements
 * @param  {Object} timestamps
 * @param  {Number} id
 *
 * @returns {Object};
 */
const createTimestampedAchievement = (achievements, timestamps, id) => ({
  ...achievements[id],
  timestamp: timestamps[id],
});


// Basic ui selector
export const getGroupIds = (state) => fromUi.getGroupIds(state.ui);
export const getAchievementsTimestamp = (state) => fromUi.getAchievementsTimestamp(state.ui);
export const getRecentAchievementsIds = (state) => fromUi.getRecentAchievementsIds(state.ui);

// Basic entities selectors
export const getAchievements = (state) => fromEntities.getAchievements(state.entities);
export const getCategories = (state) => fromEntities.getCategories(state.entities);
export const getCriteria = (state) => fromEntities.getCriteria(state.entities);
export const getCharacter = (state) => fromEntities.getCharacter(state.entities);
export const getUrls = (state) => fromEntities.getUrls(state.entities);
export const getRealms = (state) => fromEntities.getRealms(state.entities);
export const getGroups = (state) => fromEntities.getGroups(state.entities);

export const getCategoryById = (state, id) => getCategories(state)[id];
export const getCategoryByUrl = (state, url) => getCategoryById(state, getUrls(state)[url]);

export const getCurrentCategory = (state, props) => {
  const url = createCatUrlFromParams(props.match.params);
  return getCategoryByUrl(state, url);
};

export const getMenuItems = createSelector(
  getGroupIds,
  getGroups,
  getCategories,
  (groupIds, groups, categories) =>
    groupIds.map((groupId) => {
      const group = groups[groupId];
      return {
        ...group,
        categories: group.categories.map((catId) => categories[catId]),
      };
    }),
);

export const getVisibleAchievements = createSelector(
  getCategories,
  getAchievements,
  getCurrentCategory,
  getAchievementsTimestamp,
  (categories, achievements, currentCategory, achievementsTimestamp) => {
    const visibleAchievements = categories[currentCategory.id]
      ? categories[currentCategory.id].achievements
      : [];
    return visibleAchievements.map((achievementId) => createTimestampedAchievement(
      achievements,
      achievementsTimestamp,
      achievementId,
    ));
  },
);

export const getRecentAchievements = createSelector(
  getRecentAchievementsIds,
  getAchievements,
  getAchievementsTimestamp,
  (recentAchievementsIds, achievements, achievementsTimestamp) =>
    recentAchievementsIds.map((achievementId) => createTimestampedAchievement(
      achievements,
      achievementsTimestamp,
      achievementId,
    )),
);
