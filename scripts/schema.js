// @flow
const normalizr = require('normalizr');
const {
  kebabCase,
  keyBy,
  includes,
  has,
} = require('lodash');

const rawCriteriaData = keyBy(JSON.parse(require('./wowClientData/criteria')), 'id');

const config = require('../src/config/global');

const { LEGACY_GROUPS } = config;
const { schema } = normalizr;


const specifyCriterionType = (type) => {
  switch (type) {
    // meta achievement
    case 8:
      return 'achievement';
    // collectible item
    case 36:
    case 41:
      return 'item';
    // currency
    case 62:
    case 67:
      return 'currency';
    case 96:
      return 'npc';
    default:
      return type;
  }
};

const achievementProcessStrategy = (entity, parent) => {
  const visibleCriteria = rawCriteriaData[entity.id] && rawCriteriaData[entity.id].criteria ?
    rawCriteriaData[entity.id].criteria.map((criterion) => ({
      ...criterion,
      type: specifyCriterionType(criterion.type),
    })) : [];

  return {
    ...entity,
    parent: parent.id,
    isLegacy: parent.isLegacy,
    reward: entity.reward || '',
    hasReward: has(entity, 'reward'),
    timestamp: 0,
    completed: false,
    progress: 0,
    progressBar: rawCriteriaData[entity.id] && rawCriteriaData[entity.id].progressBar
      ? rawCriteriaData[entity.id].progressBar
      : false,
    visibleCriteria,
  };
};

const categoryProcessStrategy = (entity, parent) => {
  const chunks = [];

  if (parent.name) {
    chunks.push(kebabCase(parent.name));
  }

  chunks.push(kebabCase(entity.name));

  return {
    ...entity,
    url: chunks.map((chunk) => `/${chunk}`).join('').toLowerCase(),
    slug: kebabCase(entity.name),
    parent: parent.id,
    completedAchievements: [],
    isLegacy: includes(LEGACY_GROUPS, entity.id) || includes(LEGACY_GROUPS, parent.id),
  };
};

const achievements = new schema.Entity('achievements', {}, {
  processStrategy: achievementProcessStrategy,
});
const categories = new schema.Entity('categories', {
  achievements: [achievements],
}, {
  processStrategy: categoryProcessStrategy,
});
const groups = new schema.Entity('groups', {
  categories: [categories],
}, {
  processStrategy: categoryProcessStrategy,
});

const processRoutesStrategy = (entity) => entity.id;
const routes = new schema.Entity('routes', {}, {
  idAttribute: 'url',
  processStrategy: processRoutesStrategy,
});

module.exports = {
  groupSchema: [groups],
  routeSchema: [routes],
};
