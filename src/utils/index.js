const regions = {
  eu: {
    locale: 'en_GB',
  },
  us: {
    locale: 'en_US',
  },
};

const API_KEY = 'rhuqy2pzwssnkp3ne39pq8fxzgrcd6gz';

export const serializeParams = (params) =>
  Object.entries(params).map(([key, val]) =>
    `${key}=${val}`).join('&');

export const createApiEndpoint = ({
  region,
  realm,
  character,
}) => {
  const domain = `https://${region}.api.battle.net`;
  const endpoint = `/wow/character/${realm}/${character}`;
  const params = {
    fields: 'achievements',
    locale: regions[region].locale,
    apikey: API_KEY,
  };

  return `${domain}${endpoint}?${serializeParams(params)}`;
};
