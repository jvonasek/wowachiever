// @flow
import keyBy from 'lodash/keyBy';

import * as ActionTypes from '../constants/ActionTypes';

import {
  createCharacterInfo,
  pickRecentAchievements,
  zipCharacterCriteria,
  zipCompletedAchievements,
} from '../utils/character';

import type { Action } from '../types';

export type CharacterInfo = {
  +achievementPoints?: number,
  +faction?: number,
  +lastModified?: number,
  +level?: number,
  +name?: string,
  +realm?: string,
  +thumbnail?: string,
  +charRace?: string,
  +charClass?: string,
  +classColor?: string,
}

export type CharacterState = {
  +isFetched: boolean,
  +characterInfo: CharacterInfo,
  +recentAchIds: Array<number>,
  +characterCriteria: Object,
  +completedAchievements: Object,
  +completedAchievementsCount: number,
  +characterUrl: string
};

const initialState = {
  isFetched: false,
  characterInfo: {},
  recentAchIds: [],
  characterCriteria: {},
  completedAchievements: {},
  completedAchievementsCount: 0,
  characterUrl: '/',
};

const character = (state: CharacterState = initialState, action: Action): CharacterState => {
  switch (action.type) {
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        isFetched: true,
        characterInfo: createCharacterInfo(state.characterInfo, action),
        recentAchIds: pickRecentAchievements(state.recentAchIds, action),
        characterCriteria: keyBy(zipCharacterCriteria(state.characterCriteria, action), 'id'),
        completedAchievements: keyBy(zipCompletedAchievements(state.completedAchievements, action), 'id'),
        completedAchievementsCount: action.payload.achievements.achievementsCompleted.length,
      };
    case ActionTypes.SET_CHARACTER_URL:
      return {
        ...state,
        characterUrl: action.payload.replace(/\/+$/, ''),
      };
    case ActionTypes.RESET_CHARACTER:
      return initialState;
    default:
      return state;
  }
};

export default character;

export const getIsFetched = (state: CharacterState) => state.isFetched;
export const getCharacterInfo = (state: CharacterState) => state.characterInfo;
export const getRecentAchIds = (state: CharacterState) => state.recentAchIds;
export const getCharacterCriteria = (state: CharacterState) => state.characterCriteria;
export const getCompletedAchievements = (state: CharacterState) => state.completedAchievements;
export const getCharacterUrl = (state: CharacterState) => state.characterUrl;
