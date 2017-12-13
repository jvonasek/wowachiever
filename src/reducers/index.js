// @flow
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as search, getSearchSelectors } from 'redux-search';
import has from 'lodash/has';
import keyBy from 'lodash/keyBy';
import pick from 'lodash/pick';
import allPass from 'ramda/src/allPass';
import propEq from 'ramda/src/propEq';
import sortWith from 'ramda/src/sortWith';
import prop from 'ramda/src/prop';
import descend from 'ramda/src/descend';
import ascend from 'ramda/src/ascend';

import character, * as fromCharacter from './character';
import entities, * as fromEntities from './entities';
import ui, * as fromUi from './ui';
import requests, * as fromRequests from './requests';

import { mapEntitiesToIds } from '../utils';
import config from '../config';

import type { State, Id } from '../types';

const {
  OVERVIEW_RECENT_ACHIEVEMENTS_COUNT,
  OVERVIEW_UNFINISHED_ACHIEVEMENTS_COUNT,
  SEARCH_RESULTS_LIMIT,
} = config;

const rootReducer = combineReducers({
  character,
  entities,
  ui,
  requests,
  form,
  routing,
  search,
});

export default rootReducer;

// Basic ui selectors
export const getFilters = (state: State) => fromUi.getFilters(state.ui);
export const getGroupIds = (state: State) => fromUi.getGroupIds(state.ui);
export const getRegion = (state: State) => fromUi.getRegion(state.ui);
export const getSorting = (state: State) => fromUi.getSorting(state.ui);
export const getViewTypes = (state: State) => fromUi.getViewTypes(state.ui);

// Basic requests selector
export const getActiveRequests = (state: State) => fromRequests.getActiveRequests(state.requests);
export const getRequestErrors = (state: State) => fromRequests.getRequestErrors(state.requests);

// Basic character selectors
export const getCharacterInfo = (state: State) =>
  fromCharacter.getCharacterInfo(state.character);
export const getRecentAchIds = (state: State) =>
  fromCharacter.getRecentAchIds(state.character);
export const getCharacterCriteria = (state: State) =>
  fromCharacter.getCharacterCriteria(state.character);
export const getCompletedAchievements = (state: State) =>
  fromCharacter.getCompletedAchievements(state.character);
export const getIsCharacterFetched = (state: State) =>
  fromCharacter.getIsFetched(state.character);
export const getCharacterUrl = (state: State) =>
  fromCharacter.getCharacterUrl(state.character);

// Basic entities selectors
export const getAchievements = (state: State) => fromEntities.getAchievements(state.entities);
export const getCategories = (state: State) => fromEntities.getCategories(state.entities);
export const getCriteria = (state: State) => fromEntities.getCriteria(state.entities);
export const getRoutes = (state: State) => fromEntities.getRoutes(state.entities);
export const getRealms = (state: State) => fromEntities.getRealms(state.entities);
export const getGroups = (state: State) => fromEntities.getGroups(state.entities);

export const getCategoryById = (state: State, id: Id) => getCategories(state)[id];

export const getMatchFromProps = (state: State, props) => props.match || null;
export const getProps = (state: State, props) => props;
export const getIsLoading = (state: State) => getActiveRequests(state).length > 0;

export const getViewType = createSelector(
  getViewTypes,
  (viewTypes) => viewTypes[0].value,
);

export const getSortingValue = createSelector(
  getSorting,
  (sorting) => sorting.value,
);

export const getClassColor = createSelector(
  getCharacterInfo,
  (characterInfo) => characterInfo.classColor,
);

export const getCategoriesWithCompleted = createSelector(
  getCategories,
  getAchievements,
  getCharacterInfo,
  getCompletedAchievements,
  (categories, achievements, characterInfo, completedAchievements) => {
    const cats = Object.keys(categories).map((id) => {
      const category = categories[id];

      // filter achievements only for current faction,
      // 0 = alliance
      // 1 = horde
      // 2 = both
      const filteredAchievementsIds = category.achievements.filter((achId) =>
        (achievements[achId].factionId === characterInfo.faction)
        || achievements[achId].factionId === 2);

      // array of achievements that were completed
      const completedAchievementsIds = category.achievements.filter((achId) =>
        has(completedAchievements, achId));

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
    mapEntitiesToIds(achievements, category.achievements),
);

export const getFilteredAndSortedAchievements = createSelector(
  getVisibleAchievements,
  getCurrentCategory,
  getFilters,
  getSortingValue,
  (achievements, category, filters, sortingValue) => {
    const filterProps = filters.map(({ property, value }) => {
      if (value !== null) {
        return propEq(property, value);
      }

      return null;
    }).filter((p) => p); // filter out null elements

    // filter out achievements with allPass
    const filtered = achievements.filter((ach) => allPass(filterProps)(ach));

    const sortingProp = prop(sortingValue);

    // primary sort comes from user input,
    // title is sorted in ascending order,
    // rest is in descending order
    const primarySort = sortingValue === 'title' ? ascend(sortingProp) : descend(sortingProp);

    // secondary sort is set to progress,
    // if user is sorting by progress, secondary sort is timestamp
    const secondarySort = sortingValue === 'progress' ? descend(prop('timestamp')) : descend(prop('progress'));

    // sort filtered achievements
    return sortWith([primarySort, secondarySort])(filtered);
  },
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

