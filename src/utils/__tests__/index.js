import {
  calculatePercent,
  clampToMax,
  serializeParams,
  createUrl,
  createApiEndpoint,
  normalizeApiParams,
  splitInHalf,
  getCriteriaQuantityOccurence,
  getTotalPropertySum,
  getTotalPropertyLength,
  formatNumberAsWoWCurrency,
  getHslColorByPercent,
} from '../index';

import config from '../../config';

const { API_KEY } = config;

const testEuCharParams = {
  character: 'razzin',
  region: 'eu',
  realm: 'argent-dawn',
};

const testUsCharParams = {
  character: 'asmongold',
  region: 'us',
  realm: 'kelthuzad',
};

const testUrl = ['first', 'second', 'third'];

const testCriterion = [{
  id: 0,
  quantity: 3,
}, {
  id: 1,
  quantity: 0,
}, {
  id: 2,
}, {
  id: 3,
  quantity: 5,
}, {
  id: 4,
  quantity: 1,
}, {
  id: 5,
  quantity: NaN,
}, {
  id: 4,
  quantity: 'string',
}];

const testGroup = {
  categories: [{
    id: 0,
    achievements: [1, 2, 3, 4, 5],
  }, {
    id: 1,
    achievements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  }, {
    id: 2,
    achievements: [1, 2, 3],
  }],
};


describe('utils', () => {
  it('should calculate percentage', () => {
    expect(calculatePercent(244, 1240)).toBe(19.7);
    expect(calculatePercent(244, 1240, 0)).toBe(20);
  });

  it('should clamp the number to max', () => {
    expect(clampToMax(150, 100)).toBe(100);
    expect(clampToMax(undefined, 100)).toBe(0);
    expect(clampToMax(null, 100)).toBe(0);
    expect(clampToMax(NaN, 100)).toBe(0);
  });

  it('should create a query string from object', () => {
    expect(serializeParams(testEuCharParams)).toBe('character=razzin&region=eu&realm=argent-dawn');
    expect(serializeParams(testUsCharParams)).toBe('character=asmongold&region=us&realm=kelthuzad');
  });

  it('should create url path (chunks joined with slash)', () => {
    expect(createUrl(testUrl)).toBe('/first/second/third');
  });

  it('should create Battlenet API endpoint', () => {
    expect(createApiEndpoint(testEuCharParams)).toBe(`https://eu.api.battle.net/wow/character/argent-dawn/razzin?fields=achievements&locale=en_GB&apikey=${API_KEY}`);
    expect(createApiEndpoint(testUsCharParams)).toBe(`https://us.api.battle.net/wow/character/kelthuzad/asmongold?fields=achievements&locale=en_US&apikey=${API_KEY}`);
  });

  it('should normalize params from char selection form output', () => {
    expect(normalizeApiParams({
      character: 'razzin',
      realm: {
        region: 'eu',
        value: 'eu/argent-dawn',
      },
    })).toEqual(testEuCharParams);
  });

  it('should split an array in half', () => {
    expect(splitInHalf(['a', 'b', 'c'])).toEqual([['a', 'b'], ['c']]);
  });

  it('should return occurence of criterion quantity that is larger than zero', () => {
    expect(getCriteriaQuantityOccurence(testCriterion)).toBe(3);
  });

  it('should return sum of values in a property', () => {
    expect(getTotalPropertySum(testCriterion, 'quantity')).toBe(9);
  });

  it('should return sum of specific property array lengths in an array of objects, typically categories', () => {
    expect(getTotalPropertyLength(testGroup.categories, 'achievements')).toBe(19);
  });

  it('should format number as WoW currency', () => {
    expect(formatNumberAsWoWCurrency(1000000)).toBe('100g');
    expect(formatNumberAsWoWCurrency(1000020)).toBe('100g\u00a020c');
    expect(formatNumberAsWoWCurrency(1001020)).toBe('100g\u00a010s\u00a020c');
    expect(formatNumberAsWoWCurrency(152673892)).toBe('15,267g\u00a038s\u00a092c');
  });

  it('should return a CSS hsl color property based on percentage (from red to green)', () => {
    expect(getHslColorByPercent(90)).toBe('hsl(90, 65%, 50%)');
    expect(getHslColorByPercent(25, 0, 120, 100, 60)).toBe('hsl(30, 100%, 60%)');
  });
});
