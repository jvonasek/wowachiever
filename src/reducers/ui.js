// @flow
import * as ActionTypes from '../constants/ActionTypes';

import type { Id, Action, Region } from '../types';

export type UiState = {
  +groupIds: Array<Id>,
  +region: ?Region,
};

const initialState = {
  groupIds: [],
  region: null,
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
    default:
      return state;
  }
};

export default ui;

export const getGroupIds = (state: UiState) => state.groupIds;
export const getRegion = (state: UiState) => state.region;
