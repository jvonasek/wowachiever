import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { reducer as form } from 'redux-form';
import has from 'lodash/has';
import keyBy from 'lodash/keyBy';
import values from 'lodash/values';

import character, * as fromCharacter from './character';
import entities, * as fromEntities from './entities';
import ui, * as fromUi from './ui';

import { mapEntitiesToIds, createUrl } from '../utils';

const rootReducer = combineReducers({
  character,
  entities,
  ui,
  form,
});

export default rootReducer;

// Basic ui selectors
export const getGroupIds = (state) => fromUi.getGroupIds(state.ui);
export const getBaseUrl = (state) => fromUi.getBaseUrl(state.ui);
export const getRegion = (state) => fromUi.getRegion(state.ui);
export const getActiveRequests = (state) => fromUi.getActiveRequests(state.ui);
export const getIsLoading = (state) => fromUi.getActiveRequests(state.ui).length > 0;

// Basic character selectors
export const getCharacterInfo = (state) =>
  fromCharacter.getCharacterInfo(state.character);
export const getRecentAchIds = (state) =>
  fromCharacter.getRecentAchIds(state.character);
export const getCharacterCriteria = (state) =>
  fromCharacter.getCharacterCriteria(state.character);
export const getCompletedAchievements = (state) =>
  fromCharacter.getCompletedAchievements(state.character);

// Basic entities selectors
export const getAchievements = (state) => fromEntities.getAchievements(state.entities);
export const getCategories = (state) => fromEntities.getCategories(state.entities);
export const getCriteria = (state) => fromEntities.getCriteria(state.entities);
export const getUrls = (state) => fromEntities.getUrls(state.entities);
export const getRealms = (state) => fromEntities.getRealms(state.entities);
export const getGroups = (state) => fromEntities.getGroups(state.entities);

export const getCategoryById = (state, id) => getCategories(state)[id];
export const getCategoryByUrl = (state, url) => getCategoryById(state, getUrls(state)[url]);

export const getMatchFromProps = (state, props) => props.match || null;

export const getCategoriesWithCompleted = createSelector(
  getCategories,
  getAchievements,
  getCharacterInfo,
  getCompletedAchievements,
  (categories, achievements, characterInfo, completedAchievements) => {
    const cats = Object.values(categories).map((category) => {
      // filter achievements only for current faction,
      // 0 = alliance
      // 1 = horde
      // 2 = both
      const filteredAchievementsIds = category.achievements.filter((id) =>
        (achievements[id].factionId === characterInfo.faction)
        || achievements[id].factionId === 2);

      // array of achievements that were completed
      const completedAchievementsIds = category.achievements.filter((id) =>
        has(completedAchievements, id));

      return {
        ...category,
        achievements: category.isLegacy ? completedAchievementsIds : filteredAchievementsIds,
        completedAchievements: completedAchievementsIds,
      };
    });

    return keyBy(cats, 'id');
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
  getUrls,
  getMatchFromProps,
  getCategoriesWithCompleted,
  (urls, match, categories) => {
    const url = createUrl(values(match.params));
    const catId = urls[url];
    return categories[catId] || {};
  },
);

export const getVisibleAchievementsIds = createSelector(
  getCurrentCategory,
  (currentCategory) => currentCategory.achievements || [],
);

export const getCategoryMenuItems = createSelector(
  getGroups,
  getMatchFromProps,
  getCategoriesWithCompleted,
  (groups, match, categories) => {
    const currentGroup = Object.values(groups).find((group) =>
      group.slug === match.params.group);

    return has(currentGroup, 'categories') ?
      currentGroup.categories.map((catId) => ({
        ...categories[catId],
      })) : [];
  },
);

export const getVisibleAchievements = createSelector(
  getAchievements,
  getVisibleAchievementsIds,
  (achievements, achIds) =>
    mapEntitiesToIds(achievements, achIds)
      .sort((a, b) => b.timestamp - a.timestamp),
);

export const getRecentAchievements = createSelector(
  getAchievements,
  getRecentAchIds,
  (achievements, recentAchIds) =>
    mapEntitiesToIds(achievements, recentAchIds),
);

export const getUnfinishedAchievements = createSelector(
  getAchievements,
  getCharacterInfo,
  (achievements, characterInfo) => Object.values(achievements)
    .filter((ach) => ach.progress < 100)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 10)
    .filter((ach) => (ach.factionId === characterInfo.faction) || ach.factionId === 2),
);

