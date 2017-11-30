import { normalize } from 'normalizr';
import { createSearchAction } from 'redux-search';

import * as ActionTypes from '../constants/ActionTypes';
import { groupSchema, routeSchema } from '../actions/schema';
import { createApiEndpoint, createFetchAction } from '../utils';

const normalizeAchievementsResponse = (res) => {
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

export const clearErrors = () => ({
  type: ActionTypes.CLEAR_ERRORS,
});

export const fetchCharacter = (values) => createFetchAction({
  endpoint: createApiEndpoint(values),
  types: [
    ActionTypes.FETCH_CHARACTER_REQUEST,
    ActionTypes.FETCH_CHARACTER_SUCCESS,
    ActionTypes.FETCH_CHARACTER_FAILURE,
  ],
});

export const fetchAchievements = () => createFetchAction({
  endpoint: `${process.env.PUBLIC_URL}/data/achievements.json`,
  types: [
    ActionTypes.FETCH_ACHIEVEMENTS_REQUEST,
    {
      type: ActionTypes.FETCH_ACHIEVEMENTS_SUCCESS,
      payload: (res) => normalizeAchievementsResponse(res),
    },
    ActionTypes.FETCH_ACHIEVEMENTS_FAILURE,
  ],
});

export const fetchCriteria = () => createFetchAction({
  endpoint: `${process.env.PUBLIC_URL}/data/criteria.json`,
  types: [
    ActionTypes.FETCH_CRITERIA_REQUEST,
    ActionTypes.FETCH_CRITERIA_SUCCESS,
    ActionTypes.FETCH_CRITERIA_FAILURE,
  ],
});

export const fetchRealms = () => createFetchAction({
  endpoint: `${process.env.PUBLIC_URL}/data/realms.json`,
  types: [
    ActionTypes.FETCH_REALMS_REQUEST,
    ActionTypes.FETCH_REALMS_SUCCESS,
    ActionTypes.FETCH_REALMS_FAILURE,
  ],
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

export const fetchEverything = (values) => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch(clearErrors());
    dispatch(fetchCharacter(values)).then((action) => {
      if (action.error) {
        reject(action);
      } else {
        resolve(action);
      }
    });
  }).then(() => dispatch(fetchAchievementsAndCriteria(values)))
    .then(() => {
      const { character } = getState();
      dispatch(hydrateAchievements(
        character.completedAchievements,
        character.characterCriteria,
      ));
      return true;
    });

export const setCharacterUrl = (url) => ({
  type: ActionTypes.SET_CHARACTER_URL,
  payload: url,
});

export const setRegion = (region) => ({
  type: ActionTypes.SET_REGION,
  payload: region,
});
