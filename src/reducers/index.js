import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { reducer as form } from 'redux-form';
import includes from 'lodash/includes';

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
const createTimestampedAchievement = (id, achievements, timestamps) => ({
  ...achievements[id],
  timestamp: timestamps[id] ? timestamps[id] : 0,
});


// Basic ui selector
export const getGroupIds = (state) => fromUi.getGroupIds(state.ui);
export const getAchievementsTimestamp = (state) => fromUi.getAchievementsTimestamp(state.ui);
export const getRecentAchievementsIds = (state) => fromUi.getRecentAchievementsIds(state.ui);
export const getCharacterCriteria = (state) => fromUi.getCharacterCriteria(state.ui);
export const getBaseUrl = (state) => fromUi.getBaseUrl(state.ui);
export const getRegion = (state) => fromUi.getRegion(state.ui);

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

export const getMatchFromProps = (state, props) => props.match || null;

export const getCategoriesWithCompleted = createSelector(
  getCategories,
  getAchievements,
  getCharacter,
  (categories, achievements, character) => {
    if (!character) {
      return categories;
    }

    const categoriesWithCompleted = {};
    Object.values(categories).forEach((category) => {
      categoriesWithCompleted[category.id] = {
        ...category,
        achievements: category.achievements.filter((id) =>
          (achievements[id].factionId === character.faction)
          || achievements[id].factionId === 2),
        achievementsCompleted: category.achievements.filter((id) =>
          includes(character.achievements.achievementsCompleted, id)),
      };
    });

    return categoriesWithCompleted;
  },
);

export const getGroupMenuItems = createSelector(
  getGroupIds,
  getGroups,
  getCategoriesWithCompleted,
  (groupIds, groups, categories) =>
    groupIds.map((groupId) => {
      const group = groups[groupId];
      return {
        ...group,
        categories: group.categories.map((catId) => categories[catId]),
      };
    }),
);

export const getCurrentCategory = createSelector(
  getCategoriesWithCompleted,
  getUrls,
  getMatchFromProps,
  (categories, urls, match) => {
    const url = createCatUrlFromParams(match.params);
    const catId = urls[url];
    return categories[catId];
  },
);

export const getCategoryMenuItems = createSelector(
  getGroups,
  getCategoriesWithCompleted,
  getMatchFromProps,
  (groups, categories, match) => {
    const currentGroup = Object.values(groups).find((group) =>
      group.slug === match.params.group);

    return currentGroup.categories.map((catId) => ({
      ...categories[catId],
    }));
  },
);

export const hydrateAchievements = (
  ids,
  achievements,
  achievementsTimestamp,
  allCriteria,
  characterCriteria,
) => ids.map((id) => {
  const achievement = createTimestampedAchievement(
    id,
    achievements,
    achievementsTimestamp,
  );

  const completed = achievement.timestamp > 0;
  const achievementCriteria = allCriteria[id].criteria || [];

  const metaCriteria = achievement.criteria.map((criterion) => ({
    ...criterion,
    ...characterCriteria[criterion.id],
  }));

  const criteria = achievementCriteria.map((criterion) => ({
    ...criterion,
    ...characterCriteria[criterion.id],
    asset: criterion.type === 8 ? achievements[criterion.assetId] : null,
  }));

  return {
    ...achievement,
    completed,
    criteria,
    metaCriteria,
  };
});


export const getVisibleAchievements = createSelector(
  getCategoriesWithCompleted,
  getAchievements,
  getCurrentCategory,
  getAchievementsTimestamp,
  getCriteria,
  getCharacterCriteria,
  (
    categories,
    achievements,
    currentCategory,
    achievementsTimestamp,
    allCriteria,
    characterCriteria,
  ) => {
    if (!currentCategory) {
      return [];
    }

    return hydrateAchievements(
      currentCategory.achievements,
      achievements,
      achievementsTimestamp,
      allCriteria,
      characterCriteria,
    ).sort((a, b) => b.timestamp - a.timestamp);
  },
);

export const getRecentAchievements = createSelector(
  getRecentAchievementsIds,
  getAchievements,
  getAchievementsTimestamp,
  getCriteria,
  getCharacterCriteria,
  (ids, achievements, timestamps, allCriteria, characterCriteria) =>
    hydrateAchievements(
      ids,
      achievements,
      timestamps,
      allCriteria,
      characterCriteria,
    ),
);
