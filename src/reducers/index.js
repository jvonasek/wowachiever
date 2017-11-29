import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import has from 'lodash/has';
import keyBy from 'lodash/keyBy';

import character, * as fromCharacter from './character';
import entities, * as fromEntities from './entities';
import ui, * as fromUi from './ui';

import { mapEntitiesToIds } from '../utils';

const rootReducer = combineReducers({
  character,
  entities,
  ui,
  form,
  routing,
});

export default rootReducer;

// Basic ui selectors
export const getGroupIds = (state) => fromUi.getGroupIds(state.ui);
export const getBaseUrl = (state) => fromUi.getBaseUrl(state.ui);
export const getRegion = (state) => fromUi.getRegion(state.ui);
export const getActiveRequests = (state) => fromUi.getActiveRequests(state.ui);
export const getRequestErrors = (state) => fromUi.getRequestErrors(state.ui);

// Basic character selectors
export const getCharacterInfo = (state) =>
  fromCharacter.getCharacterInfo(state.character);
export const getRecentAchIds = (state) =>
  fromCharacter.getRecentAchIds(state.character);
export const getCharacterCriteria = (state) =>
  fromCharacter.getCharacterCriteria(state.character);
export const getCompletedAchievements = (state) =>
  fromCharacter.getCompletedAchievements(state.character);
export const getIsCharacterFetched = (state) =>
  fromCharacter.getIsFetched(state.character);

// Basic entities selectors
export const getAchievements = (state) => fromEntities.getAchievements(state.entities);
export const getCategories = (state) => fromEntities.getCategories(state.entities);
export const getCriteria = (state) => fromEntities.getCriteria(state.entities);
export const getRoutes = (state) => fromEntities.getRoutes(state.entities);
export const getRealms = (state) => fromEntities.getRealms(state.entities);
export const getGroups = (state) => fromEntities.getGroups(state.entities);

export const getCategoryById = (state, id) => getCategories(state)[id];

export const getMatchFromProps = (state, props) => props.match || null;
export const getProps = (state, props) => props;
export const getCategory = (state, props) => getCategories(state)[props.catId];
export const getIsLoading = (state) => getActiveRequests(state).length > 0;

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
  getCategoriesWithCompleted,
  getProps,
  (categories, props) => categories[props.catId] || {},
);

export const getVisibleAchievementsIds = createSelector(
  getCurrentCategory,
  (currentCategory) => currentCategory.achievements || [],
);

export const getCategoryMenuItems = createSelector(
  getGroups,
  getCategoriesWithCompleted,
  getCategory,
  (groups, categories, category) => {
    const group = category.parent ? groups[category.parent] : {};
    return has(group, 'categories') ?
      group.categories.map((catId) => ({
        ...categories[catId],
      })) : [];
  },
);

export const getVisibleAchievements = createSelector(
  getAchievements,
  getCategory,
  (achievements, category) =>
    mapEntitiesToIds(achievements, category.achievements)
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

