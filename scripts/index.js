const Downloader = require('./downloader');
const config = require('../src/config/local');
const { processAchData, processRealmData } = require('./dataProcessors');

const { API_KEY } = config;

const achievementsEndpoint = `https://eu.api.battle.net/wow/data/character/achievements?locale=en_GB&apikey=${API_KEY}`;
const achievements = new Downloader(achievementsEndpoint, '/src/data/achievements.json', processAchData);

const realmsEndpoint = `https://eu.api.battle.net/wow/realm/status?locale=en_GB&apikey=${API_KEY}`;
const realms = new Downloader(realmsEndpoint, '/src/data/realms.json', processRealmData);

achievements.download();
realms.download();
