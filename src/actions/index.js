import { CALL_API } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import * as ActionTypes from '../constants/ActionTypes';
import { groupSchema, urlSchema } from '../actions/schema';
import { createApiEndpoint } from '../utils';

export const fetchCharacter = (values) => ({
  [CALL_API]: {
    types: [
      ActionTypes.FETCH_CHARACTER,
      ActionTypes.FETCH_CHARACTER_SUCCESS,
      ActionTypes.FETCH_CHARACTER_FAILURE,
    ],
    endpoint: createApiEndpoint(values),
    method: 'GET',
  },
});

export const importCategories = (data) => {
  const normalizedData = normalize(data, groupSchema);

  // create url -> id map from all categories
  const { urls } = normalize(
    normalizedData.entities.categories,
    urlSchema,
  ).entities;

  return {
    type: ActionTypes.IMPORT_CATEGORIES,
    payload: {
      ...normalizedData,
      entities: {
        ...normalizedData.entities,
        urls,
      },
    },
  };
};

export const importCriteria = (criteria) => ({
  type: ActionTypes.IMPORT_CRITERIA,
  payload: criteria,
});

export const importRealms = (realms) => ({
  type: ActionTypes.IMPORT_REALMS,
  payload: realms,
});

export const setBaseUrl = (url) => ({
  type: ActionTypes.SET_BASE_URL,
  payload: url,
});

export const setRegion = (region) => ({
  type: ActionTypes.SET_REGION,
  payload: region,
});

