import { schema } from 'normalizr';
import kebabCase from 'lodash/kebabCase';
import includes from 'lodash/includes';

import config from '../config';
import { createUrl } from '../utils';

const { LEGACY_GROUPS } = config;

const achievementProcessStrategy = (entity, parent) => ({
  ...entity,
  categoryId: parent.id,
  timestamp: 0,
});

const categoryProcessStrategy = (entity, parent) => {
  const chunks = [];

  if (parent.name) {
    chunks.push(kebabCase(parent.name));
  }

  chunks.push(kebabCase(entity.name));

  return {
    ...entity,
    url: createUrl(chunks),
    slug: kebabCase(entity.name),
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

const processUrlSchema = (entity) => entity.id;
const urls = new schema.Entity('urls', {}, {
  idAttribute: 'url',
  processStrategy: processUrlSchema,
});

export const urlSchema = [urls];
