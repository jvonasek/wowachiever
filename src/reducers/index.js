import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as search, getSearchSelectors } from 'redux-search';
import has from 'lodash/has';
import keyBy from 'lodash/keyBy';
import pick from 'lodash/pick';

import character, * as fromCharacter from './character';
import entities, * as fromEntities from './entities';
import ui, * as fromUi from './ui';

import { mapEntitiesToIds } from '../utils';
import config from '../config';

const {
  OVERVIEW_RECENT_ACHIEVEMENTS_COUNT,
  OVERVIEW_UNFINISHED_ACHIEVEMENTS_COUNT,
  SEARCH_RESULTS_LIMIT,
} = config;

const rootReducer = combineReducers({
  character,
  entities,
  ui,
  form,
  routing,
  search,
});

export default rootReducer;

// Basic ui selectors
export const getGroupIds = (state) => fromUi.getGroupIds(state.ui);
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
export const getCharacterUrl = (state) =>
  fromCharacter.getCharacterUrl(state.character);

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

export const getCurrentGroup = createSelector(
  getCurrentCategory,
  getGroups,
  (category, groups) => groups[category.parent],
);

export const getVisibleAchievementsIds = createSelector(
  getCurrentCategory,
  (currentCategory) => currentCategory.achievements || [],
);

export const getCategoryMenuItems = createSelector(
  getGroups,
  getCategoriesWithCompleted,
  getCurrentCategory,
  (groups, categories, category) => {
    const group = category.parent ? groups[category.parent] : null;
    return group ?
      group.categories.map((catId) => ({
        ...categories[catId],
      })) : [];
  },
);

export const getVisibleAchievements = createSelector(
  getAchievements,
  getCurrentCategory,
  (achievements, category) =>
    mapEntitiesToIds(achievements, category.achievements)
      .sort((a, b) => b.timestamp - a.timestamp),
);

export const getRecentAchievements = createSelector(
  getAchievements,
  getRecentAchIds,
  (achievements, recentAchIds) =>
    mapEntitiesToIds(achievements, recentAchIds)
      .slice(0, OVERVIEW_RECENT_ACHIEVEMENTS_COUNT),
);

export const getUnfinishedAchievements = createSelector(
  getAchievements,
  getCharacterInfo,
  (achievements, characterInfo) => Object.values(achievements)
    .filter((ach) => ach.progress < 100 && ach.isLegacy === false)
    .filter((ach) => (ach.factionId === characterInfo.faction) || ach.factionId === 2)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, OVERVIEW_UNFINISHED_ACHIEVEMENTS_COUNT),
);


const searchAchievementsSelectors = getSearchSelectors({
  resourceName: 'achievements',
  resourceSelector: (resourceName, state) => getAchievements(state),
});

export const getAchievementsSearchResult = createSelector(
  searchAchievementsSelectors.result,
  searchAchievementsSelectors.text,
  getAchievements,
  (result, text, achievements) => {
    if (!text.length) {
      return [];
    }

    return result.slice(0, SEARCH_RESULTS_LIMIT).map((id) => pick(achievements[id], [
      'id',
      'title',
      'icon',
      'completed',
      'url',
    ]));
  },
);

