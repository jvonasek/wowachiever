import { combineReducers } from 'redux';

import * as ActionTypes from '../constants/ActionTypes';

const groupIds = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.IMPORT_CATEGORIES:
      return [...state, ...action.payload.result];
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
  baseUrl,
  region,
});

export const getGroupIds = (state) => state.groupIds;
export const getBaseUrl = (state) => state.baseUrl;
export const getRegion = (state) => state.region;
