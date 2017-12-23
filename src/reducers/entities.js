// @flow
import * as ActionTypes from '../constants/ActionTypes';
import setCharacterAchievements from '../utils/entities';

import type { Action, Id } from '../types';

export type EntityState = {
  +achievements: Object,
  +characterAchievements: Object,
  +categories: Object,
  +routes: Object,
  +realms: Array<Object>,
  +groups: Object,
  +groupIds: Array<Id>,
};

const initialState = {
  achievements: {},
  characterAchievements: {},
  categories: {},
  routes: {},
  realms: [],
  groups: {},
  groupIds: [],
};

const entities = (state: EntityState = initialState, action: Action): EntityState => {
  switch (action.type) {
    case ActionTypes.FETCH_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities,
        groupIds: action.payload.result,
      };
    case ActionTypes.FETCH_REALMS_SUCCESS:
      return {
        ...state,
        realms: action.payload,
      };
    case ActionTypes.HYDRATE_ACHIEVEMENTS:
      return {
        ...state,
        achievements: setCharacterAchievements(state, action),
      };
    default:
      return state;
  }
};

export default entities;

export const getAchievements = (state: EntityState) => state.achievements;
export const getCategories = (state: EntityState) => state.categories;
export const getRoutes = (state: EntityState) => state.routes;
export const getRealms = (state: EntityState) => state.realms;
export const getGroups = (state: EntityState) => state.groups;
export const getGroupIds = (state: EntityState) => state.groupIds;
