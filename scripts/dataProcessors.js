const { omit, difference } = require('lodash');
const { normalize } = require('normalizr');
const { groupSchema, routeSchema } = require('./schema');

const currentAchievements = require('../public/data/achievements.json');

const LOCALE_TO_REGION_MAP = {
  'en-US': 'us',
  'en-GB': 'eu',
};

/**
 * Shifts global category on the same level as other categories.
 * @param {Object} achievementData
 */
const processGroups = (achievementData) =>
  Object.keys(achievementData).map((index) => {
    const category = achievementData[index];

    const subcategories = category.categories;
    const { achievements, id } = category;

    const globalCategory = {
      id,
      achievements,
      name: 'Global',
    };

    if (subcategories) {
      subcategories.unshift(globalCategory);
    } else {
      category.categories = [globalCategory];
    }

    return omit(category, 'achievements');
  });

/**
 * Processor for achievement data.
 * @param {Object} data
 */
const processAchData = ({ body }) => {
  const groups = processGroups(body.achievements);
  const normalized = normalize(groups, groupSchema);

  const { categories, achievements } = normalized.entities;

  const { routes } = normalize(
    categories,
    routeSchema,
  ).entities;

  const newAchievements = difference(
    Object.keys(achievements),
    Object.keys(currentAchievements.entities.achievements),
  );

  if (newAchievements.length) {
    newAchievements.forEach((id) => {
      console.log(`[${id}] ${achievements[id].title}`); // eslint-disable-line
    });
    console.log(`Imported ${newAchievements.length} new achievements.`); // eslint-disable-line
  } else {
    console.log('No new achievements.'); // eslint-disable-line
  }

  return {
    ...normalized,
    entities: {
      ...normalized.entities,
      routes,
    },
  };
};


/**
 * Processor for realm data.
 * Omits unwanted realm properties.
 * @param {Object} data
 */
const processRealmData = ({ body, caseless: { dict } }) => {
  const region = LOCALE_TO_REGION_MAP[dict['content-language']];
  return {
    label: region.toUpperCase(),
    options: body.realms.map(({ name, slug, locale }) => ({
      label: name,
      value: `${region}/${slug}`,
      locale,
      region,
    })),
  };
};

module.exports = {
  processAchData,
  processRealmData,
};
