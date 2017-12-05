// @flow
import * as ActionTypes from '../constants/ActionTypes';
import type { Action } from '../types';

const initialState = {
  active: [],
  errors: [],
};

export type RequestsState = {
  +active: Array<string>,
  +errors: Array<string>,
}

const requestErrors = (state, action) => {
  if (action.error && action.payload) {
    return [...state, action.payload];
  }

  if (action.type === ActionTypes.CLEAR_ERRORS) {
    return [];
  }

  return state;
};

const activeRequests = (state, action) => {
  const requestReg = new RegExp(/^([A-Z_]+)_REQUEST$/g);
  const successReg = new RegExp(/^([A-Z_]+)_SUCCESS$/g);

  const requestMatch = requestReg.exec(action.type);
  const successMatch = successReg.exec(action.type);

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

const requests = (state: RequestsState = initialState, action: Action): RequestsState => ({
  ...state,
  active: activeRequests(state.active, action),
  errors: requestErrors(state.errors, action),
});

export default requests;

export const getActiveRequests = (state: RequestsState) => state.active;
export const getRequestErrors = (state: RequestsState) => state.errors;
