// @flow
import { createSearchAction } from 'redux-search';

import * as ActionTypes from '../constants/ActionTypes';
import { createApiEndpoint, createFetchAction, getProcessEnvPublicUrl } from '../utils';

import type {
  Action,
  ThunkAction,
  BnetApiParams,
  Dispatch,
  Region,
  GetState,
} from '../types';

export const searchAchievements = createSearchAction('achievements');

export const clearErrors = (): Action => ({
  type: ActionTypes.CLEAR_ERRORS,
});

export const fetchCharacter = (values: BnetApiParams): ThunkAction => createFetchAction({
  endpoint: createApiEndpoint(values),
  types: [
    ActionTypes.FETCH_CHARACTER_REQUEST,
    ActionTypes.FETCH_CHARACTER_SUCCESS,
    ActionTypes.FETCH_CHARACTER_FAILURE,
  ],
});

export const fetchAchievements = (): ThunkAction => createFetchAction({
  endpoint: `${getProcessEnvPublicUrl()}/data/achievements.json`,
  types: [
    ActionTypes.FETCH_ACHIEVEMENTS_REQUEST,
    ActionTypes.FETCH_ACHIEVEMENTS_SUCCESS,
    ActionTypes.FETCH_ACHIEVEMENTS_FAILURE,
  ],
});

export const fetchRealms = (): ThunkAction => createFetchAction({
  endpoint: `${getProcessEnvPublicUrl()}/data/realms.json`,
  types: [
    ActionTypes.FETCH_REALMS_REQUEST,
    ActionTypes.FETCH_REALMS_SUCCESS,
    ActionTypes.FETCH_REALMS_FAILURE,
  ],
});

export const hydrateAchievements = (
  completedAchievements: Object,
  characterCriteria: Object,
): Action => ({
  type: ActionTypes.HYDRATE_ACHIEVEMENTS,
  payload: {
    completedAchievements,
    characterCriteria,
  },
});

export const fetchEverything = (values: BnetApiParams): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) =>
    new Promise((resolve, reject) => {
      dispatch(clearErrors());
      dispatch(fetchCharacter(values)).then((action) => {
        if (action.error) {
          reject(action);
        } else {
          resolve(action);
        }
      });
    }).then(() => dispatch(fetchAchievements()))
      .then(() => {
        const { character } = getState();
        dispatch(hydrateAchievements(
          character.completedAchievements,
          character.characterCriteria,
        ));
        return true;
      });

export const setCharacterUrl = (url: string): Action => ({
  type: ActionTypes.SET_CHARACTER_URL,
  payload: url,
});

export const setRegion = (region: Region): Action => ({
  type: ActionTypes.SET_REGION,
  payload: region,
});

export const setFilter = (value: string, index: number): Action => ({
  type: ActionTypes.SET_FILTER,
  payload: {
    value,
    index,
  },
});

export const setSorting = (value: string): Action => ({
  type: ActionTypes.SET_SORTING,
  payload: value,
});

export const resetFilter = (): Action => ({
  type: ActionTypes.RESET_FILTER,
});

export const setViewType = (value: string): Action => ({
  type: ActionTypes.SET_VIEW_TYPE,
  payload: value,
});

export const resetCharacter = (): Action => ({
  type: ActionTypes.RESET_CHARACTER,
});
