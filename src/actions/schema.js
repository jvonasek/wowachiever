// @flow
import { schema } from 'normalizr';
import kebabCase from 'lodash/kebabCase';
import includes from 'lodash/includes';

import config from '../config';
import { createUrl } from '../utils';

import type { Achievement, Category, Group } from '../types';

const { LEGACY_GROUPS } = config;

const achievementProcessStrategy = (entity: Achievement, parent: Category): Achievement => ({
  ...entity,
  parent: parent.id,
  isLegacy: parent.isLegacy,
  timestamp: 0,
});

const categoryProcessStrategy = (entity: Category, parent: Group): Category => {
  const chunks = [];

  if (parent.name) {
    chunks.push(kebabCase(parent.name));
  }

  chunks.push(kebabCase(entity.name));

  return {
    ...entity,
    url: createUrl(chunks),
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

export const groupSchema = [groups];

const processRoutesStrategy = (entity) => entity.id;
const routes = new schema.Entity('routes', {}, {
  idAttribute: 'url',
  processStrategy: processRoutesStrategy,
});

export const routeSchema = [routes];
