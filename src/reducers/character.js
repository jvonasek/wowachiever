import { combineReducers } from 'redux';
import pick from 'lodash/pick';
import zip from 'lodash/zip';
import zipWith from 'lodash/zipWith';
import keyBy from 'lodash/keyBy';
import flatMap from 'lodash/fp/flatMap';
import sortBy from 'lodash/fp/sortBy';
import flow from 'lodash/fp/flow';
import slice from 'lodash/fp/slice';

import * as ActionTypes from '../constants/ActionTypes';
import config from '../config';

const {
  RECENT_ACHIEVEMENTS_COUNT,
  RACES,
  CLASSES,
  CLASS_COLORS,
} = config;

const createCharacterInfo = (state, action) => {
  const info = pick(action.payload, [
    'achievementPoints',
    'class',
    'faction',
    'lastModified',
    'level',
    'name',
    'race',
    'realm',
    'thumbnail',
  ]);
  return {
    ...state,
    ...info,
    race: RACES[info.race],
    class: CLASSES[info.class],
    classColor: CLASS_COLORS[info.class],
  };
};

const characterInfo = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return createCharacterInfo(state, action);
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

const recentAchIds = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return pickRecentAchievements(state, action);
    default:
      return state;
  }
};

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

const zipCompletedAchievements = (state, action) => {
  const {
    achievementsCompleted,
    achievementsCompletedTimestamp,
  } = action.payload.achievements;

  const zippedAchievements = zipWith(
    achievementsCompleted,
    achievementsCompletedTimestamp,
    (id, timestamp) => ({ id, timestamp, completed: true }),
  );

  return [
    ...state,
    ...zippedAchievements,
  ];
};

const completedAchievements = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return keyBy(zipCompletedAchievements(state, action), 'id');
    default:
      return state;
  }
};

export default combineReducers({
  characterInfo,
  recentAchIds,
  characterCriteria,
  completedAchievements,
});

export const getCharacterInfo = (state) => state.characterInfo;
export const getRecentAchIds = (state) => state.recentAchIds;
export const getCharacterCriteria = (state) => state.characterCriteria;
export const getCompletedAchievements = (state) => state.completedAchievements;
