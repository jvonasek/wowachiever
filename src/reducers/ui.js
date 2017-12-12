// @flow
import * as ActionTypes from '../constants/ActionTypes';

import type { Id, Action, Region, ToggleGroup, Dropdown } from '../types';

import config from '../config';

export type UiState = {
  +filters: Array<ToggleGroup>,
  +groupIds: Array<Id>,
  +region: ?Region,
  +sorting: Dropdown,
  +viewTypes: Array<ToggleGroup>,
};

const { FILTERS, SORTING, VIEW_TYPES } = config;

const initialState = {
  filters: FILTERS,
  groupIds: [],
  region: null,
  sorting: SORTING,
  viewTypes: VIEW_TYPES,
};

const updateObjectInArray = (array: Array<Object>, action: Action) =>
  array.map((item, index) => {
    if (index !== action.payload.index) {
      return item;
    }
    return {
      ...item,
      value: action.payload.value,
    };
  });

const ui = (state: UiState = initialState, action: Action): UiState => {
  switch (action.type) {
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        filters: updateObjectInArray(state.filters, action),
      };
    case ActionTypes.RESET_FILTER:
      return {
        ...state,
        filters: initialState.filters,
      };
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
    case ActionTypes.SET_SORTING:
      return {
        ...state,
        sorting: {
          ...state.sorting,
          value: action.payload,
        },
      };
    case ActionTypes.SET_VIEW_TYPE:
      return {
        ...state,
        viewTypes: updateObjectInArray(state.viewTypes, action),
      };
    default:
      return state;
  }
};

export default ui;

export const getFilters = (state: UiState) => state.filters;
export const getGroupIds = (state: UiState) => state.groupIds;
export const getRegion = (state: UiState) => state.region;
export const getSorting = (state: UiState) => state.sorting;
export const getViewTypes = (state: UiState) => state.viewTypes;
