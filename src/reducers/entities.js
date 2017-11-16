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

const updateEntities = (state, action) => {
  const completedAchievements = {};
  const updatedCategories = {};

  action.payload.achievements.achievementsCompleted.forEach((id) => {
    const achievement = state.achievements[id];
    const { categoryId } = achievement;
    const category = state.categories[categoryId];

    completedAchievements[id] = {
      ...achievement,
      completed: true,
    };

    updatedCategories[categoryId] = {
      ...category,
      progress: {
        ...category.progress,
        current: category.progress.current += 1,
      },
    };
  });

  return {
    ...state,
    character: action.payload,
    achievements: {
      ...state.achievements,
      ...completedAchievements,
    },
    categories: {
      ...state.categories,
      ...updatedCategories,
    },
  };
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
    case ActionTypes.FETCH_CHARACTER_SUCCESS:
      return updateEntities(state, action);
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
