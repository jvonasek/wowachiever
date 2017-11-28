import { combineReducers } from 'redux';

import * as ActionTypes from '../constants/ActionTypes';

const groupIds = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ACHIEVEMENTS_SUCCESS:
      return state.length ? state : [...action.payload.result];
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

const activeRequests = (state = [], action) => {
  const requestReg = new RegExp(/^([A-Z_]+)_REQUEST$/g);
  const successReg = new RegExp(/^([A-Z_]+)_SUCCESS$/g);

  const requestMatch = requestReg.exec(action.type);
  const successMatch = successReg.exec(action.type);

  // TODO add error handling

  // if the action is REQUEST, add it to the list
  if (requestMatch) {
    return [
      ...state,
      requestMatch[1],
    ];
  }

  // if the action is SUCCESS, remove it from the list
  if (successMatch) {
    return state.filter((a) => a !== successMatch[1]);
  }

  return state;
};

export default combineReducers({
  groupIds,
  baseUrl,
  region,
  activeRequests,
});

export const getGroupIds = (state) => state.groupIds;
export const getBaseUrl = (state) => state.baseUrl;
export const getRegion = (state) => state.region;
export const getActiveRequests = (state) => state.activeRequests;
