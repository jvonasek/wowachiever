const Downloader = require('./Downloader');
const config = require('../src/config/local');
const { processAchData, processRealmData, processCriteriaData } = require('./dataProcessors');

const rawCriteriaData = require('./wowClientData/criteria');


const { API_KEY } = config;

// criteria.json
// This json is not downloaded from official Battle.net REST API,
// but is parsed from file exported directly from WoW client via addon.
Downloader.writeFile(processCriteriaData(rawCriteriaData), '/src/data/criteria.json');

// achievements.json
const achievementsEndpoint = `https://eu.api.battle.net/wow/data/character/achievements?locale=en_GB&apikey=${API_KEY}`;
const achievements = new Downloader(achievementsEndpoint, '/src/data/achievements.json', processAchData);
achievements.download();

// realms.json
const realmsEndpoint = `https://eu.api.battle.net/wow/realm/status?locale=en_GB&apikey=${API_KEY}`;
const realms = new Downloader(realmsEndpoint, '/src/data/realms.json', processRealmData);
realms.download();

