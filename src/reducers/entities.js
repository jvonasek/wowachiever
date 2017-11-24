import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  achievements: {},
  categories: {},
  criteria: {},
  character: null,
  urls: {},
  realms: [],
  groups: {},
};


const entities = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.IMPORT_CATEGORIES:
      return {
        ...state,
        ...action.payload.entities,
      };
    case ActionTypes.IMPORT_REALMS:
      return {
        ...state,
        realms: [...state.realms, ...action.payload],
      };
    case ActionTypes.IMPORT_CRITERIA:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          ...action.payload,
        },
      };
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        character: action.payload,
      };
    default:
      return state;
  }
};

export default entities;

export const getAchievements = (state) => state.achievements;
export const getCategories = (state) => state.categories;
export const getCriteria = (state) => state.criteria;
export const getCharacter = (state) => state.character;
export const getUrls = (state) => state.urls;
export const getRealms = (state) => state.realms;
export const getGroups = (state) => state.groups;
