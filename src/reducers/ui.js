// @flow
import * as ActionTypes from '../constants/ActionTypes';

import type { Id, Action, Region, Filter } from '../types';

import config from '../config';

export type UiState = {
  +groupIds: Array<Id>,
  +region: ?Region,
  +filters: Array<Filter>,
  +sort: ?string,
};

const { FILTERS } = config;

const initialState = {
  groupIds: [],
  region: null,
  filters: FILTERS,
  sort: null,
};

const ui = (state: UiState = initialState, action: Action): UiState => {
  switch (action.type) {
    case ActionTypes.FETCH_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        groupIds: action.payload.result,
      };
    case ActionTypes.SET_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        filters: state.filters.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return {
            ...item,
            value: action.payload.value,
          };
        }),
      };
    case ActionTypes.RESET_FILTER:
      return {
        ...state,
        filters: initialState.filters,
      };
    case ActionTypes.SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    default:
      return state;
  }
};

export default ui;

export const getGroupIds = (state: UiState) => state.groupIds;
export const getRegion = (state: UiState) => state.region;
export const getFilters = (state: UiState) => state.filters;
