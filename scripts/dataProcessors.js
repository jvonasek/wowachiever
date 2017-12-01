const { omit, keyBy } = require('lodash');

const LOCALE_TO_REGION_MAP = {
  'en-US': 'us',
  'en-GB': 'eu',
};

/**
 * Processor for achievement data.
 * Shifts global category on the same level as other categories.
 * @param {Object} data
 */
const processAchData = ({ body }) =>
  Object.keys(body.achievements).map((index) => {
    const category = body.achievements[index];
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

const processCriteriaData = (data) => keyBy(JSON.parse(data), 'id');

module.exports = {
  processAchData,
  processRealmData,
  processCriteriaData,
};
