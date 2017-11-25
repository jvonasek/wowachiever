import { schema } from 'normalizr';
import kebabCase from 'lodash/kebabCase';

const achievementProcessStrategy = (entity, parent) => ({
  ...entity,
  categoryId: parent.id,
});

const categoryProcessStrategy = (entity, parent) => {
  const chunks = [];

  if (parent.name) {
    chunks.push(kebabCase(parent.name));
  }

  chunks.push(kebabCase(entity.name));

  return {
    ...entity,
    url: chunks.join('/'),
    slug: kebabCase(entity.name),
    completedAchievements: [],
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
