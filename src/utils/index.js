import config from '../config';

/**
 * Serializes object into a query string
 * @param {Object} params
 */
export const serializeParams = (params) =>
  Object.entries(params).map(([key, val]) =>
    `${key}=${val}`).join('&');

/**
 * Creates url string from an array of strings
 * @param {Array.<string>} params
 */
export const createUrl = (params) =>
  params.map((p) => `/${p}`).join('').toLowerCase();

/**
 * Creates Battle.net API endpoint url
 * @param {Object} param0
 */
export const createApiEndpoint = ({
  region,
  realm,
  character,
}) => {
  const domain = `https://${region}.api.battle.net`;
  const endpoint = `/wow/character/${realm}/${character}`;
  const params = {
    fields: 'achievements,reputation',
    locale: config.REGIONS[region].locale,
    apikey: config.API_KEY,
  };

  return `${domain}${endpoint}?${serializeParams(params)}`;
};

/**
 * Sums up occurences of quantity in an array of criteria
 * @param {Array.<Object>} criteria
 */
export const getCriteriaQuantityOccurence = (criteria) =>
  criteria.reduce((acc, curr) => {
    const occurence = curr.quantity > 0 ? 1 : 0;
    return acc + occurence;
  }, 0);

/**
 * Splits an array into two parts
 * @param {Array} array
 */
export const splitInHalf = (array) => {
  const mid = Math.ceil(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  return right.length ? [left, right] : [left];
};
