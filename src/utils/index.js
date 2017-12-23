// @flow
/* global $WowheadPower */
import round from 'lodash/round';
import clamp from 'lodash/clamp';
import includes from 'lodash/includes';
import isFinite from 'lodash/isFinite';
import moment from 'moment';
import numeral from 'numeral';
import fetch from 'isomorphic-fetch';

import config from '../config';

import type {
  Id,
  BnetApiParams,
  CharFormParams,
  Criterion,
  Dispatch,
  Action,
} from '../types';

type FetchTypes = [string, string|Action, string];

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
export const mapEntitiesToIds = (entity: { [number]: Object }, ids: Array<Id>): Array<Object> => {
  const isNotEmpty = Object.keys(entity).length > 0;
  return isNotEmpty
    ? ids.map((id: number): Object => ({ ...entity[id] }))
    : [];
};

/**
 * Converts unix timestamp into readable format using moment.js
 * @param {number} timestamp
 * @param {string} format
 * @return {string}
 */
export const formatTimestamp = (timestamp: number, format?: string = DATE_FORMAT) =>
  moment(timestamp).format(format);

/**
 * Basic percentage calculation with rounding
 * @param {number} min
 * @param {number} max
 * @param {number} precision
 * @return {number}
 */
export const calculatePercent = (min: number, max: number, precision: number = 1) =>
  round((min / max) * 100, precision);

/**
 * Wrapper above Lodash clamp for clamping number to max
 * @param {number} value
 * @param {number} max
 * @return {number}
 */
export const clampToMax = (value: ?number, max: number): number =>
  clamp(value || 0, 0, max);

/**
 * Serializes object into a query string
 * @param {Object} params
 * @return {string}
 */
export const serializeParams = (params: { [string]: mixed }) =>
  Object.entries(params).map(([key, val]) => {
    const value = typeof val === 'string' ? val : '';
    return `${key}=${value}`;
  }).join('&');

/**
 * Creates url string from an array of strings
 * @param {Array.<string>} chunks
 * @return {string}
 */
export const createUrl = (chunks: Array<string>): string =>
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
}: BnetApiParams): string => {
  const domain = `https://${region}.api.battle.net`;
  const endpoint = `/wow/character/${realm}/${character}`;
  const params = {
    fields: 'achievements',
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
export const normalizeApiParams = ({
  realm,
  character,
}: CharFormParams): BnetApiParams => ({
  region: realm.region,
  realm: realm.value.split('/').pop(),
  character,
});

/**
 * Splits an array into two parts
 * @param {Array} array
 * @return {Array.<Array>}
 */
export const splitInHalf = (array: Array<any>): Array<Array<any>> => {
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
export const getCriteriaQuantityOccurence = (criteria: Array<Object>): number =>
  criteria.reduce((acc: number, curr: Criterion) => {
    const occurence = isFinite(curr.quantity) && curr.quantity > 0 ? 1 : 0;
    return acc + occurence;
  }, 0);

/**
 * Sums up values of certain property in an array
 * @param {Array} array
 * @param {string} property
 * @return {number}
 */
export const getTotalPropertySum = (array: Array<Object>, property: string): number =>
  array.reduce((acc: number, curr: { [string]: number }): number => {
    const value = isFinite(curr[property]) ? curr[property] : 0;
    return acc + value;
  }, 0);

/**
 * Sums up total quantity values in an array,
 * clamps the number to max critera value
 * @param {Array} criteria
 * @return {number}
 */
export const getRealCriteriaQuantity = (criteria: Array<Object>): number =>
  criteria.reduce((acc: number, curr: Criterion) =>
    acc + (clampToMax(curr.quantity, curr.max) || 0), 0);

/**
 * Sums up the lengths of provided property in an array
 * @param {Array.<Object>} array
 * @param {string} property
 * @return {number}
 */
export const getTotalPropertyLength = (array: Array<Object>, property: string): number =>
  array.reduce((acc: number, curr: { [string]: Array<any> }) => {
    if (!curr[property]) throw new Error('Undefined property');
    return acc + curr[property].length;
  }, 0);

/**
 * Formats a number into a more readable currency string
 * e.g. 100g 22s 12s
 * @param {number} number
 * @return {string}
 */
export const formatNumberAsWoWCurrency = (number: number): string => {
  const gold = Math.floor(number / 10000);
  const silver = Math.floor((number % 10000) / 100);
  const copper = Math.floor(number % 100);

  const money = [gold, silver, copper];
  const suffixes = ['g', 's', 'c'];

  return money.map((m, i) => {
    if (m > 0) {
      return numeral(m).format() + suffixes[i];
    }
    return null;
  }).filter((m) => m).join('\u00a0');
};

/**
 * Handler for fetch reuquest, if ok, pass the response
 * @param {Object} response
 * @return {Object|Error}
 */
const handleRequestErrors = (response: Response) => {
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
export const createFetchAction = ({
  endpoint,
  types,
}: {
  endpoint: string,
  types: FetchTypes,
}) => {
  const [requestType, successType, errorType] = types;


  return (dispatch: Dispatch) => {
    dispatch({ type: requestType });

    let successAction;
    if (successType && typeof successType === 'object') {
      successAction = (res: Object): Action => ({
        type: successType.type,
        payload: successType.payload ? successType.payload(res) : null,
      });
    } else {
      successAction = (res: Object): Action => ({
        type: successType,
        payload: res,
      });
    }

    const errorAction = (error: string): Action => ({
      type: errorType,
      error: true,
      payload: error,
    });

    return fetch(endpoint)
      .then(handleRequestErrors)
      .then((response: Response) => response.json())
      .then((res: Promise<Object>) => dispatch(successAction(res)))
      .catch((error: Error) => dispatch(errorAction(error.toString())));
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
  percent: number = 0,
  start: number = 0,
  end: number = 100,
  saturation: number = 65,
  lightness: number = 50,
): string => {
  const proportion = percent / 100;
  const hue = start + ((end - start) * proportion);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

/**
 * PUBLIC_URL wrapper to ensure the return value is always string
 * PUBLIC_URL is used for gh-pages where app is not sitting on server root
 */
export const getProcessEnvPublicUrl = () => {
  if (process && process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL;
  }
  return '';
};

export const refreshWowheadLinks = () => {
  const wowheadLinks = Array.prototype.slice.call(document.links)
    .filter((link) =>
      includes(link.className, 'wowhead') && !includes(link.className, 'q'));

  if (wowheadLinks.length > 0) {
    $WowheadPower.refreshLinks();
  }
};

global.refreshWowLinks = refreshWowheadLinks;
