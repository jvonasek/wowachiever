const { omit, keyBy } = require('lodash');

/**
 * Processor for achievement data.
 * Shifts global category on the same level as other categories.
 * @param {Object} data
 */
const processAchData = (data) =>
  Object.keys(data.achievements).map((index) => {
    const category = data.achievements[index];
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
 * Processor for realm data.
 * Omits unwanted realm properties.
 * @param {Object} data
 */
const processRealmData = (data) =>
  data.realms.map((realm) =>
    omit(realm, [
      'type',
      'population',
      'queue',
      'status',
      'battlegroup',
      'timezone',
      'connected_realms',
    ]));

const processCriteriaData = (data) => {
  return keyBy(JSON.parse(data), 'id')
};

module.exports = {
  processAchData,
  processRealmData,
  processCriteriaData,
};
