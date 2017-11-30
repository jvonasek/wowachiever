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

const region = (state = '', action) => {
  if (action.type === ActionTypes.SET_REGION && action.payload) {
    return action.payload;
  }

  return state;
};

const requestErrors = (state = [], action) => {
  if (action.error && action.payload) {
    return [...state, action.payload];
  }

  if (action.type === ActionTypes.CLEAR_ERRORS) {
    return [];
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

  // clear the list  on error
  if (action.error) {
    return [];
  }

  return state;
};

export default combineReducers({
  groupIds,
  region,
  activeRequests,
  requestErrors,
});

export const getGroupIds = (state) => state.groupIds;
export const getRegion = (state) => state.region;
export const getActiveRequests = (state) => state.activeRequests;
export const getRequestErrors = (state) => state.requestErrors;
