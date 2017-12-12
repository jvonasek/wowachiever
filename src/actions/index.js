// @flow
import { normalize } from 'normalizr';
import { createSearchAction } from 'redux-search';

import * as ActionTypes from '../constants/ActionTypes';
import { groupSchema, routeSchema } from '../actions/schema';
import { createApiEndpoint, createFetchAction, getProcessEnvPublicUrl } from '../utils';

import type {
  Action,
  ThunkAction,
  BnetApiParams,
  Dispatch,
  Region,
  GetState,
} from '../types';

const normalizeAchievementsResponse = (res: Response): Object => {
  const normalizedRes = normalize(res, groupSchema);
  // create url -> id map from all categories
  const { routes } = normalize(
    normalizedRes.entities.categories,
    routeSchema,
  ).entities;

  return {
    ...normalizedRes,
    entities: {
      ...normalizedRes.entities,
      routes,
    },
  };
};

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
    {
      type: ActionTypes.FETCH_ACHIEVEMENTS_SUCCESS,
      payload: (res: Response) => normalizeAchievementsResponse(res),
    },
    ActionTypes.FETCH_ACHIEVEMENTS_FAILURE,
  ],
});

export const fetchCriteria = (): ThunkAction => createFetchAction({
  endpoint: `${getProcessEnvPublicUrl()}/data/criteria.json`,
  types: [
    ActionTypes.FETCH_CRITERIA_REQUEST,
    ActionTypes.FETCH_CRITERIA_SUCCESS,
    ActionTypes.FETCH_CRITERIA_FAILURE,
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

export const fetchAchievementsAndCriteria = () => (dispatch: Dispatch) =>
  Promise.all([
    dispatch(fetchAchievements()),
    dispatch(fetchCriteria()),
  ]);

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
    }).then(() => dispatch(fetchAchievementsAndCriteria()))
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

export const setViewType = (value: string, index: number): Action => ({
  type: ActionTypes.SET_VIEW_TYPE,
  payload: {
    value,
    index,
  },
});

