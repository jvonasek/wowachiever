import round from 'lodash/round';
import clamp from 'lodash/clamp';
import { normalize } from 'normalizr';
import moment from 'moment';
import numeral from 'numeral';

import config from '../config';

const {
  REGIONS,
  API_KEY,
  DATE_FORMAT,
} = config;

/**
 * Maps entity properties to IDs
 * @param {Object} entity
 * @param {Array} ids
 * @return {Array.<Object>}
 */
export const mapEntitiesToIds = (entity, ids) => {
  const isNotEmpty = Object.keys(entity).length > 0;
  return isNotEmpty
    ? ids.map((id) => ({ ...entity[id] }))
    : [];
};

/**
 * Converts unix timestamp into readable format using moment.js
 * @param {number} timestamp
 * @param {string} format
 * @return {string}
 */
export const formatTimestamp = (timestamp, format = DATE_FORMAT) =>
  moment(timestamp).format(format);

/**
 * Basic percentage calculation with rounding
 * @param {number} min
 * @param {number} max
 * @param {number} decimals
 * @return {number}
 */
export const calculatePercent = (min, max, decimals = 1) =>
  round((min / max) * 100, decimals);

/**
 * Serializes object into a query string
 * @param {Object} params
 * @return {string}
 */
export const serializeParams = (params) =>
  Object.entries(params).map(([key, val]) =>
    `${key}=${val}`).join('&');

/**
 * Creates url string from an array of strings
 * @param {Array.<string>} chunks
 * @return {string}
 */
export const createUrl = (chunks) =>
  chunks.map((chunk) => `/${chunk}`).join('').toLowerCase();

/**
 * Creates Battle.net API endpoint url
 * @param {Object} params
 * @param {string} params.region
 * @param {string} params.realm
 * @param {string} params.character
 * @return {string}
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
    locale: REGIONS[region].locale,
    apikey: API_KEY,
  };

  return `${domain}${endpoint}?${serializeParams(params)}`;
};

/**
 * Normalizes params for createApiEndpoint function
 * @param {Object} params
 * @param {Object} params.realm
 * @param {String} params.character
 * @return {Object}
 */
export const normalizeApiParams = ({ realm, character }) => ({
  region: realm.region,
  realm: realm.value.split('/').pop(),
  character,
});

/**
 * Splits an array into two parts
 * @param {Array} array
 * @return {Array.<Array>}
 */
export const splitInHalf = (array) => {
  const mid = Math.ceil(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  return right.length ? [left, right] : [left];
};

/**
 * Sums up occurences (either 1 or 0) of quantity in an array of criteria
 * @param {Array.<Object>} criteria
 * @return {number}
 */
export const getCriteriaQuantityOccurence = (criteria) =>
  criteria.reduce((acc, curr) => {
    const occurence = curr.quantity > 0 ? 1 : 0;
    return acc + occurence;
  }, 0);

/**
 * Sums up values of certain property in an array
 * @param {Array} array
 * @param {string} property
 * @return {number}
 */
export const getTotalPropertySum = (array, property) =>
  array.reduce((acc, curr) => acc + (curr[property] || 0), 0);

/**
 * Sums up total quantity values in an array,
 * clamps the number to max critera value
 * @param {Array} criteria
 * @return {number}
 */
export const getRealCriteriaQuantity = (criteria) =>
  criteria.reduce((acc, curr) => acc + (clamp(curr.quantity, curr.max) || 0), 0);

/**
 * Sums up the lengths of provided property in an array
 * @param {Array.<Object>} array
 * @param {string} property
 * @return {number}
 */
export const getTotalPropertyLength = (array, property) =>
  array.reduce((acc, curr) => {
    if (!curr[property]) throw new Error('Undefined property');
    return acc + curr[property].length;
  }, 0);

/**
 * Formats a number into a more readable currency string
 * e.g. 100g 22s 12s
 * @param {number} number
 * @return {string}
 */
export const formatNumberAsWoWCurrency = (number) => {
  const gold = Math.floor(number / 10000);
  const silver = Math.floor((number % 10000) / 100);
  const copper = Math.floor(number % 100);

  const money = [];
  const suffixes = ['g', 's', 'c'];

  if (gold > 0) money.push(gold);
  if (silver > 0) money.push(silver);
  if (copper > 0) money.push(copper);

  return money.map((m, i) =>
    numeral(m).format() + suffixes[i])
    .join('\u00a0');
};

/**
 * Handler for fetch reuquest, if ok, pass the response
 * @param {Object} response
 * @return {Object|Error}
 */
const handleRequestErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

/**
 * Action creator for actions that fetch data.
 * Types array should contain action types in this order:
 * REQUEST -> SUCCESS -> FAILURE
 * @param {Object} params
 * @param {string} params.endpoint
 * @param {Array.<string|Object>} params.types
 * @param {Object} params.schema
 * @return {Promise}
 */
export const createFetchAction = ({ endpoint, types, schema = null }) => {
  const [requestType, successType, errorType] = types;
  const isCustomSuccessAction = typeof successType === 'object';

  return (dispatch, getState) => {
    dispatch({ type: requestType });

    const successAction = (res) => (isCustomSuccessAction ? {
      type: successType.type,
      payload: successType.payload(res, getState),
    } : {
      type: successType,
      payload: schema ? normalize(res, schema) : res,
    });

    const errorAction = (error) => ({
      type: errorType,
      error: true,
      payload: error,
    });

    return fetch(endpoint)
      .then(handleRequestErrors)
      .then((response) => response.json())
      .then((res) => dispatch(successAction(res)))
      .catch((error) => dispatch(errorAction(error.toString())));
  };
};

/**
 * Converts percent value into HSL color for use with CSS
 * @param {number} percent
 * @param {number} start
 * @param {number} end
 * @param {number} saturation
 * @param {number} lightness
 * @return {string}
 */
export const getHslColorByPercent = (
  percent = 0,
  start = 0,
  end = 100,
  saturation = 65,
  lightness = 50,
) => {
  const proportion = percent / 100;
  const hue = start + ((end - start) * proportion);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
