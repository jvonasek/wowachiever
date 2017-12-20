// @flow
import * as ActionTypes from '../constants/ActionTypes';

import type { Action, Region, ToggleGroup, Dropdown } from '../types';

import config from '../config';

export type UiState = {
  +filters: Array<ToggleGroup>,
  +region: ?Region,
  +sorting: Dropdown,
  +viewType: ToggleGroup,
};

const { FILTERS, SORTING, VIEW_TYPE } = config;

const initialState = {
  filters: FILTERS,
  region: null,
  sorting: SORTING,
  viewType: VIEW_TYPE,
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
        viewType: {
          ...state.viewType,
          value: action.payload,
        },
      };
    default:
      return state;
  }
};

export default ui;

export const getFilters = (state: UiState) => state.filters;
export const getRegion = (state: UiState) => state.region;
export const getSorting = (state: UiState) => state.sorting;
export const getViewType = (state: UiState) => state.viewType;
