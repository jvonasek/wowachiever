import keyBy from 'lodash/keyBy';

import * as ActionTypes from '../constants/ActionTypes';
import updateAchievements from '../utils/achievements';

const initialState = {
  achievements: {},
  categories: {},
  criteria: {},
  urls: {},
  realms: [],
  groups: {},
};

const entities = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities,
      };
    case ActionTypes.FETCH_REALMS_SUCCESS:
      return {
        ...state,
        realms: [...state.realms, ...action.payload],
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
        achievements: keyBy(updateAchievements(state, action), 'id'),
      };
    default:
      return state;
  }
};

export default entities;

export const getAchievements = (state) => state.achievements;
export const getCategories = (state) => state.categories;
export const getCriteria = (state) => state.criteria;
export const getUrls = (state) => state.urls;
export const getRealms = (state) => state.realms;
export const getGroups = (state) => state.groups;
