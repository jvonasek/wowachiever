import { combineReducers } from 'redux';
import zipObject from 'lodash/fp/zipObject';
import zip from 'lodash/zip';
import zipWith from 'lodash/zipWith';
import keyBy from 'lodash/keyBy';
import flatMap from 'lodash/fp/flatMap';
import sortBy from 'lodash/fp/sortBy';
import flow from 'lodash/fp/flow';
import slice from 'lodash/fp/slice';

import * as ActionTypes from '../constants/ActionTypes';
import config from '../config';

const { RECENT_ACHIEVEMENTS_COUNT } = config;

const groupIds = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.IMPORT_CATEGORIES:
      return [...state, ...action.payload.result];
    default:
      return state;
  }
};

const achievementsTimestamp = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        ...zipObject(
          action.payload.achievements.achievementsCompleted,
          action.payload.achievements.achievementsCompletedTimestamp,
        ),
      };
    default:
      return state;
  }
};

const pickRecentAchievements = (state, action) => {
  const zipped = zip(
    action.payload.achievements.achievementsCompleted,
    action.payload.achievements.achievementsCompletedTimestamp,
  );

  const recent = flow(
    sortBy((item) => -item[1]),
    slice(0, RECENT_ACHIEVEMENTS_COUNT),
    flatMap((item) => item[0]),
  )(zipped);

  return [
    ...state,
    ...recent,
  ];
};

const recentAchievementsIds = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return pickRecentAchievements(state, action);
    default:
      return state;
  }
};

/* const criteriaQuantity = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        ...zipObject(
          action.payload.achievements.criteria,
          action.payload.achievements.criteriaQuantity,
        ),
      };
    default:
      return state;
  }
}; */

const zipCharacterCriteria = (state, action) => {
  const {
    criteria,
    criteriaQuantity,
    criteriaTimestamp,
    criteriaCreated,
  } = action.payload.achievements;

  const zippedCriteria = zipWith(
    criteria, criteriaQuantity, criteriaTimestamp, criteriaCreated,
    (id, quantity, timestamp, created) => ({
      id,
      quantity,
      timestamp,
      created,
    }),
  );

  return [
    ...state,
    ...zippedCriteria,
  ];
};

const characterCriteria = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return keyBy(zipCharacterCriteria(state, action), 'id');
    default:
      return state;
  }
};

const baseUrl = (state = '/', action) => {
  if (action.type === ActionTypes.SET_BASE_URL && action.payload) {
    return action.payload;
  }

  return state;
};

const region = (state = '', action) => {
  if (action.type === ActionTypes.SET_REGION && action.payload) {
    return action.payload;
  }

  return state;
};

export default combineReducers({
  groupIds,
  achievementsTimestamp,
  recentAchievementsIds,
  characterCriteria,
  baseUrl,
  region,
});

export const getGroupIds = (state) => state.groupIds;
export const getAchievementsTimestamp = (state) => state.achievementsTimestamp;
export const getRecentAchievementsIds = (state) => state.recentAchievementsIds;
export const getCharacterCriteria = (state) => state.characterCriteria;
export const getBaseUrl = (state) => state.baseUrl;
export const getRegion = (state) => state.region;
