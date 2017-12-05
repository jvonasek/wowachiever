// @flow
import * as ActionTypes from '../constants/ActionTypes';
import updateAchievements from '../utils/entities';

import type { Action } from '../types';

export type EntityState = {
  +achievements: Object,
  +categories: Object,
  +criteria: Object,
  +routes: Object,
  +realms: Array<Object>,
  +groups: Object,
};

const initialState = {
  achievements: {},
  categories: {},
  criteria: {},
  routes: {},
  realms: [],
  groups: {},
};

const entities = (state: EntityState = initialState, action: Action): EntityState => {
  switch (action.type) {
    case ActionTypes.FETCH_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities,
      };
    case ActionTypes.FETCH_REALMS_SUCCESS:
      return {
        ...state,
        realms: action.payload,
      };
    case ActionTypes.FETCH_CRITERIA_SUCCESS:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          ...action.payload,
        },
      };
    case ActionTypes.HYDRATE_ACHIEVEMENTS:
      return {
        ...state,
        achievements: updateAchievements(state, action),
      };
    default:
      return state;
  }
};

export default entities;

export const getAchievements = (state: EntityState) => state.achievements;
export const getCategories = (state: EntityState) => state.categories;
export const getCriteria = (state: EntityState) => state.criteria;
export const getRoutes = (state: EntityState) => state.routes;
export const getRealms = (state: EntityState) => state.realms;
export const getGroups = (state: EntityState) => state.groups;
