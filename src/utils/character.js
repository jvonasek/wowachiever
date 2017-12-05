// @flow
import pick from 'lodash/pick';
import zip from 'lodash/zip';
import zipWith from 'lodash/zipWith';
import flatMap from 'lodash/fp/flatMap';
import sortBy from 'lodash/fp/sortBy';
import flow from 'lodash/fp/flow';
import slice from 'lodash/fp/slice';

import config from '../config';

import type { Action } from '../types';
import type { CharacterInfo } from '../reducers/character';

const {
  RACES,
  CLASSES,
  CLASS_COLORS,
} = config;

export const pickRecentAchievements = (state: Array<Object>, action: Action): Array<Object> => {
  const zipped = zip(
    action.payload.achievements.achievementsCompleted,
    action.payload.achievements.achievementsCompletedTimestamp,
  );

  // pick 100 recent achievements and sort them
  const recent = flow(
    sortBy((item) => -item[1]),
    slice(0, 100),
    flatMap((item) => item[0]),
  )(zipped);

  return [
    ...state,
    ...recent,
  ];
};

export const zipCharacterCriteria = (state: Array<Object>, action: Action): Array<Object> => {
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

export const zipCompletedAchievements = (state: Array<Object>, action: Action): Array<Object> => {
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

export const createCharacterInfo = (state: CharacterInfo, action: Action): CharacterInfo => {
  const info = pick(action.payload, [
    'achievementPoints',
    'faction',
    'lastModified',
    'level',
    'name',
    'realm',
    'thumbnail',
  ]);
  return {
    ...state,
    ...info,
    charRace: RACES[action.payload.race],
    charClass: CLASSES[action.payload.class],
    classColor: CLASS_COLORS[action.payload.class],
  };
};
