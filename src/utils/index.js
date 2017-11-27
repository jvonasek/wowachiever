import round from 'lodash/round';
import { normalize } from 'normalizr';

import config from '../config';

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
 * @param {Array.<string>} params¨
 * @return {string}
 */
export const createUrl = (params) =>
  params.map((p) => `/${p}`).join('').toLowerCase();

/**
 * Creates Battle.net API endpoint url
 * @param {Object} param0
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
    locale: config.REGIONS[region].locale,
    apikey: config.API_KEY,
  };

  return `${domain}${endpoint}?${serializeParams(params)}`;
};

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
 * Sums up occurences of quantity in an array of criteria
 * @param {Array.<Object>} criteria
 * @return {number}
 */
export const getCriteriaQuantityOccurence = (criteria) =>
  criteria.reduce((acc, curr) => {
    const occurence = curr.quantity > 0 ? 1 : 0;
    return acc + occurence;
  }, 0);

/**
 * Sums up the lengths of provided property in an array
 * @param {Array.<Object>} categories
 * @param {string} property
 * @return {number}
 */
export const getTotalPropertyLength = (categories, property) =>
  categories.reduce((acc, curr) => {
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

  if (gold > 0) money.push(`${gold}g`);
  if (silver > 0) money.push(`${silver}s`);
  if (copper > 0) money.push(`${copper}c`);

  return money.join('\u00a0');
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
      .then((response) => response.json())
      .then(
        (res) => dispatch(successAction(res)),
        (error) => dispatch(errorAction(error)),
      );
  };
};
