import { normalize } from 'normalizr';
import keyBy from 'lodash/keyBy';

import * as ActionTypes from '../constants/ActionTypes';
import { groupSchema, urlSchema } from '../actions/schema';
import { createApiEndpoint, createFetchAction } from '../utils';

const normalizeAchievementsResponse = (res) => {
  const normalizedRes = normalize(res, groupSchema);
  // create url -> id map from all categories
  const { urls } = normalize(
    normalizedRes.entities.categories,
    urlSchema,
  ).entities;

  return {
    ...normalizedRes,
    entities: {
      ...normalizedRes.entities,
      urls,
    },
  };
};

export const fetchCharacter = (values) => createFetchAction({
  endpoint: createApiEndpoint(values),
  types: [
    ActionTypes.FETCH_CHARACTER,
    ActionTypes.FETCH_CHARACTER_SUCCESS,
    ActionTypes.FETCH_CHARACTER_FAILURE,
  ],
});

export const fetchAchievements = () => createFetchAction({
  endpoint: '/data/achievements.json',
  types: [
    ActionTypes.FETCH_ACHIEVEMENTS,
    {
      type: ActionTypes.FETCH_ACHIEVEMENTS_SUCCESS,
      payload: (res) => normalizeAchievementsResponse(res),
    },
    ActionTypes.FETCH_ACHIEVEMENTS_FAILURE,
  ],
});

export const fetchCriteria = () => createFetchAction({
  endpoint: '/data/criteria.json',
  types: [
    ActionTypes.FETCH_CRITERIA,
    ActionTypes.FETCH_CRITERIA_SUCCESS,
    ActionTypes.FETCH_CRITERIA_FAILURE,
  ],
});

export const fetchRealms = () => createFetchAction({
  endpoint: '/data/realms.json',
  types: [
    ActionTypes.FETCH_REALMS,
    ActionTypes.FETCH_REALMS_SUCCESS,
    ActionTypes.FETCH_REALMS_FAILURE,
  ],
});

export const setBaseUrl = (url) => ({
  type: ActionTypes.SET_BASE_URL,
  payload: url,
});

export const setRegion = (region) => ({
  type: ActionTypes.SET_REGION,
  payload: region,
});

export const fetchAchievementsAndCriteria = () => (dispatch) =>
  Promise.all([
    dispatch(fetchAchievements()),
    dispatch(fetchCriteria()),
  ]);

export const hydrateAchievements = (completedAchievements, characterCriteria) => ({
  type: ActionTypes.HYDRATE_ACHIEVEMENTS,
  payload: {
    completedAchievements,
    characterCriteria,
  },
});
